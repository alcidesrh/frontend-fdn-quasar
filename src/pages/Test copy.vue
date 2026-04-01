<template>
  <div class="test">
    <section class="dragContainer">
      <div class="list-item-drag">
        <div class="item-content"><span class="order">1</span> Alpha</div>
      </div>

      <div class="list-item-drag">
        <div class="item-content"><span class="order">2</span> Bravo</div>
      </div>
    </section>
    <section class="dragContainer">
      <div class="list-item-drag">
        <div class="item-content"><span class="order">1</span> Charlie</div>
      </div>

      <div class="list-item-drag">
        <div class="item-content"><span class="order">2</span> Delta</div>
      </div>
    </section>
    <section class="dragContainer">
      <div class="list-item-drag">
        <div class="item-content"><span class="order">1</span> Echo</div>
      </div>

      <div class="list-item-drag">
        <div class="item-content"><span class="order">2</span> Foxtrot</div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { Draggable } from "gsap/Draggable";
const { greensock } = useGsap();
const rowSize = 100; // => container height / number of items
const containers = [];

containers.get = (i) => containers[i];

onMounted(() => {
  Array.from(document.querySelectorAll(".dragContainer")).forEach((node) => {
    let container;

    containers.push((container = createContainer(node)));

    Array.from(node.children).forEach((child) => {
      container.insertItem(child);
    });

    container.indexItems();
  });
});
function createContainer(element) {
  let index = containers.length;
  let sortables = []; // Array of sortables
  let container = {
    index: index,
    element: element,
    sortables: sortables,
    indexItems: indexItems,
    insertItem: insertItem,
  };

  greensock.to(element, 0.5, { autoAlpha: 1 });

  function indexItems() {
    sortables.forEach((s, i) => s.setIndex(i));
  }

  function insertItem(node) {
    container.sortables.push(
      Sortable(node, container.sortables.length, container.index),
    );
  }

  return container;
}

function changeIndex(item, to) {
  let container = containers.get(item.col);

  // Change position in array
  arrayMove(container.sortables, item.index, to);

  // Set index for each sortable
  container.indexItems();
}

function Sortable(element, index, col) {
  var content = element.querySelector(".item-content");
  var order = element.querySelector(".order");

  var animation = greensock.to(content, 0.3, {
    boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
    force3D: true,
    scale: 1.1,
    paused: true,
  });

  var dragger = new Draggable(element, {
    onDragStart: onDragStart,
    onRelease: onRelease,
    onDrag: onDrag,
    cursor: "inherit",
    type: "x,y",
  });

  // Public properties and methods
  var sortable = {
    dragger: dragger,
    element: element,
    index: index,
    col: col,
    setIndex: setIndex,
  };

  greensock.set(element, { y: index * rowSize, x: 0 });

  function setIndex(index) {
    sortable.index = index;
    order.textContent = index + 1;

    // Don't layout if you're dragging
    if (!dragger.isDragging) layout();
  }

  function onDragStart() {
    sortable.initCol = sortable.col;
    animation.play();
    this.update();
  }

  function onDrag() {
    let container = containers.get(sortable.col);
    let last = container;

    containers.forEach((c) => {
      if (c !== container && this.hitTest(c.element, "51%")) {
        container = c;
        sortable.col = c.index;
      }
    });

    if (container !== last) {
      // Remove the sortable from the last container;
      last.sortables.splice(sortable.index, 1);

      // Make sure we do not insert the sortable at an index higher than the next containers length...
      // Otherwise Natively Javascript will insert an 'undefined' value for every value between the containers length and the new item
      if (sortable.index > container.sortables.length - 1) {
        sortable.index = container.sortables.length;
      }

      // After the proper sortable index is set... insert the sortable into the new containers list
      container.sortables.splice(sortable.index, 0, sortable);

      // Re index the last containers items, so that the empty space is removed
      last.indexItems();

      // Next we want to append the dragging target to the new container, However there are special steps we must follow,
      // in order to keep the drag target's position

      if (container.element !== sortable.element.parentNode) {
        container.element.appendChild(sortable.element);
        this.endDrag();

        // compensate for the directional shift in X.
        const width = sortable.element.clientWidth;
        const newX =
          container.index < last.index ? width - width / 2 : width / 2 - width;
        const newY = this.y;
        // Not sure why I have to set values to 0... the to the correct value,
        // If I do not do this, it does not work for me.
        greensock.set(sortable.element, { x: 0, y: 0 });
        greensock.set(sortable.element, { x: newX, y: newY });

        this.startDrag(this.pointerEvent);
      }
    }

    // Calculate the current index based on element's position
    var index = clamp(
      Math.round(this.y / rowSize),
      0,
      container.sortables.length - 1,
    );

    if (index !== sortable.index) {
      changeIndex(sortable, index);
    }
  }

  function onRelease() {
    animation.reverse();

    if (sortable.initCol !== sortable.col) {
      let container = containers.get(sortable.col);
      container.indexItems();
    } else {
      layout();
    }
  }

  function layout() {
    greensock.to(element, 0.3, { y: sortable.index * rowSize, x: 0 });
  }

  return sortable;
}

// Changes an elements's position in array
function arrayMove(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

// Clamps a value to a min/max
function clamp(value, a, b) {
  return value < a ? a : value > b ? b : value;
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
}

// body {
//   cursor:
//     url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png") 32 32,
//     auto;
//   background: $surface-6;
//   overflow: hidden;
// }

*,
*:before,
*:after {
  box-sizing: border-box;
}

.test {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dragContainer {
  box-shadow: 0 10px 20px -6px rgba(0, 0, 0, 0.2);
  flex: 1 0 auto;
  position: relative;
  width: 320px;
  max-width: 320px;
  margin: 0 auto;
  height: 400px;
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  background: $surface-4;

  /* // transform: translate(-50%, -50%); */
}

.list-item-drag {
  position: absolute;
  top: 0;
  left: 0;
  height: 90px;
  width: 100%;
}

.item-content {
  height: 100%;
  border: 0px solid rgba(123, 123, 123, 0.498039);
  border-radius: 4px;
  color: rgb(153, 153, 153);
  line-height: 90px;
  padding-left: 32px;
  font-size: 24px;
  font-weight: 400;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
}
// }
</style>
