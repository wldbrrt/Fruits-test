function calculateCenter(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function calculateConnectingLinePosition(firstBlockCenter, secondBlockCenter, line) {
  const lineLength = Math.sqrt(
    Math.pow(secondBlockCenter.x - firstBlockCenter.x, 2) +
      Math.pow(secondBlockCenter.y - firstBlockCenter.y, 2)
  );

  const angle =
    (Math.atan2(
      secondBlockCenter.y - firstBlockCenter.y,
      secondBlockCenter.x - firstBlockCenter.x
    ) *
      180) /
    Math.PI;

  line.style.width = lineLength + "px";
  line.style.left = firstBlockCenter.x + "px";
  line.style.top = firstBlockCenter.y - 5 + "px";
  line.style.transformOrigin = "0 0";
  line.style.transform = "rotate(" + angle + "deg)";
}

function rotateConnectingLine () {
    const block1 = document.querySelector(".fruit-01");
    const block2 = document.querySelector(".fruit-02");
    const block3 = document.querySelector(".fruit-03");
    const line = document.querySelector(".line-01");
    const line2 = document.querySelector(".line-02");
    const line3 = document.querySelector(".line-03");

    const center1 = calculateCenter(block1);
    const center2 = calculateCenter(block2);
    const center3 = calculateCenter(block3);

    calculateConnectingLinePosition(center1, center2, line);
    calculateConnectingLinePosition(center2, center3, line2);
    calculateConnectingLinePosition(center3, center1, line3);
}

function addElementsOnLine(
  parents,
  element,
  ammount,
  isLines = false,
  color = "white"
) {
  if (ammount <= 0) return;

  parents.forEach((el, ind) => {
    for (let i = 0; i < ammount; i++) {
      const clonedElement = element.cloneNode(true);
      if (isLines && color) {
        clonedElement.classList.add(color);
      } else if (i % 2 === 0) {
        clonedElement.classList.add("orange");
      }
      el.appendChild(clonedElement);
    }
  });
}

function rotateElements(
  parents,
  element,
  ammount,
  duration,
  isLines = false,
  color = "white"
) {
  addElementsOnLine(parents, element, ammount, isLines, color);
  parents.forEach((el) => {
    const keyframes = [
      { transform: "translateX(0%)" },
      { transform: `translateX(-100%)` },
    ];

    const options = {
      duration: duration,
      iterations: Infinity,
      easing: "linear",
    };

    el.animate(keyframes, options);
  });
}

function launchAnimation ()  {
    const sublines1 = document.querySelectorAll(".subline-01");
    const sublines2 = document.querySelectorAll(".subline-02");
    const sublines3 = document.querySelectorAll(".subline__child-01");
    const sublines4 = document.querySelectorAll(".subline__child-02");
  
    const movingCircle = document.createElement("div");
    movingCircle.classList.add("line__circle");
    const movingSquare = document.createElement("div");
    movingSquare.classList.add("line__square");
    const movingLine = document.createElement("div");
    movingLine.classList.add("line__line");
  
    rotateConnectingLine()
  
    rotateElements(sublines1, movingCircle, 8, 3000);
    rotateElements(sublines2, movingSquare, 8, 3000);
    rotateElements(sublines3, movingLine, 8, 3000, true);
    rotateElements(sublines4, movingLine, 8, 3000, true, "orange");
}

window.onload = launchAnimation

 window.onresize = rotateConnectingLine
