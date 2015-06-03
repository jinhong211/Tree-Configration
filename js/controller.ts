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
    private url : string;

    private static instance : Controller;

    /**
     * Build a constructeur with all the intelligence use the given url
     * @param url to make the get and post.
     */
    public constructor() {
        this.url = "http://10.212.118.128:3000";
        this.communication = new Communication(this.url);
        this.building = new BuildingTree();
        this.parser = new Parser();
    }

    public static getInstance() : Controller {
        if(this.instance == null) {
            this.instance = new Controller();
        }
        return this.instance;
    }

    public init(f: (n : Array<TreeNode>) => void) : void  {
        var self = this;
        var dataJson : string;
        this.communication.httpGet(function (array:Array<JSON> ) {
         //   dataJson = s;
            var nodes:Array<TreeNode>;
            nodes = self.parser.parseBlocks(array);
            self.building.setBlocksAvailable(nodes);
            self.building.renderAvailableBlocksMenu();

            // var doc = document.getElementById("available");
            // doc.innerHTML = self.building.renderAvailableBlocks();

            f(self.building.getBlocksAvailable());
        });
    }

    public send() {
       // var xml = this.communication.parseXml(this.building.getTree().getRoot());
        console.log(this.building.getSelectedBlocks()[0]);
        var xml = this.parser.parseXml(this.building.getSelectedBlocks()[0]);
        var retour:string;
        console.log("xml", xml);
        this.communication.httpPost(xml, function (s:string) {
            retour = s;
            alert("Result : " + retour);
        });
    }

    public getNode() : TreeNode {
        return this.node;
    }

    public getBuildingTree() : BuildingTree {
        return this.building;
    }
}

