function MyGame() {
    //scene file name
    this.kSceneFile = "assets/scene.xml";
    //all squares
    this.mSqSet = new Array();
    
    //The camera to view the scene
    this.mCamera = null;
    //Sounds
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/MyGame_cue.wav";
};
gEngine.Core.inheritPrototype(MyGame, Scene);
MyGame.prototype.initialize = function() {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    //A
    this.mCamera = sceneParser.parseCamera();
    //B
    sceneParser.parseSquares(this.mSqSet);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

MyGame.prototype.update = function() {
   
    var whiteXform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
    //A
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
        gEngine.AudioClips.playACue(this.kCue);
        if(whiteXform.getXPos() > 30){
            gEngine.GameLoop.stop();
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
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.unloadScene = function() {
    // stop the background audio before unloading it
    gEngine.AudioClips.stopBackgroundAudio();
    //unloaded the scene resources
    //gEngine.AudioClips.unloadAudio(this.kBgClip);
    //  The above line is commented out on purpose because
    //  you know this clip will be used elsewhere in the game
    //  so you decide to not unload thi clip
    gEngine.AudioClips.unloadAudio(this.kCue);
    
    var nextLevel = new BlueLevel(); //next level to be loaded
    gEngine.Core.startScene(nextLevel);
};