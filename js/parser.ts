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

    parseBlocks(datajson:Array<JSON>):Array<TreeNode> {
        var listNodeAvailable:Array<TreeNode>;
        listNodeAvailable = new Array<TreeNode>();

        for (var i = 0; i < datajson.length; i++) {
            var jsonBloc = datajson[i];
            if (jsonBloc["type"] == "action") {
                listNodeAvailable.push(new ActionTreeNode(jsonBloc["name"]));
            } else if (jsonBloc["type"] == "composite") {
                listNodeAvailable.push(new CompositeTreeNode(jsonBloc["name"]));
            } else {
                listNodeAvailable.push(new TreeNode(jsonBloc["name"]));
            }
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
            bloc.setAttribute("name",noeudCourant.getName());
            var children = noeudCourant.getChildrenNodes();
            for (var i=0; i<children.length; i++) {
                bloc.innerHTML += this.parseXml(children[i]);
            }
        }
        xml.appendChild( bloc );

        return xml.innerHTML;
    }
}