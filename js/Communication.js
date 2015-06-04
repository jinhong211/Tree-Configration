///<reference path="..\typings\jquery\jquery.d.ts"/>
///<reference path="./TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path="./CompositeTreeNode"/>
/**
 * This class handle the communication with a simulator
 * @author Quentin, Anais, Benjamin
 */
var Communication = (function () {
    /**
     * Constructor
     * @param url
     */
    function Communication(url) {
        this.urlSimulator = url;
        this.routeGET = "/blocks/all";
        this.routePOST = "/bots/1/tree";
        this.routePOSTOneAction = "/bots/1/action";
    }
    /**
     * This function call the http method to get available blocs in JSON format
     * @param f : anonyme function for the callback.
     */
    Communication.prototype.httpGet = function (f) {
        $.ajax({
            url: this.urlSimulator + this.routeGET,
            type: 'GET',
            success: function (data) {
                f(data);
            },
            error: function (data) {
                alert("Erreur : echec de chargement des donnees du serveur simulation");
                var res = [];
                var bloc1 = {
                    "type": "action",
                    "name": "shout"
                };
                var bloc2 = {
                    "type": "composite",
                    "name": "decorator"
                };
                res.push(bloc1);
                res.push(bloc2);
                f(res);
            }
        });
    };
    Communication.prototype.httpGetMOCK = function () {
        var res = [];
        var bloc1 = {
            "type": "action",
            "name": "shout"
        };
        var bloc2 = {
            "type": "composite",
            "name": "decorator"
        };
        res.push(bloc1);
        res.push(bloc2);
        return res;
    };
    /**
     * This function call the http method to post a behaviour tree composed by one action node in JSON format
     * @param f
     */
    Communication.prototype.httpPostDirty = function (f) {
        $.post(this.urlSimulator + this.routePOSTOneAction, { name: "shout" }).done(function (data) {
            f(data);
        });
    };
    /**
     * This function call the http method to post a simplified behaviour tree in XML format
     * @param xml
     * @param f
     */
    Communication.prototype.httpPost = function (xml, f) {
        // envoyer shout en format xml et afficher le r�sultat de la requete
        var json = {
            "xml": xml.toString()
        };
        $.post(this.urlSimulator + this.routePOSTOneAction, json).done(function (data) {
            alert("Result: " + data);
        }).fail(function () {
            alert("Error: echec de l'envoi au serveur de simulation");
        });
    };
    return Communication;
})();
//# sourceMappingURL=Communication.js.map