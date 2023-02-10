function setupWebGL(canvas) {
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
    if (!gl) {
        alert('WebGL not supported');
    }
    return gl;
}

function initShaders(gl, vertexSource, fragmentSource) {
    // Initialize shaders
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const msg = 'Unable to initialize the shader program: ' + gl.getProgramInfoLog(program);
        alert(msg);
        return -1;
    }

    return program;
}

function loadShader(gl, type, source) {
  // Load shader
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const msg = 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader);
        alert(msg);
        gl.deleteShader(shader);
        return -1;
    }

    return shader;
}

function flatten(v) {
  // flatten a 2D array into a 1D array
    if (v.matrix === true) {
        v = transpose(v);
    }

    let n = v.length;
    
    let elemsAreArrays = false;

    if (Array.isArray(v[0])) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    const floats = new Float32Array(n);

    if (elemsAreArrays) {
        let idx = 0;
        for (let i = 0; i < v.length; ++i) {
            for (let j = 0; j < v[i].length; ++j) {
                floats[idx++] = v[i][j];
            }
        }
    } else {
        for (let i = 0; i < v.length; ++i) {
            floats[i] = v[i];
        }
    }

    console.log(floats)

    return floats;
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
    // esize a canvas to match the size its displayed
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
            window.setTimeout(callback, 1000 / 60);
        };
})();

var m3 = {
    projection: function(width, height) {
      // projection matrix
      return [
        2 / width, 0, 0,
        0, -2 / height, 0,
        -1, 1, 1
      ];
    },
      identity: function() {
        // identity matrix
        return [
          1, 0, 0,
          0, 1, 0,
          0, 0, 1,
        ];
      },
    
      translation: function(tx, ty) {
        // translation matrix
        return [
          1, 0, 0,
          0, 1, 0,
          tx, ty, 1,
        ];
      },
    
      rotation: function(angleInRadians) {
        // rotation matrix
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
        return [
          c,-s, 0,
          s, c, 0,
          0, 0, 1,
        ];
      },
    
      scaling: function(sx, sy) {
        // scaling matrix
        return [
          sx, 0, 0,
          0, sy, 0,
          0, 0, 1,
        ];
      },
    
      multiply: function(a, b) {
        // multiply matrix
        var a00 = a[0 * 3 + 0];
        var a01 = a[0 * 3 + 1];
        var a02 = a[0 * 3 + 2];
        var a10 = a[1 * 3 + 0];
        var a11 = a[1 * 3 + 1];
        var a12 = a[1 * 3 + 2];
        var a20 = a[2 * 3 + 0];
        var a21 = a[2 * 3 + 1];
        var a22 = a[2 * 3 + 2];
        var b00 = b[0 * 3 + 0];
        var b01 = b[0 * 3 + 1];
        var b02 = b[0 * 3 + 2];
        var b10 = b[1 * 3 + 0];
        var b11 = b[1 * 3 + 1];
        var b12 = b[1 * 3 + 2];
        var b20 = b[2 * 3 + 0];
        var b21 = b[2 * 3 + 1];
        var b22 = b[2 * 3 + 2];
        return [
          b00 * a00 + b01 * a10 + b02 * a20,
          b00 * a01 + b01 * a11 + b02 * a21,
          b00 * a02 + b01 * a12 + b02 * a22,
          b10 * a00 + b11 * a10 + b12 * a20,
          b10 * a01 + b11 * a11 + b12 * a21,
          b10 * a02 + b11 * a12 + b12 * a22,
          b20 * a00 + b21 * a10 + b22 * a20,
          b20 * a01 + b21 * a11 + b22 * a21,
          b20 * a02 + b21 * a12 + b22 * a22,
        ];
      },
      translate: function(m, tx, ty) {
        // translate matrix
        return m3.multiply(m, m3.translation(tx, ty));
      },
     
      rotate: function(m, angleInRadians) {
        // rotate matrix
        return m3.multiply(m, m3.rotation(angleInRadians));
      },
     
      scale: function(m, sx, sy) {
        // scale matrix
        return m3.multiply(m, m3.scaling(sx, sy));
      },
    };

