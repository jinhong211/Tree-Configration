///<reference path="./Controller.ts"/>

/**
 * Entry point for the typescript code
 * @author by Anais, Quentin
 */
//var c = new Controller("http://10.212.118.128:3000");
Controller.getInstance().setUrl("http://46.105.18.34:8080");
console.log(Controller.getInstance().getUrl());
Controller.getInstance().init(function(n: Array<TreeNode>) {
});


//Controller.getInstance().initMOCK();