<template>
  <section class="container">
    <div class="list-item" id="alpha">
      <div class="item-content"><span class="order">1</span> Alpha</div>
    </div>

    <div class="list-item" id="bravo">
      <div class="item-content"><span class="order">2</span> Bravo</div>
    </div>

    <div class="list-item" id="charlie">
      <div class="item-content"><span class="order">3</span> Charlie</div>
    </div>

    <div class="list-item" id="delta">
      <div class="item-content"><span class="order">4</span> Delta</div>
    </div>

    <div class="list-item" id="echo">
      <div class="item-content"><span class="order">5</span> Echo</div>
    </div>

    <div class="list-item" id="foxtrot">
      <div class="item-content"><span class="order">6</span> Foxtrot</div>
    </div>

    <div class="list-item" id="gulf">
      <div class="item-content"><span class="order">7</span> Gulf</div>
    </div>

    <div class="list-item" id="hotel">
      <div class="item-content"><span class="order">8</span> Hotel</div>
    </div>

    <div class="list-item" id="india">
      <div class="item-content"><span class="order">9</span> India</div>
    </div>
  </section>
</template>
<script setup>
import { Draggable } from "gsap/Draggable";

onMounted(() => {
  // List version
  // https://codepen.io/osublake/pen/jrqjdy/

  console.clear();

  let rowSize = 150;
  let colSize = 250;
  let totalRows = 3;
  let totalCols = 3;

  let clampCol = gsap.value.utils.clamp(0, totalCols - 1);
  let clampRow = gsap.value.utils.clamp(0, totalRows - 1);

  let cells = [];

  // Map cell locations to array
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      cells.push({
        row: row,
        col: col,
        x: col * colSize,
        y: row * rowSize,
      });
    }
  }

  let container = document.querySelector(".container");
  let listItems = gsap.value.utils.toArray(".list-item");
  let sortables = listItems.map(Sortable); // Array of sortables
  let total = sortables.length;

  gsap.value.to(container, { autoAlpha: 1, duration: 0.5 });

  function changeIndex(item, to, sameRow, sameCol) {
    // Check if adjacent to new position
    if ((sameRow && !sameCol) || (!sameRow && sameCol)) {
      // Swap positions in array
      var temp = sortables[to];
      sortables[to] = item;
      sortables[item.index] = temp;
    } else {
      // Change position in array
      arrayMove(sortables, item.index, to);
    }

    // Simple, but not optimized way to change element's position in DOM. Not always necessary.
    sortables.forEach((sortable) => container.appendChild(sortable.element));

    // Set index for each sortable
    sortables.forEach((sortable, index) => sortable.setIndex(index));
  }

  function Sortable(element, index) {
    let content = element.querySelector(".item-content");
    let order = element.querySelector(".order");

    let animation = gsap.value.to(content, {
      duration: 0.3,
      boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
      force3D: true,
      scale: 1.1,
      paused: true,
    });

    let dragger = new Draggable(element, {
      onDragStart: downAction,
      onRelease: upAction,
      onDrag: dragAction,
      cursor: "inherit",
    });

    // let position = element._gsTransform;
    let getProp = gsap.value.getProperty(element);

    // Public properties and methods
    let sortable = {
      cell: cells[index],
      dragger: dragger,
      element: element,
      index: index,
      setIndex: setIndex,
    };

    gsap.value.set(element, {
      x: sortable.cell.x,
      y: sortable.cell.y,
    });

    function setIndex(index) {
      let cell = cells[index];
      // var dirty = position.x !== cell.x || position.y !== cell.y;
      let dirty = getProp("x") !== cell.x || getProp("y") !== cell.y;

      sortable.cell = cell;
      sortable.index = index;
      order.textContent = index + 1;

      // Don't layout if you're dragging
      if (!dragger.isDragging && dirty) layout();
    }

    function downAction() {
      animation.play();
      this.update();
    }

    function dragAction() {
      let col = clampCol(Math.round(this.x / colSize));
      let row = clampRow(Math.round(this.y / rowSize));

      let cell = sortable.cell;
      let sameCol = col === cell.col;
      let sameRow = row === cell.row;

      // Check if position has changed
      if (!sameRow || !sameCol) {
        // Calculate the new index
        var index = totalCols * row + col;

        // Update the model
        changeIndex(sortable, index, sameRow, sameCol);
      }
    }

    function upAction() {
      animation.reverse();
      layout();
    }

    function layout() {
      gsap.value.to(element, {
        duration: 0.3,
        x: sortable.cell.x,
        y: sortable.cell.y,
      });
    }

    return sortable;
  }

  // Changes an elements's position in array
  function arrayMove(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }
});
</script>
<style>
html,
body {
  height: 100%;
}

body {
  cursor:
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png) 32 32,
    move;
  background: rgb(238, 238, 238);
  overflow: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

.container {
  position: relative;
  top: 50%;
  left: 50%;
  width: 750px;
  height: 450px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -50%);
  cursor:
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png), move;
  cursor:
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png) 32 32,
    move;
}

.list-item {
  position: absolute;
  top: 0;
  left: 0;
  height: 140px;
  width: 240px;
}

.item-content {
  height: 100%;
  border: 0px solid rgba(123, 123, 123, 0.498039);
  border-radius: 4px;
  color: rgb(153, 153, 153);
  line-height: 140px;
  padding-left: 32px;
  font-size: 24px;
  font-weight: 400;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
}
</style>
