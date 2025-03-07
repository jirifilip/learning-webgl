import { drawScene } from "./draw-scene.js";
import { Shader, ShaderProgram, loadShaderScript } from "./shader.js"
import { Mesh } from "./mesh.js"
import { createCustomRectangleMesh, createCustomCubeMesh } from "./playground.js";


async function initShaderProgram(gl) {
    const vertexShader = Shader.vertex(await loadShaderScript("vertex-shader"), gl).compile()
    const fragmentShader = Shader.fragment(await loadShaderScript("fragment-shader"), gl).compile()
    const shaderProgram = new ShaderProgram([vertexShader, fragmentShader], gl).link();
  
    return shaderProgram;
}

document.getElementById("my-paragraph").innerText = "Hello world"


main();


document.addEventListener("keydown", (event) => {
    console.log(event)
})


async function main() {
    const canvas = document.querySelector("#gl-canvas");
    const gl = canvas.getContext("webgl");

    const shaderProgram = await initShaderProgram(gl);

    const monkeyMesh = await Mesh.fromObjFile("resources/suzanne.obj", gl)
    const cubeMesh = (await Mesh.fromObjFile("resources/cube.obj", gl)).translate(2, 0, -10)
    const customMesh = createCustomCubeMesh(gl)

    const meshes = [
        monkeyMesh.bufferCopy().translate(-2, 1, -10),
        monkeyMesh.bufferCopy().translate(0, 0, -6),
        cubeMesh,
    ]

    let then = 0;
    function render(now) {
        now *= 0.001; // convert to seconds
        const deltaTime = now - then;
        then = now;
        
        meshes.forEach(mesh => mesh.rotateY(0.01).rotateX(0.01).rotateZ(0.01))
        drawScene(gl, shaderProgram, meshes);
    
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
}


