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
     * Get the root of the behaviour tree
     * @returns {TreeNode}
     */
    public getRoot() : TreeNode{
        return this.root;
    }

    public setRoot(r:TreeNode) {
        this.root = r;
    }
    
    /**
     * Delete the root of the behaviour tree
     *
     */
    public deleteRoot() {
        this.root = null;
    }
}

//export = Tree;