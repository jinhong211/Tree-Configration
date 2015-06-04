///<reference path="./TreeNode.ts"/>

/**
 * Class for the representation of a simplified behavious tree
 * @author Benjamin, Anais
 */
class Tree {
    /**
     * Root Node
     */
    private root : TreeNode;

    /**
     * Constructor
     * @param r
     */
    public constructor(r : TreeNode) {
        this.root = r;
    }

    /**
     * Get the root of the behaviour tree
     * @returns {TreeNode}
     */
    public getRoot() : TreeNode{
        return this.root;
    }
}