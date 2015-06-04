///<reference path="./TreeNode.ts"/>
/**
 * Class for the representation of a simplified behavious tree
 * @author Benjamin, Anais
 */
var Tree = (function () {
    /**
     * Constructor
     * @param r
     */
    function Tree(r) {
        this.root = r;
    }
    /**
     * Get the root of the behaviour tree
     * @returns {TreeNode}
     */
    Tree.prototype.getRoot = function () {
        return this.root;
    };
    return Tree;
})();
//# sourceMappingURL=Tree.js.map