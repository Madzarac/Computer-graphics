import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyWheel
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyWheel extends CGFobject {
	
	constructor(scene, slices) {
		super(scene);
        this.slices = slices
        this.initMaterials(this.scene);
        this.initBuffers();
		this.angle = 0;
		this.angleDelta = 0;
		this.minDelta = -(Math.PI/180)*0.3;

	}
	
	initBuffers() {
		
		this.circle = new MyCircle(this.scene, this.slices);
        this.cylinder = new MyCylinder(this.scene, this.slices);

	}

	initMaterials(scene){
/*
		//Circle Texture
    	this.circleMaterial = new CGFappearance(scene);
    	this.circleMaterial.setAmbient(0.9, 0.9, 0.9, 1);
    	this.circleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    	this.circleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    	this.circleMaterial.setShininess(10.0);
    	this.circleMaterial.loadTexture('images/tracks.png');
    	//this.circleMaterial.setTextureWrap('REPEAT', 'REPEAT');
*/

	}

	display(){


		this.angle += this.angleDelta;

		

        this.scene.pushMatrix();
        this.scene.translate(0.1,0.75,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.75,0.2,0.75);
		this.scene.rotate(this.angle,0,1,0);
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.1,0.75,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.75,0.2,0.75);
		this.scene.rotate(this.angle,0,1,0);
		this.circle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1,0.75,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.75,0.2,0.75);
		this.scene.rotate(this.angle,0,1,0);
		this.cylinder.display();
		this.scene.popMatrix();
        


	}
	
}