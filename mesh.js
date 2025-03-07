import { readObjFile } from "./3d_reader.js"


class Mesh {
    constructor(vertices, faces, context) {
        this.vertices = vertices
        this.vertexCount = faces.length * 3
        this.faces = faces
        this.context = context

        this.indexBuffer = this._allocateFacesBuffer()
        this.vertexBuffer = this._allocateVertexBuffer()
        this.colorBuffer = this._allocateColorBuffer()

        this.modelViewMatrix = mat4.create()
    }

    translate(x, y, z) {
        mat4.translate(
            this.modelViewMatrix,
            this.modelViewMatrix,
            [x, y, z]
        )
        
        return this
    }

    rotateY(rotation) {
        mat4.rotate(
            this.modelViewMatrix,
            this.modelViewMatrix,
            rotation,
            [0, 1, 0]
        );

        return this
    }

    draw(shaderProgram) {
        shaderProgram.setArrayBufferAttribute("aVertexPosition", this.vertexBuffer, 3)
        shaderProgram.setArrayBufferAttribute("aVertexColor", this.colorBuffer, 4)
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        shaderProgram.setUniformMatrix4F("uModelViewMatrix", this.modelViewMatrix)

        const type = this.context.UNSIGNED_SHORT;
        const offset = 0;
        this.context.drawElements(this.context.TRIANGLES, this.vertexCount, type, offset);
    }

    _allocateVertexBuffer() {
        const buffer =  this.context.createBuffer();

        this.context.bindBuffer( this.context.ARRAY_BUFFER, buffer);

        const vertices = this.vertices.flatMap(v => [v.x, v.y, v.z])

        this.context.bufferData( this.context.ARRAY_BUFFER, new Float32Array(vertices),  this.context.STATIC_DRAW);

        return buffer;
    }

    _allocateFacesBuffer() {
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, buffer);

        const indices = this.faces.flatMap(face => face.map(faceElement => faceElement.vertexIdx))

        this.context.bufferData(
            this.context.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices),
            this.context.STATIC_DRAW,
        );

        return buffer;
    }

    _allocateColorBuffer() {
        const baseColors = [
            1.0, 1.0, 1.0, 1.0, // white
            1.0, 0.0, 0.0, 1.0, // red
            0.0, 1.0, 0.0, 1.0, // green
            0.0, 0.0, 1.0, 1.0, // blue
        ];
        const colors = new Array(this.vertices.length)
            .fill(baseColors)
            .reduce((prev, curr) => prev.concat(curr))

        const colorBuffer = this.context.createBuffer();

        this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(colors), this.context.STATIC_DRAW);

        return colorBuffer;
    }

    static async fromObjFile(fileName, context) {
        const data = await readObjFile(fileName)
        return new Mesh(data.vertices, data.faces, context)        
    }
}

export { Mesh }