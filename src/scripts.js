////// MAIN //////

var canvas = document.getElementById("gl-canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
  alert("WebGL isn't available");
}

var mode = "";
var modelSelected = "";
var pointSelected = "";
var modelButtonHTML;
var fileStructure = document.getElementById("model-structure");
var poligonStripButton = document.getElementById("poligon-strip");
var poligonFanButton = document.getElementById("poligon-fan");
var colorPicker = document.getElementById("color");
var sliderX = document.getElementById("slider-x");
var sliderY = document.getElementById("slider-y");
var sliderRotation = document.getElementById("rotasi");
var modelActiveTextArea = document.getElementById("modelActive");
var scaleX = document.getElementById("scale-x");
var scaleY = document.getElementById("scale-y");
var deletePointButton = document.getElementById("delete_point");
var pointColorPicker = document.getElementById("point_color");
var sliderPointX = document.getElementById("slider-point-x");
var sliderPointY = document.getElementById("slider-point-y");

modelActiveTextArea.innerText = modelSelected;

sliderRotation.addEventListener("input", (e) => {
  let angleInRadian = (e.target.value * Math.PI) / 180;
  let rotation = [Math.sin(angleInRadian), Math.cos(angleInRadian)];
  for (let model of modelArray) {
    if (model.getName() === modelSelected) {
      model.setRotation(rotation);
    }
  }

  render();
});

sliderX.addEventListener("input", (e) => {
  for (let model of modelArray) {
    if (model.getName() === modelSelected) {
      model.setTranslationX(e.target.value - model.getCentroid()[0]);
    }
  }

  render();
});

sliderY.addEventListener("input", (e) => {
  for (let model of modelArray) {
    if (model.getName() === modelSelected) {
      model.setTranslationY(e.target.value - model.getCentroid()[1]);
    }
  }
  render();
});

scaleX.addEventListener("input", (e) => {
  for (let model of modelArray) {
    if (model.getName() == modelSelected) {
      model.setScaleX(e.target.value);
    }
  }
  render();
});

scaleY.addEventListener("input", (e) => {
  for (let model of modelArray) {
    if (model.getName() == modelSelected) {
      model.setScaleY(e.target.value);
    }
  }
  render();
});

sliderPointX.addEventListener("input", (e) => {
  for (let model of modelArray) {
    if (model.getName() == modelSelected) {
      for (let i = 0; i < model.getNumVertices(); i++) {
        if (model.getPointList()[i].getName() == pointSelected) {
          model.updatePointLocationX(i, e.target.value);
        }
      }
    }
  }
  render();
});

sliderPointY.addEventListener("input", (e) => {
  for (let model of modelArray) {
    if (model.getName() == modelSelected) {
      for (let i = 0; i < model.getNumVertices(); i++) {
        if (model.getPointList()[i].getName() == pointSelected) {
          model.updatePointLocationY(i, e.target.value);
        }
      }
    }
  }
  render();
});

poligonStripButton.addEventListener("click", (e) => {
  polygonStripClick(e);
});

poligonFanButton.addEventListener("click", (e) => {
  polygonFanClick(e);
});

deletePointButton.addEventListener("click", (e) => {
  deletePointClick(e);
});

colorPicker.addEventListener("change", (e) => {
  let color = e.target.value;
  let r = parseInt(color.substr(1, 2), 16) / 255;
  let g = parseInt(color.substr(3, 2), 16) / 255;
  let b = parseInt(color.substr(5, 2), 16) / 255;
  tempColor = [r, g, b, 1];
  for (let model of modelArray) {
    if (model.getName() == modelSelected) {
      model.setVerticesColor([r, g, b, 1]);
      render();
    }
  }
});

pointColorPicker.addEventListener("change", (e) => {
  let color = e.target.value;
  let r = parseInt(color.substr(1, 2), 16) / 255;
  let g = parseInt(color.substr(3, 2), 16) / 255;
  let b = parseInt(color.substr(5, 2), 16) / 255;
  let temp = [r, g, b, 1];
  for (let model of modelArray) {
    if (model.getName() == modelSelected) {
      for (let i = 0; i < model.getNumVertices(); i++) {
        if (model.getPointList()[i].getName() == pointSelected) {
          model.getPointList()[i].setColor(temp);
          model.updateVerticesColor(i, temp);
        }
      }
      render();
    }
  }
});

