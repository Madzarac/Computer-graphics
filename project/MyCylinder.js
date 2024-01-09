import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';


/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/


export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
    
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices; //angle diference between vertices

        for(var i = 0; i <= this.slices; i++, ang += alphaAng) {

            this.vertices.push(Math.cos(ang), 0, Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, Math.sin(ang));

            //add normals for the newly created vertices
            var normal = [Math.cos(ang), 0, Math.sin(ang)];

            // normalization
            var nSize = Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
            );

            normal[0] /= nSize;
            normal[1] /= nSize;
            normal[2] /= nSize;
            this.normals.push(...normal);
            this.normals.push(...normal);

            //maybe souldn't be done last time
            this.indices.push(2*i, (2*i+1), (2*i+3));
            this.indices.push(2*i, (2*i+3), (2*i+2));


            this.texCoords.push(i/this.slices, 1);
            this.texCoords.push(i/this.slices, 0);

            this.initGLBuffers();
            this.initGLBuffers();


        }

        
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