///<reference path=".\communication.ts"/>

/**
 * Created by A on 01/06/2015.
 */

alert("main");

var c = new Communication();
var nodeRacine = new TreeNode("shout");
c.parseXml(nodeRacine);
