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

canvas.addEventListener("mousemove", (e) => {
    getMousePos(e);
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
    else if (chosenShape === null) {
        console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{")
        if (snap == false) {
            // Hover to select a vertex in shape
            for (let j = 0; j < lineShapes.length; j++) {
                console.log(lineShapes[j]);
                console.log(lineShapes[j].vertices);
                for (let i = 0; i < lineShapes[j].vertices.length; i++) {
                    console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
                    console.log(x, y, lineShapes[j].vertices[i][0], lineShapes[j].vertices[i][1]);
                    let tempDistance = countDistancePoints(x, y, lineShapes[j].vertices[i][0], lineShapes[j].vertices[i][1]);
                    console.log(tempDistance);
                    if (tempDistance < selectedDistance) {
                        selectedDistance = tempDistance;
                        selectedShape = lineShapes[j];
                        selectedVertex = lineShapes[j].vertices[i];
                        selectedVertexID = i;
                    }
                }
            }
            console.log("nearest point is ", selectedVertex, " with distance ", selectedDistance)
            if (selectedDistance < 1.0) {
                console.log("-------------------------")
                if (selectedPoint.length > 0) {
                    selectedPoint.pop();
                }
                console.log("-------------------------")
                selectedPoint.push(new Point([selectedVertex], [1.0, 0.0, 0.0]))
                console.log(selectedPoint)
                console.log("-------------------------")
            }
        }
        else {
            // Move selectedPoint animation
            selectedPoint.moveVertex(x, y);
        }
    }
    redraw();
});

canvas.addEventListener("click", (e) => {
    getMousePos(e);
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
            document.getElementById("opt-model-bt-line").style.background = "#00ADB5";
            document.getElementById("opt-model-bt-line").style.color = "#222831";
        }
    }
    else if (chosenShape == null) {
        if (selectedPoint.length > 0) {
            // Move A Vertex from selectedShape
            // selectedShape.moveVertex(selectedVertexID, [x, y]);
            // snap = true;
            console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        }
    }
    redraw();
});