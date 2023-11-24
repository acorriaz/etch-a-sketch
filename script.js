const pickerColor = document.querySelector(".color-picker");
const rainbowColor = document.querySelector(".color-picker");
const bwColor = document.querySelector(".color-picker");
const eraser = document.querySelector(".eraser");
const clearGrid = document.querySelector(".clear");
const border = document.querySelector(".border-toggle");
const gridContainer = document.querySelector(".grid");
const gridDimensionInput = document.querySelector(".dimension-input");
const dimensionText = document.querySelector(".dimension");
let grid;
let isBorder = 1;

function changeDimensionText() {
  dimensionText.textContent = `${gridDimensionInput.value} X ${gridDimensionInput.value}`;
}

function createGrid(dimension) {
  let container = document.createElement("div");
  container.className = "container";
  gridContainer.removeChild(gridContainer.lastChild);
  for (let i = 0; i < dimension; i++) {
    let parent = document.createElement("div");
    parent.className = "grid-parent";

    for (let j = 0; j < dimension; j++) {
      let child = document.createElement("div");
      child.className = "grid-box";
      if (isBorder === 1) {
        child.classList.add("border");
      }
      parent.appendChild(child);
    }
    container.appendChild(parent);
  }
  gridContainer.appendChild(container);
  grid = document.querySelectorAll(".grid-box");
}

function borderToggle() {
  if (isBorder === 0) {
    ++isBorder;
    grid.forEach((element) => {
      element.classList.add("border");
    });
  } else {
    --isBorder;
    grid.forEach((element) => {
      element.classList.remove("border");
    });
  }
}

border.addEventListener("click", borderToggle);

gridDimensionInput.addEventListener("input", () => {
  changeDimensionText();
  createGrid(gridDimensionInput.value);
});

window.onload = createGrid(16);
