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

    public constructor(url : string) {
        this.communication = new Communication(url);
        this.building = new BuildingTree();
        this.parser = new Parser();
    }

    public init():void {
        this.communication.httpGet(function (s:string) {

            var nodes:Array<TreeNode>;
            nodes = new Array<TreeNode>();
            console.log(s);
            console.log(nodes);
            nodes = this.parser.parseBlocks(s);

            this.building.setBlocksAvailable(nodes);
            var doc = document.getElementById("available");
            doc.innerHTML = this.building.renderAvailableBlocks();
        });
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
}