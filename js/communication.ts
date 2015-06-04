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

    /*
    httpGet(f:(s:Array<JSON>)=>void):void {
        $.get(this.urlSimulator+this.routeGET, function (data) {
            f(data);
        });
    } */

    httpGet(f:(s:Array<JSON>)=>void) : void {
        $.ajax({
            url: this.urlSimulator+this.routeGET,
            type: 'GET',
            success: function(data){
                f(data);
            },
            error: function(data) {
                var res = [];
                var bloc1 = {
                    "type" : "action",
                    "name" : "shout"
                }
                var bloc2 = {
                    "type" : "composite",
                    "name" : "decorator"
                }

                res.push(bloc1);
                res.push(bloc2);
                f(res);
            }
        })
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
        $.post(this.urlSimulator+this.routePOSTOneAction, xml)
            .done(function (data) {
                alert("Result: " + data);
            })
            .fail(function () {
                alert("Error: echec de l'envoi au serveur de simulation")
            });
    }

}