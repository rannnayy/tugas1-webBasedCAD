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

function getNearestVertex() {
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
    for (let j = 0; j < squareShapes.length; j++) {
        for (let i = 0; i < squareShapes[j].vertices.length; i++) {
            let tempDistance = countDistancePoints(x, y, squareShapes[j].vertices[i][0], squareShapes[j].vertices[i][1]);
            if (tempDistance < selectedDistance) {
                selectedDistance = tempDistance;
                selectedShape = squareShapes[j];
                selectedVertex = squareShapes[j].vertices[i];
                selectedVertexID = i;
            }
        }
    }
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
            positions = countSquareVertices(positions[0][0], positions[0][1], x, y);
            currShape = new Square(positions, [1.0, 0.0, 0.0]);
            squareShapes.push(currShape);
        }
    }
    else if (currentMode == MODES.None && chosenShape == null) {
        selectedDistance = 1000.0;
        getNearestVertex();
        
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
                positions = countSquareVertices(positions[0][0], positions[0][1], x, y);
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