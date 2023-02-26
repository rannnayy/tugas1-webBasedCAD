// 2. HTML-JS

getColor();

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
        document.getElementById("input-line").value = "0";
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
        document.getElementById("input-square").value = "0";
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
        document.getElementById("opt-model-bt-polygon").textContent = "Save";
        document.getElementById("opt-model-bt-polygon").setAttribute("onclick", "chosenModel('polygon-save')")

        chosenShape = "polygon";
        currentMode = MODES.Drawing;

        // Special Input
        document.getElementsByClassName("opt-special-line")[0].style.display = "none";
        document.getElementsByClassName("opt-special-square")[0].style.display = "none";
        document.getElementsByClassName("opt-special-rect")[0].style.display = "none";
        document.getElementsByClassName("opt-special-polygon")[0].style.display = "block";
    }
    else if (model == "polygon-save") {
        document.getElementById("opt-model-bt-line").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-line").style.color = "#222831";
        document.getElementById("opt-model-bt-square").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-square").style.color = "#222831";
        document.getElementById("opt-model-bt-rectangle").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-rectangle").style.color = "#222831";
        document.getElementById("opt-model-bt-polygon").style.background = "#00ADB5";
        document.getElementById("opt-model-bt-polygon").style.color = "#222831";
        document.getElementById("opt-model-bt-polygon").textContent = "Polygon";
        document.getElementById("opt-model-bt-polygon").setAttribute("onclick", "chosenModel('polygon')")

        currShape = new Polygon(positions, [1.0, 0.0, 0.0]);
        polygonShapes.push(currShape)
        positions = []
        chosenShape = null;
        currShape = null;
        currentMode = MODES.None;

        redraw()

        // Special Input
        document.getElementsByClassName("opt-special-line")[0].style.display = "none";
        document.getElementsByClassName("opt-special-square")[0].style.display = "none";
        document.getElementsByClassName("opt-special-rect")[0].style.display = "none";
        document.getElementsByClassName("opt-special-polygon")[0].style.display = "none";
    }
}

function chosenTransformation(state) {
    switch (state) {
        case "Color":
            document.getElementById("opt-color-bt").style.background = "#222831";
            document.getElementById("opt-color-bt").style.color = "#FFFFFF";

            getColor();
            currentMode = MODES.Color;

            break;
        case "Translate":
            document.getElementById("opt-trans-bt-translation").style.background = "#222831";
            document.getElementById("opt-trans-bt-translation").style.color = "#FFFFFF";

            currentMode = MODES.Translate
            break;
        case "Dilate":
            currentMode = MODES.Dilate
            document.getElementById("opt-trans-bt-dilatation").style.background = "#222831";
            document.getElementById("opt-trans-bt-dilatation").style.color = "#FFFFFF";

            break;
        case "Rotate":
            currentMode = MODES.Rotate
            document.getElementById("opt-trans-bt-rotation").style.background = "#222831";
            document.getElementById("opt-model-bt-polygon").style.color = "#FFFFFF";

            break;
        case "Shear":
            currentMode = MODES.Shear
            document.getElementById("opt-trans-bt-shear").style.background = "#222831";
            document.getElementById("opt-trans-bt-shear").style.color = "#FFFFFF";

            break;
        default:
            break;
    }
}

function getNearestVertex() {
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
    for (let j = 0; j < polygonShapes.length; j++) {
        for (let i = 0; i < polygonShapes[j].vertices.length; i++) {
            let tempDistance = countDistancePoints(x, y, polygonShapes[j].vertices[i][0], polygonShapes[j].vertices[i][1]);
            if (tempDistance < selectedDistance) {
                selectedDistance = tempDistance;
                selectedShape = polygonShapes[j];
                selectedVertex = polygonShapes[j].vertices[i];
                selectedVertexID = i;
            }
        }
    }
    document.body.style.cursor = "move";
}

function getNearestShear() {
    shearedDistance = 1000.0;
    for (let j = 0; j < lineShapes.length; j++) {
        for (let i = 0; i < lineShapes[j].vertices.length; i++) {
            let tempDistance = countDistancePoints(x, y, lineShapes[j].vertices[i][0], lineShapes[j].vertices[i][1]);
            if (tempDistance < shearedDistance) {
                shearedDistance = tempDistance;
                shearedShape = lineShapes[j];
                shearedPoint = lineShapes[j].vertices[i];
                shearedVertexID = i;
            }
        }
    }
    for (let j = 0; j < squareShapes.length; j++) {
        for (let i = 0; i < squareShapes[j].vertices.length; i++) {
            let tempDistance = countDistancePoints(x, y, squareShapes[j].vertices[i][0], squareShapes[j].vertices[i][1]);
            if (tempDistance < shearedDistance) {
                shearedDistance = tempDistance;
                shearedShape = squareShapes[j];
                shearedPoint = squareShapes[j].vertices[i];
                shearedVertexID = i;
            }
        }
    }
}

