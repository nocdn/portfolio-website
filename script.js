const sidebarItems = document.querySelectorAll(".sidebar-item");
const contentPages = document.querySelectorAll(".content");

console.log(sidebarItems);
console.log(contentPages);

sidebarItems[0].innerText = `> ${sidebarItems[0].innerText}`;
sidebarItems[0].classList.add("sidebar-selected");
contentPages[0].classList.remove("hidden-content");

// Hacked letters effect from Hyperplexed on YT
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval;

function applyHackedEffect(h1Element) {
  if (!h1Element.dataset.value) {
    h1Element.dataset.value = h1Element.innerText;
  }

  let iteration = 0;
  clearInterval(interval);

  interval = setInterval(() => {
    h1Element.innerText = h1Element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return h1Element.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= h1Element.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 15);
}

let firstLoadTimeout;
let firstLoad = true;
let hintElement;

function resetFirstLoadTimeout() {
  if (firstLoad) {
    clearTimeout(firstLoadTimeout);
    firstLoadTimeout = setTimeout(() => {
      console.log("No movement");
      hintElement = document.createElement("div");
      hintElement.style.height = "8rem";
      hintElement.style.opacity = "0";
      hintElement.style.transition = "opacity 0.5s ease-out";
      hintElement.innerHTML = `<div
      class="hint-container"
      style="width: 100%; display: grid; grid-template-columns: 5% 65% 30%; column-gap: 1rem; padding-right: 2rem; font-size: 0.75rem; margin-top: 2rem;"
      >
      <div class="arrows-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
          />
        </svg>
      </div>
      <p class="hint-instructions">Use the up and down arrows to navigate</p>
      </div>`;
      const sideBarNav = document.querySelector(".sidebar-nav");

      sideBarNav.appendChild(hintElement);
      setTimeout(() => {
        hintElement.style.opacity = "0.5";
      }, 20);

      firstLoad = false;
    }, 8000);
  }
}

document.addEventListener("keydown", (e) => {
  resetFirstLoadTimeout();
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    let selectedItemIndex;

    for (let i = 0; i < sidebarItems.length; i++) {
      if (sidebarItems[i].classList.contains("sidebar-selected")) {
        selectedItemIndex = i;
        break;
      }
    }

    let newIndex;

    if (e.key === "ArrowDown") {
      // sidebar update
      sidebarItems[selectedItemIndex].innerText =
        sidebarItems[selectedItemIndex].innerText.slice(2);
      sidebarItems[selectedItemIndex].classList.remove("sidebar-selected");
      newIndex = (selectedItemIndex + 1) % sidebarItems.length;
      sidebarItems[
        newIndex
      ].innerText = `> ${sidebarItems[newIndex].innerText}`;
      sidebarItems[newIndex].classList.add("sidebar-selected");
    } else if (e.key === "ArrowUp") {
      // sidebar update
      sidebarItems[selectedItemIndex].innerText =
        sidebarItems[selectedItemIndex].innerText.slice(2);
      sidebarItems[selectedItemIndex].classList.remove("sidebar-selected");
      newIndex =
        selectedItemIndex === 0
          ? sidebarItems.length - 1
          : selectedItemIndex - 1;
      sidebarItems[
        newIndex
      ].innerText = `> ${sidebarItems[newIndex].innerText}`;
      sidebarItems[newIndex].classList.add("sidebar-selected");
    }

    // Content update
    contentPages[selectedItemIndex].classList.add("hidden-content");
    contentPages[selectedItemIndex].classList.remove("shown-content");
    contentPages[newIndex].classList.remove("hidden-content");
    contentPages[newIndex].classList.add("shown-content");

    // apply effect when new content page is loaded
    const newHeader = contentPages[newIndex].querySelector("h1");
    applyHackedEffect(newHeader);

    // Remove the hint element if it exists
    if (hintElement && hintElement.parentNode) {
      hintElement.parentNode.removeChild(hintElement);
    }
  }
});

window.onload = () => {
  const initialHeader = document.querySelector(
    ".content:not(.hidden-content) h1"
  );
  applyHackedEffect(initialHeader);
  resetFirstLoadTimeout();
};
