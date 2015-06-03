///<reference path="./controller.ts"/>
///<reference path="./navigationTree.ts"/>
/**
 * @author by Anaïs Marongiu, Quentin Cornevin
 */
var mn : Array<TreeNode>;
//var c = new Controller("http://10.212.118.128:3000");
Controller.getInstance().init(function(n: Array<TreeNode>) {
    mn = n;
    console.log(n);

    /*  var json = [
        { "id" : "ajson1", "parent" : "#", "text" : "Composit" },
        { "id" : "ajson2", "parent" : "#", "text" : "Action" },

        { "id" : "ajson3", "parent" : "ajson2", "text" : mn, "type" : "root" },
        { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
     ]*/


    //var navTree = new navigationTree(json);
    // navTree.render();
});




