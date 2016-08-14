function Camera(wcCenter, wcWidth, viewportArray) {
    //WC and viewport position and size
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray; // [x, y, width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;
    
    // transform matrix
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();
    
    //background color
    this.mBgColor = [0.8, 0.8, 0.8, 1];
}

//Setter/getter of WC and viewport\
Camera.prototype.setWCCenter = function(xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};
Camera.prototype.getWCCenter = function() { return this.mWCCenter; };
Camera.prototype.setWCWidth = function(width) { this.mWCWidth = width; };
Camera.prototype.setViewport = function(viewportArray) { this.mViewport = viewportArray; };
Camera.prototype.getViewport = function() { return this.mViewport;};
Camera.prototype.setBackgroundColor = function(newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function() { return this.mBgColor; };

//Getter for the View-Projection trnsform operator
Camera.prototype.getVPMatrix = function() {return this.mVPMatrix; };

//Initializes the camera to begin drawing
Camera.prototype.setupViewProjection = function() {
    var gl = gEngine.Core.getGL();
    //Step A: Configure the viewport
    //Step A1: Set up the viewport: area on canvas to be drawn
    gl.viewport(this.mViewport[0],
        this.mViewport[1],
        this.mViewport[2],
        this.mViewport[3]);
    //Step A2: Set up the corresponding scissor area to limit
    gl.scissor( this.mViewport[0],  //x of bottom-left
            this.mViewport[1],      //y of bottom-left
            this.mViewport[2],      //width
            this.mViewport[3]);     //height
    //Step A3: set the color to be clear
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);
    //Step A4: enable and clear the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);
    //Step B: define the View-Projection matrix
    //Step B1: define the view matrix
    mat4.lookAt(this.mViewMatrix,
        [this.mWCCenter[0], this.mWCCenter[1], 10],
        [this.mWCCenter[0], this.mWCCenter[1], 0],
        [0, 1, 0]);
    //Step B2: define the projection matrix
    var halfWCWidth = 0.5 * this.mWCWidth;
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2]; //matching aspect ration
    mat4.ortho(this.mProjMatrix,
        -halfWCWidth,   //distance to left of WC
        halfWCWidth,    //distance to right of WC
        -halfWCHeight,  //distance to bottom of WC
        halfWCHeight,   //distance to top of WC
        this.mNearPlane,    
        this.mFarPlane);
    //Step B3: concatnate view and projection matrices
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
};






