///<reference path="./TreeNode.ts"/>
/**
 * Class for the representation of a special node decorator
 * @author Anais
 */
class DecoratorTreeNode extends TreeNode {

    /**
     * Constructor
     * @param n
     */
    public constructor(n : string, namedisplayed = "", description = "") {
        super(n,namedisplayed,description);
    }

    /**
     * Get the name for the type of the node
     * @returns {string}
     */
    public getType():string {
        return "decorator";
    }

}