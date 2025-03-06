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
    const object3d = await readObjFile("resources/cube.obj")

    const shaderProgram = await initShaderProgram(gl);
    const buffers = initBuffers(gl, object3d);

    drawScene(gl, shaderProgram, buffers);
}


