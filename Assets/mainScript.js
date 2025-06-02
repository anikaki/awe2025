//@input Component.ScriptComponent buttonScript
//@input Component.ScriptComponent startButtonScript
//@input Asset.ObjectPrefab[] initialPreviewPrefabs
//@input Asset.ObjectPrefab[] spawnPrefabs
//@input Component.DeviceTracking deviceTracking
//@input SceneObject parent

var previewObjects = [];
var previewCount = 3;
var spawnCount = 10;
var spawnHeight = 5;
var spawnArea = 50;




// ----- Functions -----

function startGame() {
    print("🎮 Game Started");
}

// Show initial previews
showPreviewObjects();

function showPreviewObjects() {
    let available = script.initialPreviewPrefabs.slice();
    for (let i = 0; i < previewCount && available.length > 0; i++) {
        let index = Math.floor(Math.random() * available.length);
        let prefab = available.splice(index, 1)[0];
        if (prefab) {
            let instance = prefab.instantiate(script.getSceneObject());
            instance.getTransform().setLocalPosition(new vec3(i * 10 - 10, 0, spawnHeight));
            previewObjects.push(instance);
        }
    }
}

function hidePreviewObjects() {
    previewObjects.forEach(function(obj) {
        if (obj) obj.enabled = false;
    });
}

function spawnObjects() {
    for (let i = 0; i < spawnCount; i++) {
        let prefab = pickRandom(script.spawnPrefabs);
        if (prefab) {
            let instance = prefab.instantiate(null); // no parent, so it's in world space

            // Generate a random position within the spawn area on the XZ plane
            let worldPos = new vec3(
                getRandomRange(-spawnArea, spawnArea),
                spawnHeight,  // Y axis is height in world space
                getRandomRange(-spawnArea, spawnArea)
            );

            instance.getTransform().setWorldPosition(worldPos);
        }
    }
}

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Expose the functions so they can be called from another script
script.hidePreviewObjects = hidePreviewObjects;
script.spawnObjects = spawnObjects;
//script.startGame = startGame;
script.api.gameStarted = false;
script.api.startGame = function () {
    print("🎬 Game Started! oh lala ");
  
};

// Now pass this script into the button script
script.buttonScript.api.mainScript = script;
// Now pass this script into the startButton script
script.startButtonScript.api.mainScript = script;

