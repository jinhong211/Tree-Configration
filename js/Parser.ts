///<reference path="./TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path="./CompositeTreeNode"/>

/**
 * Class for the parsing between a simulator and our module
 * We need to parse the blocs received in JSON
 * and we need a tree to send in XML
 * @author Benjamin
 */
class Parser {
    /**
     * Parse blocks received in JSON format
     * @param datajson
     * @returns {Array<TreeNode>}
     */
    parseBlocks(datajson:Array<JSON>):Array<TreeNode> {
        var listNodeAvailable =  new Array<TreeNode>();

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

    /**
     * Parse blocks received in JSON format
     * @param datajson
     * @returns {Array<TreeNode>}
     */
    parseBlocks2(datajson:Array<JSON>):Array<TreeNode> {
        var listNodeAvailable:Array<TreeNode>;
        listNodeAvailable = new Array<TreeNode>();
        for (var i = 0; i < datajson.length; i++) {
            var jsonBloc = datajson[i];
            if (jsonBloc["kind"] == "task") {
                listNodeAvailable.push(new ActionTreeNode(jsonBloc["type"],jsonBloc["name"],jsonBloc["desc"]));
            } else if (jsonBloc["kind"] == "composite") {
                listNodeAvailable.push(new CompositeTreeNode(jsonBloc["type"],jsonBloc["name"],jsonBloc["desc"]));
            } else {
                listNodeAvailable.push(new TreeNode(jsonBloc["type"],jsonBloc["name"],jsonBloc["desc"]));
            }
        }

        return listNodeAvailable;
    }

    /**
     * Parse a Tree in a XML format to be send to a simulator
     * This function is recursive.
     * It must be call with the root node to send the complete tree
     * @param currentNode
     * @returns {string}
     */
    parseXml(currentNode : TreeNode) : string {
        var xml = document.createElement("node");
        var bloc = document.createElement("node");

        if (currentNode instanceof ActionTreeNode) {
            bloc.setAttribute("type","action");
            bloc.innerHTML += currentNode.getName();
        } else if (currentNode instanceof CompositeTreeNode) {
            bloc.setAttribute("type","composite");
            bloc.setAttribute("name",currentNode.getName());
            var children = currentNode.getChildrenNodes();
            for (var i=0; i<children.length; i++) {
                bloc.innerHTML += this.parseXml(children[i]);
            }
        }
        xml.appendChild( bloc );

        return xml.innerHTML;
    }

    /**
     * Parse a Tree in a XML format to be send to a simulator
     * This function is recursive.
     * It must be call with the root node to send the complete tree
     * @param currentNode
     * @returns {string}
     */
    parseXml2(noeudCourant : TreeNode, init = true) : string {

        var xml = document.createElement("root");
        var bloc;

        if (noeudCourant instanceof ActionTreeNode) {
            bloc = document.createElement("task");
            var type = document.createElement("type");
            type.innerHTML = noeudCourant.getName();
            bloc.appendChild(type);
            bloc.appendChild(document.createElement("params"));
        } else if (noeudCourant instanceof CompositeTreeNode) {
            bloc = document.createElement("composite");
            var type = document.createElement("type");
            type.innerHTML = noeudCourant.getName();
            bloc.appendChild(type);
            bloc.appendChild(document.createElement("params"));
            var children = noeudCourant.getChildrenNodes();
            var childrenNode = document.createElement("children");

            for (var i=0; i<children.length; i++) {
                childrenNode.innerHTML += this.parseXml2(children[i],false);
            }

            if (children.length>0){
                bloc.appendChild(childrenNode);
            }
        }
        xml.appendChild(bloc);

        if (init) {
            var shell = document.createElement("shell");
            shell.appendChild(xml);
            return shell.innerHTML;
        }
        else return xml.innerHTML;
    }
}