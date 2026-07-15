from flask import Flask, render_template, request, jsonify, session, send_file, send_from_directory # type: ignore
import requests
import datetime
import re
from bs4 import BeautifulSoup # type: ignore
import base64
import uuid
from io import BytesIO

app = Flask(__name__)
app.secret_key = "secret-key" 


# Ollama API 주소
OLLAMA_URL = "http://localhost:11434/api/generate"

MODEL_NAME1 = "eeve-model-light:latest"
MODEL_NAME2 = "llama3:latest"

# OpenWeatherMap API 정보
WEATHER_API_KEY = "2dc3123de16c3df61202dc8b4f9b0277"
WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"

CUSTOM_SCENARIOS = {}
FORBIDDEN_WORDS = set()

import uuid
import os
import time
import requests
from flask import request, jsonify

TYPECAST_API_KEY = "__pltVDgHGsY6Zf9Kr5VJQboHrvMWuCUZu2VY5oadbof9"

TYPECAST_HEADERS = {
    "X-API-KEY": TYPECAST_API_KEY,
    "Content-Type": "application/json"

}

VOICE_ID = "tc_619d7f42c14fccfc4953e159"


@app.route('/manifest.json')
def manifest():
    return send_from_directory('.', 'manifest.json', mimetype='application/json')


# service-worker.js 루트에서 접근 가능하게 처리
@app.route('/service-worker.js')
def service_worker():
    return send_from_directory('.', 'service-worker.js', mimetype='application/javascript')


