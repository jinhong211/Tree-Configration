///<reference path=".\communication.ts"/>

/**
 * Created by Ana�s Marongiu
 */
var c = new Communication("bots/1/tree");
//c.httpPost();
var bloc = c.httpGetMock();

var bloc2 : string;

c.httpGet(function (s) {
    bloc2 = s;
    // console.log(bloc2);
    var x = document.getElementById("blocs");
    x.innerHTML = bloc2.toString();
});



//var x = document.getElementById("blocs");
//x.innerHTML = bloc.toString();

//var nodeRacine = new TreeNode("shout");
//c.parseXml(nodeRacine);

