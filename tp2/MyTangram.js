import {CGFobject} from '../lib/CGF.js';
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
		this.initBuffers();
	}
	
	initBuffers() {

        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
	}

    display(){

        this.scene.pushMatrix();
 
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
        this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0)
        this.scene.rotate((Math.PI *3 ) /4, 0, 0, 1);
        this.triangleBig.display();
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
        this.triangleSmall.display();
        this.scene.popMatrix();

    }
}

