// create Grid

const grid = document.querySelector(".grid");

function createGrid(dimension) {
  let container = document.createElement("div");
  container.className = "container";
  grid.removeChild(grid.lastChild);
  for (let i = 0; i < dimension; i++) {
    let parent = document.createElement("div");
    parent.className = "grid-parent";

    for (let j = 0; j < dimension; j++) {
      let child = document.createElement("div");
      child.className = "grid-box";
      parent.appendChild(child);
    }
    container.appendChild(parent);
  }
  grid.appendChild(container);
}
