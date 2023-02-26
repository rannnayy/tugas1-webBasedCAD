// Object Shape
class Shape {
    constructor(type, vertices, color) {
        this.type = type;
        this.vertices = vertices;
        this.center = [];

        let temp = [];
        for (let i = 0; i < this.vertices.length; i++) {
            temp[i] = [color[0], color[1], color[2]];
        }
        this.color = temp;
    }
    color(id, r, g, b) {
        this.color[id] = [r, g, b];
    }
    colorAll(r, g, b) {
        for (let i = 0; i < this.vertices.length; i++) {
            this.color[i] = [r, g, b];
        }
    }
    addVertex(x, y) {
        this.vertices.push([x, y]);
    }
    moveVertex(id, x, y) {
        this.vertices[id] = [x, y];
    }
    move(dx, dy) {
        this.vertices.forEach(vert => {
            vert[0] += dx;
            vert[1] += dy;
        });
    }
    drawShape(gl_shape, num_objs) {
        var vert = []
        for (let i = 0; i < this.vertices.length; i++) {
            vert.push(this.vertices[i][0])
            vert.push(this.vertices[i][1])
            for (let j = 0; j < this.color[i].length; j++) {
                vert.push(this.color[i][j])
            }
        }
        // console.log(vert)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
        gl.drawArrays(gl_shape, 0, num_objs);
    }
}

class Point extends Shape {
    constructor(vertices) {
        let pos = getBoundingCoordinates(vertices[0], vertices[1]);
        let color = [0.0, 0.0, 0.0];
        super("point", pos, color);
    }
    draw() {
        super.drawShape(gl.TRIANGLE_FAN, this.vertices.length);
        this.center = [(this.vertices[0][0] + this.vertices[2][0]) / 2, (this.vertices[0][1] + this.vertices[2][1]) / 2];
    }
    move(x, y) {
        let center_x = (this.vertices[0][0] + this.vertices[2][0]) / 2;
        let center_y = (this.vertices[0][1] + this.vertices[2][1]) / 2;
        let dx = x - center_x;
        let dy = y - center_y;
        super.move(dx, dy);
        this.center = [x, y];
    }
}

class Line extends Shape {
    constructor(vertices, color) {
        super("line", vertices, color);
    }
    addVertex(x, y) {
        super.addVertex(x, y);
    }
    draw() {
        super.drawShape(gl.LINE_STRIP, this.vertices.length);
        this.center = [(this.vertices[0][0] + this.vertices[1][0]) / 2, (this.vertices[0][1] + this.vertices[1][1]) / 2];
    }
    moveVertex(id, x, y) {
        super.moveVertex(id, x, y);
        this.center = [(this.vertices[0][0] + this.vertices[1][0]) / 2, (this.vertices[0][1] + this.vertices[1][1]) / 2];
    }
    move(x, y) {
        let center_x = (this.vertices[0][0] + this.vertices[1][0]) / 2;
        let center_y = (this.vertices[0][1] + this.vertices[1][1]) / 2;
        let dx = x - center_x;
        let dy = y - center_y;
        super.move(dx, dy);
        this.center = [x, y];
    }
    length() {
        return countDistancePoints(this.vertices[0][0], this.vertices[0][1], this.vertices[1][0], this.vertices[1][1]);
    }
    colorVertex(id, r, g, b) {
        super.color(id, r, g, b);
    }
    colorAll(r, g, b) {
        super.colorAll(r, g, b);
    }
    dilate(x, y) {
        let scale = countDistancePoints(x, y, this.center[0], this.center[1]) / countDistancePoints(this.vertices[0][0], this.vertices[0][1], this.center[0], this.center[1]);
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i][0] = this.center[0] + (this.vertices[i][0] - this.center[0]) * scale;
            this.vertices[i][1] = this.center[1] + (this.vertices[i][1] - this.center[1]) * scale;
        }
    }
    rotate(x, y) {
        let angle = Math.atan2(y - this.center[1], x - this.center[0]) - Math.atan2(this.vertices[0][1] - this.center[1], this.vertices[0][0] - this.center[0]);
        
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i][0] = this.center[0] + (this.vertices[i][0] - this.center[0]) * Math.cos(angle) - (this.vertices[i][1] - this.center[1]) * Math.sin(angle);
            this.vertices[i][1] = this.center[1] + (this.vertices[i][0] - this.center[0]) * Math.sin(angle) + (this.vertices[i][1] - this.center[1]) * Math.cos(angle);
        }
        // this.vertices[i][0] = this.center[0] + x * Math.cos(angle) - y * Math.sin(angle);
    }
}

