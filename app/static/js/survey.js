document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("survey-form");
  const resultDiv = document.getElementById("survey-result");

  const questions = [
    "나는 컴퓨터나 태블릿을 활용하는 데 익숙하다.",
    "인터넷 검색을 통해 필요한 정보를 찾을 수 있다.",
    "나는 코딩(프로그래밍)에 대해 잘 알고 있다.",
    "블록코딩(예:엔트리,스크래치)을 해본 경험이 있다.",
    "블록코딩에서 간단한 프로그램을 직접 만들어 본 경험이 있다.",
    "내가 직접 코드를 수정하거나 추가하는 것이 어렵지 않다.",
    "AI(인공지능) 기술에 대해 기본적인 내용을 알고 있다.",
    "챗봇이나 음성 비서를 사용해 본 경험이 있다.",
    "새로운 디지털 도구를 배우는 것이 흥미롭다.",
    "나는 앞으로도 디지털 기술을 활용하는 학습에 적극적으로 참여하고 싶다.",
  ];

  const ol = form.querySelector("ol");
  questions.forEach((q, idx) => {
    const li = document.createElement("li");
    li.classList.add("survey-card");
    li.innerHTML = `
      <div class="survey-question">문항 ${idx + 1}: ${q}</div>
      <div class="options">
        <label><input type="radio" name="q${
          idx + 1
        }" value="5" required> <span>매우 그렇다</span></label>
        <label><input type="radio" name="q${
          idx + 1
        }" value="4"> <span>그렇다</span></label>
        <label><input type="radio" name="q${
          idx + 1
        }" value="3"> <span>보통</span></label>
        <label><input type="radio" name="q${
          idx + 1
        }" value="2"> <span>그렇지 않다</span></label>
        <label><input type="radio" name="q${
          idx + 1
        }" value="1"> <span>매우 그렇지 않다</span></label>
      </div>
    `;
    ol.appendChild(li);
  });

  // active 클래스 적용
  document.querySelectorAll(".options").forEach((optionGroup) => {
    optionGroup.addEventListener("click", (e) => {
      const label = e.target.closest("label");
      if (!label) return;

      // 같은 그룹에서 기존 active 제거
      optionGroup
        .querySelectorAll("label")
        .forEach((l) => l.classList.remove("active"));
      label.classList.add("active");
    });
  });

  function showGuidancePopup(message) {
    // 기존 팝업이 있다면 제거
    const existingPopup = document.getElementById("guidance-popup");
    if (existingPopup) existingPopup.remove();

    // 팝업 생성
    const popup = document.createElement("div");
    popup.id = "guidance-popup";
    popup.textContent = message;

    // 스타일 설정
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "rgba(255, 165, 0, 0.95)";
    popup.style.color = "white";
    popup.style.padding = "20px 30px";
    popup.style.fontSize = "22px";
    popup.style.fontWeight = "bold";
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
    popup.style.textAlign = "center";
    popup.style.zIndex = "9999";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease";

    document.body.appendChild(popup);

    // 부드럽게 나타나게
    setTimeout(() => {
      popup.style.opacity = "1";
    }, 10);

    // 2초 후 사라지게
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 300);
    }, 2000);
  }

  // 설문 제출 이벤트
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let totalScore = 0;

    for (let [name, value] of formData.entries()) {
      totalScore += parseInt(value);
    }

    resultDiv.textContent = `총점 ${totalScore}점입니다~`;

    // 안내 메시지 표시
    if (totalScore >= 35) {
      showGuidancePopup("심화 버전으로 챗봇 만들기를 시작합니다!");
    } else {
      showGuidancePopup("기본 버전으로 챗봇 만들기를 시작합니다!");
    }

    localStorage.setItem("quizScore", totalScore);

    // 2초 후 카드 페이지로 이동
    setTimeout(() => {
      window.location.href = "/card"; // 실제 카드 페이지 경로로 변경
    }, 3000);
  });
});
