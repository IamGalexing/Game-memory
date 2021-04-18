const cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector(".reset");

let isFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

mixCards();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!isFlippedCard) {
    isFlippedCard = true;
    firstCard = this;
    return;
  }

  isFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  return firstCard.dataset.framework === secondCard.dataset.framework
    ? disableCards()
    : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [isFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function mixCards() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));
resetBtn.addEventListener("click", () => {
  cards.forEach((card) => {
    card.classList.remove("flip");
    resetBoard();
  });
  setTimeout(mixCards, 600);
});
