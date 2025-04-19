const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

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

    const frontWall = BABYLON.MeshBuilder.CreateBox("frontWall", {
        width: 20,
        height: 3,
        depth: 0.2
    });
    frontWall.position = new BABYLON.Vector3(0, 1.5, -10);
    frontWall.material = wallMat;

    const backWall = frontWall.clone("backWall");
    backWall.position.z = 10;

    const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", {
        width: 20,
        height: 3,
        depth: 0.2
    });
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position = new BABYLON.Vector3(-10, 1.5, 0);
    leftWall.material = wallMat;

    const rightWall = leftWall.clone("rightWall");
    rightWall.position.x = 10;

        // creating the YOGA MAT...................
        const yogaMat = BABYLON.MeshBuilder.CreatePlane("yogaMat", {
            width: 2,
            height: 0.6
        });
        yogaMat.rotation.x = Math.PI / 2;
        yogaMat.position = new BABYLON.Vector3(0, 0.01, 0);
    
        const matMat = new BABYLON.StandardMaterial("matMat");
        matMat.diffuseColor = new BABYLON.Color3(0.2, 0.6, 1);
        yogaMat.material = matMat;
    
       
        // STEP: Importing animated Jumping Jack  model........................
        BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "JumpingJacks.glb", scene).then((result) => {
            const trainer = result.meshes[0];
            trainer.position = new BABYLON.Vector3(-2, 0.01, 0);
            trainer.scaling = new BABYLON.Vector3(30, 30, 30);
    
            // Playing the animation.................
            if (result.skeletons.length > 0) {
                scene.beginAnimation(result.skeletons[0], 0, 100, true); // Loop animation
            }
        });
        // importing animated Pushup model..............
        BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "PushUps.glb", scene).then((result) => {
            const trainer = result.meshes[0];
            trainer.position = new BABYLON.Vector3(2, 0.01, 0);
            trainer.scaling = new BABYLON.Vector3(30, 30, 30);
    
            // Playing the animation.................
            if (result.skeletons.length > 0) {
                scene.beginAnimation(result.skeletons[0], 0, 100, true); // Loop animation
            }
        });
          // importing animated squat model..............
          BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "squats.glb", scene).then((result) => {
            const trainer = result.meshes[0];
            trainer.position = new BABYLON.Vector3(4, 0.01, 0);
            trainer.scaling = new BABYLON.Vector3(30, 30, 30);
    
            // Playing the animation.................
            if (result.skeletons.length > 0) {
                scene.beginAnimation(result.skeletons[0], 0, 100, true); // Loop animation
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