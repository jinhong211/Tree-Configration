///<reference path="..\typings\jquery\jquery.d.ts"/>
///<reference path=".\TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path=".\CompositeTreeNode"/>
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
        this.pathGET = "/blocks/all";
        this.pathPOST = "/bots/1/tree";
        this.pathPOSTOneAction = "/bots/1/action";
    }
    /**
     * This function call the http method to get available blocs in JSON format
     * @param f : anonyme function for the callback.
     */
    Communication.prototype.httpGet = function (f) {
        $.get(this.urlSimulator + this.pathGET, function (data) {
            f(data);
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
        $.post(this.urlSimulator + this.pathPOSTOneAction, { name: "shout" }).done(function (data) {
            f(data);
        });
    };
    /**
     * This function call the http method to post a simplified behaviour tree in XML format
     * @param xml
     * @param f
     */
    Communication.prototype.httpPost = function (xml, f) {
        $.post(this.urlSimulator + this.pathPOSTOneAction, xml).done(function (data) {
            // display the result by the simulator
            alert("Result : " + data);
        });
    };
    return Communication;
})();
//# sourceMappingURL=Communication.js.map