class Triangle extends Shape {
    constructor(vertices, color) {
        super("triangle", vertices, color);
    }
    draw() {
        super.drawShape(gl.TRIANGLES, this.vertices.length);
    }
}

class Square extends Shape {
    constructor(vertices, color) {
        super("square", vertices, color);
    }
    draw() {
        super.drawShape(gl.TRIANGLE_FAN, this.vertices.length);
        this.center = [(this.vertices[0][0] + this.vertices[2][0]) / 2, (this.vertices[0][1] + this.vertices[2][1]) / 2];
    }
    getOppositeVertex(id) {
        return (id + 2) % 4;
    }
    moveVertex(id, x, y) {
        let oppVert = this.getOppositeVertex(id);
        let verts = countSquareVertices(this.vertices[oppVert][0], this.vertices[oppVert][1], x, y);
        let x3 = verts[2][0]
        let y3 = verts[2][1]
        super.moveVertex(id, x3, y3)
        if (id % 2 == 0) {
            super.moveVertex((id + 1) % 4, x3, this.vertices[(id + 1) % 4][1])
            super.moveVertex((id + 3) % 4, this.vertices[(id + 3) % 4][0], y3)
        }
        else {
            super.moveVertex((id + 3) % 4, x3, this.vertices[(id + 3) % 4][1])
            super.moveVertex((id + 1) % 4, this.vertices[(id + 1) % 4][0], y3)
        }
        this.center = [(this.vertices[0][0] + this.vertices[2][0]) / 2, (this.vertices[0][1] + this.vertices[2][1]) / 2];
    }
    move(x, y) {
        let center_x = (this.vertices[0][0] + this.vertices[2][0]) / 2;
        let center_y = (this.vertices[0][1] + this.vertices[2][1]) / 2;
        let dx = x - center_x;
        let dy = y - center_y;
        super.move(dx, dy);
        this.center = [x, y];
    }
    length() {
        return countDistancePoints(this.vertices[0][0], this.vertices[0][1], this.vertices[1][0], this.vertices[1][1]);
    }
    shear(id, x, y) {
        let oppId = this.getOppositeVertex(id);
        for (let i=0; i<this.vertices.length; i++) {
            if (i != oppId) {
                let dx = x - this.vertices[id][0];
                let dy = y - this.vertices[id][1];
                super.moveVertex(i, this.vertices[i][0] + dx, this.vertices[i][1] + dy);
            }
        }
    }
    colorVertex(id, r, g, b) {
        super.color(id, r, g, b);
    }
    colorAll(r, g, b) {
        super.colorAll(r, g, b);
    }
    dilate(x, y) {
        let scale = countDistancePoints(x, y, this.center[0], this.center[1]) / countDistancePoints(this.vertices[0][0], this.vertices[0][1], this.center[0], this.center[1]);
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i][0] = this.center[0] + (this.vertices[i][0] - this.center[0]) * scale;
            this.vertices[i][1] = this.center[1] + (this.vertices[i][1] - this.center[1]) * scale;
        }
    }
    rotate(x, y) {
        let angle = Math.atan2(y - this.center[1], x - this.center[0]) - Math.atan2(this.vertices[0][1] - this.center[1], this.vertices[0][0] - this.center[0]);
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i][0] = this.center[0] + (this.vertices[i][0] - this.center[0]) * Math.cos(angle) - (this.vertices[i][1] - this.center[1]) * Math.sin(angle);
            this.vertices[i][1] = this.center[1] + (this.vertices[i][0] - this.center[0]) * Math.sin(angle) + (this.vertices[i][1] - this.center[1]) * Math.cos(angle);
        }
        // this.vertices[i][0] = this.center[0] + x * Math.cos(angle) - y * Math.sin(angle);
    }
}

class Rectangle extends Shape {
    constructor(vertices, color) {
        super("rectangle", vertices, color);
    }
    draw() {
        super.drawShape(gl.TRIANGLE_STRIP, this.vertices.length);
    }
}

class Polygon extends Shape {
    constructor(vertices, color) {
        let convexHull = ConvexHull(vertices)
        super("polygon", convexHull, color);
        let tempX = 0;
        let tempY = 0;
        this.vertices.forEach(function (point) {
          tempX += point[0];
          tempY += point[1];
        });
        this.center[0] = tempX / this.vertices.length;
        this.center[1] = tempY / this.vertices.length;
    }
    draw() {
        super.drawShape(gl.TRIANGLE_FAN, this.vertices.length);
    }
    move(x,y){
        let dx = x - this.center[0]
        let dy = y - this.center[1]
        super.move(dx, dy)
        this.center = [x,y]
    }
}