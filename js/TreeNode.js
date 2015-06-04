/**
 * Class for the representation of a node of a simplified behaviour tree
 * @author Benjamin, Anais
 */
var TreeNode = (function () {
    /**
     * Constructor
     * @param n
     */
    function TreeNode(n) {
        this.name = n;
    }
    /**
     * Get the name of the node
     * @returns {string}
     */
    TreeNode.prototype.getName = function () {
        return this.name;
    };
    /**
     * Get the name for the type of the node
     * @returns {string}
     */
    TreeNode.prototype.getType = function () {
        return "not expected";
    };
    return TreeNode;
})();
//# sourceMappingURL=TreeNode.js.map