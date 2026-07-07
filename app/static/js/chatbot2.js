window.addEventListener("DOMContentLoaded", () => {
  const cardId = localStorage.getItem("selectedCardId");
  const cardTitle = localStorage.getItem("selectedCardTitle");
});

document
  .querySelector(".image-container")
  .addEventListener("click", function () {
    window.location.href = "/card";
  });

function showCodingQuestion(category) {
  let questionHTML = "";

  if (category === "프롬프트 관련 정보") {
    questionHTML = `
      <div class="coding-question">
        <div class="info-title">코딩 문제: 맞춤 인사 함수 만들기</div>
        <div class="info-desc">
          사용자 이름을 받아서 맞춤 인사를 반환하는 함수를 완성해보세요.
          <pre>
<input type="text" id="blank1" class="coding-blank" placeholder="함수 선언 키워드"> greetUser(name) {
    const greeting = "안녕하세요, " + name + "님!";
    return greeting;
}
          </pre>
        </div>
        <button onclick="checkAnswer('${category}', ['function'])">정답 확인</button>
      </div>
    `;
  } else if (category === "대화 시나리오 만들기") {
    questionHTML = `
      <div class="coding-question">
        <div class="info-title">코딩 문제: 질문에 맞는 AI 답변 만들기</div>
        <div class="info-desc">
          사용자의 질문에 맞는 AI 답변을 반환하는 함수를 완성하세요.
          <pre>
function chatbotResponse(userInput) {
    <input type="text" id="blank1" class="coding-blank" placeholder="if/else if 키워드"> (userInput === "안녕") {
        return "안녕하세요!";
    } <input type="text" id="blank2" class="coding-blank" placeholder="if/else if 키워드"> (userInput === "오늘 날씨 어때?") {
        return "오늘은 맑아요!";
    } else {
        return "잘 모르겠어요...";
    }
}
          </pre>
        </div>
        <button onclick="checkAnswer('${category}', ['if','else if'])">정답 확인</button>
      </div>
    `;
  } else if (category === "AI 챗봇 디자인 꾸며보기") {
    questionHTML = `
      <div class="coding-question">
        <div class="info-title">코딩 문제: 말투 스타일 함수 만들기</div>
        <div class="info-desc">
          입력된 말투 스타일에 따라 다른 메시지를 반환하는 함수를 완성하세요.
          <pre>
function setStyle(style) {
    <input type="text" id="blank1" class="coding-blank" placeholder="switch/if 키워드">(style) {
        case "친근":
            return "안녕~";
        case "공손":
            return "안녕하세요.";
        case "전문":
            return "안녕하세요, 정확한 정보를 알려드립니다.";
        default:
            return "안녕하세요!";
    }
}
          </pre>
        </div>
        <button onclick="checkAnswer('${category}', ['switch'])">정답 확인</button>
      </div>
    `;
  } else {
    questionHTML = `<div>코딩 문제를 선택해주세요.</div>`;
  }

  document.getElementById("info-content").innerHTML = questionHTML;
}

// 정답 확인 함수
function checkAnswer(category, answers) {
  let isCorrect = true;

  for (let i = 0; i < answers.length; i++) {
    const userAnswer = document.getElementById(`blank${i + 1}`)?.value?.trim();
    if (userAnswer !== answers[i]) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    alert("정답입니다! 🎉");
    showContent(category);
  } else {
    alert("오답입니다. 다시 확인해보세요 😥");
  }
}

