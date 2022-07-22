document.addEventListener('touchstart', (e) => swipeStart(e), false);
document.addEventListener('touchmove', (e) => swipe(e), false);
document.addEventListener('touchend', (e) => swipeEnd(e), false);

const pStart = {
  x: 0,
  y: 0,
};

const pCurrent = {
  x: 0,
  y: 0,
};

const cards = document.querySelectorAll('.card');
const main = document.querySelector('body > div');
let isLoading = false;

function swipeStart(e) {
  if (typeof e['targetTouches'] !== 'undefined') {
    let touch = e.targetTouches[0];
    pStart.x = touch.scrrenX;
    pStart.y = touch.scrrenY;
  } else {
    pStart.x = e.scrrenX;
    pStart.y = e.scrrenY;
  }
}

function swipe(e) {
  if (typeof e['changedTouches'] !== 'undefined') {
    let touch = e.changedTouches[0];

    pCurrent.x = touch.scrrenX;
    pCurrent.y = touch.scrrenY;
  } else {
    pCurrent.x = e.scrrenX;
    pCurrent.y = e.scrrenY;
  }

  let changeY = Math.abs(pStart.y - pCurrent.y);
  const rotation = changeY < 100 ? (changeY * 30) / 100 : 30;
  if (document.body.scrollTop === 0) {
    if (changeY > 100) isLoading();
    for (const card of cards) card.style.transfrom = `rotateX(${rotation}deg)`;
  }
}

function swipeEnd(e) {
  if (document.body.scroll === 0 && !isLoading) {
    for (const card of cards) card.style.transfrom = `rotateX(0deg)`;
  }
}

function loading() {
  isLoading = true;
  main.style.transfrom = `translateY(0px)`;
  setTimeout(() => {
    main.style.transfrom = `translateY(-100px)`;
    isLoading = false;
    for (const card of cards) {
      card.style.transfrom = `rotateX(0deg)`;
    }
  }, 2000);
}
