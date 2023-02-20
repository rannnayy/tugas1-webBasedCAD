// Object Shape
class Shape {
    constructor(type, vertices, color) {
        this.type = type;
        this.vertices = vertices;
        this.color = color;
    }
    addVertex(x, y) {
        this.vertices.push([x, y]);
    }
    moveVertex(id, x, y) {
        this.vertices[id] = [x, y];
    }
    drawShape(gl_shape, num_objs) {
        var vert = []
        for (let i = 0; i < this.vertices.length; i++) {
            vert.push(this.vertices[i][0])
            vert.push(this.vertices[i][1])
            for (let j = 0; j < this.color.length; j++) {
                vert.push(this.color[j])
            }
        }
        console.log(vert)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
        gl.drawArrays(gl_shape, 0, num_objs);
    }
}

class Point extends Shape {
    constructor(vertices, color) {
        super("point", vertices, color);
    }
    moveVertex(x, y) {
        this.vertices = [x, y];
    }
    draw() {
        super.drawShape(gl.POINTS, this.vertices.length);
    }
}

class Line extends Shape {
    constructor(vertices, color) {
        super("line", vertices, color);
    }
    addVertex(x, y) {
        super.addVertex(x, y);
    }
    moveVertex(x, y) {
        super.moveVertex(x, y);
    }
    draw() {
        super.drawShape(gl.LINE_STRIP, this.vertices.length);
    }
    moveVertex(id, x, y) {
        super.moveVertex(id, x, y);
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
        super.drawShape(gl.TRIANGLE_STRIP, this.vertices.length);
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
        super("polygon", vertices, color);
    }
    draw() {
        super.drawShape(gl.TRIANGLE_FAN, this.vertices.length);
    }
}