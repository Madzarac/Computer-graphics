import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { CGFappearance } from '../lib/CGF.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	/* constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	*/
	constructor(scene, top, front, right, back, left, background) {
		super(scene);

		this.texture1 = top;
		this.texture2 = front;
		this.texture3 = right;
		this.texture4 = back;
		this.texture5 = left;
		this.texture6 = background;
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

		//Background
		this.backgroundMaterial = new CGFappearance(scene);
		this.backgroundMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.backgroundMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.backgroundMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.backgroundMaterial.setShininess(10.0);
		this.backgroundMaterial.setTexture(this.texture6);
		this.backgroundMaterial.setTextureWrap('REPEAT', 'REPEAT');




	}

	display(){

		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.frontMaterial.apply();
		if (!this.scene.linearFiltering)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		else
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
		this.myQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.backMaterial.apply();
		if (!this.scene.linearFiltering)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		else
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
		this.myQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.rightMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.leftMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.topMaterial.apply();
		this.myQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.backgroundMaterial.apply();
		if (!this.scene.linearFiltering)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		else
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);		
		this.myQuad.display();
		this.scene.popMatrix();


	}
	
}

