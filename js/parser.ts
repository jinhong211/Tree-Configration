/**
 * Created by ben on 03/06/2015.
 */

///<reference path=".\treeNode.ts"/>
///<reference path=".\ActionTreeNode.ts"/>
///<reference path=".\CompositeTreeNode"/>

/**
 * Created by ben on 02/06/2015.
 */

class Parser {

    public constructor(){}

    parseOneBlock(datajson : string) : TreeNode {

        var obj = JSON.parse(datajson);
        return new ActionTreeNode(obj[0]["name"]);
    }

    parseBlocks(datajson : string) : Array<TreeNode> {
        var listNodeAvailable = new Array<TreeNode>();
        var jsonObj = JSON.parse(datajson);

        for (var i = 0;i<jsonObj.length;i++){
            var jsonBloc = jsonObj[i];
            listNodeAvailable.push(new TreeNode(jsonBloc["name"]));
        }
        return listNodeAvailable;
    }

    parseXml(noeudCourant : TreeNode) : string {
        var xml = document.createElement("node");
        var bloc = document.createElement("node");



        if (noeudCourant instanceof ActionTreeNode) {
            bloc.setAttribute("type","action");
            bloc.innerHTML += noeudCourant.getName();

        } else if (noeudCourant instanceof CompositeTreeNode) {
            bloc.setAttribute("type","composite");
            var children = noeudCourant.getChiledrenNodes();
            for (var i=0; i<children.length; i++) {
                bloc.innerHTML += this.parseXml(children[i]);
            }
        }
        xml.appendChild( bloc );

        return xml.innerHTML;
    }
}