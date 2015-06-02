///<reference path="..\typings\jquery\jquery.d.ts"/>
///<reference path=".\treeNode.ts"/>
///<reference path=".\ActionTreeNode.ts"/>
///<reference path=".\CompositeTreeNode"/>


/**
 * @author Quentin Cornevin, Anaïs Marongiu, Benjamin Lissilour
 *
 * This class handle the communication.
 */

class Communication {

    private urlSimulator:string;
    private routeGET:string;
    private routePOST:string;

    public constructor(url:string) {
        this.urlSimulator = url;
        this.routeGET = "/blocks/all";
        this.routePOST = "/bots/1/tree";
    }
    
    /**
     * This function is used to call the http method.
     *
     * @param f : anonyme function for the callback.
     */
    httpGet(f: (s:string)=>void) : void {
        var retour : string;
        $.get(this.urlSimulator+this.routeGET, function (data) {
            retour = data["name"];
            f(retour);
        });
    }

    httpPostDirty(xml:string, f:(s:string)=>void):void {
        // envoyer shout en format json et afficher le résultat de la requete
        $.post(this.urlSimulator+this.routePOST, {name: "shout"}).done(function (data) {
            f(data);
        });
    }

    httpPost(xml:string, f:(s:string)=>void):void {
        // envoyer shout en format xml et afficher le résultat de la requete
        $.post(this.urlSimulator+this.routePOST, xml).done(function (data) {
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

    parseXml(noeudCourant : TreeNode) : string {
        var xml = document.createElement("node");
        var bloc = document.createElement("node");



        if (noeudCourant instanceof ActionTreeNode) {
            bloc.setAttribute("type","action");
            bloc.innerHTML += noeudCourant.getName();

        } else if (noeudCourant instanceof CompositeTreeNode) {
            bloc.setAttribute("type","composite");
            var children = noeudCourant.getChiledrenNodes();
            for (var i=0; i<children.length; i++) {
                bloc.innerHTML += this.parseXml(children[i]);
            }
        }
        xml.appendChild( bloc );

        return xml.innerHTML;
    }
}