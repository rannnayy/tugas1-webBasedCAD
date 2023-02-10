const vSource = `
    attribute vec2 vPosition;

    attribute vec4 vColor;
    varying vec4 fColor;
    uniform mat3 u_matrix;
    void main() {
        fColor = vColor;
        gl_Position = vec4((u_matrix * vec3(vPosition, 1)).xy, 0, 1);
    }
    `;
const fSource = `
    precision mediump float;
    varying vec4 fColor;
    void main() {
        gl_FragColor = fColor;
    }
    `;

// Inisiasi Variabel
var speed = 100;
var direction = true;
var toggle = false;
var requestId;

var vertice1 = [0,0];
var vertice2 = [200,0];
var vertice3 = [0,300];
var vertice4 = [0,300];
var vertice5 = [200,0];
var vertice6 = [200, 300];

var color1 = [1,0,0,1];
var color2 = [0,1,0,1];
var color3 = [0,0,1,1];
var color4 = [0,0,1,1];
var color5 = [0,1,0,1];
var color6 = [1,0,0,1];

var point1 = [0,0];
var point2 = [200,300];

var vertices = [
  vertice1, vertice2, vertice3, vertice4, vertice5, vertice6
];

var colors = [
  color1, color2, color3, color4, color5, color6
];

var translation = [0,0];
var angleInRadians = 0;
var scale = [1, 1, 1, 1];
var color = [0, 0, 0, 1];

// Inisiasi element HTML
const canvas = document.getElementById('gl-canvas');
const directionButton = document.getElementById("direction");
const toggleButton = document.getElementById("toggle");

var colorPointTopLeft = document.getElementById("color1").checked;
var colorPointTopRight = document.getElementById("color2").checked;
var colorPointBottomRight = document.getElementById("color3").checked;
var colorPointBottomLeft = document.getElementById("color4").checked;

var pointTopLeft = document.getElementById("point1");
var pointTopRight = document.getElementById("point2");
var pointBottomRight = document.getElementById("point3");
var pointBottomLeft = document.getElementById("point4");



// Inisiasi WebGL
const gl = setupWebGL(canvas);
const program = initShaders(gl, vSource, fSource);

// ambil lokasi posisi
var positionLocation = gl.getAttribLocation(program, "vPosition");

// ambil lokasi uniform
var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
var matrixLocation = gl.getUniformLocation(program, "u_matrix");

// inisiai buffer
const vBuffer = gl.createBuffer();
const cBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

setUpUI();
render();


function render() {
  // Render model
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = undefined;
    }
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 0.8);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // set resolusi
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set warna
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    const vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Komputasi matriks
    var matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    matrix = m3.translate(matrix, translation[0], translation[1]);
    if (pointTopLeft.checked) {
      matrix = m3.translate(matrix, Math.abs(point2[0]), Math.abs(point2[1]));
      matrix = m3.rotate(matrix, angleInRadians);
      matrix = m3.scale(matrix, scale[0], scale[1]);
      matrix = m3.scale(matrix, scale[2], scale[3]);
      matrix = m3.translate(matrix, -Math.abs(point2[0]), -Math.abs(point2[1]));
      
    }
    if (pointTopRight.checked) {
      matrix = m3.translate(matrix, Math.abs(point1[0]), Math.abs(point2[1]));
      matrix = m3.rotate(matrix, angleInRadians);
      matrix = m3.scale(matrix, scale[0], scale[1]);
      matrix = m3.scale(matrix, scale[2], scale[3]);
      matrix = m3.translate(matrix, -Math.abs(point1[0]), -Math.abs(point2[1]));
    }
    if (pointBottomRight.checked) {
      matrix = m3.translate(matrix, Math.abs(point1[0]), Math.abs(point1[1]));
      matrix = m3.rotate(matrix, angleInRadians);
      matrix = m3.scale(matrix, scale[0], scale[1]);
      matrix = m3.scale(matrix, scale[2], scale[3]);
      matrix = m3.translate(matrix, -Math.abs(point1[0]), -Math.abs(point1[1]));
    }
    if (pointBottomLeft.checked) {
      matrix = m3.translate(matrix, Math.abs(point2[0]), Math.abs(point1[1]));
      matrix = m3.rotate(matrix, angleInRadians);
      matrix = m3.scale(matrix, scale[0], scale[1]);
      matrix = m3.scale(matrix, scale[2], scale[3]);
      matrix = m3.translate(matrix, -Math.abs(point2[0]), -Math.abs(point1[1]));
    }
    
    gl.uniformMatrix3fv(matrixLocation, false, matrix);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
    
    // animasi
    if (toggle) {
      angleInRadians+= (direction ? 0.01 : -0.01);
      setTimeout(
        function () {requestId = window.requestAnimFrame(render);},
        speed
      );
    }
    else {
      window.requestAnimFrame(render);
    }
    
    
}

