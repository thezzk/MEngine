attribute vec3 aSquareVertexPosition; //Expects one vertex position
uniform mat4 uModelTransform; //to transform the vertex position
uniform mat4 uViewProjTransform;
void main(void) {
    gl_Position =uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);
}