const sidebarItems = document.querySelectorAll(".sidebar-item");
const contentPages = document.querySelectorAll(".content");

console.log(sidebarItems);
console.log(contentPages);

sidebarItems[0].innerText = `> ${sidebarItems[0].innerText}`;
sidebarItems[0].classList.add("sidebar-selected");
contentPages[0].classList.remove("hidden-content");

// Function to apply the hacked letters effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval; // No need to initialize here since it's reassigned

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

// Apply the effect on page load
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
      // Sidebar update
      sidebarItems[selectedItemIndex].innerText =
        sidebarItems[selectedItemIndex].innerText.slice(2);
      sidebarItems[selectedItemIndex].classList.remove("sidebar-selected");
      newIndex = (selectedItemIndex + 1) % sidebarItems.length;
      sidebarItems[
        newIndex
      ].innerText = `> ${sidebarItems[newIndex].innerText}`;
      sidebarItems[newIndex].classList.add("sidebar-selected");
    } else if (e.key === "ArrowUp") {
      // Sidebar update
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

    // Apply the effect when a new content page is loaded
    const newHeader = contentPages[newIndex].querySelector("h1");
    applyHackedEffect(newHeader);
  }
});
