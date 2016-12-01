function MyGame() {
    //scene file name
    this.kSceneFile = "assets/scene.xml";
    //all squares
    this.mSqSet = new Array();
    
    //The camera to view the scene
    this.mCamera = null;
};

MyGame.prototype.initialize = function() {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    //A
    this.mCamera = sceneParser.parseCamera();
    //B
    sceneParser.parseSquares(this.mSqSet);
    
};

MyGame.prototype.update = function() {
   
    var whiteXform = this.mSqSet[0].getXform();
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
    
    var redXform = this.mSqSet[1].getXform();
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
  for( var i = 0; i<this.mSqSet.length; i++) {
      this.mSqSet[i].draw(this.mCamera.getVPMatrix());
  }
};

MyGame.prototype.loadScene = function() {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function() {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};