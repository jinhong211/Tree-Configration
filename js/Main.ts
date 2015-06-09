///<reference path="./Controller.ts"/>

/**
 * Entry point for the typescript code
 * @author by Anais, Quentin
 */
Controller.getInstance().setUrl("http://46.105.18.34:8080");
console.log(Controller.getInstance().getUrl());
Controller.getInstance().init(function(n: Array<TreeNode>) {
});
