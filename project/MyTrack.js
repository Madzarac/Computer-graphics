import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyTrackSegment } from './MyTrackSegment.js';
import { MyStationModel } from './MyStationModel.js';
import { MyWood } from './MyWood.js';

/**
 * MyTrack
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTrack extends CGFobject {
    constructor(scene, pPoints) {
		super(scene);
		this.points = pPoints;
		this.initMaterials(this.scene);
		this.initBuffers();

		this.numOfStations = 0;
		for(var i = 1; i < this.points.length; i++){
			if(this.points[i][2] == "station") {
				this.numOfStations++;
			}
		}

		/*
		if ((this.numOfStations % 2) != 0) {
			this.change = 0;
			for(var i = 0; i < this.points.length; i++){  //ensures there is an even number of stations
				if(this.points[i][2] == "station") {
					this.change++;
					if(this.change == this.numOfStations) {
						this.points[i][2] = "simple"
					}
				}
			}
		}*/

		this.change = -1;

		
	}

	initBuffers(){

		this.track = new MyTrackSegment(this.scene);
		this.station = new MyStationModel(this.scene);
		this.wood = new MyWood(this.scene);

	}

	initMaterials(scene){
		//Track texture
    	this.trackMaterial = new CGFappearance(scene);
    	this.trackMaterial.setAmbient(0.9, 0.9, 0.9, 1);
    	this.trackMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    	this.trackMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    	this.trackMaterial.setShininess(10.0);
    	this.trackMaterial.loadTexture('images/tracks.png');
    	this.trackMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}


	display(){

		var stationCounter = 0;
		var maxMove = 9.5;
		var maxWoodMove = 2.5;
		

		for(var i = 1; i < this.points.length; i++){

			var x1 = this.points[i-1][0];
			var z1 = this.points[i-1][1];
			var x2 = this.points[i][0];
			var z2 = this.points[i][1];
			var dist = Math.sqrt(((x2-x1)*(x2-x1) + (z2-z1)*(z2-z1)));
			var angle = Math.atan((z2-z1)/(x2-x1));

			var movex = 0;
			var movez = 0;
			var moveWoodx = 0;
			var moveWoodz = 0;

			if(x1 > x2) {
				angle += Math.PI;
			}

			
			if(this.points[i][2] == "station") {
				stationCounter++;                    //if odd draw wood
				
				movex =  Math.sin(angle) * maxMove;
				movez = Math.cos(angle) * maxMove;
				moveWoodx =  Math.sin(angle) * maxWoodMove;
				moveWoodz = Math.cos(angle) * maxWoodMove;

				//--uncomment to make drop off avaliable--
				//if(((stationCounter % 2) == 0)) { 

					if(this.change != stationCounter) {

						this.scene.pushMatrix();
						this.scene.translate(x2 +moveWoodx,2,z2 - moveWoodz);
						this.scene.rotate(-angle + Math.PI/2,0,1,0);
						this.wood.display();
						this.scene.popMatrix();
					}
					
				//--uncomment to make drop off avaliable--
				/*} else if(((stationCounter % 2) == 1)){

					if(this.change == stationCounter) {

						this.scene.pushMatrix();
						this.scene.translate(x2 +moveWoodx,2,z2 - moveWoodz);
						this.scene.rotate(-angle + Math.PI/2,0,1,0);
						this.wood.display();
						this.scene.popMatrix();
					}
					
				}*/

				this.scene.pushMatrix();
				this.scene.translate(x2 + movex,0,z2 - movez);
				this.scene.rotate(-angle + Math.PI/2,0,1,0);
				this.station.display();
				this.scene.popMatrix();

			}

			this.scene.pushMatrix();
			this.scene.translate((x2+x1)/2,0,(z2+z1)/2);
			this.scene.rotate(-angle,0,1,0);
			this.scene.scale(dist/2,1,1);
			this.trackMaterial.apply();
			this.track.updateTexCoords([0, 0, 0, 1, dist/2, 0, dist/2, 1]);
			this.track.display();
			this.scene.popMatrix();

		}

		var x1 = this.points[this.points.length-1][0];
		var z1 = this.points[this.points.length-1][1];
		var x2 = this.points[0][0];
		var z2 = this.points[0][1];
		var dist = Math.sqrt(((x2-x1)*(x2-x1) + (z2-z1)*(z2-z1)));
		var angle = Math.atan((z2-z1)/(x2-x1));

		var movex = 0;
		var movez = 0;

		if(x1 > x2) {
            angle += Math.PI;
        }

		this.scene.pushMatrix();
		this.scene.translate((x2+x1)/2,0,(z2+z1)/2);
		this.scene.rotate(-angle,0,1,0);
		this.scene.scale(dist/2,1,1);
		this.track.updateTexCoords([0, 0, 0, 1, dist/2, 0, dist/2, 1]);
		this.track.display();
		this.scene.popMatrix();

		if(this.points[0][2] == "station") {
			stationCounter++;  //if odd draw wood

			movex =  Math.sin(angle) * maxMove;
			movez =  Math.cos(angle) * maxMove;
			moveWoodx =  Math.sin(angle) * maxWoodMove;
			moveWoodz = Math.cos(angle) * maxWoodMove;
			
			//--uncomment to make drop off avaliable--
			//if((stationCounter % 2 == 0)) {

				if(this.change != 0) {
					this.scene.pushMatrix();
					this.scene.translate(x2 +moveWoodx,2,z2 - moveWoodz);
					this.scene.rotate(-angle + Math.PI/2,0,1,0);
					this.wood.display();
					this.scene.popMatrix();
				}
				 
				

			//}

			
			this.scene.pushMatrix();
			this.scene.translate(x2 + movex,0,z2 - movez);
			this.scene.rotate(-angle+Math.PI/2,0,1,0);
			this.station.display();
			this.scene.popMatrix();
			

			

		}


	}



}