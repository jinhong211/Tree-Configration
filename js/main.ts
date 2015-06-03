///<reference path="./controller.ts"/>

/**
 * @author by Anaïs Marongiu, Quentin Cornevin
 */
var mn : TreeNode;
var c = new Controller("http://10.212.118.128:3000/bots/1/tree");
c.init(function(n:TreeNode) {
    mn = n;
    console.log("coucou",mn);
});
c.send();

var node = new TreeNode("DEEEEEEEEEEEEEEEEEEEEEEEEEEEEERP");
node.getJSON();

declare var elesJson;

var myNode : TreeNode;
myNode = c.getNode();
//console.log(myNode);

//console.log(elesJson["nodes"]);
elesJson["nodes"].push(node.getJSON());
