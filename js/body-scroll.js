/***
 * Scroll Body
 ***/
const body = document.body;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";

let lastScroll = 0;

const scrollPosDiv = document.getElementById('scrollPos');
let scrollPosVisibleTimer = null;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = currentScroll / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  scrollPosDiv.style.width = scrollPercentRounded + 'vw';
  scrollPosDiv.classList.add('visible');

  clearTimeout(scrollPosVisibleTimer);
  scrollPosVisibleTimer = setInterval(() => {
    scrollPosDiv.classList.remove('visible');
  }, 800)

  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDown)
  ) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});