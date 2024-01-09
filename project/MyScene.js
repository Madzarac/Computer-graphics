import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyTrack } from "./MyTrack.js";
import { MyCircle } from "./MyCircle.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySphere } from "./MySphere.js";
import { MyTrainModel } from "./MyTrainModel.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MySmoke } from "./MySmoke.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 25, 0,1,0,1);
        this.trackLine = [[20, 50, "station"],
                        [0, 50, "simple"],
                        [-15, 25, "simple"],
                        [-40, 25, "simple"],
                        [-40, 0, "station"],
                        [-40, -40, "simple"],
                        [0, -40, "station"],
                        [60, -40, "simple"],
                        [60, 0, "station"],
                        [60, 50, "simple"]];

        this.track = new MyTrack(this, this.trackLine);
        this.circle = new MyCircle(this, 3);
        this.cylinder = new MyCylinder(this, 5);
        this.sphere = new MySphere(this, 10, 10);
        this.locomotive = new MyTrainModel(this, 20, this.trackLine);
        this.smoke = new MySmoke(this);

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.selectedTexture = -1;
        this.textureIds = { 'Test': 0, 'Demo': 1};

        //Variables connected to interface
        this.objectComplexity = 0.5;

        // green
        this.green = new CGFappearance(this);
        this.green.setAmbient(0, 1, 0, 1.0);
        this.green.setDiffuse(0, 1, 0, 1.0);
        this.green.setSpecular(1, 1, 1, 1.0);
        this.green.setShininess(10.0);

        // blue
        this.blue = new CGFappearance(this);
        this.blue.setAmbient(0, 0, 1, 1.0);
        this.blue.setDiffuse(0, 0, 1, 1.0);
        this.blue.setSpecular(1, 1, 1, 1.0);
        this.blue.setShininess(10.0);

         //Circle Material
         this.circleMaterial = new CGFappearance(this);
         this.circleMaterial.setAmbient(0.9, 0.9, 0.9, 1);
         this.circleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
         this.circleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
         this.circleMaterial.setShininess(10.0);
         this.circleMaterial.loadTexture('images/tracks.png');
         this.circleMaterial.setTextureWrap('REPEAT', 'REPEAT');

         //Map material
         this.mapMaterial = new CGFappearance(this);
         this.mapMaterial.setAmbient(0.9, 0.9, 0.9, 1);
         this.mapMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
         this.mapMaterial.setSpecular(0.1, 0.1, 0.1, 1);
         this.mapMaterial.setShininess(10.0);
         this.mapMaterial.loadTexture('images/earth.jpg');
         this.mapMaterial.setTextureWrap('REPEAT', 'REPEAT');

         //Terrain material
         this.terrainMaterial = new CGFappearance(this);
         this.terrainMaterial.setAmbient(0.2, 0.2, 0.2, 1);
         this.terrainMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
         this.terrainMaterial.setSpecular(0,1, 0.1, 0.1, 1);
         this.terrainMaterial.setShininess(1);
         this.terrainMaterial.loadTexture('images/demo_cubemap/bottom.png');
         this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Background Material 1
        this.back = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.bottom = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.front = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.left = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.right = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.top = new CGFtexture(this, 'images/demo_cubemap/top.png');

        //Background Material2
        this.back2 = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.bottom2 = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.front2 = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.left2 = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.right2 = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.top2 = new CGFtexture(this, 'images/test_cubemap/py.png');



        //Creating the background

        this.cubeMap = new MyCubeMap(this, this.top, this.right, this.front, this.left, this.back,this.terrainMaterial);

        //Time

        this.lastUpdate = 0;

    }
    initLights() {
        this.lights[0].setPosition(0, 50, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update(); 
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50,50,50), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        if(this.lasUpdate == 0){
            this.lastUpdate = t;
        }

        let elapsedTime = t - this.lastUpdate;
        this.lastUpdate = t;

        this.locomotive.update(elapsedTime);
        this.locomotive.updateSmoke();
    }

    updateObjectComplexity(){
        this.circle.updateBuffers(this.objectComplexity);
        this.cylinder.updateBuffers(this.objectComplexity);
    }

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        if(this.selectedTexture == 0){
            this.terrainMaterial.loadTexture('images/test_cubemap/ny.png'); 
            this.cubeMap.changeTexture( this.top2, this.right2, this.front2, this.left2, this.back2, this.terrainMaterial);
            
        }else{
            this.terrainMaterial.loadTexture('images/demo_cubemap/bottom.png'); 
            this.cubeMap.changeTexture( this.top, this.right, this.front, this.left, this.back, this.terrainMaterial);
            
        }
    }

    checkKeys(){

        var keysPressed=false;

        // Check for key codes eg in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")) {

                this.locomotive.tilt(1);
                keysPressed=true;

        }

        if (this.gui.isKeyPressed("KeyS"))        {

                this.locomotive.tilt(-1);
                keysPressed=true;

        }
        if (this.gui.isKeyPressed("KeyD")) {

            this.locomotive.turn(1);
            keysPressed=true;

        }

        if (this.gui.isKeyPressed("KeyA"))        {

            this.locomotive.turn(-1);
            keysPressed=true;

        }

        if (this.gui.isKeyPressed("KeyR")) {

            this.locomotive.reset();
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyC")) {

            this.locomotive.changed = false;
            this.locomotive.start();
            if(this.locomotive.changed) {
                if(this.track.change == -1) {
                    this.track.change = 0;
                }else if(this.track.change == this.track.numOfStations) {
                    this.track.change = 0;
                }else {
                    ++this.track.change;
                }
            }
            
            keysPressed=true;
        }


        if (this.gui.isKeyPressed("KeyP")) {

            this.locomotive.changed = false;
            this.locomotive.pressedP();
            if(this.locomotive.changed) {
                if(this.track.change == -1) {
                    this.track.change = 0;
                }else if(this.track.change == this.track.numOfStations) {
                    this.track.change = 0;
                }else {
                    ++this.track.change;
                }
            }
            
            keysPressed=true;
        }

        if (keysPressed)
                console.log(text);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.scale(0.5,0.5,0.5);



        //Drawing the plane
        this.pushMatrix();
        this.scale(200,1,200);
        this.rotate(-Math.PI*0.5, 1,0,0);
        this.terrainMaterial.apply();
        this.plane.display();
        this.popMatrix();
        
        //Drawing track
        this.pushMatrix();
        this.track.display();
        this.popMatrix();

        //drawing cylinder
        this.pushMatrix();
        this.scale(5,10,5);
        //this.cylinder.display();
        this.popMatrix();
  

        //drawing locomotive
        this.pushMatrix();
        //this.scale(2,2,2);
        this.translate(this.locomotive.xCord, 0, this.locomotive.zCord);
        this.rotate(-(this.locomotive.turnAngle + Math.PI/2),0,1,0);
        this.locomotive.display();
        this.popMatrix();


        //Drawing circle
        this.pushMatrix();
        this.scale(2,2,2);
        //this.circleMaterial.apply();
        //this.circle.display();
        this.popMatrix();

        //Drawing Sphere
        this.pushMatrix();
        this.scale(5,5,5);
        //this.mapMaterial.apply();
        //this.sphere.display();
        this.popMatrix();

        //Background
        this.pushMatrix();
        this.translate(0,25,0);
        this.scale(200,50,200);
        this.cubeMap.display();
        this.popMatrix();
      

        // ---- END Primitive drawing section
    }
}