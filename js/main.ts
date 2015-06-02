///<reference path=".\communication.ts"/>

/**
 * Created by Anaïs Marongiu
 */
var c = new Communication("bots/1/tree");
//c.httpPost();
var bloc = c.httpGetMock();

var x = document.getElementById("blocs");
x.innerHTML = bloc.toString();

// var nodeRacine = new TreeNode("shout");
// c.parseXml(nodeRacine);
