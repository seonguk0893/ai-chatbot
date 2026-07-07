const quizData = [
  {
    question: "챗봇은 모든 질문에 정확하게 답할 수 있다.",
    answer: false,
    explain:
      "챗봇은 잘못된 정보를 말할 수 있기 때문에 항상 정답을 보장하지 않습니다.",
  },
  {
    question: "챗봇을 만들 때 안전어(필터링)를 설정할 수 있다.",
    answer: true,
    explain:
      "사용자가 부적절한 말을 차단할 수 있도록 필터링 기능을 설정할 수 있습니다.",
  },
  {
    question: "내가 만든 챗봇은 음성으로 대화하는 기능도 체험할 수 있다.",
    answer: true,
    explain: "음성인식 기능을 활용해 말로 챗봇과 대화할 수 있습니다.",
  },
  {
    question: "챗봇의 이름은 내가 직접 정할 수 없다.",
    answer: false,
    explain: "챗봇 이름은 사용자가 자유롭게 설정할 수 있습니다.",
  },
  {
    question: "챗봇이 잘못된 답을 하더라도 사용자가 이해해야 한다.",
    answer: true,
    explain:
      "AI는 항상 완벽하지 않기 때문에 사용자도 이해하고 조심히 활용해야 합니다.",
  },
];

let score = 0;
const container = document.getElementById("quiz-container");

quizData.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "quiz-card";

  card.innerHTML = `
        <div class="quiz-row">
          <div class="quiz-question">
            <span class="question-number">💬 ${index + 1}.</span>
            <span class="question-text">${item.question}</span>
          </div>
          <div class="ox-buttons">
            <button onclick="checkAnswer(${index}, true, this)">⭕</button>
            <button onclick="checkAnswer(${index}, false, this)">❌</button>
          </div>
        </div>
        <div class="feedback" id="feedback-${index}"></div>
      `;

  container.appendChild(card);
});

function checkAnswer(index, userAnswer, button) {
  const correct = quizData[index].answer === userAnswer;
  const feedback = document.getElementById(`feedback-${index}`);
  const buttons = feedback.previousElementSibling.querySelectorAll("button");

  if (correct) {
    // 모든 버튼 스타일 초기화 + 비활성화
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.backgroundColor = "";
      btn.style.color = "";
      btn.style.fontWeight = "";
      btn.style.boxShadow = "";
    });

    // 정답 버튼 강조
    button.style.backgroundColor = "#2ecc71"; // 초록
    button.style.color = "#fff";
    button.style.fontWeight = "bold";
    button.style.boxShadow = "0 0 8px #2ecc71";

    feedback.innerHTML = `✅ 정답입니다!<br>${quizData[index].explain}`;
    feedback.style.color = "green";
    score++;

    const allAnswered =
      [...document.querySelectorAll(".feedback")].filter(
        (fb) => fb.innerHTML !== ""
      ).length === quizData.length;

    if (allAnswered) {
      showResult();
    }
  } else {
    // 오답 버튼 스타일 강조
    button.style.backgroundColor = "#e74c3c"; // 빨강
    button.style.color = "#fff";
    button.style.fontWeight = "bold";
    button.style.boxShadow = "0 0 8px #e74c3c";

    // 오답 메시지만 출력
    feedback.innerHTML = `❌ 오답이에요! 다시 한 번 생각해 볼까요?`;
    feedback.style.color = "red";
  }
}

function showResult() {
  const resultDiv = document.getElementById("result");

  // 결과 메시지 출력
  resultDiv.innerHTML = `🎉 퀴즈 완료! 총 ${quizData.length}문제 중 ${score}개 맞췄어요!`;

  // 다음 버튼 생성
  const nextButton = document.createElement("button");
  nextButton.textContent = "다음 단계로";

  // 버튼 스타일 지정
  nextButton.style.marginTop = "20px";
  nextButton.style.padding = "12px 24px";
  nextButton.style.fontSize = "16px";
  nextButton.style.fontWeight = "bold";
  nextButton.style.color = "#fff";
  nextButton.style.backgroundColor = "#fca311";
  nextButton.style.border = "none";
  nextButton.style.borderRadius = "8px";
  nextButton.style.cursor = "pointer";
  nextButton.style.transition = "background-color 0.3s, transform 0.2s";

  // 마우스 오버 효과
  nextButton.addEventListener("mouseover", function () {
    nextButton.style.backgroundColor = "#e07a00";
    nextButton.style.transform = "scale(1.05)";
  });

  nextButton.addEventListener("mouseout", function () {
    nextButton.style.backgroundColor = "#fca311";
    nextButton.style.transform = "scale(1)";
  });

  // 클릭 시 card 페이지로 이동
  nextButton.addEventListener("click", function () {
    window.location.href = "/survey"; // 실제 이동할 파일 경로로 수정
  });

  // 버튼 추가
  resultDiv.appendChild(document.createElement("br"));
  resultDiv.appendChild(nextButton);
}

// 뒤로가기 버튼 시 페이지 초기화(클릭이벤트 초기화)
window.addEventListener("pageshow", function (event) {
  if (
    event.persisted ||
    window.performance.getEntriesByType("navigation")[0].type === "back_forward"
  ) {
    window.location.reload();
  }
});
