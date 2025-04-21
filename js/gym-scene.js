const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
//variables to store animations.......
let pushupTrainer, jumpingJackTrainer, squatTrainer;

//Function to show only the selected trainer.........
function loadTrainer(name) {
    if (pushupTrainer) pushupTrainer.setEnabled(false);
    if (jumpingJackTrainer) jumpingJackTrainer.setEnabled(false);
    if (squatTrainer) squatTrainer.setEnabled(false);

    if (name === "PushUps" && pushupTrainer) pushupTrainer.setEnabled(true);
    if (name === "JumpingJacks" && jumpingJackTrainer) jumpingJackTrainer.setEnabled(true);
    if (name === "Squats" && squatTrainer) squatTrainer.setEnabled(true);
}


const createScene = async function() {
    const scene = new BABYLON.Scene(engine);

    // camera..............
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 25, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    // lightening..............
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    light.intensity = 0.8;

    // floor of my gym................
    const gymFloorMat = new BABYLON.StandardMaterial("gymFloorMat");
    gymFloorMat.diffuseTexture = new BABYLON.Texture("textures/gym-floor.png");
    gymFloorMat.specularColor = new BABYLON.Color3(0, 0, 0);

    const gymFloor = BABYLON.MeshBuilder.CreateGround("gymFloor", {
        width: 20,
        height: 20
    });
    gymFloor.material = gymFloorMat;
    gymFloor.receiveShadows = true;

    // walls of my gym room.............

    
    const wallMat = new BABYLON.StandardMaterial("wallMat");
    wallMat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
 
 //Front wall split into 3 parts to make a door...........
const frontWallLeft = BABYLON.MeshBuilder.CreateBox("frontWallLeft", {
    width: 8.5,
    height: 6,
    depth: 0.2
});
frontWallLeft.position = new BABYLON.Vector3(-5.75, 3, -10);
frontWallLeft.material = wallMat;

const frontWallRight = BABYLON.MeshBuilder.CreateBox("frontWallRight", {
    width: 8.5,
    height: 6,
    depth: 0.2
});
frontWallRight.position = new BABYLON.Vector3(5.75, 3, -10);
frontWallRight.material = wallMat;

const frontWallTop = BABYLON.MeshBuilder.CreateBox("frontWallTop", {
    width: 3,
    height: 2,
    depth: 0.2
});
frontWallTop.position = new BABYLON.Vector3(0, 5, -10); 
frontWallTop.material = wallMat;


//back wall......
const backWall = BABYLON.MeshBuilder.CreateBox("backWall", {
    width: 20,
    height: 6,
    depth: 0.2
});
backWall.position = new BABYLON.Vector3(0, 3, 10);
backWall.material = wallMat;

//Left and right side walls........    
    const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", {
        width: 20,
        height: 6,
        depth: 0.2
    });
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position = new BABYLON.Vector3(-10, 3, 0);
    leftWall.material = wallMat;

    const rightWall = leftWall.clone("rightWall");
    rightWall.position.x = 10;

    //Transparent glass panels as a stylish roof...........
    const glassMat = new BABYLON.StandardMaterial("glassMat", scene);
    glassMat.diffuseColor = new BABYLON.Color3(0.6, 0.8, 1); // light blue...
    glassMat.alpha = 0.3; // transparency
    
    // Left glass panel.....
    const glassPanel1 = BABYLON.MeshBuilder.CreatePlane("glass1", {
        width: 10,
        height: 20
    }, scene);
    glassPanel1.material = glassMat;
    glassPanel1.rotation.x = Math.PI / 2; // make it flat
    glassPanel1.position = new BABYLON.Vector3(-5, 6.1, 0); // just above the wall
    
    // Right glass panel........
    const glassPanel2 = glassPanel1.clone("glass2");
    glassPanel2.position.x = 5; // move to right
    
        // creating the YOGA MAT...................
        const yogaMat = BABYLON.MeshBuilder.CreatePlane("yogaMat", {
            width: 12,
            height: 6
        });
        yogaMat.rotation.x = Math.PI / 2;
        yogaMat.position = new BABYLON.Vector3(0, 0.01, 0);
    
        const matMat = new BABYLON.StandardMaterial("matMat");
        matMat.diffuseColor = new BABYLON.Color3(0.2, 0.6, 1);
        yogaMat.material = matMat;
    
       
        // STEP: loading animated Jumping Jack  model........................
        BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "JumpingJacks.glb", scene).then((result) => {
            jumpingJackTrainer = result.meshes[0];
            jumpingJackTrainer.setEnabled(false);
            jumpingJackTrainer.position = new BABYLON.Vector3(-2, 0.01, 0);
            jumpingJackTrainer.scaling = new BABYLON.Vector3(30, 30, 30);
            if (result.skeletons.length > 0) {
                scene.beginAnimation(result.skeletons[0], 0, 100, true);
            }
        });
        
        // loading animated Pushup model..............
        BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "PushUps.glb", scene).then((result) => {
            pushupTrainer = result.meshes[0];
            pushupTrainer.setEnabled(false);
            pushupTrainer.position = new BABYLON.Vector3(2, 0.01, 0);
            pushupTrainer.scaling = new BABYLON.Vector3(30, 30, 30);
            if (result.skeletons.length > 0) {
                scene.beginAnimation(result.skeletons[0], 0, 100, true);
            }
        });
        
        
          // loading animated squat model..............
          BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "squats.glb", scene).then((result) => {
            squatTrainer = result.meshes[0];
            squatTrainer.setEnabled(false);
            squatTrainer.position = new BABYLON.Vector3(4, 0.01, 0);
            squatTrainer.scaling = new BABYLON.Vector3(30, 30, 30);
            if (result.skeletons.length > 0) {
                scene.beginAnimation(result.skeletons[0], 0, 100, true);
            }
        });
        
// Treadmill model.....
BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "tredmill.glb", scene).then((result) => {
    const treadmill = result.meshes[0];
    treadmill.position = new BABYLON.Vector3(8, 0.5, 4);
    treadmill.scaling = new BABYLON.Vector3(3, 3, 3);
});
//dumbbell........
BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "dumbbell.glb", scene).then((result) => {
    const dumbbells = result.meshes[0];
    dumbbells.position = new BABYLON.Vector3(-6, 1, -4);
    dumbbells.scaling = new BABYLON.Vector3(4, 4, 4);
    dumbbells.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0); 
});

// Roman chair.......
BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "romanchair.glb", scene).then((result) => {
    const bench = result.meshes[0];
    bench.position = new BABYLON.Vector3(6, -0.1, -7);
    bench.scaling = new BABYLON.Vector3(0.75, 0.75, 0.75);
});


            // Checking to see basically if WebXR (immersive-vr, specifically) is supported on this device.....................
    if (await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr")) {
        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: [gymFloor],
            optionalFeatures: true
        });
    } else {
        console.log("WebXR is not supported on this device.");
    };

    
        return scene;
    
};

createScene().then((sceneToRender) => {
    engine.runRenderLoop(() => sceneToRender.render());
});

window.addEventListener("resize", function() {
    engine.resize();
});