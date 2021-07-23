Player = function (game, canvas) {

  var _this = this;

  this.game = game;

  this.speed = 1;

  this.angularSensibility = 300;

  this.axisMovement = [false, false, false, false];

  window.addEventListener(
    "keyup",
    function (evt) {
      switch (evt.keyCode) {
        case 90:
          _this.camera.axisMovement[0] = false;
          break;
        case 83:
          _this.camera.axisMovement[1] = false;
          break;
        case 81:
          _this.camera.axisMovement[2] = false;
          break;
        case 68:
          _this.camera.axisMovement[3] = false;
          break;
      }
    },
    false
  );

  window.addEventListener(
    "keydown",
    function (evt) {
      switch (evt.keyCode) {
        case 90:
          _this.camera.axisMovement[0] = true;
          break;
        case 83:
          _this.camera.axisMovement[1] = true;
          break;
        case 81:
          _this.camera.axisMovement[2] = true;
          break;
        case 68:
          _this.camera.axisMovement[3] = true;
          break;
      }
    },
    false
  );

  window.addEventListener(
    "mousemove",
    function (evt) {
      if (_this.rotEngaged === true) {
        _this.camera.rotation.y +=
          evt.movementX * 0.001 * (_this.angularSensibility / 250);
        var nextRotationX =
          _this.camera.rotation.x +
          evt.movementY * 0.001 * (_this.angularSensibility / 250);
        if (nextRotationX < degToRad(90) && nextRotationX > degToRad(-90)) {
          _this.camera.rotation.x +=
            evt.movementY * 0.001 * (_this.angularSensibility / 250);
        }
      }
    },
    false
  );

  this._initCamera(this.game.scene, canvas);

  this.controlEnabled = false;

  this._initPointerLock();

};

Player.prototype = {
  _initCamera: function (scene, canvas) {

    this.camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(-20, 5, 0),
      scene
    );
        
    this.camera.setTarget(BABYLON.Vector3.Zero());
    
    this.camera.axisMovement = [false,false,false,false];

    this.camera.weapons = new Weapons(this);

    this.isAlive = true;
  },

  _initPointerLock: function () {
      
    var _this = this;

    var canvas = this.game.scene.getEngine().getRenderingCanvas();

    canvas.addEventListener("click", function(evt) {
        canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.msRequestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock) {

            canvas.requestPointerLock();

        }
    }, false);

    var pointerlockchange = function (event) {
      _this.controlEnabled =
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas ||
        document.msPointerLockElement === canvas ||
        document.pointerLockElement === canvas;
      if (!_this.controlEnabled) {
        _this.rotEngaged = false;
      } else {
        _this.rotEngaged = true;
      }
    };

    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

  },

  _checkMove : function(ratioFps) {

    let relativeSpeed = this.speed / ratioFps;

    if(this.camera.axisMovement[0]){

        this.camera.position = new BABYLON.Vector3(this.camera.position.x + (Math.sin(this.camera.rotation.y) * relativeSpeed),
            this.camera.position.y,
            this.camera.position.z + (Math.cos(this.camera.rotation.y) * relativeSpeed));
    }

    if(this.camera.axisMovement[1]){

        this.camera.position = new BABYLON.Vector3(this.camera.position.x + (Math.sin(this.camera.rotation.y) * -relativeSpeed),
            this.camera.position.y,
            this.camera.position.z + (Math.cos(this.camera.rotation.y) * -relativeSpeed));
    }

    if(this.camera.axisMovement[2]){

        this.camera.position = new BABYLON.Vector3(this.camera.position.x + Math.sin(this.camera.rotation.y + degToRad(-90)) * relativeSpeed,
            this.camera.position.y,
            this.camera.position.z + Math.cos(this.camera.rotation.y + degToRad(-90)) * relativeSpeed);
    }

    if(this.camera.axisMovement[3]){

        this.camera.position = new BABYLON.Vector3(this.camera.position.x + Math.sin(this.camera.rotation.y + degToRad(-90)) * - relativeSpeed,
            this.camera.position.y,
            this.camera.position.z + Math.cos(this.camera.rotation.y + degToRad(-90)) * - relativeSpeed);
    }
},


};
