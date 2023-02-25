// 2. HTML-JS

function chosenModel(model) {
    if (model == "line") {
        document.getElementById("opt-model-bt-line").style.background = "#222831";
        document.getElementById("opt-model-bt-line").style.color = "#FFFFFF";
        document.getElementById("opt-model-bt-square").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-square").style.color = "#222831";
        document.getElementById("opt-model-bt-rectangle").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-rectangle").style.color = "#222831";
        document.getElementById("opt-model-bt-polygon").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-polygon").style.color = "#222831";

        chosenShape = "line";
        currentMode = MODES.Drawing;
        
        // Special Input
        document.getElementsByClassName("opt-special-line")[0].style.display = "block";
        document.getElementsByClassName("opt-special-square")[0].style.display = "none";
        document.getElementsByClassName("opt-special-rect")[0].style.display = "none";
        document.getElementsByClassName("opt-special-polygon")[0].style.display = "none";
    } else if (model == "square") {
        document.getElementById("opt-model-bt-line").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-line").style.color = "#222831";
        document.getElementById("opt-model-bt-square").style.background = "#222831";
        document.getElementById("opt-model-bt-square").style.color = "#FFFFFF";
        document.getElementById("opt-model-bt-rectangle").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-rectangle").style.color = "#222831";
        document.getElementById("opt-model-bt-polygon").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-polygon").style.color = "#222831";

        chosenShape = "square";
        currentMode = MODES.Drawing;

        // Special Input
        document.getElementsByClassName("opt-special-line")[0].style.display = "none";
        document.getElementsByClassName("opt-special-square")[0].style.display = "block";
        document.getElementsByClassName("opt-special-rect")[0].style.display = "none";
        document.getElementsByClassName("opt-special-polygon")[0].style.display = "none";
    } else if (model == "rectangle") {
        document.getElementById("opt-model-bt-line").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-line").style.color = "#222831";
        document.getElementById("opt-model-bt-square").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-square").style.color = "#222831";
        document.getElementById("opt-model-bt-rectangle").style.background = "#222831";
        document.getElementById("opt-model-bt-rectangle").style.color = "#FFFFFF";
        document.getElementById("opt-model-bt-polygon").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-polygon").style.color = "#222831";

        chosenShape = "rectangle";
        currentMode = MODES.Drawing;

        // Special Input
        document.getElementsByClassName("opt-special-line")[0].style.display = "none";
        document.getElementsByClassName("opt-special-square")[0].style.display = "none";
        document.getElementsByClassName("opt-special-rect")[0].style.display = "block";
        document.getElementsByClassName("opt-special-polygon")[0].style.display = "none";
    } else if (model == "polygon") {
        document.getElementById("opt-model-bt-line").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-line").style.color = "#222831";
        document.getElementById("opt-model-bt-square").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-square").style.color = "#222831";
        document.getElementById("opt-model-bt-rectangle").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-rectangle").style.color = "#222831";
        document.getElementById("opt-model-bt-polygon").style.background = "#222831";
        document.getElementById("opt-model-bt-polygon").style.color = "#FFFFFF";

        chosenShape = "polygon";
        currentMode = MODES.Drawing;

        // Special Input
        document.getElementsByClassName("opt-special-line")[0].style.display = "none";
        document.getElementsByClassName("opt-special-square")[0].style.display = "none";
        document.getElementsByClassName("opt-special-rect")[0].style.display = "none";
        document.getElementsByClassName("opt-special-polygon")[0].style.display = "block";
    }
}

function getMousePos(e) {
    x = (e.offsetX - canvas.clientWidth / 2) / (canvas.clientWidth / 2);
    y = (canvas.clientHeight / 2 - e.offsetY) / (canvas.clientHeight / 2);
}

