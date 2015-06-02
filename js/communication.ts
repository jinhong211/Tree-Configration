///<reference path="..\typings\jquery\jquery.d.ts"/>
///<reference path=".\treeNode.ts"/>
///<reference path=".\ActionTreeNode.ts"/>


/**
 * @author Quentin Cornevin, Ana�s Marongiu
 *
 * This class handle the communication.
 */
class Communication {

    private urlSimulator:string;

    public constructor(url:string) {
        this.urlSimulator = url;
    }

    /**
     * This function is used to call the http method.
     *
     * @param f : anonyme function for the callback.
     */
    httpGet(f: (s:string)=>void) : void {
        var retour : string;
        $.get("http://10.212.118.128:3000/blocks/all", function (data) {
        //    console.log(data["name"]);
            retour = data["name"];
        //    console.log(retour);
            f(retour);
        });
    }

    /**
     * This function is
     * @returns {string}
     */
    httpGetMock():string {
        return "shout";
    }

    httpPostTest() {
        alert("httppost test");
        /* var xhr = new XMLHttpRequest();
         xhr.open("POST", "bots/1/tree", true); // 1 pour l'id du joueur
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // parce qu'on est en post
         //var variable = encodeURIComponent("name=shout"); //conserver les caract�res sp�ciaux et les espaces.
         var data = encodeURIComponent("{"name": "shout"}");
         xhr.send("name=shout"); // variable1=truc&variable2=bidule*/

        // envoyer shout en format json et afficher le r�sultat de la requete
        $.post(this.urlSimulator, {name: "shout"}).done(function (data) {
            alert("Result: " + data);
        });
    }

    httpPost() {
        //TODO appeler parsage XML sur l'arbre selectionne par le user
        alert("httppost");
        // envoyer shout en format xml et afficher le r�sultat de la requete
        $.post(this.urlSimulator, {name: "shout"}).done(function (data) {
            alert("Result: " + data);
        });
    }

    parse(datajson : string) :string {

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