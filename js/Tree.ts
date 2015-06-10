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

    private blackboard : Array<JSON>;

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

    public getBlackboard() : Array<JSON>{
        return this.blackboard;
    }

    public setBlackboard(bb : Array<JSON>) : void {
        this.blackboard = bb;
    }
    
    /**
     * Delete the root of the behaviour tree
     *
     */
    public deleteRoot() {
        this.root = null;
    }
}

export = Tree;