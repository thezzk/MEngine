var gEngine = gEngine || { };

gEngine.ResourceMap = (function(){
    var MapEntry = function(rName) {
        this.mAsset = rName;
    };
    // Resource storage
    var mResourceMap = {};
    
    // Number of outstanding load operations
    var mNumOutstandingLoads = 0;
    
    //Callback function when all textures are loaded
    var mLoadCompleteCallback = null;
    
    var _checkForAllLoadCompleted = function() {
        if((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
            // ensures the load complete call back will only be called once!
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    };
    // Make sure to set the callback _AFTER_ all load commands are issued
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        // in case all loading are done
        _checkForAllLoadCompleted();
    };
    var asyncLoadRequested = function(rName){
        mResourceMap[rName] = new MapEntry(rName); 
        ++mNumOutstandingLoads;
    };
    var asyncLoadCompleted = function(rName, loadedAsset) {
        if(!isAssetLoaded(rName))
            alter("gEngine.asyncLoadComplete: [" + rName + "] not in map!");
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    };
    var isAssetLoaded = function(rName) {
        return (rName in mResourceMap);
    };
    var retrieveAsset =  function(rName) {
        var r = null;
        if(rName in mResourceMap)
             r = mResourceMap[rName].mAsset;
         return r;
    };
    var unloadAsset = function(rName) {
        if(rName in mResourceMap) {
            delete mResourceMap[rName];
        }
    };
    
    var mPublic = { 
        // asynchronous resource loading support
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,
        
        //resource storage
        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };
    return mPublic;
}());


