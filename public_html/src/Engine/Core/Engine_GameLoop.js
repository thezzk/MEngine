var gEngine = gEngine || { };

gEngine.GameLoop = (function(){
    var mPublic = { };
    return mPublic;
}());

var kFPS = 60;              //FPS
var kMPF = 1000 / kFPS;     //Milleseconds per frame

//Variables for timing gameloop
var mPreviousTime;
var mLagTime;
var mCurrentTime;
var mElapsedTime;

//The current loop state (running or should stop)
var mIsLoopRunning = false;

//Reference to game logic
var mMyGame = null;

// This function assumes it is sub-classed from MyGame
var _runLoop = function () {
    if(mIsLoopRunning) {
        //Step A: set up for next call to _runLoop and update input!
        requestAnimationFrame( function(){_runLoop.call(mMyGame);});
        //Step B: compute elapsed time since last RunLoop was executed
        mCurrentTime = Date.now();
        mElapsedTime = mCurrentTime - mPreviousTime;
        
    }
};