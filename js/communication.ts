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
    private routePOSTOneAction:string;

    public constructor(url:string) {
        this.urlSimulator = url;
        this.routeGET = "/blocks/all";
        this.routePOST = "/bots/1/tree";
        this.routePOSTOneAction = "/bots/1/action";
    }
    
    /**
     * This function is used to call the http method.
     * get blocs available
     * @param f : anonyme function for the callback.
     */
    httpGet(f:(s:Array<JSON>)=>void):void {
        $.get(this.urlSimulator+this.routeGET, function (data) {
            f(data);
        });
    }

    /**
     * This function is used to call the http method.
     * post
     * @param f : anonyme function for the callback.
     */
    httpPostDirty(xml:string, f:(s:string)=>void):void {
        // envoyer shout en format json et afficher le résultat de la requete
        $.post(this.urlSimulator + this.routePOSTOneAction, {name: "shout"}).done(function (data) {
            f(data);
        });
    }

    httpPost(xml:string, f:(s:string)=>void):void {
        // envoyer shout en format xml et afficher le résultat de la requete
        var json = {
            "xml" : xml.toString()
        }
        $.post(this.urlSimulator+this.routePOST, json).done(function (data) {
            alert("Result: " + data);
        });
    }
}