function showContent(category) {
  let content = "";
  if (category === "프롬프트 관련 정보") {
    content = `
      <div class="info-title">프롬프트(prompt) 설정</div>
      <div class="info-desc">
        원하는 말투로 대화할 수 있도록 설정할 수 있어요.<br><br>
        사용자와의 대화 목적에 따라, AI가 친근하고 귀여운 말투, 공손하고 정중한 말투, 혹은 전문적이고 정확한 말투로 응답하도록 조정할 수 있습니다.<br>
        이러한 말투 설정은 AI에게 주어지는 프롬프트(prompt)를 통해 제어하며, 상황과 학습 대상에 맞는 대화 스타일을 구성하는 데 중요한 역할을 합니다.
      </div>
      <div class="info-subtitle">프롬프트 설정 예시</div>
      <div class="example-text">
        👶 <strong>귀엽고 친근한 말투</strong><br>
        프롬프트 예시: “다음 문장을 귀엽고 친근한 말투로 바꿔줘.”<br>
        결과 예시: 오늘은 4월 11일 목요일이야~! 요일이 목요일이라니, 벌써 한 주의 반이 지났네 히히 😊<br><br>

        👩‍🏫 <strong>선생님처럼 친절한 말투</strong><br>
        프롬프트 예시: “다음 문장을 초등학생이 이해할 수 있도록, 선생님처럼 친절하게 설명해줘.”<br>
        결과 예시: 오늘은 4월 11일 목요일입니다. 목요일도 우리 오늘도 즐겁게 공부해볼까요?<br><br>

        🧑 <strong>친구처럼 자연스러운 말투</strong><br>
        프롬프트 예시: “다음 문장을 친구처럼 자연스럽게 말해줘.”<br>
        결과 예시: 오늘이 4월 11일 목요일이래! 시간이 진짜 빠르다 그치?<br><br>
      </div>

      <div class="input-container">
        <textarea class="input-box" placeholder="프롬프트(prompt)를 설정하면, AI가 그 스타일에 맞게 대답해요!" rows="3"></textarea>
        <button class="save-btn">적용</button>
      </div>
    `;
  } else if (category === "대화 시나리오 만들기") {
    content = `
      <div class="info-title">대화 시나리오 만들기</div>
      <div class="info-desc">
        AI가 어떤 질문에 어떤 답을 해야 할지, <strong>대화 흐름을 직접 설계</strong>해보세요!<br><br>
        예를 들어 사용자가 "안녕!"이라고 인사하면, AI는 "안녕하세요, 무엇을 도와드릴까요?"라고 대답하도록 만들 수 있어요 😊<br><br>
        👉 이렇게 대화의 흐름을 설계하는 건 실제 챗봇 서비스에서도 아주 중요한 과정이에요.<br>
        여러분만의 시나리오를 만들어보며 AI와의 소통 방식을 고민해보세요!<br><br>

        🚨설정한 질문과 똑같이 질문해야 설정한대로 대답을 해요! 
      </div>

      <div class="scenario-example">
        <div class="scenario-row">
          <label>사용자 질문: <input type="text" placeholder="예: 안녕!" class="scenario-input" /></label>
        </div>
        <div class="scenario-row">
          <label>AI 응답: <input type="text" placeholder="예: 안녕하세요~ 무엇을 도와드릴까요?" class="scenario-output" /></label>
        </div>
        <button class="save-btn2" onclick="saveScenario()">적용</button>
      </div>
    `;
  } else if (category === "AI 챗봇 디자인 꾸며보기") {
    content = `
    <div class="info-title">AI 챗봇 디자인 꾸며보기</div>
    <div class="info-desc">
        AI 챗봇을 더 귀엽고, 멋지고, 나만의 스타일로 꾸며볼 수 있어요!<br><br>
        <strong>대표 이모지</strong>를 넣거나, <strong>말풍선의 색상</strong>, <strong>모양</strong>, <strong>글자 크기</strong>를 바꿔보며,
        다양한 분위기의 챗봇을 직접 만들어보세요 😊<br>
        👉 이렇게 디자인을 바꾸는 걸 <strong>UI(User Interface) 커스터마이징</strong>이라고 해요!<br>
        사용자가 편하게 느끼고, 재미있게 사용할 수 있도록 만드는 것도 AI와 소프트웨어의 중요한 역할이에요.
    </div>

    <div class="style-example">
        <div class="bubble-preview" id="preview-box">
        <span class="emoji-preview" id="preview-emoji">🤖</span>
        <div class="bubble-text" id="preview-text">안녕! 나는 너만의 AI 친구야 💬</div>
        </div>

        <div class="style-controls">
        <label>대표 이모지: <input type="text" id="emoji-input" maxlength="2" placeholder="예: 🐱"></label>
        <button class="emoji-button" onclick="suggestEmoji()">랜덤 이모지 추천</button>
        <label>말풍선 색상: <input type="color" id="bubble-color" value="#f0f0f0"></label>
        <label>글씨 색상: 
          <input type="color" id="font-color" value="#000000">
        </label>
        <label>글씨체:
          <select id="font-family-select">
            <option value="Arial">기본</option>
            <option value="'Nanum Pen Script', cursive">손글씨체</option>
            <option value="'Nanum Brush Script', cursive">붓글씨체</option>
            <option value="'Gaegu', cursive">개구쟁이체</option>
            <option value="'Jua', sans-serif">주아체</option>
            <option value="'Single Day', cursive">싱글데이체</option>
            <option value="'궁서체'">궁서체</option>
          </select>
        </label>
        <label>글자 크기: 
            <select id="font-size-select">
            <option value="12px">작게</option>
            <option value="16px" selected>보통</option>
            <option value="20px">크게</option>
            </select>
        </label>
      
        <div class="style-button-group">
          <button class="preview-btn" onclick="previewStyle()">미리보기</button>
          <button class="save-btn3" onclick="applyStyle()">적용</button>
        </div>
        </div>
    </div>
    `;
  } else if (category === "음성인식 체험") {
    content = `
    <div class="info-title">음성인식 AI 체험하기</div>
    <div class="info-desc">
      우리가 말한 내용을 AI가 어떻게 이해하고 대답하는지 궁금하지 않나요? 🤔<br><br>
      바로 <strong>음성 인식(Voice Recognition)</strong> 기술 덕분이에요!<br>
      아래 흐름을 보면 어떤 과정으로 AI가 작동하는지 쉽게 알 수 있어요
    </div>
    
    <div class="voice-flow-title">🧭 AI 음성 인식 흐름도</div>
    <div class="voice-flow">
      🗣️ <strong>사용자 말하기</strong> <br>
      <span class="arrow">⬇</span><br>
      🎙️ <strong>AI가 음성을 듣고, 문자로 변환</strong><br>
      <span class="arrow">⬇</span><br>
      🧠 <strong>AI가 문장을 분석하고 이해</strong><br>
      <span class="arrow">⬇</span><br>
      💬 <strong>AI가 적절한 대답을 만들어 말해줌</strong><br>
    </div>

    <div class="info-desc" style="margin-top: 20px;">
      이렇게 음성인식은 <strong>'듣기 → 이해하기 → 대답하기'</strong>로 이어지는 멋진 기술이에요!<br><br>
      아래 버튼을 눌러 직접 <strong>AI와 말로 대화해보는 체험</strong>을 해보세요 🎤
    </div>

    <div class="voice-btn-container">
      <button class="voice-btn" onclick="location.href='/aivoice'">음성인식 체험하기</button>
    </div>
  `;
  } else if (category === "활동지 작성") {
    const cardIdStr = localStorage.getItem("selectedCardId");
    const cardId = parseInt(cardIdStr, 10); // 문자열 -> 숫자 변환
    const cardTitles = {
      1: "우주로봇",
      2: "동물로봇",
      3: "식물로봇",
      4: "탐험로봇",
      5: "감정로봇",
      6: "역사로봇",
      7: "요리로봇",
      8: "코딩로봇",
      9: "직업로봇",
      10: "과학로봇",
    };
    const cardTitle = cardTitles[cardId] || "챗봇";

    // 카드별 질문 설정
    const worksheetQuestions = {
      1: [
        "우주로봇에게 무엇을 물어봤나요?",
        "어떤 우주 정보를 알려줬나요?",
        "그 정보를 듣고 어떤 상상이 떠올랐나요?",
        "우주에 대해 더 알고 싶은 점은 무엇인가요?",
      ],
      2: [
        "동물로봇과 어떤 동물 이야기를 했나요?",
        "어떤 동물 정보를 들었나요?",
        "그 동물에 대해 어떤 느낌이 들었나요?",
        "또 다른 동물에 대해 궁금한 점은?",
      ],
      3: [
        "식물로봇에게 어떤 질문을 했나요?",
        "식물에 대해 뭐라고 답해줬나요?",
        "식물의 어떤 점이 인상 깊었나요?",
        "식물에 대해 더 알고 싶은 건?",
      ],
      4: [
        "탐험로봇에게 어떤 모험 이야기를 들었나요?",
        "탐험로봇은 어디를 탐험했나요?",
        "탐험 이야기를 듣고 어떤 느낌이 들었나요?",
        "다음에 탐험하고 싶은 장소는 어디인가요?",
      ],
      5: [
        "감정로봇에게 어떤 감정에 대해 물어봤나요?",
        "감정로봇은 어떤 답을 해줬나요?",
        "그 답을 듣고 내 감정은 어떻게 변했나요?",
        "더 알고 싶은 감정이나 기분이 있나요?",
      ],
      6: [
        "역사로봇에게 어떤 역사 이야기를 들었나요?",
        "역사로봇이 알려준 역사적 사실은 무엇인가요?",
        "그 이야기를 듣고 어떤 생각이 들었나요?",
        "더 알고 싶은 역사적 사건이 있나요?",
      ],
      7: [
        "요리로봇에게 어떤 요리를 물어봤나요?",
        "요리로봇이 추천한 요리는 무엇인가요?",
        "그 요리에 대해 어떤 생각이 들었나요?",
        "다음에 도전해보고 싶은 요리는 무엇인가요?",
      ],
      8: [
        "코딩로봇에게 어떤 프로그래밍 질문을 했나요?",
        "코딩로봇이 알려준 답변은 무엇인가요?",
        "그 답변을 듣고 어떤 아이디어가 떠올랐나요?",
        "더 배우고 싶은 코딩 주제가 있나요?",
      ],
      9: [
        "직업로봇에게 어떤 직업에 대해 물어봤나요?",
        "직업로봇이 알려준 직업 정보는 무엇인가요?",
        "그 정보를 듣고 어떤 꿈이나 목표가 생겼나요?",
        "다른 궁금한 직업이 있나요?",
      ],
      10: [
        "과학로봇에게 어떤 과학 질문을 했나요?",
        "과학로봇이 설명해준 과학 원리는 무엇인가요?",
        "그 설명을 듣고 어떤 호기심이 생겼나요?",
        "더 알아보고 싶은 과학 주제가 있나요?",
      ],
    };

    const questions = worksheetQuestions[cardId] || [
      `${cardTitle}에게 어떤 질문을 했나요?`,
      `${cardTitle}은 뭐라고 대답했나요?`,
      `그 대답을 듣고 어떤 느낌이 들었나요?`,
      `더 궁금한 점이 있다면 무엇인가요?`,
    ];

    content = `
    <h2 class="info-title">오늘의 ${cardTitle} 활동 정리</h2>
    <p class="info-desc">챗봇과 대화하며 알게 된 정보를 정리해보세요!</p>

    <div class="question-block">
      <label for="q1">1. ${questions[0]}</label>
      <textarea id="q1" rows="2"></textarea>
    </div>
    <div class="question-block">
      <label for="q2">2. ${questions[1]}</label>
      <textarea id="q2" rows="2"></textarea>
    </div>
    <div class="question-block">
      <label for="q3">3. ${questions[2]}</label>
      <textarea id="q3" rows="2"></textarea>
    </div>
    <div class="question-block">
      <label for="q4">4. ${questions[3]}</label>
      <textarea id="q4" rows="2"></textarea>
    </div>

    <div class="worksheet-container">
      <button class="save-btn5" onclick="saveFilter()">활동지 제출하기</button>
    </div>
  `;
  } else {
    content = category;
  }

  document.getElementById("info-content").innerHTML = content;
}

