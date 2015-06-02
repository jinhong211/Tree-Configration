///<reference path="..\typings\jquery\jquery.d.ts"/>
///<reference path=".\treeNode.ts"/>
///<reference path=".\ActionTreeNode.ts"/>


/**
 * @author Quentin Cornevin, Anaïs Marongiu
 *
 * This class handle the communication.
 */

class Communication {
    private urlSimulator:string;

    public constructor(url:string) {
        this.urlSimulator = url;
    }

    /**
     *
     * @returns {string}
     */
    httpGet() {
        $.get("http://httpbin.org/ip", function (data) {
            $(".result").html(data);
            alert("Load was performed.");
        });
    }

    httpGetMock():string {
        return "shout";
    }


    httpPostTest() {
        alert("httppost test");
        /* var xhr = new XMLHttpRequest();
         xhr.open("POST", "bots/1/tree", true); // 1 pour l'id du joueur
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // parce qu'on est en post
         //var variable = encodeURIComponent("name=shout"); //conserver les caractères spéciaux et les espaces.
         var data = encodeURIComponent("{"name": "shout"}");
         xhr.send("name=shout"); // variable1=truc&variable2=bidule*/

        // envoyer shout en format json et afficher le résultat de la requete
        $.post(this.urlSimulator, {name: "shout"}).done(function (data) {
            alert("Result: " + data);
        });
    }

    httpPost() {
        //TODO appeler parsage XML sur l'arbre selectionne par le user
        alert("httppost");
        // envoyer shout en format xml et afficher le résultat de la requete
        $.post(this.urlSimulator, {name: "shout"}).done(function (data) {
            alert("Result: " + data);
        });
    }

    parseOneBlock(datajson : string) : TreeNode {

        var obj = JSON.parse(datajson);
        return new ActionTreeNode(obj.name);
    }

    parseBlocks(datajson : string) : Array<TreeNode> {
        // TODO
        return new Array();
    }

    parseXml(racine : TreeNode) : string {
        var xml = document.createElement("node");
        var bloc = document.createElement("node");
        bloc.setAttribute("type","action");
        bloc.innerHTML = racine.getName();
        xml.appendChild( bloc );

        return xml.innerHTML;
    }
}