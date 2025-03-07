import { FaceElement, Vertex } from "./3d_reader.js"
import { Mesh } from "./mesh.js"

const createCustomRectangleMesh = (context) => {
    const vertices = [
        new Vertex(-0.5, 0.5, 0),
        new Vertex(0.5, 0.5, 0),
        new Vertex(0.5, -0.5, 0),
        new Vertex(-0.5, 0.5, 0),
        new Vertex(0.5, -0.5, 0),
        new Vertex(-0.5, -0.5, 0),
    ]

    const faces = [
        [new FaceElement(1), new FaceElement(2), new FaceElement(3)],
        [new FaceElement(4), new FaceElement(5), new FaceElement(6)],
    ]

    return new Mesh(vertices, faces, context)
}

export { createCustomRectangleMesh }