function updateInfo(category) {
  const codingCategories = [
    "프롬프트 관련 정보",
    "대화 시나리오 만들기",
    "AI 챗봇 디자인 꾸며보기",
  ];

  if (codingCategories.includes(category)) {
    showCodingQuestion(category); // 상단 3개는 코딩 문제 먼저
  } else {
    showContent(category); // 나머지는 바로 기존 content
  }
}

// prompt 설정
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("save-btn")) {
    const promptText = document.querySelector(".input-box").value;

    fetch("/set_prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptText }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("프롬프트가 설정되었습니다!");
        console.log("Updated prompt:", data.prompt);
      })
      .catch((err) => {
        console.error("프롬프트 설정 오류:", err);
      });
  }
});

//시나리오 설정
function saveScenario() {
  const question = document.querySelector(".scenario-input").value.trim();
  const answer = document.querySelector(".scenario-output").value.trim();

  if (!question || !answer) {
    alert("질문과 응답을 모두 입력해주세요!");
    return;
  }

  fetch("/set_scenario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, answer }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message || "시나리오가 저장되었습니다!");
    })
    .catch((err) => {
      console.error("시나리오 저장 오류:", err);
      alert("시나리오 저장 중 오류가 발생했습니다.");
    });
}

//필터링 설정
function saveFilter() {
  const word = document.querySelector(".filter-input").value.trim();

  if (!word) {
    alert("금지할 단어를 입력해주세요!");
    return;
  }

  fetch("/set_filter_word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message || "단어가 필터링 목록에 추가되었습니다!");
      document.querySelector(".filter-input").value = "";
    })
    .catch((err) => {
      console.error("필터링 단어 저장 오류:", err);
      alert("단어 저장 중 오류가 발생했습니다.");
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const selectedImage = localStorage.getItem("selectedImage");

  if (selectedImage) {
    const imageElement = document.getElementById("selected-image");
    imageElement.src = selectedImage;
    imageElement.style.maxWidth = "200px"; // 예시 스타일
  }
});

