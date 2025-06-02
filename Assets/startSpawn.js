// @input Component.ScriptComponent buttonScript
// @input SceneObject buttonObject  

function onPressDownCallback() {
    print('Button Pressed Down!');
    if (script.api.mainScript) {
        print("✅ Button Pressed!");
        
        script.api.mainScript.spawnObjects();
        script.api.mainScript.hidePreviewObjects();
        script.buttonObject.enabled = false;
    }
}

function onPressUpCallback() {
    print('Button Pressed Up!');
}

// Register callbacks
script.buttonScript.onPressDown.add(onPressDownCallback);
script.buttonScript.onPressUp.add(onPressUpCallback);