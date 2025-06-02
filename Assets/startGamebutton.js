//// @input Component.ScriptComponent startButtonScript
//// @input SceneObject startButtonObject  
//
//function onPressDownCallback() {
//    print(' Start Button Pressed Down!');
//    if (script.api.mainScript) {
//        print("✅ Start Button Pressed!");
//        script.api.mainScript.startGame();
//        script.startButtonObject.enabled = false;
//    }
//}
//
//function onPressUpCallback() {
//    print('Button Pressed Up!');
//}
//
//// Register callbacks
//script.startButtonScript.onPressDown.add(onPressDownCallback);
//script.startButtonScript.onPressUp.add(onPressUpCallback);
// StartButton.js

// @input Component.ScriptComponent mainScript

if (!script.mainScript) {
    print("⚠️ Please assign 'mainScript' in the Inspector.");
}

// Handle touch event
function onTouch() {
    if (script.mainScript.api.startGame) {
        script.mainScript.api.startGame(); // Call the game logic directly
    } else {
        print("⚠️ mainScript.api.startGame not found.");
    }

    // Hide this Start Button
    //script.getSceneObject().enabled = false;
    script.startButtonObject.enabled = false;
}

// Bind to touch event
script.createEvent("TouchStartEvent").bind(onTouch);