@app.route("/get_tts", methods=["POST"])
def get_tts():
    text = request.json.get("text", "").strip()
    if not text:
        return jsonify({"error": "텍스트가 비어있습니다."}), 400

    try:
        # 1. 음성 생성 요청
        speak_res = requests.post(
        "https://api.typecast.ai/v1/text-to-speech",
        headers=TYPECAST_HEADERS,

        json={
            "voice_id": VOICE_ID,
            "text": text,
            "model": "ssfm-v30",
            "language": "kor",
            "output": {
                "audio_format": "mp3"
            }
        }
)
        speak_res.raise_for_status()

        audio_data = BytesIO(speak_res.content)

        return send_file(
            audio_data,
            mimetype="audio/mpeg",
            download_name="tts.mp3"
        )

    except Exception as e:
        print("TTS 생성 중 오류 발생:", e)
        return jsonify({"error": "TTS 처리 중 오류 발생", "detail": str(e)}), 500


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/aivoice")
def aivoice():
    return render_template("aivoice.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

@app.route("/survey")
def servey():
    return render_template("survey.html")

@app.route("/card")
def card():
    return render_template("card.html")

@app.route("/chatbot1")
def chatbot1():
    return render_template("chatbot1.html")

@app.route("/chatbot2")
def chatbot2():
    return render_template("chatbot2.html")

@app.route("/set_prompt", methods=["POST"])
def set_prompt():
    prompt = request.json.get("prompt", "")
    session["user_prompt"] = prompt
    print(f"Updated prompt: {prompt}")  # 서버 콘솔 출력
    return jsonify({"message": "Prompt 설정 완료!", "prompt": prompt})

@app.route("/set_scenario", methods=["POST"])
def set_scenario():
    question = request.json.get("question", "").strip()
    answer = request.json.get("answer", "").strip()

    if question and answer:
        CUSTOM_SCENARIOS[question] = answer
        print(f"[시나리오 저장] '{question}' → '{answer}'")
        return jsonify({"message": "시나리오가 저장되었습니다!"})
    else:
        return jsonify({"message": "질문과 응답을 모두 입력해주세요."}), 400
    
@app.route("/set_filter_word", methods=["POST"])
def set_filter_word():
    word = request.json.get("word", "").strip()
    if word:
        FORBIDDEN_WORDS.add(word)
        print(f"[금지어 등록] '{word}'")
        return jsonify({"message": f"'{word}' 단어가 필터링 목록에 추가되었습니다."})
    return jsonify({"message": "단어를 입력해주세요."}), 400

@app.route("/send_message", methods=["POST"])
def send_message():
    user_input = request.json.get("message")
    
    # 시나리오 저장
    if user_input in CUSTOM_SCENARIOS:
        print(f"[시나리오 응답] '{user_input}' → '{CUSTOM_SCENARIOS[user_input]}'")
        return jsonify({"response": CUSTOM_SCENARIOS[user_input]})
    
    # 필터링 설정
    if contains_forbidden_word(user_input):
        return jsonify({"response": "⚠️ 금지한 단어가 인식되었습니다. 그런 말은 적절하지 않아요. 다른 표현으로 이야기해볼까요?"})
    
    # 조명 관련 질문 감지
    lighting_response = detect_lighting_action(user_input)
    if lighting_response:
        return jsonify({"response": lighting_response})
    
    # 날씨 관련 질문이면 날씨 API 호출
    if "날씨" in user_input or "날씨 어때" in user_input or "날씨 알려줘" in user_input:
        return get_weather(user_input)
    
    # 날짜 관련 질문 감지
    if is_date_question(user_input):
        today = datetime.datetime.now()
        date_str = today.strftime("%Y년 %m월 %d일")  # YYYY년 MM월 DD일 형식
        day_of_week = get_korean_weekday(today.weekday())  # 요일 가져오기
        return jsonify({"response": f"오늘은 {date_str} {day_of_week} 입니다."})
    
    if is_time_question(user_input):
            now = datetime.datetime.now()
            hour = now.hour
            minute = now.minute
            second = now.second
            time_str = f"{hour}시 {minute}분 {second}초"
            return jsonify({"response": f"현재 시간은 {time_str}입니다."})  
    
    # 뉴스 관련 질문이 포함되면 네이버 뉴스 크롤링 함수 호출
    if "뉴스" in user_input:
        match = re.search(r"(.+?)뉴스", user_input)
        query = match.group(1).strip() if match else "최신"
        print(query)
        news_data = get_news(query)
        return jsonify({"response": news_data})
    
    user_prompt_style = session.get("user_prompt", "")
    prompt = f"{user_prompt_style}\n: {user_input}"
    
    print("Final prompt:", prompt)
    
    if re.search(r"[a-zA-Z]", user_input):
        selected_model = MODEL_NAME2
    else:
        selected_model = MODEL_NAME1 
    
    # Ollama API 호출
    payload = {
        "model": selected_model,
        "prompt": prompt,
        "num_predict": 256,  # 긴 응답을 받을 수 있도록
        "num_ctx": 512,  # 충분한 컨텍스트 길이
        "temperature": 0.6,  # 더 창의적인 응답
        "stream": False,  # 한 번에 응답 받기
        "stop": ""  # stop 토큰을 빈 문자열로 설정
    }

    response = requests.post(OLLAMA_URL, json=payload)
    
    if response.status_code == 200:
        raw_reply = response.json().get("response", "")
        bot_reply = filter_response(raw_reply)  # 응답 필터링
    else:
        bot_reply = "⚠️ 오류 발생: API 호출에 실패했습니다."

    return jsonify({"response": bot_reply})

def filter_response(text):
    for word in FORBIDDEN_WORDS:
        if word in text:
            print(f"[⚠️ 필터링 감지] '{word}' 포함 → 응답 차단")
            return "⚠️ 금지한 필터링 단어가 인식되었습니다. AI가 적절한 표현만 사용하도록 설정되어 있어요."
    return text

def contains_forbidden_word(text):
    for word in FORBIDDEN_WORDS:
        if word in text:
            print(f"[🚫 사용자 금지어 감지] '{word}' 포함 → 질문 차단")
            return True
    return False

KOREAN_TO_ENGLISH_CITY = {
    "서울": "Seoul",
    "부산": "Busan",
    "대구": "Daegu",
    "인천": "Incheon",
    "광주": "Gwangju",
    "대전": "Daejeon",
    "울산": "Ulsan",
    "세종": "Sejong",
    "경기도": "Gyeonggi-do",
    "강원도": "Gangwon-do",
    "충청북도": "Chungcheongbuk-do",
    "충청남도": "Chungcheongnam-do",
    "전라북도": "Jeollabuk-do",
    "전라남도": "Jeollanam-do",
    "경상북도": "Gyeongsangbuk-do",
    "경상남도": "Gyeongsangnam-do",
    "충북": "Chungcheongbuk-do",
    "충남": "Chungcheongnam-do",
    "전북": "Jeollabuk-do",
    "전남": "Jeollanam-do",
    "경북": "Gyeongsangbuk-do",
    "경남": "Gyeongsangnam-do",
    "제주": "Jeju",
    "제주도": "Jeju"
}

ENGLISH_TO_KOREAN_CITY = {v: k for k, v in KOREAN_TO_ENGLISH_CITY.items()}

# 조명 관련 질문 감지
def detect_lighting_action(user_input):
    # "조명"이 포함되어 있고 "켜" 또는 "꺼"가 포함되어 있는지 확인
    if "조명" in user_input:
        if "켜" in user_input:
            return "조명을 켜드리겠습니다."
        elif "꺼" in user_input:
            return "조명을 꺼드리겠습니다."
    return None

# 날씨 API 호출 함수
def get_weather(user_input=None):
    default_city = "광주"
    korean_city = extract_city_name(user_input) if user_input else default_city
    city = KOREAN_TO_ENGLISH_CITY.get(korean_city, "Gwangju")  # 한글 → 영어 변환

    params = {
        "q": city,
        "appid": WEATHER_API_KEY,
        "units": "metric",
        "lang": "kr",
    }

    response = requests.get(WEATHER_API_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        temperature = round(data["main"]["temp"], 1)
        feels_like = round(data["main"]["feels_like"], 1)
        description = data["weather"][0]["description"]
        city_name = data["name"]
        
        korean_city_name = ENGLISH_TO_KOREAN_CITY.get(city_name, korean_city)
        
        return jsonify(
            {
                "response": f"오늘 {korean_city_name}의 날씨는 {description} 입니다. 현재 온도는 {temperature}°C이며, 체감온도는 {feels_like}°C입니다."
            }
        )
    else:
        return jsonify({"response": f"⚠️ '{korean_city}' 지역의 날씨 정보를 불러오는 데 실패했습니다."})
    
# 사용자 입력에서 도시명 추출
def extract_city_name(user_input):
    for city in KOREAN_TO_ENGLISH_CITY.keys():
        if city in user_input:
            return city

    return "광주" 

def is_date_question(user_input):
    date_patterns = [
        r"오늘 날짜", 
        r"오늘 몇 월 며칠", 
        r"오늘 며칠", 
        r"지금 날짜", 
        r"오늘은 무슨 요일", 
        r"무슨 날",
        r"날짜",
        r"몇월 며칠",
        r"몇월",
        r"며칠",
        r"몇 월",
        r"요일"     
    ]
    
    for pattern in date_patterns:
        if re.search(pattern, user_input):
            return True
    return False

def is_time_question(user_input):
    time_patterns = [
        r"몇 시", 
        r"몇 분",
        r"지금 몇 시", 
        r"현재 시간", 
        r"시간",
        r"몇시",
        r"몇분"
    ]
    
    for pattern in time_patterns:
        if re.search(pattern, user_input):
            return True
    return False
    
def get_korean_weekday(weekday_index):
    weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
    return weekdays[weekday_index]


# 네이버 뉴스 크롤링 함수
def get_news(query="최신"):
    search_url = f"https://search.etnews.com/etnews/search.html?kwd={query}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = requests.get(search_url, headers=headers)
        if response.status_code != 200:
            return f"⚠️ 뉴스 검색 실패 (상태 코드: {response.status_code})"

        soup = BeautifulSoup(response.text, "html.parser")
        results = soup.select("ul.news_list > li")

        if not results:
            return f"⚠️ '{query}' 관련 뉴스가 없습니다."

        news_summary = f"🔎 '{query}' 관련 뉴스:<br><br>"
        for item in results[:5]:
            title_tag = item.select_one("div.text > strong > a")
            if title_tag:
                title = title_tag.get_text(strip=True)
                link = title_tag["href"]
                news_summary += f"• 제목 : {title}<br><a href='{link}' target='_blank'>🔗 기사 보기</a><br><br>"

        return news_summary

    except Exception as e:
        return f"⚠️ 오류 발생: {str(e)}"
    
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)