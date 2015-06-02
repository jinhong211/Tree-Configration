///<reference path="..\typings\jquery\jquery.d.ts"/>
///<reference path=".\treeNode.ts"/>
///<reference path=".\ActionTreeNode.ts"/>


/**
 * @author Quentin Cornevin, Anaïs Marongiu, Benjamin Lissilour
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
            retour = data["name"];
            f(retour);
        });
    }

    httpPostDirty(xml:string, f:(s:string)=>void):void {
        // envoyer shout en format json et afficher le résultat de la requete
        $.post(this.urlSimulator, {name: "shout"}).done(function (data) {
            f(data);
        });
    }

    httpPost(xml:string, f:(s:string)=>void):void {
        // envoyer shout en format xml et afficher le résultat de la requete
        $.post(this.urlSimulator, xml).done(function (data) {
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
        //bloc.innerHTML = racine.getName(); // TODO getName si type action
        xml.appendChild( bloc );

        return xml.innerHTML;
    }
}