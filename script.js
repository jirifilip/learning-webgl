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


let xzMovement = {x: 0, z: 0} 
document.addEventListener("keydown", (event) => {
    if (event.key == "w") {
        xzMovement.z = 1
    } 
    else if (event.key == "s") {
        xzMovement.z = -1
    }

    if (event.key == "a") {
        xzMovement.x = 1
    } 
    else if (event.key == "d") {
        xzMovement.x = -1
    }
})

document.addEventListener("keyup", (event) => {
    if (event.key == "w") {
        xzMovement.z = 0
    } 
    else if (event.key == "s") {
        xzMovement.z = 0
    }

    if (event.key == "a") {
        xzMovement.x = 0
    } 
    else if (event.key == "d") {
        xzMovement.x = 0
    }
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

    const viewMatrix = mat4.create()
    const speed = 5

    let then = 0;
    function render(now) {
        now *= 0.001; // convert to seconds
        const deltaTime = now - then;
        then = now;

        mat4.translate(
            viewMatrix, 
            viewMatrix,
            [xzMovement.x * deltaTime * speed, 0, xzMovement.z * deltaTime * speed]
        )
        
        meshes.forEach(mesh => mesh.rotateY(0.01).rotateX(0.01).rotateZ(0.01))
        drawScene(gl, shaderProgram, meshes, viewMatrix);
    
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
}


