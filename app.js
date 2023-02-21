const grid = document.querySelector(".grid-container");
const logo = document.querySelector(".logo");
const ratio = document.querySelector(".grid-ratio");
const slider = document.querySelector(".slider");
const rainbowMode = document.querySelector("#rainbow");
const eraserMode = document.querySelector("#eraser");
const gridLinesToggle = document.querySelector("#grid-lines");

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
logo.addEventListener("click", updateGrid);
slider.addEventListener("input", updateGrid);
rainbowMode.addEventListener("change", getRandomRGBVals);
eraserMode.addEventListener("change", draw);
gridLinesToggle.addEventListener("change", hideGridLines);

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
  gridLinesToggle.checked = false;
  deletePrevGrid();
  makeGrid(size);
}

function deletePrevGrid() {
  squares.forEach((square) => {
    square.remove();
  });
}

function draw(event) {
  // prevent user from dragging elements
  event.preventDefault();
  if (event.type === "mouseover" && !isDrawing) return;

  if (rainbowMode.checked) {
    event.target.style.backgroundColor = `rgb(${getRandomRGBVals()})`;
  } else if (eraserMode.checked) {
    event.target.style.backgroundColor = "#f7f1e3";
  } else {
    event.target.style.backgroundColor = "#34ace0";
  }
}

function hideGridLines() {
  squares.forEach((square) => {
    square.classList.toggle("hide-grid-lines");
  });
}

function getRandomRGBVals() {
  const rgb = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 255 + 1);
    rgb.push(randomNum);
  }
  return rgb.toString();
}
