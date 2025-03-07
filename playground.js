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


const createCustomCubeMesh = (context) => {
    const vertices = [
        new Vertex(-1, 1, 1), // TOP LEFT FRONT
        new Vertex(1, 1, 1), // TOP RIGHT FRONT
        new Vertex(-1, -1, 1), // BOTTOM LEFT FRONT
        new Vertex(1, -1, 1), // BOTTOM RIGHT FRONT
        new Vertex(-1, 1, -1), // TOP LEFT BACK
        new Vertex(1, 1, -1), // TOP RIGHT BACK
        new Vertex(-1, -1, -1), // BOTTOM LEFT BACK
        new Vertex(1, -1, -1), // BOTTOM RIGHT BACK
    ]

    const faces = [
        [new FaceElement(0), new FaceElement(1), new FaceElement(2)], // FRONT UPPER DIAGONAL
        [new FaceElement(1), new FaceElement(2), new FaceElement(3)], // FRONT LOWER DIAGONAL
        [new FaceElement(4), new FaceElement(5), new FaceElement(6)], // BACK UPPER DIAGONAL
        [new FaceElement(5), new FaceElement(6), new FaceElement(7)], // BACK LOWER DIAGONAL
        [new FaceElement(1), new FaceElement(3), new FaceElement(5)], // TOP RIGHT FRONT, BOTTOM RIGHT FRONT, TOP RIGHT BACK => RIGHT SIDE UPPER DIAGONAL
        [new FaceElement(3), new FaceElement(7), new FaceElement(5)], // BOTTOM RIGHT FRONT, BOTTOM RIGHT BACK, TOP RIGHT BACK => RIGHT SIDE LOWER DIAGONAL
        [new FaceElement(0), new FaceElement(2), new FaceElement(4)], // TOP LEFT FRONT, BOTTOM LEFT FRONT, TOP LEFT BACK => LEFT SIDE UPPER DIAGONAL
        [new FaceElement(4), new FaceElement(6), new FaceElement(2)], // TOP LEFT BACK, BOTTOM LEFT BACK, BOTTOM LEFT FRONT => LEFT SIDE LOWER DIAGONAL
        [new FaceElement(0), new FaceElement(1), new FaceElement(4)], // TLF, TRF, TLB => TOP LEFT DIAGONAL
        [new FaceElement(1), new FaceElement(4), new FaceElement(5)], // TRF, TLB, TRB => TOP RIGHT DIAGONAL
        [new FaceElement(2), new FaceElement(3), new FaceElement(6)], // BLF, BRF, BLB => BOTTOM LEFT DIAGONAL
        [new FaceElement(3), new FaceElement(6), new FaceElement(7)], // BRF, BLB, BRB => BOTTOM RIGHT DIAGONAL
    ]

    return new Mesh(vertices, faces, context)
}


export { createCustomRectangleMesh, createCustomCubeMesh }