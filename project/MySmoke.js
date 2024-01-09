import {CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { CGFappearance } from '../lib/CGF.js';

/**
 * MyContainer
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySmoke extends CGFobject {
	
	constructor(scene) {
		super(scene);

		this.initMaterials(this.scene);
		this.initBuffers();

		this.y1 = 10;
		this.y2 = 5;
		this.y3 = 0;

		this.z1 = 0;
		this.z2 = 0;
		this.z3 = 0;

		this.scale1 = 1;
		this.scale2 = 1;
		this.scale3 = 1;
	}
	
	initBuffers() {
		
		this.sphere1 = new MySphere(this.scene, 10, 10);
		this.sphere2 = new MySphere(this.scene, 10, 10);
		this.sphere3 = new MySphere(this.scene, 10, 10);
	}

	initMaterials(scene){
		// smoke
        this.smoke = new CGFappearance(scene);
        this.smoke.setAmbient(0.9,0.9,0.9, 1.0);
        this.smoke.setDiffuse(0.9,0.9,0.9, 1.0);
        this.smoke.setSpecular(0, 0, 0, 1.0);
        this.smoke.loadTexture("./images/train/smoke.png");
        this.smoke.setTextureWrap('REPEAT', 'REPEAT');
        this.smoke.setShininess(10.0);
	}

	display(){

		this.smoke.apply();

		this.scene.pushMatrix();
		this.scene.translate(0,this.y1,this.z1);
		this.scene.scale(this.scale1,this.scale1,this.scale1);
		this.sphere1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,this.y2,this.z2);
		this.scene.scale(this.scale2,this.scale2,this.scale2);
		this.sphere2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,this.y3,this.z3);
		this.scene.scale(this.scale3,this.scale3,this.scale3);
		this.sphere3.display();
		this.scene.popMatrix();
		

	}
	
}