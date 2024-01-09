import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';

/**
 * MyContainer
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyContainer extends CGFobject {
	
	constructor(scene) {
		super(scene);

		this.initMaterials(this.scene);
		this.initBuffers();
	}
	
	initBuffers() {
		
		this.flatCube = new MyUnitCubeQuad(this.scene);
	}

	initMaterials(scene){
		//Unir CUbe Materials
	}

	display(){

		this.scene.pushMatrix();
		this.scene.scale(1,0.1,1);
		this.scene.translate(0,0.5,0);
		this.flatCube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0.5);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(1,0.05,1);
		this.flatCube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.5,-0.5);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(1,0.05,1);
		this.flatCube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.49,0.5,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(1,0.025,1);
		this.flatCube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.49,0.5,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(1,0.025,1);
		this.flatCube.display();
		this.scene.popMatrix();


	}
	
}