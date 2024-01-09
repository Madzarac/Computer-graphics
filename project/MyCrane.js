import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MyWood } from './MyWood.js';

/**
 * MyStationModel
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCrane extends CGFobject {
	
	constructor(scene, hAngle, vAngle) {
		super(scene);
        this.hAngle = hAngle;
        this.vAngle = vAngle;
        this.handlePos = -0.7;
        this.initMaterials(this.scene);
        this.initBuffers();

        this.woodPosition = 0;    //wood is at the next station


	}
	
	initBuffers() {
		
        this.cylinder = new MyCylinder(this.scene, 10);
        this.unitCube = new MyUnitCubeQuad(this.scene);
        this.sphere = new MySphere(this.scene,10, 10);
        this.wood = new MyWood(this.scene);

	}

	initMaterials(scene){

	// gray
        this.gray = new CGFappearance(scene);
        this.gray.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.gray.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.gray.setSpecular(1, 1, 1, 1.0);
	this.gray.loadTexture('images/train/gray_metal.jpg');
        this.gray.setTextureWrap('REPEAT', 'REPEAT');
        this.gray.setShininess(10.0);


        // blue
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0.478, 0.647, 0.72, 1.0);
        this.blue.setDiffuse(0.678, 0.847, 0.92, 1.0);
        this.blue.setSpecular(1, 1, 1, 1.0);
        this.blue.loadTexture("./images/train/blue_metal.jpg");
        this.blue.setTextureWrap('REPEAT', 'REPEAT');
        this.blue.setShininess(10.0);

        // yellow
        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1, 0.5, 0.2, 1.0);
        this.yellow.setDiffuse(1, 0.5, 0.2, 1.0);
        this.yellow.setSpecular(0, 0, 0, 1.0);
        this.yellow.loadTexture("./images/train/rope.jpg");
        this.yellow.setTextureWrap('REPEAT', 'REPEAT');
        this.yellow.setShininess(10.0);


	}

	display(){

        //Main axis
        this.scene.pushMatrix();
        this.scene.scale(0.2,1,0.2);
        this.blue.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        //Junction
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.25,0.25);
        this.scene.translate(0,4.4,0);
        this.gray.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //Arm
        this.scene.pushMatrix();
        this.scene.translate(0,1.1,0);
        this.scene.rotate((this.vAngle*Math.PI/180),0,1,0);
        this.scene.rotate((this.hAngle*Math.PI/180),0,0,1);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.12,2.5,0.12);
        this.gray.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        //Handle
        this.scene.pushMatrix();
        this.scene.translate(0,2.3*Math.sin((this.hAngle*Math.PI/180)),0);
        this.scene.rotate((this.vAngle*Math.PI/180),0,1,0);
        this.scene.translate(2.3*(Math.cos((this.hAngle*Math.PI/180))-1),0,0);
        this.scene.translate(2.3,-0.5,0);
        this.scene.scale(0.1,3,0.1);
        this.yellow.apply();
        this.unitCube.display();
        this.scene.popMatrix();

        if((this.woodPosition == 1) || (this.woodPosition == 2)) {
                this.scene.pushMatrix();
                this.scene.translate(0,2.3*Math.sin((this.hAngle*Math.PI/180)),0);
                this.scene.rotate((this.vAngle*Math.PI/180),0,1,0);
                this.scene.translate(2.3*(Math.cos((this.hAngle*Math.PI/180))-1),0,0);
                this.scene.translate(2.3,-2.7,1);
                this.wood.display();
                this.scene.popMatrix();   
        }


	}
	
}