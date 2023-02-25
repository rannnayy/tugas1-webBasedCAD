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
            for (let j = 0; j < this.color.length; j++) {
                vert.push(this.color[j])
            }
        }
        // console.log(vert)
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
    draw() {
        super.drawShape(gl.LINE_STRIP, this.vertices.length);
    }
    moveVertex(id, x, y) {
        super.moveVertex(id, x, y);
    }
    move(x, y) {
        let center_x = (this.vertices[0][0] + this.vertices[1][0]) / 2;
        let center_y = (this.vertices[0][1] + this.vertices[1][1]) / 2;
        let dx = x - center_x;
        let dy = y - center_y;
        super.move(dx, dy);
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
    }
    moveVertex(id, x, y) {
        super.moveVertex(id, x, y);
    }
    move(x, y) {
        let center_x = (this.vertices[0][0] + this.vertices[2][0]) / 2;
        let center_y = (this.vertices[0][1] + this.vertices[2][1]) / 2;
        let dx = x - center_x;
        let dy = y - center_y;
        super.move(dx, dy);
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