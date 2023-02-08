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
  /*
  Menekan tombol Poligon untuk memulai mode poligon-???
  Tombol poligon akan berganti menjadi save
  Memasukkan titik dengan mengeklik canvas dan akan disimpan di array tempVertices sebelum dimasukkan ke all vertices
  Setelah selesai memasukkan titik klik tombol save maka akan terbentuk poligon
  */
  if (mode == "poligon-strip") {
    poligonStripButton.innerText = "Poligon STRIP";
    for (let i = 0; i < tempVertices.length; i++) {
      allVertices.push(tempVertices[i]);
    }
    offsetModel[numModel] = numVertices.reduce((total, a) => total + a, 0);
    numVertices[numModel] = tempVertices.length / 2;
    typeModel[numModel] = gl.TRIANGLE_STRIP;
    allColor[numModel] = tempColor;
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
  /*
  Menekan tombol Poligon untuk memulai mode poligon-???
  Tombol poligon akan berganti menjadi save
  Memasukkan titik dengan mengeklik canvas dan akan disimpan di array tempVertices sebelum dimasukkan ke all vertices
  Setelah selesai memasukkan titik klik tombol save maka akan terbentuk poligon
  */
  if (mode == "poligon-fan") {
    poligonFanButton.innerText = "Poligon FAN";
    for (let i = 0; i < tempVertices.length; i++) {
      allVertices.push(tempVertices[i]);
    }
    offsetModel[numModel] = numVertices.reduce((total, a) => total + a, 0);
    numVertices[numModel] = tempVertices.length / 2;
    typeModel[numModel] = gl.TRIANGLE_FAN;
    allColor[numModel] = tempColor;
    numModel++;
    render();
    mode = "";
  } else {
    poligonFanButton.innerText = "save";
    tempVertices = [];
    mode = "poligon-fan";
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
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allVertices), gl.STATIC_DRAW);

  for (let i = 0; i < numModel; i++) {
    console.log(allColor[i]);
    gl.uniform4fv(colorLocation, allColor[i]);
    gl.drawArrays(typeModel[i], offsetModel[i], numVertices[i]);
  }
}
////// MAIN //////

var canvas = document.getElementById("gl-canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
  alert("WebGL isn't available");
}

var mode = "";
var poligonStripButton = document.getElementById("poligon-strip");
var poligonFanButton = document.getElementById("poligon-fan");
var colorPicker = document.getElementById("color");

poligonStripButton.addEventListener("click", (e) => {
  polygonStripClick(e);
});

poligonFanButton.addEventListener("click", (e) => {
  polygonFanClick(e);
});

colorPicker.addEventListener("change", (e) => {
  let color = e.target.value;
  let r = parseInt(color.substr(1, 2), 16) / 255;
  let g = parseInt(color.substr(3, 2), 16) / 255;
  let b = parseInt(color.substr(5, 2), 16) / 255;
  tempColor = [r, g, b, 1];
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
var colorLocation = gl.getUniformLocation(program, "u_color");

var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

var numModel = 0; //Banyaknya model/bangun
var offsetModel = []; //offset pertama dari setiap model
var typeModel = []; //tipe primitive dari tiap model
var numVertices = []; //banyaknya vertex dari tiap model
var tempVertices = []; //menyimpan vertex sementara
var allVertices = []; //seluruh vertex yang telah dibuat
var tempColor = [0, 0, 0, 1]; //nilai color sementara
var allColor = []; //nilai color setiap model

webglUtils.resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0.8, 0.8, 0.8, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);

var size = 2;
var type = gl.FLOAT;
var normalize = false;
var stride = 0;
var offset = 0;
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);
