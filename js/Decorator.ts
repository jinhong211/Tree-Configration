///<reference path="./TreeNode.ts"/>
/**
 * Class for the representation of a special node decorator
 * @author Anais, Quentin Cornevin
 */
class Decorator extends TreeNode{

    private settableParameter : Array<number | string>;

    /**
     * Constructor of the decorator with a name and an array of string or number containing
     * all the parameter of the decorator
     * @param n
     * @param settableParams
     * @param nameDisplayed
     * @param description
     */
    public constructor(n: string, settableParams : Array<number | string> ,nameDisplayed = "", description = "" ) {
        super(n,nameDisplayed,description);
        this.settableParameter = settableParams;
    }

    /**
     * This method is a getter for the settable parameter.
     * @returns {Array<number|string>}
     */
    public getParams(): Array<number | string> {
        return this.settableParameter;
    }

    // TODO le set !
}