function initBuffers(gl, object3d) {
    const positionBuffer = initPositionBuffer(gl, object3d);
  
    const colorBuffer = initColorBuffer(gl, object3d);

    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: initIndexBuffer(gl, object3d)
    };
}
  
function initPositionBuffer(gl, object3d) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.
  console.log(object3d.vertices[0].x)
  const positions = object3d.vertices.flatMap(v => [v.x, v.y, v.z])

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

function initIndexBuffer(gl, object3d) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = object3d.faces.flatMap(face => face.map(fe => fe.vertexIdx))
  console.log(indices)

  // Now send the element array to GL

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );

  return indexBuffer;
}


  

  function initColorBuffer(gl, object3d) {
    const baseColors = [
      1.0, 1.0, 1.0, 1.0, // white
      1.0, 0.0, 0.0, 1.0, // red
      0.0, 1.0, 0.0, 1.0, // green
      0.0, 0.0, 1.0, 1.0, // blue
    ];
    const colors = new Array(object3d.vertices.length).fill(baseColors).reduce((prev, curr) => prev.concat(curr))

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  
    return colorBuffer;
  }
  

export { initBuffers };
