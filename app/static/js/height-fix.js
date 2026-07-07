function setVh() {
  document.documentElement.style.setProperty(
    "—vh",
    `${window.innerHeight * 0.01}px`
  );
}


window.addEventListener("resize", setVh);
window.addEventListener("load", setVh);