import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'objectComplexity', 0.01, 1).onChange(this.scene.updateObjectComplexity.bind(this.scene));


        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.initKeys();

        //Select the texture
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Scenes').onChange(this.scene.updateAppliedTexture.bind(this.scene));

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}