"use strict";

// 1. GL SETUP
// Get the canvas and WebGL context
var canvas = document.querySelector("#panel");
var gl = canvas.getContext("webgl2");
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var vertexBuffer = gl.createBuffer();
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
var shader;
var program = gl.createProgram();
var vao;

var lineShapes = [];
var squareShapes = [];
var rectangleShapes = [];
var polygonShapes = [];
var chosenShape = null;
var x = 0;
var y = 0;
var currShape = null;
var xRotate = -1;

var redColor = null;
var greenColor = null;
var blueColor = null;

var selectedShape = null;
var selectedVertex = null;
var selectedVertexID = null;
var selectedPoint = null;
var selectedDistance = Infinity;

var grabbedShape = null;
var grabbedPoint = null;

var coloredShape = null;
var coloredVertex = null;
var coloredVertexID = null;
var coloredPoint = null;

var dilatedShape = null;
var dilatedVertex = null;

var rotatedShape = null;
var rotatedVertex = null;

var shearedShape = null;
var shearedVertex = null;

var addedVertexShape = null;

var animationActive = false;

var model = "";
var positions = [];

const MODES = {
    Drawing: Symbol("Drawing"),
    Moving: Symbol("Moving"),
    None: Symbol("None"),
    Translate: Symbol("Translate"),
    Dilate: Symbol("Dilate"),
    Rotate: Symbol("Rotate"),
    Selecting: Symbol("Selecting"),
    Color: Symbol("Color"),
    PolygonAdd:  Symbol("Polygon_add"),
    PolygonDelete: Symbol("Polygon_del")
}


var currentMode = MODES.None;

function createShader(type, source) {
    shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
   
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(vertexShader, fragmentShader) {
    program = gl.createProgram();
    vertexBuffer = gl.createBuffer();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        // Bind buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        return program;
    }
    else {
        console.error('prog info-log:', gl.getProgramInfoLog(prog))
        console.error('vert info-log: ', gl.getShaderInfoLog(vs))
        console.error('frag info-log: ', gl.getShaderInfoLog(fs))
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
        canvas.width  = width;
        canvas.height = height;
        return true;
    }
    return false;
}

window.requestAnimFrame = (function () {
    // request Animation Frame
      return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback, element) {
              window.setTimeout(callback, 1000);
          };
  })();



setup();

function setup() {
    // Set canvas size and viewport
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    gl.clearColor(238, 238, 238, 1) // light background color
    gl.clear(gl.COLOR_BUFFER_BIT)   // clear the screen

    if (!gl) {
        alert("No WebGL support");
        return;
    }

    // Create & compile the shaders
    const vertexShaderSource = `#version 300 es
    in vec2 a_Position;
    in vec3 a_Color;
    out vec3 v_Color;
    void main() {
        v_Color = a_Color;
        gl_Position = vec4(a_Position, 0, 1);
    }`
    vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    
    const fragmentShaderSource = `#version 300 es
    precision highp float;
    in vec3 v_Color;
    out vec4 color;
    void main() {
        color = vec4(v_Color, 1);
    }`
    fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Link the program
    program = createProgram(vertexShader, fragmentShader);
    
    // Get attribute locations
    const a_PositionIndex = gl.getAttribLocation(program, 'a_Position')
    const a_ColorIndex = gl.getAttribLocation(program, 'a_Color')
    
    // Set up attribute buffers
    const a_PositionBuffer = gl.createBuffer()
    
    // Set up a vertex array object for attribute buffers iteration
    vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    
    // Pull 2 floats at a time out of the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, a_PositionBuffer)
    gl.vertexAttribPointer(a_PositionIndex, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0)
    gl.enableVertexAttribArray(a_PositionIndex)
    
    // Pull 4 floats at a time out of the color buffer
    // gl.bindBuffer(gl.ARRAY_BUFFER, a_ColorBuffer)
    gl.vertexAttribPointer(a_ColorIndex, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT)
    gl.enableVertexAttribArray(a_ColorIndex)

    gl.useProgram(program);

    gl.clearColor(238, 238, 238, 1) // light background color
    gl.clear(gl.COLOR_BUFFER_BIT)   // clear the screen
    
    // gl.drawArrays(gl.LINE_STRIP, 0, positions.length / 2)  // draw 1 point
    if (animationActive) {
        if (xRotate == 1) {
            xRotate == -1
        }
        xRotate += 0.1;
        redrawRotateAnimation(xRotate,0);
        window.requestAnimFrame(setup);
    }
    
}

