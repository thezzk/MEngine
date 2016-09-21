function MyGame(htmlCanvasID) {
    this.mConstColorShader = null;
    this.mWhiteSq = null;
    this.mRedSq = null;
    this.mCamera =null;
    gEngine.Core.initializeEngineCore(htmlCanvasID);
    this.initialize();        
};

MyGame.prototype.initialize = function() {
    //A
    this.mCamera = new Camera(vec2.fromValues(20,60), 20,[20, 40, 600, 300]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    //B
    this.mConstColorShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");
    //C
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);
    //D
    this.mWhiteSq.getXform().setPosition(20, 60);
    this.mWhiteSq.getXform().setRotationInRad(0.2);
    this.mWhiteSq.getXform().setSize(5, 5);
    //E
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
    //F
    gEngine.GameLoop.start(this);
    
};

MyGame.prototype.update = function() {
   
    var whiteXform = this.mWhiteSq.getXform();
    var deltaX = 0.05;
    //A
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
        if(whiteXform.getXPos() > 30){
            whiteXform.setPosition(10, 60);
        }
        whiteXform.incXPosBy(deltaX);
    }
    //B
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
        whiteXform.incRotationByDegree(1);
    
    var redXform = this.mRedSq.getXform();
    //C
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if(redXform.getWidth() > 5)
            redXform.setSize(2, 2);
        redXform.incSizeBy(0.05);
    }
};

MyGame.prototype.draw = function() {
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
  this.mCamera.setupViewProjection();
  this.mWhiteSq.draw(this.mCamera.getVPMatrix());
  this.mRedSq.draw(this.mCamera.getVPMatrix());
};
