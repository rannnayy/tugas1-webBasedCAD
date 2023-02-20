// Redraw shapes
function redraw() {
    gl.clearColor(238, 238, 238, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    lineShapes.forEach(function (shape) {
        shape.draw();
    });
    selectedPoint.forEach(function (shape) {
        shape.draw();
    });
    squareShapes.forEach(function (shape) {
        shape.draw();
    });
}

// Display shapes on left panel
function displayShapes() {
    var structurePanel = document.getElementById("opt-title");

}