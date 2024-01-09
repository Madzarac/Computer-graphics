import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { CGFappearance } from '../lib/CGF.js';

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {

	constructor(scene, top, right, front, left, back, bottom) {
		super(scene);

		this.texture1 = top;
		this.texture2 = front;
		this.texture3 = right;
		this.texture4 = back;
		this.texture5 = left;
		this.texture6 = bottom;
		this.initMaterials(this.scene);
		this.initBuffers();
	}
	
	initBuffers() {
		
		this.myQuad = new MyQuad(this.scene);
	}

	initMaterials(scene){
		//Unir CUbe Materials

		//Front
		this.frontMaterial = new CGFappearance(scene);
		this.frontMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.frontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.frontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.frontMaterial.setShininess(10.0);
		this.frontMaterial.setTexture(this.texture2);
		this.frontMaterial.setTextureWrap('REPEAT', 'REPEAT');

		//Back
		this.backMaterial = new CGFappearance(scene);
		this.backMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.backMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.backMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.backMaterial.setShininess(10.0);
		this.backMaterial.setTexture(this.texture4);
		this.backMaterial.setTextureWrap('REPEAT', 'REPEAT');

		//Right
		this.rightMaterial = new CGFappearance(scene);
		this.rightMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.rightMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.rightMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.rightMaterial.setShininess(10.0);
		this.rightMaterial.setTexture(this.texture3);
		this.rightMaterial.setTextureWrap('REPEAT', 'REPEAT');

		//Left
		this.leftMaterial = new CGFappearance(scene);
		this.leftMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.leftMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.leftMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.leftMaterial.setShininess(10.0);
		this.leftMaterial.setTexture(this.texture5);
		this.leftMaterial.setTextureWrap('REPEAT', 'REPEAT');

		//Top
		this.topMaterial = new CGFappearance(scene);
		this.topMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.topMaterial.setShininess(10.0);
		this.topMaterial.setTexture(this.texture1);
		this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');

		//bottom
		this.bottomMaterial = new CGFappearance(scene);
		this.bottomMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.bottomMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.bottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.bottomMaterial.setShininess(10.0);
		this.bottomMaterial.setTexture(this.texture6);
		this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');

	}

	display(){


		//Front
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
        this.scene.rotate(Math.PI,1,0,0);
		this.scene.rotate(Math.PI,0,0,1);
		this.frontMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		//Back
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.backMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		//Right
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI,1,0,0);
		this.scene.rotate(Math.PI,0,0,1);
		this.rightMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		//Left
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.leftMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		//Top
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.topMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		//Bottom
		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI,1,0,0);
		this.bottomMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();


	}

	changeTexture(top, right, front, left, back, bottom){

		this.topMaterial.setTexture(top);
		this.rightMaterial.setTexture(right);
		this.frontMaterial.setTexture(front);
		this.leftMaterial.setTexture(left);
		this.backMaterial.setTexture(back);
		this.bottomMaterial.setTexture(bottom);


	}

	
	
}

