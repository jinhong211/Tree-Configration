///<reference path="./Controller.ts"/>

/**
 * Entry point for the typescript code
 * @author by Anais, Quentin
 */
Controller.getInstance().setUrl("http://46.105.18.34:8080"); // server d'intégration
//Controller.getInstance().setUrl("http://10.212.118.128:3000"); // server de Ben
console.log(Controller.getInstance().getUrl());
Controller.getInstance().init(function(n: Array<TreeNode>) {
});