function getNearestObject() {
    selectedDistance = 1000.0;
    for (let j = 0; j < lineShapes.length; j++) {
        let tempDistance = countDistancePoints(x, y, lineShapes[j].center[0], lineShapes[j].center[1]);
        if (tempDistance < selectedDistance) {
            selectedDistance = tempDistance;
            grabbedShape = lineShapes[j];
            grabbedPoint = lineShapes[j].center;
        }
    }
    for (let j = 0; j < squareShapes.length; j++) {
        let tempDistance = countDistancePoints(x, y, squareShapes[j].center[0], squareShapes[j].center[1]);
        if (tempDistance < selectedDistance) {
            selectedDistance = tempDistance;
            grabbedShape = squareShapes[j];
            grabbedPoint = squareShapes[j].center;
        }
    }
    for (let j = 0; j < polygonShapes.length; j++) {
        let tempDistance = countDistancePoints(x, y, polygonShapes[j].center[0], polygonShapes[j].center[1]);
        if (tempDistance < selectedDistance) {
            selectedDistance = tempDistance;
            grabbedShape = polygonShapes[j];
            grabbedPoint = polygonShapes[j].center;
        }
    }
    document.body.style.cursor = "grab";
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
            currShape = new Line(positions, [redColor, greenColor, blueColor]);
            lineShapes.push(currShape);
            document.getElementById("input-line").value = currShape.length();
        }
        else if (chosenShape == "square") {
            if (positions.length > 1) {
                squareShapes.pop();
            }
            while (positions.length > 1) {
                positions.pop();
            }
            positions = countSquareVertices(positions[0][0], positions[0][1], x, y);
            currShape = new Square(positions, [redColor, greenColor, blueColor]);
            squareShapes.push(currShape);
            document.getElementById("input-square").value = currShape.length();
        }
    }
    else if (currentMode == MODES.None && currShape == null) {
        getNearestVertex();
        
        selectedPoint = new Point(selectedVertex);
    }
    else if (currentMode == MODES.Moving) {
        selectedPoint.move(x, y);
        selectedShape.moveVertex(selectedVertexID, x, y);

        document.body.style.cursor = "move";

        if (selectedShape instanceof Line) {
            document.getElementById("input-line").value = selectedShape.length();
        }
        else if (selectedShape instanceof Square) {
            document.getElementById("input-square").value = selectedShape.length();
        }
    }
    else if (currentMode == MODES.Translate) {
        selectedPoint.move(x, y);
        grabbedShape.move(x, y);

        document.body.style.cursor = "grabbing";
    }
    redraw();
});

canvas.addEventListener("click", (e) => {
    getMousePos(e);
    if (currentMode == MODES.Drawing) {
        selectedPoint = null;

        if (chosenShape == "line") {
            if (positions.length < 1) {
                positions.push([x, y]);
                document.getElementById("input-line").value = "0";
            } else if (positions.length >= 1) {
                while (positions.length > 1) {
                    positions.pop();
                }
                positions.push([x, y]);
                getColor();
                currShape = new Line(positions, [redColor, greenColor, blueColor]);
                lineShapes.pop();
                lineShapes.push(currShape);
                document.getElementById("input-line").value = currShape.length();
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
                getColor();
                currShape = new Square(positions, [redColor, greenColor, blueColor]);
                squareShapes.pop();
                squareShapes.push(currShape);
                document.getElementById("input-square").value = currShape.length();
                positions = [];
                chosenShape = null;
                currShape = null;
                currentMode = MODES.None;
                document.getElementById("opt-model-bt-square").style.background = "#00ADB5";
                document.getElementById("opt-model-bt-square").style.color = "#222831";
            }
        }
        else if(chosenShape == "polygon"){
          positions.push([x, y]);
        }
    }
    else if (currentMode == MODES.None && selectedShape != null) {
        // Move A Vertex from selectedShape
        selectedPoint.move(x, y);
        selectedShape.moveVertex(selectedVertexID, x, y);
        currentMode = MODES.Moving;
        
        document.body.style.cursor = "move";
    }
    else if (currentMode == MODES.Moving && selectedShape != null) {
        // Move A Vertex from selectedShape
        selectedPoint.move(x, y);
        selectedShape.moveVertex(selectedVertexID, x, y);
        currentMode = MODES.None;
        selectedShape = null;
        selectedVertex = null;
        selectedVertexID = null;
        
        document.body.style.cursor = "default";
    }
    else if (currentMode == MODES.Translate && grabbedShape == null) {
        getNearestObject();

        selectedPoint = new Point(grabbedPoint)

        // Move A Shape
        selectedPoint.move(x, y);
        grabbedShape.move(x, y);
        
        document.body.style.cursor = "grabbing";
    }
    else if (currentMode == MODES.Translate && grabbedShape != null) {
        selectedPoint.move(x, y);
        grabbedShape.move(x, y);
        currentMode = MODES.None;
        grabbedPoint = null;
        grabbedShape = null;
        
        document.body.style.cursor = "default";
        document.getElementById("opt-trans-bt-translation").style.background = "#00ADB5";
        document.getElementById("opt-trans-bt-translation").style.color = "#222831";
    }
    else if (currentMode == MODES.Color && coloredShape == null) {
        getNearestVertex();
        let dist = selectedDistance.valueOf();
        coloredShape = selectedShape;
        coloredVertex = selectedVertex;
        coloredVertexID = selectedVertexID;
        coloredPoint = selectedPoint;

        getNearestObject();
        console.log(selectedDistance, dist);
        if (selectedDistance < dist) {
            coloredShape = selectedShape;
            coloredVertex = null;
            coloredVertexID = null;
            coloredPoint = null;

            // Color the Shape
            coloredShape.colorAll(redColor, greenColor, blueColor);
        }
        else {
            // Color the Vertex
            coloredShape.colorVertex(coloredVertexID, redColor, greenColor, blueColor);
        }
        
        currentMode = MODES.None;
        selectedShape = null;
        selectedVertex = null;
        selectedVertexID = null;
        selectedPoint = null;
        coloredShape = null;

        document.getElementById("opt-color-bt").style.background = "#00ADB5";
        document.getElementById("opt-color-bt").style.color = "#222831";
    }
    redraw();
});

