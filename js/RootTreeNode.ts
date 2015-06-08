///<reference path="./TreeNode.ts"/>

/**
 * Class for the representation of an root node of a simplified behaviour tree
 * @author Benjamin, Anais, Quentin
 */
class RootTreeNode extends TreeNode {

    /**
     * Children node of the root node
     */
    private child : TreeNode;

    public constructor(name : string, nameDisplayed : string, description = "") {
        super(name, nameDisplayed, description);
        this.child = null;
    }

    /**
     * This method add a child if the root is available. If the root is not avaible then the
     * method return false.
     *
     * @param node we want to add to the root
     * @returns {boolean} true if the child is added, false otherwise
     */
    public addChildNode(node : TreeNode) : boolean {
        if(this.child == null) {
            this.child = node;
            return true;
        }
        return false;
    }

    /**
     * This method remove the child of the root if he is defined
     * @returns {boolean} True if the child is removed false otherwise.
     */
    public removeChildNode() : boolean {
        if(this.child == null) {
            return false;
        }
        this.child = null;
        return true;
    }


}