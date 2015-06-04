///<reference path="./TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path="./CompositeTreeNode"/>
/**
 * Class for the parsing between a simulator and our module
 * We need to parse the blocs received in JSON
 * and we need a tree to send in XML
 * @author Benjamin
 */
var Parser = (function () {
    function Parser() {
    }
    /**
     * Parse blocks received in JSON format
     * @param datajson
     * @returns {Array<TreeNode>}
     */
    Parser.prototype.parseBlocks = function (datajson) {
        var listNodeAvailable = new Array();
        for (var i = 0; i < datajson.length; i++) {
            var jsonBloc = datajson[i];
            if (jsonBloc["type"] == "action") {
                listNodeAvailable.push(new ActionTreeNode(jsonBloc["name"]));
            }
            else if (jsonBloc["type"] == "composite") {
                listNodeAvailable.push(new CompositeTreeNode(jsonBloc["name"]));
            }
            else {
                listNodeAvailable.push(new TreeNode(jsonBloc["name"]));
            }
        }
        return listNodeAvailable;
    };
    /**
     * Parse a Tree in a XML format to be send to a simulator
     * This function is recursive.
     * It must be call with the root node to send the complete tree
     * @param currentNode
     * @returns {string}
     */
    Parser.prototype.parseXml = function (currentNode) {
        var xml = document.createElement("node");
        var bloc = document.createElement("node");
        if (currentNode instanceof ActionTreeNode) {
            bloc.setAttribute("type", "action");
            bloc.innerHTML += currentNode.getName();
        }
        else if (currentNode instanceof CompositeTreeNode) {
            bloc.setAttribute("type", "composite");
            bloc.setAttribute("name", currentNode.getName());
            var children = currentNode.getChildrenNodes();
            for (var i = 0; i < children.length; i++) {
                bloc.innerHTML += this.parseXml(children[i]);
            }
        }
        xml.appendChild(bloc);
        return xml.innerHTML;
    };
    return Parser;
})();
//# sourceMappingURL=Parser.js.map