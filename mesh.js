import { readObjFile } from "./3d_reader.js"
import { Buffer } from "./buffer.js"


class Mesh {
    constructor(vertices, faces, context, indexBuffer = null, vertexBuffer = null, colorBuffer = null) {
        this.vertices = vertices
        this.vertexCount = faces.length * 3
        this.faces = faces
        this.context = context

        this.indexBuffer = indexBuffer || this._allocateFacesBuffer()
        this.vertexBuffer = vertexBuffer || this._allocateVertexBuffer()
        this.colorBuffer = colorBuffer || this._allocateColorBuffer()

        this.modelViewMatrix = mat4.create()
    }

    bufferCopy() {
        return new Mesh(this.vertices, this.faces, this.context, this.indexBuffer, this.vertexBuffer, this.colorBuffer)
    }

    translate(x, y, z) {
        mat4.translate(
            this.modelViewMatrix,
            this.modelViewMatrix,
            [x, y, z]
        )
        
        return this
    }

    rotateX(rotation) {
        this._rotate("x", rotation)
        return this
    }

    rotateY(rotation) {
        this._rotate("y", rotation)
        return this
    }

    rotateZ(rotation) {
        this._rotate("z", rotation)
        return this
    }

    _rotate(axisName, howMuch) {
        const axisIndex = "xyz".indexOf(axisName.toLowerCase())
        const axisVector = new Array(3).fill(0).map((x, i) => i == axisIndex ? 1 : 0)

        mat4.rotate(
            this.modelViewMatrix,
            this.modelViewMatrix,
            howMuch,
            axisVector
        );
    }

    draw(shaderProgram) {
        shaderProgram.setArrayBufferAttribute("aVertexPosition", this.vertexBuffer, 3)
        shaderProgram.setArrayBufferAttribute("aVertexColor", this.colorBuffer, 4)
        shaderProgram.setUniformMatrix4F("uModelViewMatrix", this.modelViewMatrix)

        this.indexBuffer.use()
        const type = this.context.UNSIGNED_SHORT;
        const offset = 0;
        this.context.drawElements(this.context.TRIANGLES, this.vertexCount, type, offset);
    }

    _allocateVertexBuffer() {
        const vertices = this.vertices.flatMap(v => [v.x, v.y, v.z])
        return new Buffer(this.context).allocate(vertices);
    }

    _allocateFacesBuffer() {
        const indices = this.faces.flatMap(face => face.map(faceElement => faceElement.vertexIdx))

        return new Buffer(
            this.context,
            this.context.ELEMENT_ARRAY_BUFFER,
            Uint16Array,
        ).allocate(indices);
    }

    _allocateColorBuffer() {
        const baseColors = [
            1.0, 0.0, 0.0, 1.0, // red
            0.0, 1.0, 0.0, 1.0, // green
            0.0, 0.0, 1.0, 1.0, // blue
        ];
        const colors = new Array(this.vertices.length)
            .fill(baseColors)
            .reduce((prev, curr) => prev.concat(curr))

        return new Buffer(this.context).allocate(colors);
    }

    static async fromObjFile(fileName, context) {
        const data = await readObjFile(fileName)
        return new Mesh(data.vertices, data.faces, context)        
    }
}

export { Mesh }