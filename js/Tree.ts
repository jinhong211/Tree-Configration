///<reference path="./TreeNode.ts"/>
///<reference path="./RootTreeNode.ts"/>

/**
 * Class for the representation of a simplified behavious tree
 * @author Benjamin, Anais
 */
class Tree {
    /**
     * Root Node
     */
    private root : RootTreeNode;

    /**
     * Constructor
     * @param r
     */
    public constructor(r : RootTreeNode) {
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