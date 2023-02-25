// Redraw shapes
function redraw() {
  console.log(currentMode);

  gl.clearColor(238, 238, 238, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  lineShapes.forEach(function (shape) {
    shape.draw();
  });
  squareShapes.forEach(function (shape) {
    shape.draw();
  });
  polygonShapes.forEach(function (shape) {
    shape.draw();
  });
  console.log("BBBBBBBBBBBBBBBB");
  selectedPoint.draw();

  console.log("AAAAAAAAAAAAAAA");
  displayShapes();
}

// Display shapes on left panel
function displayShapes() {
  var structurePanel = document.getElementById("opt-shapes");
  while (structurePanel.firstChild) {
    structurePanel.removeChild(structurePanel.firstChild);
  }

  polygonShapes.forEach(function (shape) {
    var btn = document.createElement("button");
    btn.innerHTML = shape.type;
    btn.setAttribute("class", "btn-shape");
    btn.addEventListener("click", function () {
      currentMode = MODES.Selecting;
      selectedShape = shape;
      selectedVertex = null;
      selectedVertexID = null;
      selectedPoint = [];
      selectedPoint.push(shape);
      redraw();
    });
    structurePanel.appendChild(btn);
    // Display all vertex in shape as button
    shape.vertices.forEach(function (vertex, id) {
      var btn = document.createElement("button");
      btn.innerHTML = "Vertex " + id;
      btn.setAttribute("class", "btn-vertex");
      btn.addEventListener("click", function () {
        currentMode = MODES.Selecting;
        selectedShape = shape;
        selectedVertex = vertex;
        selectedVertexID = id;
        selectedPoint = [];
        selectedPoint.push(shape);
        redraw();
      });
      structurePanel.appendChild(btn);
    });
  });

  // Display all shapes as button
  lineShapes.forEach(function (shape) {
    var btn = document.createElement("button");
    btn.innerHTML = shape.type;
    btn.addEventListener("click", function () {
      currentMode = MODES.Selecting;
      selectedShape = shape;
      selectedVertex = null;
      selectedVertexID = null;
      selectedPoint = [];
      selectedPoint.push(shape);
      redraw();
    });
    structurePanel.appendChild(btn);
    // Display all vertex in shape as button
    shape.vertices.forEach(function (vertex, id) {
      var btn = document.createElement("button");
      btn.innerHTML = "Vertex " + id;
      btn.addEventListener("click", function () {
        currentMode = MODES.Selecting;
        selectedShape = shape;
        selectedVertex = vertex;
        selectedVertexID = id;
        selectedPoint = [];
        selectedPoint.push(shape);
        redraw();
      });
      structurePanel.appendChild(btn);
    });
  });

  squareShapes.forEach(function (shape) {
    var btn = document.createElement("button");
    btn.innerHTML = shape.type;
    btn.addEventListener("click", function () {
      currentMode = MODES.Selecting;
      selectedShape = shape;
      selectedVertex = null;
      selectedVertexID = null;
      selectedPoint = [];
      selectedPoint.push(shape);
      redraw();
    });
    structurePanel.appendChild(btn);
    // Display all vertex in shape as button
    shape.vertices.forEach(function (vertex, id) {
      var btn = document.createElement("button");
      btn.innerHTML = "Vertex " + id;
      btn.addEventListener("click", function () {
        currentMode = MODES.Selecting;
        selectedShape = shape;
        selectedVertex = vertex;
        selectedVertexID = id;
        selectedPoint = [];
        selectedPoint.push(shape);
        redraw();
      });
      structurePanel.appendChild(btn);
    });
  });
}
