import { FaceElement, Vertex } from "./3d_reader.js"
import { Mesh } from "./mesh.js"

const createCustomRectangleMesh = (context) => {
    const vertices = [
        new Vertex(-1, 1, 0),
        new Vertex(1, 1, 0),
        new Vertex(-1, -1, 0),
        new Vertex(1, -1, 0),
        new Vertex(0, 0, 0)
    ]

    const faces = [
        [new FaceElement(0), new FaceElement(1), new FaceElement(2)],
        [new FaceElement(1), new FaceElement(2), new FaceElement(3)],
    ]

    return new Mesh(vertices, faces, context)
}

export { createCustomRectangleMesh }