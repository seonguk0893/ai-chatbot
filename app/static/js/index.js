function startExperiment() {
  const nameInput = document.getElementById("labName").value.trim();

  if (nameInput === "") {
    alert("이름을 입력해주세요!");
    return;
  }

  // 동적으로 팝업 생성
  const popup = document.createElement("div");
  popup.textContent = `${nameInput}님과 함께 챗봇을 만들어보아요!`;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "#4f79a7"; // 톤 맞춤 단색
  popup.style.color = "white";
  popup.style.padding = "20px 30px";
  popup.style.borderRadius = "12px";
  popup.style.fontSize = "20px";
  popup.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  // 2초 후 팝업 제거 + 입력 초기화 + 페이지 이동
  setTimeout(() => {
    popup.remove();
    document.getElementById("labName").value = "";
    window.location.href = "/quiz";
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
