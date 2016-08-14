function Renderable(shader) {
    this.mShader = shader; // the shader for shading this object
    this.mColor = [1, 1, 1, 1]; // Color for fragment shader
    this.mXform = new Transform(); //transform operator for the object
}

Renderable.prototype.draw = function(vpMatrix) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, vpMatrix);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function(color) {this.mColor = color; };
Renderable.prototype.getColor = function() { return this.mColor; };

Renderable.prototype.getXform = function() { return this.mXform; };

