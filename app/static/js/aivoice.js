document.getElementById("end-button").addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.classList.add("dim-overlay");
  document.body.appendChild(overlay);

  const popup = document.createElement("div");
  popup.classList.add("exit-popup");
  popup.textContent = "체험을 종료합니다. 수고하셨어요! 😊";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
    overlay.remove();
    window.location.href = "/";
  }, 3000); // 5초 후 이동
});

function selectCharacter(num) {
  const img = document.getElementById("character-img");
  img.src = `static/images/character${num}.png`;
  localStorage.setItem("selectedCharacter", num);

  const selectionBox = document.getElementById("character-selection");
  selectionBox.classList.add("fade-out");
  selectionBox.classList.remove("fade-in");

  setTimeout(() => {
    selectionBox.style.display = "none";
  }, 600);
}

function showCharacterSelection() {
  const selectionBox = document.getElementById("character-selection");
  selectionBox.style.display = "block";

  // 리플레이 애니메이션을 위해 클래스 재설정
  setTimeout(() => {
    selectionBox.classList.remove("fade-out");
    selectionBox.classList.add("fade-in");
  }, 10);
}

window.addEventListener("DOMContentLoaded", () => {
  const selected = localStorage.getItem("selectedCharacter") || 1;
  document.getElementById(
    "character-img"
  ).src = `static/images/character${selected}.png`;
});

const OLLAMA_API_URL = "/send_message";

document.addEventListener("DOMContentLoaded", function () {
  const voiceButton = document.getElementById("voice-input");

  voiceButton.addEventListener("click", startVoiceRecognition);
});

// 음성 인식 함수
const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "ko-KR";

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  console.log("음성 인식 결과:", transcript);
  sendMessage(transcript);
};

recognition.onerror = function (event) {
  console.error("음성 인식 오류:", event.error);
};

function startVoiceRecognition() {
  const voiceButton = document.getElementById("voice-input");

  // 음성 인식 시작 시 버튼에 active 클래스 추가
  voiceButton.classList.add("active");

  recognition.start(); // 음성 인식 시작
}

recognition.onend = function () {
  const voiceButton = document.getElementById("voice-input");

  // 음성 인식 종료 시 버튼에서 active 클래스 제거
  voiceButton.classList.remove("active");
};

function sendMessage(userInput) {
  if (!userInput) return;

  // "대답 생성 중..." 메시지 표시
  const loadingMessage = document.getElementById("loading-message");
  loadingMessage.innerHTML =
    '<span id="loading"></span> <div id="load">대답을 생성중입니다.</div>';
  loadingMessage.style.display = "block";

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

      let cleanText = botReply
        .replace(/<br>/g, "\n")
        .replace(/<\/?a[^>]*>/g, "");

      let lines = cleanText
        .split("\n")
        .filter((line) => line.trim() !== "" && !line.includes("🔗"));

      let finalText = lines.join(". ");

      finalText = finalText
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
        .trim();

      console.log("챗봇 응답:", finalText);

      playTTS(finalText);

      // "대답 생성 중..." 메시지 숨기기
      setTimeout(() => {
        loadingMessage.style.display = "none";
      }, 500);
    })
    .catch((error) => {
      loadingMessage.textContent = "⚠️ 오류 발생: " + error;
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