canvas.addEventListener("click", (e) => {
  mouseClick(e);
});

var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = createProgram(gl, vertexShader, fragmentShader);

var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
var colorAttributeLocation = gl.getAttribLocation(program, "a_color");
var rotationLocation = gl.getUniformLocation(program, "u_rotation");
var translationLocation = gl.getUniformLocation(program, "u_translation");
var pivotLocation = gl.getUniformLocation(program, "u_pivot");
var scaleLocation = gl.getUniformLocation(program, "u_scale");

var positionBuffer = gl.createBuffer();
var colorBuffer = gl.createBuffer();

var numModel = 0; //Banyaknya model/bangun
var modelArray = []; //Menyimpan semua model
var tempVertices = []; //menyimpan vertex sementara
var tempColor = [0, 0, 0, 1]; //nilai color sementara

webglUtils.resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0.8, 0.8, 0.8, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(colorAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

//////  FUNCTION //////

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function polygonStripClick(e) {
  if (mode == "poligon-strip") {
    poligonStripButton.innerText = "Poligon STRIP";
    modelArray.push(new Polygon(tempVertices, tempColor, gl.TRIANGLE_STRIP));
    numModel++;
    render();
    mode = "";
  } else {
    poligonStripButton.innerText = "save";
    tempVertices = [];
    mode = "poligon-strip";
  }
}

function polygonFanClick(e) {
  if (mode == "poligon-fan") {
    poligonFanButton.innerText = "Poligon FAN";
    modelArray.push(new Polygon(tempVertices, tempColor, gl.TRIANGLE_FAN));
    numModel++;
    render();
    mode = "";
  } else {
    poligonFanButton.innerText = "save";
    tempVertices = [];
    mode = "poligon-fan";
  }
}

function deletePointClick(e) {
  for (let model of modelArray) {
    if (model.getName() == modelSelected) {
      model.deletePoint(pointSelected);
      console.log(model.getVertices());
      render();
    }
  }
}

function mouseClick(e) {
  let x = (e.offsetX - canvas.clientWidth / 2) / (canvas.clientWidth / 2);
  let y = (canvas.clientHeight / 2 - e.offsetY) / (canvas.clientHeight / 2);
  tempVertices.push(x);
  tempVertices.push(y);
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < numModel; i++) {
    modelArray[i].drawModel();
    document
      .getElementById(modelArray[i].getName())
      .addEventListener("click", () => {
        modelSelected = modelArray[i].getName();
        pointSelected = "";
        modelActiveTextArea.innerText = modelSelected;
        sliderX.setAttribute("value", modelArray[i].getCentroid()[0]);
        sliderY.setAttribute("value", modelArray[i].getCentroid()[1]);
        sliderRotation.setAttribute("value", 0);
      });

    for (let point of modelArray[i].getPointList()) {
      document.getElementById(point.getName()).addEventListener("click", () => {
        modelSelected = modelArray[i].getName();
        pointSelected = point.getName();
        modelActiveTextArea.innerText =
          modelSelected +
          `
        ` +
          pointSelected;
      });
    }
  }
}

var numPolygon = 0;

class Polygon {
  #id;
  #name;
  #vertices;
  #pointList = [];
  #numVertices;
  #verticesColor = [];
  #centroid = [0, 0];
  #type;
  #rotation = [0, 1];
  #translation = [0, 0];
  #scale = [1, 1];

