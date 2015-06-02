///<reference path=".\communication.ts"/>
/**
 * Created by A on 01/06/2015.
 */
var c = new Communication("bots/1/tree");
//c.httpPost();
var bloc = c.httpGetMock();

var x = document.getElementById("blocs");
x.innerHTML = bloc.toString();
