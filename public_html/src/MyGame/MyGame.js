function MyGame(htmlCanvasID) {
    //A
    gEngine.Core.initializeWebGL(htmlCanvasID);
    var gl = gEngine.Core.getGL();
    //B
    this.mCamera = new Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
    //C
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl",
            "src/GLSLShaders/SimpleFS.glsl");
    //D
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0.25, 0.25, 1]);
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);
    //E
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    
    //F
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();
    
    //G
    this.mBlueSq.getXform().setPosition(20, 60);
    this.mBlueSq.getXform().setRotationInRad(0.2);
    this.mBlueSq.getXform().setSize(5, 5);
    this.mBlueSq.draw(vpMatrix);
    //H
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
    this.mRedSq.draw(vpMatrix);
    
    this.mTLSq.getXform().setPosition(10, 65);
    this.mTLSq.draw(vpMatrix);
    
    this.mTRSq.getXform().setPosition(30, 65);
    this.mTRSq.draw(vpMatrix);
    
    this.mBRSq.getXform().setPosition(30, 55);
    this.mBRSq.draw(vpMatrix);
    
    this.mBLSq.getXform().setPosition(10, 55);
    this.mBLSq.draw(vpMatrix);
            
};