import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';
import { MyCylinder } from './MyCylinder.js';
import { MyQuad } from './MyQuad.js';
import { MySphere } from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MyWood } from './MyWood.js';

/**
 * MyStationModel
 * @constructor
 * @param scene     - Reference to MyScene object
 */
export class MyStationModel extends CGFobject {
	
	constructor(scene, hasWood) {
		super(scene);
        this.initMaterials(this.scene);
        this.initBuffers();

		this.hasWood = hasWood;


	}
	
	initBuffers() {
		
		this.circle = new MyCircle(this.scene, 20);
        this.cylinder = new MyCylinder(this.scene, 20);
        this.unitCube = new MyUnitCubeQuad(this.scene);
        this.quad = new MyQuad(this.scene);
        this.sphere = new MySphere(this.scene,this.slices, 20);
		this.triangle = new MyTriangle(this.scene);


		this.wood = new MyWood(this.scene);
	}

	initMaterials(scene){

		// white
        this.white = new CGFappearance(scene);
        this.white.setAmbient(1, 1, 1, 1.0);
        this.white.setDiffuse(1, 1, 1, 1.0);
        this.white.setSpecular(0.1, 0.1, 0.1, 1.0);
		this.white.loadTexture('images/station/wall.jpg');
        this.white.setTextureWrap('REPEAT', 'REPEAT');
        this.white.setShininess(10.0);

		// brown
        this.brown = new CGFappearance(scene);
        this.brown.setAmbient(0.78, 0.49, 0.2, 1.0);
        this.brown.setDiffuse(0.78, 0.49, 0.2, 1.0);
        this.brown.setSpecular(0.1, 0.1, 0.1, 1.0);
		this.brown.loadTexture('images/station/wood.jpg');
        this.brown.setTextureWrap('REPEAT', 'REPEAT');
        this.brown.setShininess(10.0);

		//grey
        this.grey = new CGFappearance(scene);
        this.grey.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.grey.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.grey.setSpecular(0.05, 0.05, 0.05, 1.0);
		this.grey.loadTexture('images/station/concrete.jpg');
        this.grey.setTextureWrap('REPEAT', 'REPEAT');
        this.grey.setShininess(10.0);

		//orange
        this.orange = new CGFappearance(scene);
        this.orange.setAmbient(0.9, 0.27, 0, 1.0);
        this.orange.setDiffuse(0.9, 0.27, 0, 1.0);
        this.orange.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.orange.loadTexture('images/station/roof.jpg');
        this.orange.setTextureWrap('REPEAT', 'REPEAT');
        this.orange.setShininess(10.0);

		//blue
		this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0.98, 0.69, 0.6, 1.0);
        this.blue.setDiffuse(0.98, 0.69, 0.6, 1.0);
        this.blue.setSpecular(1, 1, 1, 1.0);
		this.blue.loadTexture('images/station/window.jpg');
        this.blue.setTextureWrap('REPEAT', 'REPEAT');
        this.blue.setShininess(10.0);

