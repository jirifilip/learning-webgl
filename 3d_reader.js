class Vertex {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    static fromObjLine(line) {
        if (!line.startsWith("v ")) {
            return null
        }
        
        const [x, y, z] = (
            line
            .split(" ") // split "v 1 2 3"
            .slice(1) // remove the introductory "v" for vertex
            .map(parseFloat)
        )

        return new Vertex(x, y, z)
    }
}


class FaceElement {
    constructor(vertexIdx, textureIdx, normalIdx) {
        this.vertexIdx = vertexIdx
        this.textureIdx = textureIdx
        this.normalIdx = normalIdx
    }

    static fromObjLine(line) {
        if (!line.startsWith("f ")) {
            return null
        }

        return (
            line
            .split(" ")
            .slice(1)
            .map(elements => elements.split("/").map(parseFloat).map(Math.trunc).map(x => x - 1))
            .map(elements => new FaceElement(...elements))
        )
    }
}


const _readLines = fileContent => (
    fileContent
    .split(/\r?\n/)
    .filter(fileContent => !fileContent.startsWith("#"))
) 

const _readVertices = lines => lines.map(Vertex.fromObjLine).filter(x => x != null)
const _readFaces = lines => lines.map(FaceElement.fromObjLine).filter(x => x != null)


const readObjFile = async (fileName) => {
    const file = await fetch(fileName)
    const content = await file.text()

    const lines = _readLines(content)
    return {"vertices": _readVertices(lines), "faces": _readFaces(lines)}
}

export {readObjFile, Vertex, FaceElement}