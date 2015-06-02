///<reference path=".\communication.ts"/>
///<reference path=".\buildingTree.ts"/>

/**
 * Created by Benjamin Lissilour, Ana�s Marongiu
 */

class Controller {
    private communication : Communication;
    private building : BuildingTree;

    public constructor(url : string) {
        this.communication = new Communication(url);
        this.building = new BuildingTree();
    }

    public init() {
        var dataJson = this.communication.httpGetMock();
        var treeNode = this.communication.parseOneBlock(dataJson);
        this.building.setRoot(treeNode);

        var x = document.getElementById("blocs");
        x.innerHTML = treeNode.toString();
    }

    public send() {
        var xml = this.communication.parseXml(this.building.getTree().getRoot());
        this.communication.httpPost(xml);
    }
}