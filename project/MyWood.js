import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyWood
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWood extends CGFobject {
	
	constructor(scene) {
		super(scene);
        this.slices = 15;
        this.initMaterials(this.scene);
        this.initBuffers();


	}
	
	initBuffers() {
		
		this.circle = new MyCircle(this.scene, this.slices);
        this.cylinder = new MyCylinder(this.scene, this.slices);

	}

	initMaterials(scene){

		// brown
        this.brown = new CGFappearance(scene);
        this.brown.setAmbient(0.58, 0.29, 0, 1.0);
        this.brown.setDiffuse(0.58, 0.29, 0, 1.0);
        this.brown.setSpecular(0.58, 0.29, 0, 1.0);
        this.brown.loadTexture("./images/wood.jpg");
        this.brown.setTextureWrap('REPEAT', 'REPEAT');
        this.brown.setShininess(10.0);


	}

	display(){

        //first log
        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(-0.25,0.25,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
        this.brown.apply();
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(-0.25,0.25,2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(-0.25,0.25,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.cylinder.display();
		this.scene.popMatrix();


        //second log
        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(0.25,0.25,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(0.25,0.25,2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(0.25,0.25,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.cylinder.display();
		this.scene.popMatrix();


        //third log
        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(0,0.68,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(0,0.68,2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);
        this.scene.translate(0,0.68,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,2,0.25);
		this.cylinder.display();
		this.scene.popMatrix();
        


	}
	
}