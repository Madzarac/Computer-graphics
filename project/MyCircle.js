import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
/**
* MyCircle
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyCircle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        //this.initMaterials(this.scene);
        this.initBuffers();
    }

    /*initMaterials(scene){
		//Circle Texture
    	this.circleMaterial = new CGFappearance(scene);
    	this.circleMaterial.setAmbient(0.9, 0.9, 0.9, 1);
    	this.circleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    	this.circleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    	this.circleMaterial.setShininess(10.0);
    	this.circleMaterial.loadTexture('images/tracks.png');
    	this.circleMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}*/

    initBuffers() {


        this.textCoords =[];
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        this.vertices.push(0,0,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0.5, 0.5);

        for(var i = 0; i <= this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(0, i, i+1);
            this.normals.push(0,1,0);
            this.texCoords.push((Math.cos(ang)+1)/2, (1-Math.sin(ang))/2);
            



            ang+=alphaAng;
        }
        



        this.initGLBuffers();
        }


    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