document.getElementById("input-line").addEventListener("change", (e) => {
    if (currentMode == MODES.None && selectedShape != null && selectedShape instanceof Line) {
        let newLength = parseFloat(e.target.value);
        let oldLength = selectedShape.length();
        
        // Count new position of the second vertex
        let x1 = selectedShape.vertices[0][0];
        let y1 = selectedShape.vertices[0][1];
        let x2 = selectedShape.vertices[1][0];
        let y2 = selectedShape.vertices[1][1];
        let x3 = x1 + (x2 - x1) * newLength / oldLength;
        let y3 = y1 + (y2 - y1) * newLength / oldLength;

        // Crop length if exceed canvas size
        if (x3 > 1.0) {
            x3 = 1.0;
            y3 = y1 + (y2 - y1) * (x3 - x1) / (x2 - x1);
        }
        if (x3 < -1.0) {
            x3 = -1.0;
            y3 = y1 + (y2 - y1) * (x3 - x1) / (x2 - x1);
        }
        if (y3 > 1.0) {
            y3 = 1.0;
            x3 = x1 + (x2 - x1) * (y3 - y1) / (y2 - y1);
        }
        if (y3 < -1.0) {
            y3 = -1.0;
            x3 = x1 + (x2 - x1) * (y3 - y1) / (y2 - y1);
        }

        // Move the second vertex
        selectedShape.moveVertex(1, x3, y3);
    }
    redraw();
});

document.getElementById("input-square").addEventListener("change", (e) => {
    if (currentMode == MODES.None && selectedShape != null && selectedShape instanceof Square) {
        let newLength = parseFloat(e.target.value) * Math.sqrt(2);
        let oldLength = selectedShape.length();
        
        // Count new position of the third vertex
        let x1 = selectedShape.vertices[0][0];
        let y1 = selectedShape.vertices[0][1];
        let oppVertex = selectedShape.getOppositeVertex(0);
        let x2 = selectedShape.vertices[oppVertex][0];
        let y2 = selectedShape.vertices[oppVertex][1];
        let x3 = x1 + (x2 - x1) * newLength / oldLength;
        let y3 = y1 + (y2 - y1) * newLength / oldLength;

        // Move the third vertex
        selectedShape.moveVertex(2, x3, y3);
    }
    redraw();
});


document.getElementsByClassName("opt-file-load")[0].addEventListener("click", (e) => {
    let file = document.getElementById("loadfile").files[0]
    if(file != undefined){
        console.log(file);
        let fr = new FileReader();
        fr.readAsText(file);
        fr.onload = function () {
        let tempShape = fr.result.split("\r\n");
        if (tempShape[0] == "polygon") {
            polygonShapes.push(
            new Polygon(JSON.parse(tempShape[1]), JSON.parse(tempShape[2]))
            );
        }
        };
        redraw();
    }
})

document.getElementsByClassName("opt-file-save")[0].addEventListener("click", (e) => {
    let saveFile = document.createElement('a')
    saveFile.style.display = 'none'
    let text = selectedShape.type + "\r\n" + JSON.stringify(selectedShape.vertices) + "\r\n" + JSON.stringify(selectedShape.color)
    saveFile.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    saveFile.setAttribute("download", selectedShape.type);

    saveFile.click();
    
    document.body.removeChild(saveFile);
});



