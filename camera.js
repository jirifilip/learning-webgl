class Camera {
    constructor(position = vec3.fromValues(0, 0, 0), movementSpeed = 0.5, up = vec3.fromValues(0, 1, 0)) {
        this._position = position
        this._forwardDirection = vec3.fromValues(0, 0, -1)
        this._up = up
        this._movementSpeed = movementSpeed
    }

    moveLeft(delta) {
        const direction = vec3.fromValues(0, 0, 0)
        vec3.cross(
            direction,
            this._forwardDirection,
            this._up
        )
        
        const nudge = delta * this._movementSpeed
        const nudgeVector = vec3.fromValues(nudge, nudge, nudge)

        vec3.multiply(direction, direction, nudgeVector)
        vec3.add(this._position, this._position, direction)
    }

    moveRight(delta) {
        const direction = vec3.fromValues(0, 0, 0)
        vec3.cross(
            direction,
            this._forwardDirection,
            this._up
        )
        
        vec3.negate(direction, direction)

        const nudge = delta * this._movementSpeed
        const nudgeVector = vec3.fromValues(nudge, nudge, nudge)
        console.log(direction)

        vec3.multiply(direction, direction, nudgeVector)
        vec3.add(this._position, this._position, direction)
    }

    moveForward(delta) {

    }

    moveBackward(delta) {

    }

    lookThrough() {
        const matrix = mat4.create()

        mat4.lookAt(
            matrix,
            this._position,
            this._forwardDirection,
            this._up
        )

        return matrix
    }

}

export { Camera }