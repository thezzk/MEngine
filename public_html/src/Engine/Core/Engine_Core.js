"use strict";

var gEngine = gEngine || { }; //initialize the variable while ensuring it is not redefined
gEngine.Core =(function(){
    //instance variable: the graphiacl context for drawing
    var mGL = null;
    
    //Accessor of the webgl context
    var getGL = function() {return mGL; };
    
    
    
    //initialize the WebGL, the vertex buffer and compile the shaders
    var _initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        //Get the standard or experimental webgl and binds to the Canvas area
        //store the result to the instance variable mGL
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        if(mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
        
    };
    
    //initialize all of the EngineCore components
    var initializeEngineCore = function(htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        
        //Inits DefaultResources, when done, invoke startScene(myGame).
        gEngine.DefaultResources.initialize(function() {startScene(myGame)});
        gEngine.AudioClips.initAudioContext();
    };
    
    var startScene = function(myGame) {
        myGame.loadScene.call(myGame);
        gEngine.GameLoop.start(myGame);
    };
    
    //Clears the draw area
    var clearCanvas = function(color) {
        mGL.clearColor(color[0],color[1],color[2],color[3]); //set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };
    
    var inheritPrototype = function(subClass, superClass) {
        var prototype = Object.create(superClass, prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };
    
    //Contains the functions and variables that will be accessible.
    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype,
        startScene: startScene
    };
    return mPublic;
}());