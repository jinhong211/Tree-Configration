///<reference path="./TreeNode.ts"/>

/**
 * Class for the representation of an composite node of a simplified behaviour tree
 * @author Benjamin, Anais
 */
class CompositeTreeNode extends TreeNode {
    /**
     * Children nodes of the composite node (selector or sequence)
     */
    private childrenNodes : Array<TreeNode>;

    /**
     * Constructor
     * @param n
     */
    public constructor(n : string, namedisplayed = "", description = "") {
        this.childrenNodes = [];
        super(n,namedisplayed,description);
    }

    /**
     * Add a new child node
     * @param node
     */
    public addChildNode(node : TreeNode){
        this.childrenNodes.push(node);
    }

    /**
     * Remove a child node
     * @param node
     */
    public removeChildNode(node:TreeNode) {
        var number = this.childrenNodes.indexOf(node);
        delete this.childrenNodes[number];
    }

    /**
     * Get the child of a node given by an index
     * @param index
     * @returns {TreeNode}
     */
    public getChildNode(index : number) : TreeNode{
        return this.childrenNodes[index];
    }


    /**
     * Get the children nodes
     * @returns {Array<TreeNode>}
     */
    public getChildrenNodes():Array<TreeNode> {
        return this.childrenNodes;
    }

    /**
     * Get the name for the type of the node
     * @returns {string}
     */
    public getType():string {
        return "composite";
    }

}
