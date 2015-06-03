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
        // Attention quand on est dans un callback et qu'on veut utiliser un this,
        // penser à le sauvegarder avant
        var self = this;
        this.communication.httpGet(function (s:Array<JSON>) {
            var nodes:Array<TreeNode>;
            nodes = self.parser.parseBlocks(s);
            self.building.setBlocksAvailable(nodes);
            var doc = document.getElementById("available");
            doc.innerHTML = self.building.renderAvailableBlocks();
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