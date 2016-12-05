function BlueLevel() {
    //Scene file name
    this.kSceneFile = "assets/BlueLevel.xml";
    //all squares
    this.mSqSet = []; // these are the renderable objects
    // the camera to view the scene
    this.Camera = null;
    
    this.kBGClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function() {
    
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    
    gEngine.AudioClips.loadAudio(this.kBGClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};
BlueLevel.prototype.initialize = function() {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    //A
    this.mCamera = sceneParser.parseCamera();
    //B
    sceneParser.parseSquares(this.mSqSet);
    gEngine.AudioClips.playBackgroundAudio(this.kBGClip);
};
BlueLevel.prototype.draw = function() {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    for( var i = 0; i<this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};
BlueLevel.prototype.update = function() {
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
BlueLevel.prototype.unloadScene = function() {
    gEngine.AudioClips.stopBackgroundAudio();
    //unload the scene file 
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.unloadAudio(this.kBGClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};