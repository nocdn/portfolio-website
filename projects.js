document.addEventListener("contentIndexEvent", (event) => {
  console.log(event.detail.message);
  if (event.detail.message === 1) {
    const projectCards = document.querySelectorAll(".project-card");
    for (let i = 0; i < projectCards.length; i++) {
      setTimeout(() => {
        projectCards[i].style.opacity = 1;
      }, 150 + i * 200);
    }
  }
});