function build() {
  // membuat bangun dengan mouse
    var x1 = point1[0];
    var x2 = point2[0];
    var y1 = point1[1];
    var y2 = point2[1];

    vertices = [
        [x1,y1],[x2, y1],[x1, y2],[x1, y2],
        [x2,y1],[x2, y2]
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    translation = [0, 0];
    angleInRadians = 0;
    scale = [1, 1, 1, 1];

    setUpUI();
}

function updatePosition(index) {
  // update posisi
  return function(event, ui) {
    translation[index] = ui.value;
    checkElementHTML()
    render();
  };
}

function updateAngle(event, ui) {
  // update sudut
  var angleInDegrees = 360 - ui.value;
  angleInRadians = angleInDegrees * Math.PI / 180;
  checkElementHTML()
  render();
}

function updateScale(index1, index2) {
  // update skala
  return function(event, ui) {
    checkElementHTML()
    scale[index1] = ui.value;
    if (index2) {
      scale[index2] = ui.value;
    }
    render();
  };
}

function updateColor(index) {
  // update warna
  return function(event, ui) {
    color[index] = ui.value;
    changeColor();
  };
}

function updateSpeed() {
  // update kecepatan
  return function(event, ui) {
    speed = 100 - ui.value;
    render();
  };
}


canvas.addEventListener('mousedown', (e) => {
  // mendapatkan posisi mouse ketika di klik
  const rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  point1 = [x,y];
  console.log(x,y);
});

canvas.addEventListener('mouseup', (e) => {
  // mendapatkan posisi mouse ketika di lepas
  const rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  point2 = [x,y];
  console.log(x,y);

  build();
  render();
});

// event listener untuk radio button
pointBottomLeft.addEventListener("click", () => {
  render();}
);

pointBottomRight.addEventListener("click", () => {
  render();}
);

pointTopLeft.addEventListener("click", () => {
  render();}
);

pointTopRight.addEventListener("click", () => {
  render();}
);

toggleButton.addEventListener("click", () => {
  toggle = !toggle;
});

directionButton.addEventListener("click", () => {
  direction = !direction;
});

function setUpUI() {
  // setup slider
  webglLessonsUI.setupSlider("#x", {value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
  webglLessonsUI.setupSlider("#y", {value: translation[1], slide: updatePosition(1), max: gl.canvas.height});
  webglLessonsUI.setupSlider("#angle", {slide: updateAngle, max: 360});
  webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: 0, max: 5, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: 0, max: 5, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#scaleXY", {value: scale[2], slide: updateScale(2,3), min: 0, max: 5, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#red", {value: color[0], slide: updateColor(0), min: 0, max: 1, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#green", {value: color[1], slide: updateColor(1), min: 0, max: 1, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#blue", {value: color[2], slide: updateColor(2), min: 0, max: 1, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#opacity", {value: color[3], slide: updateColor(3), min: 0, max: 1, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#speed", {value: scale[1], slide: updateSpeed(), min: 10, max: 100, step: 10, precision: 2});

}

function checkElementHTML() {
  // cek radio dan checkbox button
  colorPointTopLeft = document.getElementById("color1").checked;
  colorPointTopRight = document.getElementById("color2").checked;
  colorPointBottomRight = document.getElementById("color3").checked;
  colorPointBottomLeft = document.getElementById("color4").checked;

  pointTopLeft = document.getElementById("point1");
  pointTopRight = document.getElementById("point2");
  pointBottomRight = document.getElementById("point3");
  pointBottomLeft = document.getElementById("point4");
}

function changeColor() {
  // ganti warna
  checkElementHTML();
  if (colorPointTopLeft) {
    color1 = [...color];
  }
  if (colorPointTopRight) {
    color2 = [...color];
    color5 = [...color];
  }
  if (colorPointBottomLeft) {
    color3 = [...color];
    color4 = [...color];
  }
  if (colorPointBottomRight) {
    color6 = [...color];
  }
  colors = [
    color1, color2, color3, color4, color5, color6
  ]
  render();
}










