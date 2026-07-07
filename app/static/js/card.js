// 모든 이미지 버튼에 클릭 이벤트 추가
document.querySelectorAll(".image-button").forEach((button, index) => {
  button.addEventListener("click", () => {
    const cardId = index + 1;
    const cardTitle = `카드${cardId}`;
    const selectedImage = button.querySelector("img").src;

    // localStorage에 카드 정보 저장
    localStorage.setItem("selectedCardId", cardId);
    localStorage.setItem("selectedCardTitle", cardTitle);
    localStorage.setItem("selectedImage", selectedImage);

    // 선택 스타일 적용 및 이름 입력 폼 표시
    document
      .querySelectorAll(".image-button")
      .forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    document.getElementById("name-start-container").style.display = "flex";
  });
});

// 시작 버튼 클릭 시 처리
function startExperience() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("이름을 입력해주세요!");
    return;
  }

  // 예쁜 팝업 (기본 alert 대체)
  const popup = document.createElement("div");
  popup.textContent = `${username}챗봇과, 체험을 시작합니다!`;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "#fca311";
  popup.style.color = "white";
  popup.style.padding = "20px 30px";
  popup.style.borderRadius = "12px";
  popup.style.fontSize = "20px";
  popup.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  // 2초 후 자동으로 사라짐
  setTimeout(() => {
    popup.remove();

    const score = parseInt(localStorage.getItem("quizScore")) || 0;
    if (score >= 35) {
      window.location.href = "/chatbot2"; // 심화버전
    } else {
      window.location.href = "/chatbot1"; // 기본버전
    }
  }, 2000);
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
