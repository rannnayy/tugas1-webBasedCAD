// Object Shape
class Shape {
    constructor(type, vertices, color) {
        this.type = type;
        this.vertices = vertices;
        this.center = [];
        this.previous_click = [0,0];
        this.previous_position = [0,0];

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
    shear(x, y) {
        let shx = (x - this.center[0]) / (this.length());
        let shy = (y - this.center[1]) / (this.length());
        for (let i=0; i<this.vertices.length; i++) {
            this.vertices[i][0] = this.vertices[i][0] + (this.vertices[i][1] - this.center[1]) * shx;
            this.vertices[i][1] = this.vertices[i][1] + (this.vertices[i][0] - this.center[0]) * shy;
        }
    }
    rotate(x, y) {
        for (let i = 0; i < this.vertices.length; i++) {
            let dX = this.vertices[i][0] - this.center[0];
            let dY = this.vertices[i][1] - this.center[1]; 
            let angle;
            if (x < this.previous_click[0]) {
                angle = Math.atan2(dY, dX) + (this.previous_position[0] - x)*2*Math.PI/(1 + this.previous_click[0]);
            }
            else {
                angle = Math.atan2(dY, dX) + (this.previous_position[0] - x)*2*Math.PI/(1 - this.previous_click[0]);
            }
            let radius = Math.sqrt(dX*dX + dY*dY);
            this.vertices[i][0] = this.center[0] + radius * Math.cos(angle);
            this.vertices[i][1] = this.center[1] + radius * Math.sin(angle);
        }
        this.previous_position=[x,y];
    }
    addPrevPosClick(x,y) {
        this.previous_click = [x,y];
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
    shear(x, y) {
        let shx = (x - this.center[0]) / (this.length());
        let shy = (y - this.center[1]) / (this.length());
        for (let i=0; i<this.vertices.length; i++) {
            this.vertices[i][0] = this.vertices[i][0] + (this.vertices[i][1] - this.center[1]) * shx;
            this.vertices[i][1] = this.vertices[i][1] + (this.vertices[i][0] - this.center[0]) * shy;
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
        for (let i = 0; i < this.vertices.length; i++) {
            let dX = this.vertices[i][0] - this.center[0];
            let dY = this.vertices[i][1] - this.center[1]; 
            let angle;
            if (x < this.previous_click[0]) {
                angle = Math.atan2(dY, dX) + (this.previous_position[0] - x)*2*Math.PI/(1 + this.previous_click[0]);
            }
            else {
                angle = Math.atan2(dY, dX) + (this.previous_position[0] - x)*2*Math.PI/(1 - this.previous_click[0]);
            }
            let radius = Math.sqrt(dX*dX + dY*dY);
            this.vertices[i][0] = this.center[0] + radius * Math.cos(angle);
            this.vertices[i][1] = this.center[1] + radius * Math.sin(angle);
        }
        this.previous_position=[x,y];
    }
    addPrevPosClick(x,y) {
        this.previous_click = [x,y];
    }
}

class Rectangle extends Shape {
    constructor(vertices, color) {
        super("rectangle", vertices, color);
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
        let verts = countRectangleVertices(this.vertices[oppVert][0], this.vertices[oppVert][1], x, y);
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
        return countDistancePoints(this.vertices[0][0], this.vertices[0][1], this.vertices[3][0], this.vertices[3][1]);
    }
    width() {
        return countDistancePoints(this.vertices[0][0], this.vertices[0][1], this.vertices[1][0], this.vertices[1][1]);
    }
    shear(x, y) {
        let shx = (x - this.center[0]) / (this.length());
        let shy = (y - this.center[1]) / (this.length());
        for (let i=0; i<this.vertices.length; i++) {
            this.vertices[i][0] = this.vertices[i][0] + (this.vertices[i][1] - this.center[1]) * shx;
            this.vertices[i][1] = this.vertices[i][1] + (this.vertices[i][0] - this.center[0]) * shy;
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
        for (let i = 0; i < this.vertices.length; i++) {
            let dX = this.vertices[i][0] - this.center[0];
            let dY = this.vertices[i][1] - this.center[1]; 
            let angle;
            if (x < this.previous_click[0]) {
                angle = Math.atan2(dY, dX) + (this.previous_position[0] - x)*2*Math.PI/(1 + this.previous_click[0]);
            }
            else {
                angle = Math.atan2(dY, dX) + (this.previous_position[0] - x)*2*Math.PI/(1 - this.previous_click[0]);
            }
            let radius = Math.sqrt(dX*dX + dY*dY);
            this.vertices[i][0] = this.center[0] + radius * Math.cos(angle);
            this.vertices[i][1] = this.center[1] + radius * Math.sin(angle);
        }
        this.previous_position=[x,y];
    }
    addPrevPosClick(x,y) {
        this.previous_click = [x,y];
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
        deleteVertex(vertexID){
        this.vertices.splice(vertexID,1)
        this.color.splice(vertexID,1)
    }    
    addVertex(x,y, r,g,b){
        super.addVertex(x,y)
        this.color.push([r,g,b])
        let newVerticesPosition = ConvexHull(this.vertices)
        this.color = syncColorVertex(this.vertices, newVerticesPosition, this.color)
        this.vertices = newVerticesPosition
    }
    move(x,y){
        let dx = x - this.center[0]
        let dy = y - this.center[1]
        super.move(dx, dy)
        this.center = [x,y]
    }
    dilate(x,y){
        let scale = countDistancePoints(x, y, this.center[0], this.center[1]) / countDistancePoints(this.vertices[0][0], this.vertices[0][1], this.center[0], this.center[1]);
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i][0] =
              this.center[0] + (this.vertices[i][0] - this.center[0]) * scale;
            this.vertices[i][1] =
              this.center[1] + (this.vertices[i][1] - this.center[1]) * scale;
        }
    }
}