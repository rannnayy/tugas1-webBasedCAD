
function getMousePos(e) {
    x = (e.offsetX - canvas.clientWidth / 2) / (canvas.clientWidth / 2);
    y = (canvas.clientHeight / 2 - e.offsetY) / (canvas.clientHeight / 2);
}

function countDistancePoints(x1, y1, x2, y2) {
    console.log("x1: ", x1, " y1: ", y1, " x2: ", x2, " y2: ", y2);
    console.log(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function countSquareVertices(x1, y1, x3, y3) {
    // Get minimum dx and dy
    let dx = x3 - x1;
    let dy = y3 - y1;
    let min = Math.min(Math.abs(dx), Math.abs(dy));

    if (dx > 0) {
        x3 = x1 + min;
    }
    else {
        x3 = x1 - min;
    }

    if (dy > 0) {
        y3 = y1 + min;
    }
    else {
        y3 = y1 - min;
    }

    return [[x1, y1], [x1, y3], [x3, y3], [x3, y1]];
}

// Form a square from point with specified side length
function getBoundingCoordinates(x, y) {
    let d = 0.01;
    return [[x-d, y+d], [x+d, y+d], [x+d, y-d], [x-d, y-d]];
}
