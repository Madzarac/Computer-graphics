import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';
import { MyContainer } from './MyContainer.js';
import { MyCrane } from './MyCrane.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MyWheel } from './MyWheel.js';
import { MyWood } from './MyWood.js';
import { MySmoke } from './MySmoke.js';

const States = {
    STATIONED: 0,
    ACCELERATING: 1,
    CRUISE: 2,
    DECELERATING: 3,
    
};

/**
 * MyTrainModel
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyTrainModel extends CGFobject {
	
	constructor(scene, slices, track) {
		super(scene);
        this.slices = slices
        this.initMaterials(this.scene);
        this.initBuffers();


        this.xCord = track[0][0];
        this.zCord = track[0][1];

        this.track = track;
        this.lastVertex = 0;
        this.nextVertex = 1;

        var x1 = this.track[this.lastVertex][0];
        var z1 = this.track[this.lastVertex][1];
        var x2 = this.track[this.nextVertex][0];
        var z2 = this.track[this.nextVertex][1];
        

        this.angle = Math.atan((z2-z1)/(x2-x1));
        this.speed = 0;  // max= 10
        this.waitCounter = true;

        
        this.turnAngle = this.angle;
        this.turnAngle2 = 0;
        this.updateCounter = 0;


        this.vAngChange = 0;
        this.hAngChange = 0;

        this.timeS = 0;

        this.changed = false;
        


	}
	
	initBuffers() {
		
		this.circle = new MyCircle(this.scene, this.slices);
        this.cylinder = new MyCylinder(this.scene, this.slices);
        this.wheel = new MyWheel(this.scene, this.slices);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.sphere = new MySphere(this.scene, this.slices, this.slices);
        this.container = new MyContainer(this.scene);
        this.crane = new MyCrane(this.scene, 30,90);
        this.wood = new MyWood(this.scene);
        this.smoke = new MySmoke(this.scene);

	}

	initMaterials(scene){

        // blue
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0.478, 0.647, 0.72, 1.0);
        this.blue.setDiffuse(0.678, 0.847, 0.92, 1.0);
        this.blue.setSpecular(1, 1, 1, 1.0);
        this.blue.loadTexture("./images/train/blue_metal.jpg");
        this.blue.setTextureWrap('REPEAT', 'REPEAT');
        this.blue.setShininess(10.0);

        //very dark grey
        this.black = new CGFappearance(scene);
        this.black.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.black.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.black.setSpecular(1, 1, 1, 1.0);
        this.black.loadTexture("./images/train/tires.jpg");
        this.black.setTextureWrap('REPEAT', 'REPEAT');
        this.black.setShininess(10.0);

        // brown
        this.brown = new CGFappearance(scene);
        this.brown.setAmbient(0.58, 0.29, 0, 1.0);
        this.brown.setDiffuse(0.58, 0.29, 0, 1.0);
        this.brown.setSpecular(0.1, 0.1, 0.1, 1.0);
		this.brown.loadTexture('images/train/wood.jpg');
        this.brown.setTextureWrap('REPEAT', 'REPEAT');
        this.brown.setShininess(10.0);

        // gray
        this.gray = new CGFappearance(scene);
        this.gray.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.gray.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.gray.setSpecular(1, 1, 1, 1.0);
		this.gray.loadTexture('images/train/gray_metal.jpg');
        this.gray.setTextureWrap('REPEAT', 'REPEAT');
        this.gray.setShininess(10.0);

	}

	display(){
        
        //base
        this.scene.pushMatrix();
        this.scene.translate(0,1.5,0);
        this.scene.scale(2.5,1,7.5);
        this.blue.apply();
        this.cube.display();
        this.scene.popMatrix();

        //cabin
        this.scene.pushMatrix();
        this.scene.translate(0,3.25,-0.9);
        this.scene.scale(2,2.5,1.8);
        this.cube.display();
        this.scene.popMatrix();


        //cylindrrical body
        //1.cylinder
        this.scene.pushMatrix(); 
        this.scene.translate(0,2.75,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.9,3.5,0.9);
		//this.circleMaterial.apply();
		this.cylinder.display();
		this.scene.popMatrix();

        //2.top - sphere
        this.scene.pushMatrix();
        this.scene.translate(0,2.75,3.5);
        this.scene.scale(1,0.9,0.2);
		this.sphere.display();
		this.scene.popMatrix();


        //chimney
        this.scene.pushMatrix();
        this.scene.translate(0,3.5,2.65);
        this.scene.scale(0.2,0.8,0.2);
        this.blue.apply();
		this.cylinder.display();
		this.scene.popMatrix();


        // 4 wheels
        this.scene.pushMatrix();
        this.scene.translate(1.25,0,2.5);
        this.black.apply();
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.25,0,-2.5);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.25,0,2.5);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.25,0,-2.5);
        this.wheel.display();
        this.scene.popMatrix();

        //container
        this.scene.pushMatrix();
        this.scene.translate(0,2,-3.1);
        this.scene.scale(2.25,0.9,1.25);
        this.gray.apply();
        this.container.display();
        this.scene.popMatrix();

        //Crane
        this.scene.pushMatrix();
        this.scene.translate(0,4.5,-0.9);
        this.crane.display();
        this.scene.popMatrix();

    

        if(this.crane.woodPosition == 3) {

            //draw wood in the container
            this.scene.pushMatrix();
            this.scene.translate(-1,2.1,-3.12);
            this.scene.rotate(Math.PI/2, 0,1,0);
            this.scene.translate(0,0,2);
            this.wood.display();
            this.scene.popMatrix();

        }


        //Smoke
        this.scene.pushMatrix();
        this.scene.translate(0,4,2.65);
        this.scene.scale(0.15, 0.15, 0.15);
        //this.smoke.display();
        this.scene.popMatrix();

	}

    update(elapsedTime){

        var x1 = this.track[this.lastVertex][0];
        var z1 = this.track[this.lastVertex][1];
        var x2 = this.track[this.nextVertex][0];
        var z2 = this.track[this.nextVertex][1];
        var dist = Math.sqrt(((x2-x1)*(x2-x1) + (z2-z1)*(z2-z1)));
        this.angle = Math.atan((z2-z1)/(x2-x1));
        var distCrossed = Math.sqrt(((this.xCord-x1)*(this.xCord-x1) + (this.zCord-z1)*(this.zCord-z1)));
        var distRemaining = dist - distCrossed;
        
        

        if((elapsedTime < 1000000) && (elapsedTime > 0)) {
            this.timeS = 0.05;//elapsedTime / 1000;             //time in seconds, cca 0.05s
        }

        var lastStation = false;  //true if the last visited point was a station,
        if(this.track[this.lastVertex][2] == "station"){ 
            lastStation = true;
        }

        var nextStation = false;  //true if the next point to visit is a station,
        if(this.track[this.nextVertex][2] == "station"){ 
            nextStation = true;
        }

        var acceleration;
        var maxSpeed = 10;


        if(x1 > x2) {
            this.angle += Math.PI;
        }


        if (!this.waitCounter) {

        
            if (nextStation && (distRemaining > 0)) {   //train slowing down to stop at the station


                acceleration = (maxSpeed * maxSpeed) / (2 * dist);           //a = (v0^2)/(2d)
                this.speed = this.speed - acceleration * this.timeS;               //v = v0 + at
                this.wheel.angleDelta = this.wheel.angleDelta +(acceleration *this.timeS)*(Math.PI/180*0.3);
                

                if(this.speed <= 0.5) {                                      //to ensure speed doesn't get too small
                    this.speed = 0.5;
                    this.wheel.angleDelta = this.wheel.minDelta;
                }

                this.xCord += Math.cos(this.angle) * this.speed * this.timeS; 
                this.zCord += Math.sin(this.angle) * this.speed * this.timeS; 

                if(this.speed < 1){
                    this.wheel.angleDelta = ((-Math.PI/180)*0.01);
                }

                //--comment to make drop off avaliable--
                this.crane.woodPosition = 0;

            }else if((distRemaining <= 0)) {           //train arrived at the station



                if (nextStation) {

                    this.waitCounter = true;
                    this.wheel.angleDelta = 0;

                }

                    if(this.nextVertex == this.track.length-1){
        
                        this.nextVertex = 0;
                    }else{
                        this.nextVertex++;
        
                    }                    
                    if(this.lastVertex == this.track.length-1){
                        this.lastVertex = 0;
                    }else{
                        this.lastVertex++;
                    }
                //}

            }else if (lastStation && (distRemaining > 0)) {     //train leaving the station, speeding up


                    acceleration = (maxSpeed * maxSpeed) / (2 * dist);   //a = (v0^2)/(2d)
                    this.speed = this.speed + acceleration * this.timeS;       //v = v0 + at
                    this.wheel.angleDelta = this.wheel.angleDelta -(acceleration *this.timeS)*(Math.PI/180*0.3);

        
                    if(this.speed < 0.5) {                               //to ensure speed doesn't get to small
                        this.speed = 0.5;
                        this.wheel.angleDelta = this.wheel.minDelta;
                    }
        
                    if(this.speed > 10){                                 //ensures it doesn't go over maximum speed, because of calculations it is not actually necesary
                        this.speed = maxSpeed;
                    }
        
                    this.xCord += Math.cos(this.angle) * this.speed * this.timeS;
                    this.zCord += Math.sin(this.angle) * this.speed * this.timeS;
        
                }else{              //train driving max speed because last and the next point are not stations

                this.xCord += Math.cos(this.angle) * maxSpeed * this.timeS;
                this.zCord += Math.sin(this.angle) * maxSpeed * this.timeS;
                this.speed = maxSpeed;

            }
        }


        if((distRemaining < 5 && distRemaining > 0)|| (distCrossed < 5 && distCrossed > 0)){

            if(distRemaining < 5 && distRemaining >= 0){
                var thirdVertex = this.nextVertex +1;
                if((thirdVertex) == this.track.length) {
                    thirdVertex = 0;
                }
                var x3 = this.track[thirdVertex][0];
                var z3 = this.track[thirdVertex][1];
                var ang1 = Math.atan((z2-z1)/(x2-x1));
                var ang2 = Math.atan((z3-z2)/(x3-x2));
                if(ang1 < 0){
                    ang1 += Math.PI*2;
                }
                if(ang2 < 0){
                    ang2 += Math.PI*2;
                }
                var calc = (ang2 -  ang1) / 2;
                if(calc > Math.PI/2){
                    calc = -Math.PI/2 +calc;
                }else if (calc < -Math.PI/2){
                    calc = -Math.PI/2 -calc;
                }else if(calc == -Math.PI/4){
                    calc = Math.abs(calc);
                }
                this.turnAngle += calc / 10;

            }else if (distCrossed < 5 && distCrossed >= 0){
                var thirdVertex = this.lastVertex-1;
                if((thirdVertex) == -1) {
                    thirdVertex = this.track.length-1;
                }
                var x3 = this.track[thirdVertex][0];
                var z3 = this.track[thirdVertex][1];
                var ang1 = Math.atan((z1-z3)/(x1-x3));
                var ang2 = Math.atan((z2-z1)/(x2-x1));
                if(ang1 < 0){
                    ang1 += Math.PI*2;
                }
                if(ang2<0){
                    ang2 += Math.PI*2;
                }
                var calc = (ang2 - ang1) / 2;
                if(calc > Math.PI/2){
                    calc = -Math.PI/2 +calc;
                }else if (calc < -Math.PI/2){
                    calc = -Math.PI/2 -calc;
                }else if(calc == -Math.PI/4){
                    calc = Math.abs(calc);
                }
                

                this.turnAngle += calc / 10;
            }
        }else if(distRemaining > 5 && distCrossed > 5){

            this.turnAngle = this.angle + Math.PI;
        }

        

    }

    turn(val){

        this.crane.vAngle += val;

        if((this.crane.woodPosition == 1) || (this.crane.woodPosition == 2)) {
            if((this.crane.hAngle < 4) && (this.crane.vAngle > 24) && (this.crane.vAngle < 88) ) {
                
                this.crane.vAngle = 24;
                
            }else if((this.crane.hAngle < 30) && (this.crane.vAngle > 26) && (this.crane.vAngle < 50) ) {
                
                this.crane.vAngle = 26;
                
            }else if((this.crane.hAngle < 30) && (this.crane.vAngle >= 50)){
                
                this.crane.vAngle = 88;
            }
        }

        
        if (this.crane.vAngle < 0)
            this.crane.vAngle = 0;
        if (this.crane.vAngle > 90)
            this.crane.vAngle = 90;
        

    }

    tilt(val){

        this.crane.hAngle += val;

                            
        if((this.crane.hAngle < 30) && ((this.crane.vAngle >= 26) && (this.crane.vAngle < 88)) ) {
            
            this.crane.hAngle = 30;
            
        }

        if((this.crane.vAngle >= 50) && (this.crane.woodPosition == 1) || (this.crane.woodPosition == 2)) {

            if (this.crane.hAngle < 10)
            this.crane.hAngle = 10;
        }


        if (this.crane.hAngle < 0)
            this.crane.hAngle = 0;
        if (this.crane.hAngle > 45)
            this.crane.hAngle = 45;

    }

    reset() {
        
        this.crane.vAngle = 90;
        this.crane.hAngle = 45;
    }
    
    start() {

        if(this.waitCounter == true) {

            this.waitCounter = false;
            this.changed = true;
        }
    }

    pressedP() {


        if(this.waitCounter) {


            if(this.crane.woodPosition == 0) {


                if((this.crane.hAngle <= 15) && (this.crane.vAngle <= 7)) {

                    ++this.crane.woodPosition;
                    this.changed = true;
                }

            }else if(this.crane.woodPosition == 1) {


                if((this.crane.hAngle <= 20) && (this.crane.vAngle >= 88)) {

                    this.crane.woodPosition = 3;
                    this.waitCounter = false;
                }


            }
            //--uncomment to make drop off avaliable--
            /*else if(this.crane.woodPosition == 2) {

                if((this.crane.hAngle <= 15) && (this.crane.vAngle <= 7)) {

                    this.crane.woodPosition = 0;
                    this.changed = true;
                    this.waitCounter = false;
                }


            }else{ //woodPosition == 3

                if((this.crane.hAngle <= 20) && (this.crane.vAngle >= 88)) {

                    --this.crane.woodPosition;
                }

                
            }*/


        }
        


    }


    updateSmoke(){


        this.smoke.y1 += 0.5;
        this.smoke.y2 += 0.5;
        this.smoke.y3 += 0.5;

        if(this.waitCounter == false){
            this.smoke.z1 -= 0.5;
            this.smoke.z2 -= 0.5;
            this.smoke.z3 -= 0.5;
        }

        this.smoke.scale1 += 0.05;
        this.smoke.scale2 += 0.05;
        this.smoke.scale3 += 0.05;

        if(this.smoke.y1 >15){
            this.smoke.y1=0;
            this.smoke.scale1 =1;
            this.smoke.z1 = 0;

        }

        if(this.smoke.y2 >15){
            this.smoke.y2 = 0;
            this.smoke.scale2 =1;
            this.smoke.z2 = 0;
        }

        if(this.smoke.y3 >15){
            this.smoke.y3 = 0;
            this.smoke.scale3 =1;
            this.smoke.z3 = 0;
        }
        


    }
	
}