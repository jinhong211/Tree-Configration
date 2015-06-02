///<reference path=".\communication.ts"/>
///<reference path=".\buildingTree.ts"/>

/**
 * @author by Benjamin Lissilour, Anaïs Marongiu, Quentin Cornevin
 */

class Controller {

    private communication : Communication;
    private building : BuildingTree;

    public constructor(url : string) {
        this.communication = new Communication(url);
        this.building = new BuildingTree();
    }

    public init() {
        var dataJson : string;
        this.communication.httpGet(function (s:string) {
            dataJson = s;
            console.log(dataJson);
            var doc = document.getElementById("blocs");
            console.log(doc);
            doc.innerHTML = dataJson.toString();
        });

        var treeNode = this.communication.parseOneBlock(dataJson);
        this.building.setRoot(treeNode);

        var x = document.getElementById("blocs");
        x.innerHTML = treeNode.toString();
    }


    public send() {
        var xml = this.communication.parseXml(this.building.getTree().getRoot());
        var retour:string;
        this.communication.httpPostDirty(xml, function (s:string) {
            retour = s;
            alert("Result : " + retour);
        });
    }
}