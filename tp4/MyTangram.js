import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall} from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
    this.initMaterials(this.scene);
		this.initBuffers();
    
	}
	
	initBuffers() {

        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleSmall2 = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleBig2 = new MyTriangleBig(this.scene);


        
	}

  initMaterials(scene) {

    // pink
    this.pink = new CGFappearance(scene);
    this.pink.setAmbient(1, 0.713, 0.756, 1.0);
    this.pink.setDiffuse(1, 0.713, 0.756, 1.0);
    this.pink.setSpecular(1, 1, 1, 1.0);
    this.pink.setShininess(10.0);

    // yellow
    this.yellow = new CGFappearance(scene);
    this.yellow.setAmbient(1, 1, 0, 1.0);
    this.yellow.setDiffuse(1, 1, 0, 1.0);
    this.yellow.setSpecular(1, 1, 1, 1.0);
    this.yellow.setShininess(10.0);

    // green
    this.green = new CGFappearance(scene);
    this.green.setAmbient(0, 1, 0, 1.0);
    this.green.setDiffuse(0, 1, 0, 1.0);
    this.green.setSpecular(1, 1, 1, 1.0);
    this.green.setShininess(10.0);

    // blue
    this.blue = new CGFappearance(scene);
    this.blue.setAmbient(0, 0, 1, 1.0);
    this.blue.setDiffuse(0, 0, 1, 1.0);
    this.blue.setSpecular(1, 1, 1, 1.0);
    this.blue.setShininess(10.0);

    // red
    this.red = new CGFappearance(scene);
    this.red.setAmbient(1, 0, 0, 1.0);
    this.red.setDiffuse(1, 0, 0, 1.0);
    this.red.setSpecular(1, 1, 1, 1.0);
    this.red.setShininess(10.0);

    // purple
    this.purple = new CGFappearance(scene);
    this.purple.setAmbient(0.6, 0.19, 0.8, 1.0);
    this.purple.setDiffuse(0.6, 0.19, 0.8, 1.0);
    this.purple.setSpecular(1, 1, 1, 1.0);
    this.purple.setShininess(10.0);

    // orange
    this.orange = new CGFappearance(scene);
    this.orange.setAmbient(0.9, 0.27, 0, 1.0);
    this.orange.setDiffuse(0.9, 0.27, 0, 1.0);
    this.orange.setSpecular(1, 1, 1, 1.0);
    this.orange.setShininess(10.0);

    //Tangram texture

    this.tangramMaterial = new CGFappearance(scene);
    this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.tangramMaterial.setShininess(10.0);
    this.tangramMaterial.loadTexture('images/tangram.png');
    this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
  }

    display(){

        this.scene.pushMatrix();
 

        this.tangramMaterial.apply();


        let ang1 = Math.PI*(2/3);
    
        var mov = [
    
          1.0,  0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0, 0, 1.0, 0.0,
          2.3, 2.65, 0, 1.0,
        ];
    
        
        this.scene.multMatrix(mov);
    
        var diam = [
    
          Math.cos(ang1),  Math.sin(ang1), 0.0, 0.0,
          -Math.sin(ang1), Math.cos(ang1), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
        this.scene.multMatrix(diam);
        //this.green.apply();
        this.diamond.display();
    
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
    
        this.scene.translate(2,0,0);
        this.triangleBig.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(0, 1.4, 0);
        this.scene.rotate(Math.PI /4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0);
        this.scene.rotate((Math.PI *3 ) /4, 0, 0, 1);
        this.triangleBig2.updateTexCoords([1, 0, 0.5, 0.5, 1, 1,]);
        this.triangleBig2.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(5.6, 0.4, 0);
        this.scene.scale(-1,1,1);
        this.parallelogram.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-(1+ 2 * Math.sqrt(2)), 1, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate( -3, 3, 0);
        this.scene.rotate(- Math.PI / 4, 0 , 0, 1);
        this.triangleSmall2.updateTexCoords([0.5, 0.5, 0.25, 0.75, 0.75, 0.75]);
        this.triangleSmall2.display();
        this.scene.popMatrix();

    }
}

