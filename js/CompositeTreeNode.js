///<reference path="./TreeNode.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Class for the representation of an composite node of a simplified behaviour tree
 * @author Benjamin, Anais
 */
var CompositeTreeNode = (function (_super) {
    __extends(CompositeTreeNode, _super);
    /**
     * Constructor
     * @param n
     */
    function CompositeTreeNode(n) {
        this.childrenNodes = [];
        _super.call(this, n);
    }
    /**
     * Add a new child node
     * @param node
     */
    CompositeTreeNode.prototype.addChildNode = function (node) {
        this.childrenNodes.push(node);
    };
    /**
     * Remove a child node
     * @param node
     */
    CompositeTreeNode.prototype.removeChildNode = function (node) {
        var number = this.childrenNodes.indexOf(node);
        delete this.childrenNodes[number];
    };
    /**
     * Get the child of a node given by an index
     * @param index
     * @returns {TreeNode}
     */
    CompositeTreeNode.prototype.getChildNode = function (index) {
        return this.childrenNodes[index];
    };
    /**
     * Get the children nodes
     * @returns {Array<TreeNode>}
     */
    CompositeTreeNode.prototype.getChildrenNodes = function () {
        return this.childrenNodes;
    };
    /**
     * Get the name for the type of the node
     * @returns {string}
     */
    CompositeTreeNode.prototype.getType = function () {
        return "composite";
    };
    return CompositeTreeNode;
})(TreeNode);
//# sourceMappingURL=CompositeTreeNode.js.map