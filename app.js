const grid = document.querySelector(".grid-container");
const slider = document.querySelector(".slider");
const ratio = document.querySelector(".grid-ratio");

let squares;
let size = slider.value;

// ------ EVENT LISTENERS ------

window.addEventListener("load", makeGrid(size));
slider.addEventListener("input", updateGrid);

// ------ FUNCTIONS ------

function makeGrid(size) {
  const totalPixels = Math.pow(size, 2);
  for (let i = 0; i < totalPixels; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    div.setAttribute("data-number", `sq-${i}`);
    grid.appendChild(div);
  }
  squares = document.querySelectorAll(".square");
  draw();
}

function updateGrid() {
  size = slider.value;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  ratio.textContent = `${size} x ${size}`;
  deleteGrid();
  makeGrid(size);
}

function deleteGrid() {
  squares.forEach((square) => {
    square.remove();
  });
}

function draw() {
  squares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "black";
    });
  });
}
