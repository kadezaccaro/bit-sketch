// * create grid using divs
// * when user hovers over squares, change the background color
// * when user slides, display grid size in the following format: XX x XX
// TODO: when user slides, change grid size based on that slide position value
// only draw when the user is holding mouse down

const grid = document.querySelector(".grid-container");
const slider = document.querySelector(".slider");
const gridSize = document.querySelector(".grid-size");

let isDrawing = false;

window.addEventListener("load", createGrid());

function createGrid() {
  for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    div.setAttribute("data-number", `sq-${i}`);
    grid.appendChild(div);
  }
  draw();
}

// window.addEventListener("mousedown", () => {
//   isDrawing = true;
//   console.log(isDrawing);
// });
// window.addEventListener("mouseup", () => {
//   isDrawing = false;
//   console.log(isDrawing);
// });

function draw() {
  const squares = document.querySelectorAll(".square");
  //   if (!isDrawing) return;
  squares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "red";
    });
  });
}

// update value on slide - default: 16 x 16
slider.addEventListener("input", () => {
  gridSize.textContent = `${slider.value} x ${slider.value}`;
});
