///<reference path="./TreeNode.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Class for the representation of an action node of a simplified behaviour tree
 * @author Benjamin, Anais
 */
var ActionTreeNode = (function (_super) {
    __extends(ActionTreeNode, _super);
    /**
     * Constructor
     * @param n
     */
    function ActionTreeNode(n) {
        _super.call(this, n);
    }
    /**
     * Get the name for the type of the node
     * @returns {string}
     */
    ActionTreeNode.prototype.getType = function () {
        return "action";
    };
    return ActionTreeNode;
})(TreeNode);
//# sourceMappingURL=ActionTreeNode.js.map