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
  rectangleShapes.forEach(function (shape) {
    shape.draw();
  });
  polygonShapes.forEach(function (shape) {
    shape.draw();
  });
  try {
    selectedPoint.draw();
  } catch (error) {
    console.log();
}

  displayShapes();
}
function redrawRotateAnimation(x,y) {

  gl.clearColor(238, 238, 238, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  lineShapes.forEach(function (shape) {
    shape.rotate(x,y)
    shape.draw();
  });
  squareShapes.forEach(function (shape) {
    shape.rotate(x,y)
    shape.draw();
  });
  rectangleShapes.forEach(function (shape) {
    shape.rotate(x,y)
    shape.draw();
  });
  polygonShapes.forEach(function (shape) {
    shape.rotate(x,y)
    shape.draw(); 
  });
}

// Display shapes on left panel
function displayShapes() {
  var structurePanel = document.getElementById("opt-shapes");
  while (structurePanel.firstChild) {
    structurePanel.removeChild(structurePanel.firstChild);
  }

  polygonShapes.forEach(function (shape) {
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn-shape");
    btn.innerHTML = shape.type;
    btn.setAttribute("class", "btn-shape");
    btn.addEventListener("click", function () {
      currentMode = MODES.None;
      selectedShape = shape;
      selectedVertex = null;
      selectedVertexID = null;
      redraw();
    });
    structurePanel.appendChild(btn);
    // Display all vertex in shape as button
    shape.vertices.forEach(function (vertex, id) {
      var btn = document.createElement("button");
      btn.innerHTML = "Vertex " + id;
      btn.setAttribute("class", "btn-vertex");
      btn.addEventListener("click", function () {
        currentMode = MODES.None;
        selectedShape = shape;
        selectedVertex = vertex;
        selectedVertexID = id;
        redraw();
      });
      structurePanel.appendChild(btn);
    });
  });

  // Display all shapes as button
  lineShapes.forEach(function (shape) {
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn-shape");
    btn.innerHTML = shape.type;
    btn.addEventListener("click", function () {
      currentMode = MODES.None;
      selectedShape = shape;
      selectedVertex = null;
      selectedVertexID = null;
      redraw();
    });
    structurePanel.appendChild(btn);
    // Display all vertex in shape as button
    shape.vertices.forEach(function (vertex, id) {
      var btn = document.createElement("button");
      btn.setAttribute("class", "btn-vertex");
      btn.innerHTML = "Vertex " + id;
      btn.addEventListener("click", function () {
        currentMode = MODES.None;
        selectedShape = shape;
        selectedVertex = vertex;
        selectedVertexID = id;
        redraw();
      });
      structurePanel.appendChild(btn);
    });
  });

  squareShapes.forEach(function (shape) {
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn-shape");
    btn.innerHTML = shape.type;
    btn.addEventListener("click", function () {
      currentMode = MODES.None;
      selectedShape = shape;
      selectedVertex = null;
      selectedVertexID = null;
      redraw();
    });
    structurePanel.appendChild(btn);
    // Display all vertex in shape as button
    shape.vertices.forEach(function (vertex, id) {
      var btn = document.createElement("button");
      btn.setAttribute("class", "btn-vertex");
      btn.innerHTML = "Vertex " + id;
      btn.addEventListener("click", function () {
        currentMode = MODES.None;
        selectedShape = shape;
        selectedVertex = vertex;
        selectedVertexID = id;
        redraw();
      });
      structurePanel.appendChild(btn);
    });
  });
  
  rectangleShapes.forEach(function (shape) {
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn-shape");
    btn.innerHTML = shape.type;
    btn.addEventListener("click", function () {
      currentMode = MODES.None;
      selectedShape = shape;
      selectedVertex = null;
      selectedVertexID = null;
      redraw();
    });
    structurePanel.appendChild(btn);
    // Display all vertex in shape as button
    shape.vertices.forEach(function (vertex, id) {
      var btn = document.createElement("button");
      btn.setAttribute("class", "btn-vertex");
      btn.innerHTML = "Vertex " + id;
      btn.addEventListener("click", function () {
        currentMode = MODES.None;
        selectedShape = shape;
        selectedVertex = vertex;
        selectedVertexID = id;
        redraw();
      });
      structurePanel.appendChild(btn);
    });
  });
}
