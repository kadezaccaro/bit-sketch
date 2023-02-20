const grid = document.querySelector(".grid-container");
const slider = document.querySelector(".slider");
const ratio = document.querySelector(".grid-ratio");
const gridLineToggle = document.querySelector("#grid-line-toggle");
const rgbToggle = document.querySelector("#rgb-toggle");

let squares;
let size = slider.value;
let isDrawing = false;

// ------ EVENT LISTENERS ------

window.addEventListener("load", makeGrid(size));
window.addEventListener("mousedown", () => {
  isDrawing = true;
});
window.addEventListener("mouseup", () => {
  isDrawing = false;
});
slider.addEventListener("input", updateGrid);
gridLineToggle.addEventListener("change", hideGridLines);
rgbToggle.addEventListener("change", getRandomRGBVals);

// ------ FUNCTIONS ------

function makeGrid(size) {
  const totalPixels = Math.pow(size, 2);
  for (let i = 0; i < totalPixels; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("data-number", `sq-${i}`);
    square.addEventListener("mouseover", draw);
    square.addEventListener("mousedown", draw);
    grid.appendChild(square);
  }
  squares = document.querySelectorAll(".square");
}

function updateGrid() {
  size = slider.value;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  ratio.textContent = `${size} x ${size}`;
  resetGridLines();
  deleteGrid();
  makeGrid(size);
}

function deleteGrid() {
  squares.forEach((square) => {
    square.remove();
  });
}

function draw(event) {
  // prevent user from dragging elements
  event.preventDefault();
  if (event.type === "mouseover" && !isDrawing) return;
  if (rgbToggle.checked) {
    event.target.style.backgroundColor = `rgb(${getRandomRGBVals()})`;
  } else {
    event.target.classList.add("colorize");
  }
}

function hideGridLines() {
  squares.forEach((square) => {
    square.classList.toggle("hide-grid-lines");
  });
}

function resetGridLines() {
  gridLineToggle.checked = false;
}

function getRandomRGBVals() {
  const rgb = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 255 + 1);
    rgb.push(randomNum);
  }
  return rgb.toString();
}
