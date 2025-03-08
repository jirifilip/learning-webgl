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

let yaw = -90
let yawChange = 0

const convertToRadians = degrees => degrees * (Math.PI / 180)

const calculateDirectionVector = yaw => {
    const radians = convertToRadians(yaw)
    
    return vec3.fromValues(
        Math.cos(radians),
        0,
        Math.sin(radians)
    )
}

let position = vec3.create()
let xzMovement = {right: 0, z: 0} 
document.addEventListener("keydown", (event) => {
    if (event.key == "w") {
        xzMovement.z = -1
    } 
    else if (event.key == "s") {
        xzMovement.z = 1
    }

    if (event.key == "e") {
        yawChange = 1;
    }
    if (event.key == "q") {
        yawChange = -1;
    }



    if (event.key == "a") {
        xzMovement.right = -1
    } 
    else if (event.key == "d") {
        xzMovement.right = 1
    }
})

document.addEventListener("keyup", (event) => {
    if (event.key == "w") {
        xzMovement.z = 0
    } 
    else if (event.key == "s") {
        xzMovement.z = 0
    }

    if (event.key == "e") {
        yawChange = 0
    } 
    else if (event.key == "q") {
        yawChange = 0
    }

    if (event.key == "a") {
        xzMovement.right = 0
    } 
    else if (event.key == "d") {
        xzMovement.right = 0
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

    // const viewMatrix = mat4.create()
    console.log(calculateDirectionVector(yaw))

    const speed = 5

    let then = 0;
    function render(now) {
        now *= 0.001; // convert to seconds
        const deltaTime = now - then;
        then = now;

        yaw += yawChange * deltaTime * speed * 10
        const direction = calculateDirectionVector(yaw)

        position[0] += xzMovement.right * deltaTime * speed
        position[2] += xzMovement.z * deltaTime * speed

        vec3.add(direction, position, direction)

        const viewMatrix = mat4.create()
        mat4.lookAt(
            viewMatrix,
            position,
            direction,
            [0, 1, 0]
        )

        // mat4.translate(
        //     viewMatrix, 
        //     viewMatrix,
        //     [xzMovement.x * deltaTime * speed, 0, xzMovement.z * deltaTime * speed]
        // )

        // mat4.multiply(viewMatrix, lookingAtMatrix, viewMatrix)
        
        meshes.forEach(mesh => mesh.rotateY(0.01).rotateX(0.01).rotateZ(0.01))
        drawScene(gl, shaderProgram, meshes, viewMatrix);
    
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
}


