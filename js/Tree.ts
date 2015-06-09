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

    private blackboard : Array<JSON>;

    /**
     * Get the root of the behaviour tree
     * @returns {TreeNode}
     */
    public getRoot() : TreeNode{
        return this.root;
    }

    public setRoot(r:RootTreeNode) {
        this.root = r;
    }

    public getBlackboard() : Array<JSON>{
        return this.blackboard;
    }

    public setBlackboard(bb : Array<JSON>) : void {
        this.blackboard = bb;
    }
}