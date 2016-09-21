var gEngine = gEngine || { };

gEngine.DefaultResources = (function(){
    // Simple Shader GLSL Shader file paths
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    
    var mConstColorShader = null;
    var _getConstColorShader = function() { return mConstColorShader; };
    
    //callback function after loading are done
    var _createShaders = function(callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };
    
    //initiate asynchronous loading of GLSL Shader files
    var _initialize = function(callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.ResourceMap.setLoadCompleteCallback(
                function(){_createShaders(callBackFunction);}
                );
    };
   
    var mPublic = {
        initialize: _initialize,
        getConstColorShader: _getConstColorShader
    };
    return mPublic;
}());