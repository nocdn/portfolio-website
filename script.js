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

// apply effect on page load
window.onload = () => {
  const initialHeader = document.querySelector(
    ".content:not(.hidden-content) h1"
  );
  applyHackedEffect(initialHeader);
};

document.addEventListener("keydown", (e) => {
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
    contentPages[newIndex].classList.remove("hidden-content");

    // apply effect when new content page is loaded
    const newHeader = contentPages[newIndex].querySelector("h1");
    applyHackedEffect(newHeader);
  }
});

function showCommandOutputs() {
  const commandOutputs = document.querySelectorAll(".command-output");
  for (let i = 0; i < commandOutputs.length; i++) {
    setTimeout(() => {
      commandOutputs[i].style.opacity = 1;
    }, i * 150);
  }
}

function writeCommand() {
  const commandPrompt = document.querySelector(".shell-prompt");
  let promptTextContent = commandPrompt.textContent;
  // const fullCommand = " ./skills.sh";
  const fullCommand = [" ./", "skills", ".sh"];

  for (let i = 0; i < fullCommand.length; i++) {
    setTimeout(() => {
      promptTextContent = promptTextContent + fullCommand[i];
      commandPrompt.textContent = promptTextContent;
    }, i * 100);
  }

  setTimeout(showCommandOutputs, 600);
}

setTimeout(writeCommand, 1500);
