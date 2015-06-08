///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="./TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path="./CompositeTreeNode"/>

/**
 * This class handle the communication with a simulator
 * @author Quentin, Anais, Benjamin
 */

class Communication {
    /**
     * URL of the simulator
     */
    private urlSimulator:string;

    /**
     * Path to call the Get method
     */
    private routeGET:string;

    /**
     * Path to call the Post method
     */
    private routePOST:string;

    /**
     * Path to call the Post method for one action
     */
    private routePOSTOneAction:string;

    /**
     * Constructor
     * @param url
     */
    public constructor(url:string) {
        this.urlSimulator = url;
        this.routeGET = "/blocks/all";
        this.routePOST = "/bots/1/tree";
        this.routePOSTOneAction = "/bots/1/action";
    }

    /**
     * This function call the http method to get available blocs in JSON format
     * @param f : anonyme function for the callback.
     */
    httpGet(f:(s:Array<JSON>)=>void) : void {
        var self = this;
        $.ajax({
            url: this.urlSimulator+this.routeGET,
            type: 'GET',
            success: function(data){
                console.log(data);
                f(data);
            },
            error: function(data) {
                alert("Erreur : echec de chargement des donnees du serveur simulation. Nous chargeons des blocs" +
                " predefinis");
                var res = self.httpGetMOCK();
                f(res);

            }
        })
    }

    httpGetMOCK() : JSON[]{
        var res = [];
        var bloc1 = {
            "kind" : "task",
            "type" : "FindEnemy",
            "name" : "find enemy"
        }

        var bloc2 = {
            "kind" : "composite",
            "type" : "Sequence",
            "name" : "sequence"
        }

        var bloc3 = {
            "kind" : "task",
            "type" : "Move",
            "name" : "move"
        }

        var bloc4 = {
            "kind" : "task",
            "type" : "Shoot",
            "name" : "shoot"
        }

        var bloc5 = {
            "kind" : "composite",
            "type" : "Selector",
            "name" : "selector"
        }

        var bloc6 = {
            "kind" : "task",
            "type" : "Hide",
            "name" : "hide"
        }

        res.push(bloc1);
        res.push(bloc2);
        res.push(bloc3);
        res.push(bloc4);
        res.push(bloc5);
        res.push(bloc6);
        console.log(res);
        return res;
    }

    /**
     * This function call the http method to post a behaviour tree composed by one action node in JSON format
     * @param f
     */
    httpPostDirty(f:(s:string)=>void):void {
        $.post(this.urlSimulator + this.routePOSTOneAction, {name: "shout"}).done(function (data) {
            f(data);
        });
    }

    /**
     * This function call the http method to post a simplified behaviour tree in XML format
     * @param xml
     * @param f
     */
    httpPost(xml:string, f:(s:string)=>void):void {
        // envoyer shout en format xml et afficher le résultat de la requete
        var json = {
            "xml" : xml.toString()
        }
        $.post(this.urlSimulator+this.routePOST, json)
            .done(function (data) {
                alert("Result: " + data);
            })
            .fail(function () {
                alert("Error: echec de l'envoi au serveur de simulation")
            });
    }

    /**
     * This method set the current url.
     * @param newUrl
     */
    public setUrl(newUrl : string) : void {
        this.urlSimulator = newUrl;
    }
}