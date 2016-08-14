function Transform() {
    this.mPosition = vec2.fromValues(0, 0); //translation operator
    this.mScale = vec2.fromValues(1, 1);    //Scaling operator
    this.mRotationInRad = 0.0;              //Rotate in radians
}

//Position getters and setters
Transform.prototype.setPosition = function(xPos,yPos) { this.setXPos(xPos);this.setYPos(yPos);};
Transform.prototype.getPosition = function() {return this.mPosition;};
Transform.prototype.setXPos = function(xPos) {this.mPosition[0] = xPos;};
Transform.prototype.getXPos = function() {return this.mPosition[0];};
Transform.prototype.setYPos = function(yPos) {this.mPosition[1] = yPos;};
Transform.prototype.getYPos = function() {return this.mPosition[1];};

//Size getters and setters
Transform.prototype.setSize = function(width, height) {this.setWidth(width);this.setHeight(height);};
Transform.prototype.getSize = function() {return this.mScale;};
Transform.prototype.setWidth = function(width) {this.mScale[0] = width;};
Transform.prototype.getWidth = function() {return this.mScale[0];};
Transform.prototype.setHeight = function(height) {this.mScale[1] = height;};
Transform.prototype.getHeight = function() {return this.mScale[1];};


//Rotation getters and setters
Transform.prototype.setRotationInRad = function(rotationInRadians) {
  this.mRotationInRad = rotationInRadians;
  while (this.mRotationInRad > (2*Math.PI))
      this.mRotationInRad -= (2*Math.PI);
};
Transform.prototype.setRotationInDegree = function(rotationInDegree) {
    this.setRotationInRad(rotationInDegree * Math.PI/180.0);
};

Transform.prototype.getRotationInRad = function() {return this.mRotationInRad;};


Transform.prototype.getXform = function() {
  //Create a blank idetity matrix
  var matrix = mat4.create();
  
  //Step 1: compute translation, for now z is always at 0.0
  mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
  //Step 2: concatenate with rotation.
  mat4.rotateZ(matrix, matrix, this.getRotationInRad());
  //Step 3: concatenate with scaling.
  mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
  return matrix;
};