  constructor(vertices, verticesColor, type) {
    numPolygon++;
    this.#id = numPolygon;
    this.#name = "Polygon " + this.#id;
    this.#vertices = vertices;
    this.#numVertices = vertices.length / 2;
    for (let i = 0; i < this.#numVertices; i++) {
      this.#verticesColor.push(verticesColor[0]);
      this.#verticesColor.push(verticesColor[1]);
      this.#verticesColor.push(verticesColor[2]);
      this.#verticesColor.push(verticesColor[3]);
    }
    console.log(this.#verticesColor);
    console.log(this.#vertices);
    this.#type = type;
    for (let i = 0; i < this.#numVertices; i++) {
      this.#centroid[0] += this.#vertices[i * 2];
      this.#centroid[1] += this.#vertices[i * 2 + 1];
    }
    for (let i = 0; i < 2; i++) {
      this.#centroid[i] /= this.#numVertices;
    }
    for (let i = 0; i < this.#numVertices; i++) {
      this.#pointList.push(
        new Point(
          this.#name + " - " + "Point " + (i + 1),
          this.#vertices[i * 2],
          this.#vertices[i * 2 + 1],
          this.#verticesColor
        )
      );
    }
    console.log(this.#pointList);

    this.createModelButton();
    this.createPointButton();
  }

  createModelButton() {
    fileStructure.innerHTML +=
      '<button class="model-button" id="' +
      this.#name +
      '">' +
      this.#name +
      "</button>";
  }

  createPointButton() {
    for (let i = 0; i < this.#numVertices; i++) {
      fileStructure.innerHTML +=
        '<button class="point-button" id="' +
        this.#pointList[i].getName() +
        '">' +
        this.#pointList[i].getName() +
        "</button>";
    }
  }

  deletePoint(pointName) {
    for (let i = 0; i < this.#pointList.length; i++) {
      if (this.#pointList[i].getName() == pointName) {
        this.#pointList.splice(i, i);
        this.#vertices.splice(i * 2, 2);
        this.#numVertices -= 1;
        document.getElementById(pointSelected).style.display = "none";
      }
    }
  }

  getName() {
    return this.#name;
  }

  getCentroid() {
    return this.#centroid;
  }

  getVertices() {
    return this.#vertices;
  }

  getNumVertices() {
    return this.#numVertices;
  }

  getPointList() {
    return this.#pointList;
  }

  setVertices(newVertices) {
    this.#vertices = newVertices;
  }

  setVerticesColor(newColor) {
    this.#verticesColor = newColor;
  }

  setRotation(rotation) {
    this.#rotation = rotation;
  }

  setTranslationX(translationX) {
    this.#translation[0] = translationX;
  }

  setTranslationY(translationY) {
    this.#translation[1] = translationY;
  }

  setScaleX(scaleX) {
    this.#scale[0] = scaleX;
  }

  setScaleY(scaleY) {
    this.#scale[1] = scaleY;
  }

  updateCentroid() {
    for (let i = 0; i < this.#numVertices; i++) {
      this.#centroid[0] += this.#vertices[i * 2];
      this.#centroid[1] += this.#vertices[i * 2 + 1];
    }
    for (let i = 0; i < 2; i++) {
      this.#centroid[i] /= this.#numVertices;
    }
  }

  updateVerticesColor(index, newColor) {
    this.#verticesColor[index * 4] = newColor[0];
    this.#verticesColor[index * 4 + 1] = newColor[1];
    this.#verticesColor[index * 4 + 2] = newColor[2];
    this.#verticesColor[index * 4 + 3] = newColor[3];
  }

  updatePointLocationX(index, newCoordinate) {
    this.#pointList[index].setX(newCoordinate);
    this.#vertices[index * 2] = newCoordinate;
  }

  updatePointLocationY(index, newCoordinate) {
    this.#pointList[index].setY(newCoordinate);
    this.#vertices[index * 2 + 1] = newCoordinate;
  }

  flattenVertices() {}

  drawModel() {
    gl.uniform2fv(rotationLocation, this.#rotation);
    gl.uniform2fv(translationLocation, this.#translation);
    gl.uniform2fv(pivotLocation, this.#centroid);
    gl.uniform2fv(scaleLocation, this.#scale);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.#vertices),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.#verticesColor),
      gl.STATIC_DRAW
    );

    gl.drawArrays(this.#type, 0, this.#numVertices);
  }
}

class Point {
  #name;
  #coordinate_x;
  #coordinate_y;
  #color;

  constructor(name, x, y, color) {
    this.#name = name;
    this.#coordinate_x = x;
    this.#coordinate_y = y;
    this.#color = color;
  }

  getName() {
    return this.#name;
  }

  setColor(newColor) {
    this.#color = newColor;
  }

  setX(x) {
    this.#coordinate_x = x;
  }
  setY(y) {
    this.#coordinate_y = y;
  }
}
