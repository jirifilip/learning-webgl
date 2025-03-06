function drawScene(gl, program, buffers, cubeRotation, vertexCount) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = mat4.create();
  mat4.translate(
    modelViewMatrix,
    modelViewMatrix,
    [-0.0, 0.0, -6.0]
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    cubeRotation * 0.7,
    [0, 1, 0]
  );

  program.setArrayBufferAttribute("aVertexPosition", buffers.position, 3)
  program.setArrayBufferAttribute("aVertexColor", buffers.color, 4)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  program.use()

  program.setUniformMatrix4F("uProjectionMatrix", projectionMatrix)
  program.setUniformMatrix4F("uModelViewMatrix", modelViewMatrix)

  const type = gl.UNSIGNED_SHORT;
  const offset = 0;
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
}

export { drawScene };