//챗봇 커스터마이징
function previewStyle() {
  const emoji = document.getElementById("emoji-input").value;
  const color = document.getElementById("bubble-color").value;
  const fontColor = document.getElementById("font-color").value;
  const fontFamily = document.getElementById("font-family-select").value;
  const fontSize = document.getElementById("font-size-select").value;

  document.getElementById("preview-emoji").textContent = emoji || "🤖";
  document.getElementById("preview-text").style.backgroundColor = color;
  document.getElementById("preview-text").style.color = fontColor;
  document.getElementById("preview-text").style.fontFamily = fontFamily;
  document.getElementById("preview-text").style.fontSize = fontSize;
}

function applyStyle() {
  const emoji = document.getElementById("emoji-input").value || "🤖";
  const color = document.getElementById("bubble-color").value;
  const fontColor = document.getElementById("font-color").value;
  const fontFamily = document.getElementById("font-family-select").value;
  const fontSize = document.getElementById("font-size-select").value;

  // 전역 변수로 저장
  window.chatBubbleStyle = {
    emoji,
    color,
    fontColor,
    fontFamily,
    fontSize,
  };

  alert("챗봇 말풍선에 스타일이 적용되었어요!");
}

function suggestEmoji() {
  const emojis = [
    "🤖",
    "🐱",
    "🐶",
    "🐵",
    "🦄",
    "🐧",
    "🐯",
    "🐸",
    "👾",
    "🎃",
    "🧠",
    "💡",
    "🌟",
    "🔥",
    "✨",
    "🌈",
    "🎈",
    "🎨",
    "🎵",
    "📚",
    "🎮",
    "📱",
    "💬",
    "🗨️",
    "😺",
    "😸",
    "😻",
    "😼",
    "😎",
    "🤩",
    "🤓",
    "🥳",
    "😄",
    "😊",
    "😉",
    "😜",
    "🙃",
    "😇",
    "😋",
    "😍",
    "🚀",
    "💻",
    "🧑‍💻",
    "👩‍🚀",
    "🧙‍♂️",
    "🐣",
    "🐻",
    "🦊",
    "🐼",
    "🦕",
  ];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  document.getElementById("emoji-input").value = randomEmoji;
  document.getElementById("preview-emoji").textContent = randomEmoji;
}