		// zabat
        this.zabat = new CGFappearance(scene);
        this.zabat.setAmbient(1, 1, 1, 1.0);
        this.zabat.setDiffuse(1, 1, 1, 1.0);
        this.zabat.setSpecular(0.1, 0.1, 0.1, 1.0);
		this.zabat.loadTexture('images/station/zabat.png');
        this.zabat.setShininess(10.0);



	}

	display(){


		//---------------------WOOD-----------------------
		/*
		if(this.hasWood) {
			this.scene.pushMatrix();
			this.scene.translate(-7,2,-2);
			this.wood.display();
			this.scene.popMatrix();
		}
		*/
		

		//----------floor base of the station-----------
		this.grey.apply();

        this.scene.pushMatrix();
		this.scene.scale(15,2,40);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//---------------------BUILDINGS---------------------
		this.white.apply();

		//main body of the main building
		this.scene.pushMatrix();
		this.scene.translate(3,2,0);
		this.scene.scale(6,8,8);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//front of the main building
		this.scene.pushMatrix();
		this.scene.translate(-0.75,2,0);
		this.scene.scale(1.5,4.5,8);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left wing
		this.scene.pushMatrix();
		this.scene.translate(3,2,9);
		this.scene.scale(6,3.5,10);
		this.scene.translate(0,0.5,0); 
		this.unitCube.display();
		this.scene.popMatrix();

		//right wing
		this.scene.pushMatrix();
		this.scene.translate(3,2,-9);
		this.scene.scale(6,3.5,10);
		this.scene.translate(0,0.5,0);  
		this.unitCube.display();
		this.scene.popMatrix();

		//---ZABAT---
		//bottom
		this.white.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,9.9,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(0.2,1.5,7.9);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//triangle front
		this.zabat.apply();
		this.scene.pushMatrix();
		this.scene.translate(-1.3,10,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(2.83,1,1);
		//this.scene.rotate(-Math.PI*135/180,0,0,1);
		this.triangle.display();
		this.scene.popMatrix();


		//----COLLOMS----
		this.white.apply();

		//1st collom
		this.scene.pushMatrix();
		this.scene.translate(-1.3,4.5,3.8);
		this.scene.scale(0.2,3.6,0.2);
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();

		//2nd collom
		this.scene.pushMatrix();
		this.scene.translate(-1.3,4.5,1.25);
		this.scene.scale(0.2,3.6,0.2);
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();

		//3rd collom
		this.scene.pushMatrix();
		this.scene.translate(-1.3,4.5,-1.25);
		this.scene.scale(0.2,3.6,0.2);
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();

		//4th collom
		this.scene.pushMatrix();
		this.scene.translate(-1.3,4.5,-3.8);
		this.scene.scale(0.2,3.6,0.2);
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();




		//----FENCE BETWEEN COLLOMS----

		//front right
		this.scene.pushMatrix();
		this.scene.translate(-1.3,6.5,2.5);
		this.scene.scale(0.2,1,2.2);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//middle
		this.scene.pushMatrix();
		this.scene.translate(-1.3,6.5,0);
		this.scene.scale(0.2,1,2.2);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//front left
		this.scene.pushMatrix();
		this.scene.translate(-1.3,6.5,-2.5);
		this.scene.scale(0.2,1,2.2);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//right side
		this.scene.pushMatrix();
		this.scene.translate(-0.6,6.5,-3.8);
		this.scene.rotate(Math.PI/2, 0,1,0);
		this.scene.scale(0.2,1,1.5);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left side
		this.scene.pushMatrix();
		this.scene.translate(-0.6,6.5,3.8);
		this.scene.rotate(Math.PI/2, 0,1,0);
		this.scene.scale(0.2,1,1.5);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//--------------------ROOF---------------------
		this.orange.apply();

		//rain protector above doors
		this.scene.pushMatrix();
		this.scene.translate(-3,5.5,0);
		this.scene.rotate(-(Math.PI/2 - 0.1),0,0,1); 
		this.scene.scale(0.1,1.5,8);  
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//1st bar holding rainprotector
		this.scene.pushMatrix();
		this.scene.translate(-0.9,3.95,3.3);
		this.scene.rotate(Math.PI/4,0,0,1); 
		this.scene.scale(0.05,1.5,0.05);  
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();

		//2nd bar holding rainprotector
		this.scene.pushMatrix();
		this.scene.translate(-0.9,3.95,1.25);
		this.scene.rotate(Math.PI/4,0,0,1); 
		this.scene.scale(0.05,1.5,0.05);  
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();

		//3rd bar holding rainprotector
		this.scene.pushMatrix();
		this.scene.translate(-0.9,3.95,-1.25);
		this.scene.rotate(Math.PI/4,0,0,1); 
		this.scene.scale(0.05,1.5,0.05);  
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();

		//4th bar holding rainprotector
		this.scene.pushMatrix();
		this.scene.translate(-0.9,3.95,-3.3);
		this.scene.rotate(Math.PI/4,0,0,1); 
		this.scene.scale(0.05,1.5,0.05);  
		this.scene.translate(0,0.5,0);
		this.cylinder.display();
		this.scene.popMatrix();

		//--right side building roof--
		//front
		this.scene.pushMatrix();
		this.scene.translate(0,5.5,9);
		this.scene.rotate(-Math.PI*64.76/180,0,0,1);
		this.scene.scale(0.1,3.35,10);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//back
		this.scene.pushMatrix();
		this.scene.translate(6,5.5,9);
		this.scene.rotate(Math.PI*64.76/180,0,0,1);
		this.scene.scale(0.1,3.35,10);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//triangle side
		this.scene.pushMatrix();
		this.scene.translate(3,5.5,14);
		this.scene.scale(2.12,1,1);
		this.triangle.display();
		this.scene.popMatrix();

		//--left side building roof--
		//front
		this.scene.pushMatrix();
		this.scene.translate(0,5.5,-9);
		this.scene.rotate(-Math.PI*64.76/180,0,0,1);
		this.scene.scale(0.1,3.35,10);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//back
		this.scene.pushMatrix();
		this.scene.translate(6,5.5,-9);
		this.scene.rotate(Math.PI*64.76/180,0,0,1);
		this.scene.scale(0.1,3.35,10);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//triangle side
		this.scene.pushMatrix();
		this.scene.translate(3,5.5,-14);
		this.scene.scale(2.12,1,1);
		this.scene.rotate(Math.PI,0,1,0);
		this.triangle.display();
		this.scene.popMatrix();

		//--main building roof--
		//front
		this.scene.pushMatrix();
		this.scene.translate(0,10,0);
		this.scene.rotate(-Math.PI*64.76/180,0,0,1);
		this.scene.scale(0.1,3.35,8);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//back
		this.scene.pushMatrix();
		this.scene.translate(6,10,0);
		this.scene.rotate(Math.PI*64.76/180,0,0,1);
		this.scene.scale(0.1,3.35,8);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//triangle side
		this.scene.pushMatrix();
		this.scene.translate(3,10,-4);
		this.scene.scale(2.12,1,1);
		this.scene.rotate(Math.PI,0,1,0);
		this.triangle.display();
		this.scene.popMatrix();
		//triangle side
		this.scene.pushMatrix();
		this.scene.translate(3,10,4);
		this.scene.scale(2.12,1,1);
		this.triangle.display();
		this.scene.popMatrix();

		//--zabat roof--
		//right
		this.scene.pushMatrix();
		this.scene.translate(0.75,10,3.95);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.rotate(-Math.PI*70.53/180,0,0,1);
		this.scene.scale(0.1,4.24,4.5);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		//left
		this.scene.pushMatrix();
		this.scene.translate(0.75,10,-3.95);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.rotate(Math.PI*70.53/180,0,0,1);
		this.scene.scale(0.1,4.24,4.5);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();
		
		




		//--------------------DOORS-------------------
		this.brown.apply();

		//balcony door 
		this.scene.pushMatrix();
		this.scene.translate(0,6.5,0);
		this.scene.scale(0.1,2.5,1.2);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//front main door 
		this.scene.pushMatrix();
		this.scene.translate(-1.5,2,0);
		this.scene.scale(0.1,2.2,1.2);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//front left door
		this.scene.pushMatrix();
		this.scene.translate(-1.5,2,2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//front right door
		this.scene.pushMatrix();
		this.scene.translate(-1.5,2,-2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//back main door 
		this.scene.pushMatrix();
		this.scene.translate(6,2,0);
		this.scene.scale(0.1,2.2,1.2);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//back left door
		this.scene.pushMatrix();
		this.scene.translate(6,2,2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//back right door
		this.scene.pushMatrix();
		this.scene.translate(6,2,-2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();


		//--------------------WINDOWS--------------------
		this.blue.apply();


		//front left window
		this.scene.pushMatrix();
		this.scene.translate(0,7,2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//front right window
		this.scene.pushMatrix();
		this.scene.translate(0,7,-2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//back middle window 
		this.scene.pushMatrix();
		this.scene.translate(6,7,0);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//back left window
		this.scene.pushMatrix();
		this.scene.translate(6,7,2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//back right window
		this.scene.pushMatrix();
		this.scene.translate(6,7,-2.3);
		this.scene.scale(0.1,2,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//--windows on side buildings--

		//right building 1f
		this.scene.pushMatrix();
		this.scene.translate(0,3,6);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//right building 2f
		this.scene.pushMatrix();
		this.scene.translate(0,3,9);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//right building 3f
		this.scene.pushMatrix();
		this.scene.translate(0,3,12);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left building 1f
		this.scene.pushMatrix();
		this.scene.translate(0,3,-6);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left building 2f
		this.scene.pushMatrix();
		this.scene.translate(0,3,-9);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left building 3f
		this.scene.pushMatrix();
		this.scene.translate(0,3,-12);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//right building 1b
		this.scene.pushMatrix();
		this.scene.translate(6,3,6);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//right building 2b
		this.scene.pushMatrix();
		this.scene.translate(6,3,9);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//right building 3b
		this.scene.pushMatrix();
		this.scene.translate(6,3,12);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left building 1b
		this.scene.pushMatrix();
		this.scene.translate(6,3,-6);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left building 2b
		this.scene.pushMatrix();
		this.scene.translate(6,3,-9);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();

		//left building 3b
		this.scene.pushMatrix();
		this.scene.translate(6,3,-12);
		this.scene.scale(0.1,1,1);
		this.scene.translate(0,0.5,0);
		this.unitCube.display();
		this.scene.popMatrix();



		

	
        


	}
	
}