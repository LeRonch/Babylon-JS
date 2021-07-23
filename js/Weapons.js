Weapons = function(Player) {

    this.Player = Player;

    this.bottomPosition = new BABYLON.Vector3(0.5,-2.5,1);

    this.topPositionY = -0.5;

    this.rocketLauncher = this.newWeapon(Player);

};

Weapons.prototype = {

       newWeapon : function(Player) {
        var newWeapon;
        newWeapon = BABYLON.Mesh.CreateBox('rocketLauncher', 0.3, Player.game.scene);

        newWeapon.scaling = new BABYLON.Vector3(1, 0.9, 5);

        newWeapon.parent = Player.camera;

        newWeapon.position = this.bottomPosition.clone();
        newWeapon.position.y = this.topPositionY;

        var materialWeapon = new BABYLON.StandardMaterial('rocketLauncherMat', Player.game.scene);
        materialWeapon.diffuseColor = new BABYLON.Color3(1,0,0);

        newWeapon.material = materialWeapon;

        return newWeapon
    }

};