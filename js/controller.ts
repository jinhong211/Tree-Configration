///<reference path=".\communication.ts"/>
///<reference path=".\buildingTree.ts"/>
///<reference path=".\parser.ts"/>
///<reference path=".\treeNode.ts"/>

/**
 * @author by Benjamin Lissilour, Anaïs Marongiu, Quentin Cornevin
 */

class Controller {

    private communication : Communication;
    private building : BuildingTree;
    private parser:Parser;
    private node : TreeNode;

    /**
     * Build a constructeur with all the intelligence use the given url
     * @param url to make the get and post.
     */
    public constructor(url : string) {
        this.communication = new Communication(url);
        this.building = new BuildingTree();
        this.parser = new Parser();
    }

    public init(f: (n : Array<TreeNode>) => void) : void  {
        var self = this;
        var dataJson : string;
        this.communication.httpGet(function (array:Array<JSON> ) {
         //   dataJson = s;
            var nodes:Array<TreeNode>;
            nodes = self.parser.parseBlocks(array);
            self.building.setBlocksAvailable(nodes);

            var doc = document.getElementById("available");
            doc.innerHTML = self.building.renderAvailableBlocks();

    //        self.node = new TreeNode(dataJson);

            f(self.building.getBlocksAvailable());
        });

        console.log("derp");
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