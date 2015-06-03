///<reference path="./controller.ts"/>
///<reference path="./navigationTree.ts"/>
/**
 * @author by Ana�s Marongiu, Quentin Cornevin
 */
var mn : TreeNode;
var c = new Controller("http://10.212.118.128:3000/bots/1/tree");
c.init(function(n:TreeNode) {
    mn = n;
    console.log("coucou",mn);
    console.log(mn["name"]);

//c.send();

    var json = [
        { "id" : "ajson1", "parent" : "#", "text" : mn["name"] },
        { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
        { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 4", "type" : "root" },
        { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
    ]


    var navTree = new navigationTree(json);
    navTree.test();
});

var node = new TreeNode("DERP");
node.getJSON();

declare var elesJson;

var myNode : TreeNode;
myNode = c.getNode();
//console.log(myNode);

//console.log(elesJson["nodes"]);
elesJson["nodes"].push(node.getJSON());