document.querySelectorAll(".rectangle").forEach((btn) => {
  btn.addEventListener("click", function () {
    // 모든 버튼에서 active 클래스 제거
    document
      .querySelectorAll(".rectangle")
      .forEach((b) => b.classList.remove("active"));

    // 클릭한 버튼에 active 클래스 추가
    this.classList.add("active");
  });
});

const OLLAMA_API_URL = "/send_message";

function appendMessage(role, content, isLoading = false) {
  const messagesContainer = document.getElementById("messages");

  if (role === "assistant") {
    const style = window.chatBubbleStyle || {
      emoji: "🤖",
    };

    // wrapper div 생성 (이모지 + 메시지 나란히 배치)
    const assistantLine = document.createElement("div");
    assistantLine.className = "assistant-line"; // flex 정렬용

    // 이모지
    const emoji = document.createElement("span");
    emoji.className = "emoji";
    emoji.textContent = style.emoji || "🤖";

    // 메시지 말풍선
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "assistant");

    if (style.color) messageDiv.style.backgroundColor = style.color;
    if (style.fontColor) messageDiv.style.color = style.fontColor;
    if (style.fontFamily) messageDiv.style.fontFamily = style.fontFamily;
    if (style.fontSize) messageDiv.style.fontSize = style.fontSize;

    if (isLoading) {
      messageDiv.classList.add("loading");
      messageDiv.textContent = "⏳ 대답을 생성 중...";
    } else {
      messageDiv.textContent = content;
    }

    // 구조 조립
    assistantLine.appendChild(emoji);
    assistantLine.appendChild(messageDiv);
    messagesContainer.appendChild(assistantLine);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return messageDiv;
  }

  // 사용자 메시지 (이모지 없음)
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "user");
  messageDiv.textContent = content;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return messageDiv;
}

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("user-input");
  const sendButton = document.querySelector("button");

  // 엔터 키 또는 버튼 클릭으로 메시지 전송
  inputField.addEventListener("keydown", function (event) {
    if (event.isComposing) {
      return; // 조합 중이면 동작 방지
    }

    if (event.key === "Enter" && event.shiftKey) {
      return; // Shift + Enter 시 줄바꿈 허용
    } else if (event.key === "Enter") {
      event.preventDefault(); // 기본 엔터 동작(줄바꿈) 방지
      sendMessage();
    }
  });

  sendButton.addEventListener("click", sendMessage);
});

