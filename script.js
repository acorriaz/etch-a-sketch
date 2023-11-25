const DEFAULT_MODE = "rainbow";
const DEFAULT_COLOR = "#f7ecc5";
const DEFAULT_BGCOLOR = "#2e2e2e33";

let userColor = DEFAULT_COLOR;
let userMode = DEFAULT_MODE;
let previousMode;
let grid;
let isBorder = 1;

let isMouseDown = false;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

const pickerColorElem = document.querySelector(".color-picker");
const rainbowColorElem = document.querySelector(".rainbow");
const bwColorElem = document.querySelector(".bw");
const eraserElem = document.querySelector(".eraser");
const clearGridElem = document.querySelector(".clear");
const borderElem = document.querySelector(".border-toggle");
const gridContainerElem = document.querySelector(".grid");
const gridDimensionInputElem = document.querySelector(".dimension-input");
const dimensionTextElem = document.querySelector(".dimension");
const indicatorElem = document.querySelector(".color-picker-indicator");

pickerColorElem.addEventListener("input", () => assignUserMode("picker"));
bwColorElem.addEventListener("click", () => assignUserMode("bw"));
rainbowColorElem.addEventListener("click", () => assignUserMode("rainbow"));
eraserElem.addEventListener("click", () => assignUserMode("eraser"));

function assignUserMode(btnClick) {
  previousMode = userMode;
  userMode = btnClick;
  activeButton(`${userMode}`);
}

function activeButton(btnActive) {
  if (btnActive === "bw") {
    bwColorElem.classList.add("active");
  } else if (btnActive === "rainbow") {
    rainbowColorElem.classList.add("active");
  } else if (btnActive === "eraser") {
    eraserElem.classList.add("active");
  } else if (btnActive === "picker") {
    indicatorElem.classList.add("unhide");
  }

  if (previousMode === userMode) return;

  if (previousMode === "bw") {
    bwColorElem.classList.remove("active");
  } else if (previousMode === "rainbow") {
    rainbowColorElem.classList.remove("active");
  } else if (previousMode === "eraser") {
    eraserElem.classList.remove("active");
  } else if (previousMode === "picker") {
    indicatorElem.classList.remove("unhide");
  }
}

gridDimensionInputElem.addEventListener("input", () => {
  changeDimensionText();
  createGrid(gridDimensionInputElem.value);
});

function changeDimensionText() {
  dimensionTextElem.textContent = `${gridDimensionInputElem.value} X ${gridDimensionInputElem.value}`;
}

function createGrid(dimension) {
  let container = document.createElement("div");
  container.className = "container";
  gridContainerElem.removeChild(gridContainerElem.lastChild);
  for (let i = 0; i < dimension; i++) {
    let parent = document.createElement("div");
    parent.className = "grid-parent";

    for (let j = 0; j < dimension; j++) {
      let child = document.createElement("div");
      child.className = "grid-box";
      child.style.backgroundColor = `${DEFAULT_BGCOLOR}`;
      child.addEventListener("mousedown", changeColor);
      child.addEventListener("mouseover", changeColor);
      if (isBorder === 1) {
        child.classList.add("border");
      }
      parent.appendChild(child);
    }
    container.appendChild(parent);
  }
  gridContainerElem.appendChild(container);
  grid = document.querySelectorAll(".grid-box");
}

function changeColor(e) {
  if (isMouseDown || e.type === "mousedown") {
    if (userMode === "picker") {
      userColor = pickerColorElem.value;
      e.target.style.backgroundColor = userColor;
    } else if (userMode === "rainbow") {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (userMode === "eraser") {
      e.target.style.backgroundColor = `${DEFAULT_BGCOLOR}`;
    } else if (userMode === "bw") {
      const randomBW = Math.floor(Math.random() * 2);
      console.log(randomBW);
      if (randomBW === 1) {
        e.target.style.backgroundColor = "#000000";
      } else {
        e.target.style.backgroundColor = "#FFFFFF";
      }
    }
  }
}

clearGridElem.addEventListener("click", resetGrid);

function resetGrid() {
  createGrid(gridDimensionInputElem.value);
}

borderElem.addEventListener("click", borderToggle);

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

window.onload = activeButton(DEFAULT_MODE);
window.onload = createGrid(16);
window.onload = changeDimensionText(16);
