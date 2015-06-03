///<reference path=".\communication.ts"/>
///<reference path=".\buildingTree.ts"/>

/**
 * @author by Benjamin Lissilour, Anaïs Marongiu, Quentin Cornevin
 */
class Controller {

    private communication : Communication;
    private building : BuildingTree;
    private node : TreeNode;

    /**
     * Build a constructeur with all the intelligence use the given url
     * @param url to make the get and post.
     */
    public constructor(url : string) {
        this.communication = new Communication(url);
        this.building = new BuildingTree();
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

    /**
     * This method initialize the list with all the node.
     */
    public init(f: (n : TreeNode) => void) : void {
        var self = this;
        var dataJson : string;
        console.log("test");
        this.communication.httpGet(function (s:string) {
            dataJson = s;
            console.log("caca",s);
            var doc = document.getElementById("blocs");
            doc.innerHTML = dataJson.toString();
            self.node = new TreeNode(dataJson);
            console.log(self.node);
            f(self.node);
        });

    //    var treeNode = this.communication.parseOneBlock(dataJson);
    //  this.building.setRoot(treeNode);
    }

    public send() {
       // var xml = this.communication.parseXml(this.building.getTree().getRoot());
        var xml = null;
        var retour:string;
        this.communication.httpPostDirty(xml, function (s:string) {
            retour = s;
            alert("Result : " + retour);
        });
    }

    public getNode() : TreeNode {
        return this.node;
    }
}