class Shader {
    constructor(source, type, context) {
        this._source = source
        this._type = type
        this._context = context
        this._internalID = null
    }

    compile() {
        this._internalID = this._context.createShader(this._type)

        this._context.shaderSource(this._internalID, this._source)
        this._context.compileShader(this._internalID)
        
        if (!this._context.getShaderParameter(this._internalID, this._context.COMPILE_STATUS)) {
            const log = this._context.getShaderInfoLog(this._internalID)
            this._context.deleteShader(this._internalID);
            throw Error(`Error while compiling shader: ${log}`)
        }

        return this
    }

    getID() {
        return this._internalID
    }

    static vertex(source, context) {
        return new Shader(source, context.VERTEX_SHADER, context)
    }     

    static fragment(source, context) {
        return new Shader(source, context.FRAGMENT_SHADER, context)
    }

}


class ShaderProgram {
    constructor(shaders, context) {
        this._shaders = shaders
        this._internalID = null
        this._context = context
    }

    link() {
        this._internalID = this._context.createProgram();
        
        this._shaders.forEach(shader => {
            this._context.attachShader(this._internalID, shader.getID())
        });
        this._context.linkProgram(this._internalID);
  
        if (!this._context.getProgramParameter(this._internalID, this._context.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${this._context.getProgramInfoLog(
            this._internalID,
            )}`,
        );
        return null;
        }
    
        return this;
    }

    use() {
        this._context.useProgram(this._internalID);
    }

    setUniformMatrix4F(uniformName, matrix) {
        const location = this._context.getUniformLocation(this._internalID, uniformName)
        this._context.uniformMatrix4fv(location, false, matrix)
    }

    setArrayBufferAttribute(attributeName, buffer, nComponents) {
        const attributeLocation = this._context.getAttribLocation(this._internalID, attributeName)

        const type = this._context.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        
        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
        this._context.vertexAttribPointer(
          attributeLocation,
          nComponents,
          type,
          normalize,
          stride,
          offset,
        );
        this._context.enableVertexAttribArray(attributeLocation);
      }
}


async function loadShaderScript(id) {
    const scriptFile = document.getElementById(id).src
    const response = await fetch(scriptFile)
    const text = await response.text()
    return text
} 


export { Shader, ShaderProgram, loadShaderScript }