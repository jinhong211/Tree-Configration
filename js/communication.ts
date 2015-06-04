///<reference path="..\typings\jquery\jquery.d.ts"/>
///<reference path=".\TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path=".\CompositeTreeNode"/>

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
    private pathGET:string;

    /**
     * Path to call the Post method
     */
    private pathPOST:string;

    /**
     * Path to call the Post method for one action
     */
    private pathPOSTOneAction:string;

    /**
     * Constructor
     * @param url
     */
    public constructor(url:string) {
        this.urlSimulator = url;
        this.pathGET = "/blocks/all";
        this.pathPOST = "/bots/1/tree";
        this.pathPOSTOneAction = "/bots/1/action";
    }
    
    /**
     * This function call the http method to get available blocs in JSON format
     * @param f : anonyme function for the callback.
     */
    httpGet(f:(s:Array<JSON>)=>void):void {
        $.get(this.urlSimulator + this.pathGET, function (data) {
            f(data);
        });
    }

    /**
     * This function call the http method to post a behaviour tree composed by one action node in JSON format
     * @param f
     */
    httpPostDirty(f:(s:string)=>void):void {
        $.post(this.urlSimulator + this.pathPOSTOneAction, {name: "shout"}).done(function (data) {
            f(data);
        });
    }

    /**
     * This function call the http method to post a simplified behaviour tree in XML format
     * @param xml
     * @param f
     */
    httpPost(xml:string, f:(s:string)=>void):void {
        $.post(this.urlSimulator + this.pathPOSTOneAction, xml).done(function (data) {
            // display the result by the simulator
            alert("Result : " + data);
        });
    }
}