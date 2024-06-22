const pfp = document.querySelector(".pfp");

// exponential smoothing functions from Nikita Lisitsa
// https://lisyarus.github.io/blog/posts/exponential-smoothing.html

let targetWidth = 6;
let currentWidth = 6;
const speed = 10;
const dt = 0.016; // assuming 60fps, dt = 1/60

function animate() {
  currentWidth += (targetWidth - currentWidth) * (1.0 - Math.exp(-speed * dt));
  pfp.style.width = `${currentWidth}rem`;
  requestAnimationFrame(animate);
}

pfp.addEventListener("mouseenter", () => {
  targetWidth = 12; // 3x the original width
});

pfp.addEventListener("mouseleave", () => {
  targetWidth = 6; // Original width
});

animate();

// drawing flying boxes
