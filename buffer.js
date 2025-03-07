class Buffer {
    constructor(context, bufferType = context.ARRAY_BUFFER, dataTypeFactory = Float32Array, drawType = context.STATIC_DRAW) {
        this._context = context
        this._bufferType = bufferType
        this._dataTypeFactory = dataTypeFactory
        this._drawType = drawType
        this._internalID = null
    }

    allocate(data) {
        this._internalID = this._context.createBuffer()

        this.use()

        this._context.bufferData( 
            this._bufferType,
            new this._dataTypeFactory(data),
            this._drawType
        )

        return this;
    }

    use() {
        this._context.bindBuffer(this._bufferType, this._internalID)

        return this;
    }

    getInternalID() {
        return this._internalID;
    }
}

export { Buffer }