import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { Shader, ShaderProgram, loadShaderScript } from "./shader.js"
import { readObjFile } from "./3d_reader.js";


async function initShaderProgram(gl) {
    const vertexShader = Shader.vertex(await loadShaderScript("vertex-shader"), gl).compile()
    const fragmentShader = Shader.fragment(await loadShaderScript("fragment-shader"), gl).compile()
    const shaderProgram = new ShaderProgram([vertexShader, fragmentShader], gl).link();
  
    return shaderProgram;
}

document.getElementById("my-paragraph").innerText = "Hello world"


main();


async function main() {
    const canvas = document.querySelector("#gl-canvas");
    const gl = canvas.getContext("webgl");
    const object3d = await readObjFile("resources/suzanne.obj")

    const shaderProgram = await initShaderProgram(gl);
    const buffers = initBuffers(gl, object3d);

    let cubeRotation = 0.5
    let then = 0;
    function render(now) {
        now *= 0.001; // convert to seconds
        const deltaTime = now - then;
        then = now;
    
        drawScene(gl, shaderProgram, buffers, cubeRotation, object3d.faces.length * 3);
        cubeRotation += deltaTime;
    
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
}