function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  // 사용자 메시지 추가
  appendMessage("user", userInput);
  document.getElementById("user-input").value = "";

  // 챗봇의 "대답 중..." 메시지 추가
  const loadingMessage = appendMessage("assistant", "", true);

  fetch(OLLAMA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botReply =
        data.response || "⚠️ 오류 발생: 모델이 응답하지 않습니다.";

      // "대답 중..." 메시지를 챗봇의 실제 응답으로 교체
      loadingMessage.innerHTML = botReply;
      loadingMessage.classList.remove("loading");

      let cleanText = botReply
        .replace(/<br>/g, "\n")
        .replace(/<\/?a[^>]*>/g, "");

      let lines = cleanText
        .split("\n") // 줄바꿈 기준으로 나누기
        .filter((line) => line.trim() !== "" && !line.includes("🔗")); // 빈 줄과 링크 포함된 줄 제거

      let finalText = lines.join(". ");

      // 이모지 제거 (필요한 경우)
      finalText = finalText
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
        .trim();

      playTTS(finalText);
    })
    .catch((error) => {
      loadingMessage.textContent = "⚠️ 오류 발생: " + error;
      loadingMessage.classList.remove("loading");
    });
}

// 전역에서 오디오 객체를 한 번만 생성
let ttsAudio = new Audio();
ttsAudio.autoplay = true;

// 무음 먼저 재생해 오디오 권한 확보
document.addEventListener(
  "click",
  () => {
    if (ttsAudio.muted || ttsAudio.paused) {
      ttsAudio.muted = true;
      ttsAudio.src = "/static/silence.mp3"; // 짧은 무음 파일 필요
      ttsAudio.play().catch(() => {});
    }
  },
  { once: true }
);

function playTTS(text) {
  const unitMap = {
    kg: "킬로그램",
    g: "그램",
    km: "킬로미터",
    m: "미터",
    cm: "센티미터",
    mm: "밀리미터",
    ml: "밀리리터",
    l: "리터",
    "℃": "도",
    "°C": "도",
    "%": "퍼센트",
  };

  let cleanedText = text.replace(
    /(\d+)\s*[-~]\s*(\d+)\s*(kg|g|km|m|cm|mm|ml|l|℃|°C|%|인치|도)?/g,
    (_, from, to, unit) =>
      `${from}에서 ${to}${unitMap[unit] ? " " + unitMap[unit] : unit || ""}`
  );

  cleanedText = cleanedText
    .replace(/([-]?\d+)\.(\d+)/g, "$1 점 $2")
    .replace(/[(){}\[\]<>]/g, "")
    .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  fetch("/get_tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: cleanedText }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("TTS 요청 실패");
      return res.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      ttsAudio.src = url;
      ttsAudio.muted = false;
      ttsAudio.play();
    })
    .catch((err) => console.error("TTS 오류:", err));
}