function countDistancePoints(x1, y1, x2, y2) {
    console.log("x1: ", x1, " y1: ", y1, " x2: ", x2, " y2: ", y2);
    console.log(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function countSquareVertexes(x1, y1, x3, y3) {
    // Get minimum dx and dy
    let dx = x3 - x1;
    let dy = y3 - y1;
    let min = Math.min(Math.abs(dx), Math.abs(dy));

    let x2, y2, x4, y4;

    if ((dx < 0 && dy > 0) || (dx > 0 && dy < 0)) {
        // Right to Left
        if (x3-x1 < 0) {
            min = -min;
        }
        // Get vertices
        x2 = x1 + min;
        y2 = y1;
        x4 = x1;
        y4 = y1 - min;
        x3 = x2;
        y3 = y4;
    } 
    else {
        // Left to Right
        if (x3-x1 < 0) {
            min = -min;
        }
        // Get vertices
        x2 = x1;
        y2 = y1 + min;
        x4 = x1 + min;
        y4 = y1;
        x3 = x4;
        y3 = y2;
    }

    return [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
}

// Form a square from point with specified side length
function getBoundingCoordinates(x, y) {
    let d = 0.01;
    return [[x-d, y+d], [x+d, y+d], [x+d, y-d], [x-d, y-d]];
}

canvas.addEventListener("mousemove", (e) => {
    getMousePos(e);

    if (currentMode == MODES.Drawing) {
        if (chosenShape == "line" && positions.length >= 1) {
            if (positions.length == 2) {
                lineShapes.pop();
            }
            while (positions.length > 1) {
                positions.pop();
            }
            positions.push([x, y]);
            currShape = new Line(positions, [1.0, 0.0, 0.0]);
            lineShapes.push(currShape);
        }
        else if (chosenShape == "square") {
            if (positions.length > 1) {
                squareShapes.pop();
            }
            while (positions.length > 1) {
                positions.pop();
            }
            positions = countSquareVertexes(positions[0][0], positions[0][1], x, y);
            currShape = new Square(positions, [1.0, 0.0, 0.0]);
            squareShapes.push(currShape);
        }
    }
    else if (currentMode == MODES.None && chosenShape == null) {
        selectedDistance = 1000.0;
        for (let j = 0; j < lineShapes.length; j++) {
            for (let i = 0; i < lineShapes[j].vertices.length; i++) {
                let tempDistance = countDistancePoints(x, y, lineShapes[j].vertices[i][0], lineShapes[j].vertices[i][1]);
                if (tempDistance < selectedDistance) {
                    selectedDistance = tempDistance;
                    selectedShape = lineShapes[j];
                    selectedVertex = lineShapes[j].vertices[i];
                    selectedVertexID = i;
                }
            }
        }
        // console.log("nearest point is ", selectedVertex, " with distance ", selectedDistance)
        if (selectedDistance < 1.0) {
            let pointPosition = getBoundingCoordinates(selectedVertex[0], selectedVertex[1]);
            selectedPoint = new Square(pointPosition, [1.0, 0.0, 0.0])
        }
    }
    else if (currentMode == MODES.Moving) {
        selectedPoint.move(x, y);
        selectedShape.moveVertex(selectedVertexID, x, y);
    }
    redraw();
});

canvas.addEventListener("click", (e) => {
    getMousePos(e);
    if (currentMode == MODES.Drawing) {
        if (chosenShape == "line") {
            if (positions.length < 1) {
                positions.push([x, y]);
            } else if (positions.length >= 1) {
                while (positions.length > 1) {
                    positions.pop();
                }
                positions.push([x, y]);
                currShape = new Line(positions, [1.0, 0.0, 0.0]);
                lineShapes.pop();
                lineShapes.push(currShape);
                positions = [];
                chosenShape = null;
                currShape = null;
                currentMode = MODES.None;
                document.getElementById("opt-model-bt-line").style.background = "#00ADB5";
                document.getElementById("opt-model-bt-line").style.color = "#222831";
            }
        }
        else if (chosenShape == "square") {
            if (positions.length < 1) {
                positions.push([x, y]);
            } else if (positions.length >= 1) {
                while (positions.length > 1) {
                    positions.pop();
                }
                positions = countSquareVertexes(positions[0][0], positions[0][1], x, y);
                currShape = new Square(positions, [1.0, 0.0, 0.0]);
                squareShapes.pop();
                squareShapes.push(currShape);
                positions = [];
                chosenShape = null;
                currShape = null;
                currentMode = MODES.None;
                document.getElementById("opt-model-bt-square").style.background = "#00ADB5";
                document.getElementById("opt-model-bt-square").style.color = "#222831";
            }
        }
    }
    else if (currentMode == MODES.None && selectedPoint != null) {
        // Move A Vertex from selectedShape
        selectedPoint.move(x, y);
        selectedShape.moveVertex(selectedVertexID, x, y);
        currentMode = MODES.Moving;
    }
    else if (currentMode == MODES.Moving && selectedPoint != null) {
        // Move A Vertex from selectedShape
        selectedPoint.move(x, y);
        selectedShape.moveVertex(selectedVertexID, x, y);
        currentMode = MODES.None;
    }
    redraw();
});