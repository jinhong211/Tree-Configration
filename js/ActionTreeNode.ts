///<reference path="./TreeNode.ts"/>

/**
 * Class for the representation of an action node of a simplified behaviour tree
 * @author Benjamin, Anais
 */
class ActionTreeNode extends TreeNode {

    /**
     * Constructor
     * @param n
     */
    public constructor(n : string, namedisplayed = "", description = "", params = []) {
        super(n,namedisplayed,description, params);
    }

    /**
     * Get the name for the type of the node
     * @returns {string}
     */
    public getType():string {
        return "action";
    }

}

//export = ActionTreeNode;