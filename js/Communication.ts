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
    httpGet(f:(s:JSON)=>void) : void {
        var $loading = $('#loadingDiv').hide();
        var $loadText = $('#loadText');

        var self = this;
        $loading.show();
        $.ajax({
            url: this.urlSimulator+this.routeGET,
            type: 'GET',
            success: function(data){
                $loadText.html( "<p>Blocks load from simulator</p>" );
                var res = self.httpGetMOCK3();
                f(data);
                $loading.hide();
                //f(data);
            },
            error: function(data) {
                $loading.hide();
                $loadText.html( "<p>Predifined blocks</p>" );
                alert("Error: load failed from server, load of predifined blocks");
                var res = self.httpGetMOCK3();
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
        };

        var bloc2 = {
            "kind" : "composite",
            "type" : "Sequence",
            "name" : "sequence"
        };

        var bloc3 = {
            "kind" : "task",
            "type" : "Move",
            "name" : "move"
        };

        var bloc4 = {
            "kind" : "task",
            "type" : "Shoot",
            "name" : "shoot"
        };

        var bloc5 = {
            "kind" : "composite",
            "type" : "Selector",
            "name" : "selector"
        };

        var bloc6 = {
            "kind" : "task",
            "type" : "Hide",
            "name" : "hide"
        };

        res.push(bloc1);
        res.push(bloc2);
        res.push(bloc3);
        res.push(bloc4);
        res.push(bloc5);
        res.push(bloc6);
        console.log(res);
        return res;
    }

    httpGetMOCK3() : any {
        return {
            blackboard : [{name:"ennemyTarget", type:"object", desc:""},
                {name:"Bob",type:"string",desc:""}],
            nodes : [
                {kind:"task",
                    type:"MoveTo",
                    name:"Move To",
                    desc:"Your bot move to a target.",
                    category:"Move Action",
                    params:[{name :"target", type :"blackboard"}]
                },
                {kind: "task",
                    type:"Hide",
                    name:"Hide",
                    desc:"Your bot hide.",
                    category: "Basic Action",
                    params:[]
                },
                {kind: "task",
                    type:"Shout",
                    name:"Shout Action...",
                    desc:"Your bot shouts a message.",
                    category: "Basic Action",
                    params:[{name:"message", type:"string", defaultValue:"Oh!"}]
                },
                {kind:"task",
                    type:"Shoot",
                    name:"Move To",
                    desc:"Your bot shoot to a target.",
                    category:"Shoot Action",
                    params:[{name :"target", type :"blackboard"}]
                },
                {kind:"composite",
                    type:"Selector",
                    name:"Selector",
                    desc:"Try until success",
                    category:"",
                    params:[]
                },
                {kind:"composite",
                    type:"Sequence",
                    name:"Sequence",
                    desc:"Try until fail",
                    category:"",
                    params:[]
                },
                {kind: "decorator",
                    type: "checkDistance",
                    name: "checkDistance",
                    desc: "check the distance to a target",
                    params:[{name: "distance", type: "number"}]
                },
                {kind: "decorator",
                    type: "Loop",
                    name: "Loop",
                    desc: "do loop",
                    params:[{name: "times", type: "number"}]
                }
            ]
        };
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
        // envoyer shout en format xml et afficher le r�sultat de la requete
        var $loading = $('#loadingDiv').show();

        var json = {
            "xml" : xml.toString()
        };
        $.post(this.urlSimulator+this.routePOST, json)
            .done(function (data) {
                alert("Result: " + data);
                $loading.hide();
            })
            .fail(function () {
                alert("Error: the sending of data the server failed");
                $loading.hide();
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