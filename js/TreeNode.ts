///<reference path="./Decorator"/>
///<reference path="./Parameter.ts"/>

/**
 * Class for the representation of a node of a simplified behaviour tree
 * @author Benjamin, Anais
 */
class TreeNode {

    /**
     * Id of the treeNode display
     */
    private id : number;

    /**
     * Name of the node
     */
    private name : string;

    /**
     * Name of the node wich will be displayed
     */
    private nameDisplayed : string;

    /**
     * Description of the node
     */
    private description : string;

    /**
     * Parent node of the tree node
     */
    private parentNode :  TreeNode;

    /**
     * List of decorators for this node
     */
    private decorators : Decorator[];

    /**
     * Params
     */
    private params : Array<Parameter>;

    /**
     * Constructor
     * @param n
     */
    public constructor(n : string, namedisplayed = "", description = "", para = []){
        this.name = n;
        this.nameDisplayed = namedisplayed;
        this.description = description;
        this.parentNode = null;
        this.params = para;
        this.decorators = [];
    }

    /**
     * Get the name of the node
     * @returns {string}
     */
    public getName() {
        return this.name;
    }

    /**
     * Get the name for the type of the node
     * @returns {string}
     */
    public getType():string {
        return "not expected";
    }

    /**
     * Set the id for the id of the node
     * @param id
     */
    public setId(id : number) {
        this.id = id;
    }

    /**
     * Get the id of the node
     * @returns {number}
     */
    public getId():number {
        return this.id;
    }

    /**
     * Set the node of the parent node
     * @param (TreeNode)
     */
    public setParentNode(node : TreeNode) {
        this.parentNode = node;
    }

    /**
     * Get the parent node of the node
     * @return (parent node)
     */
    public getParentNode() : TreeNode {
        return this.parentNode;
    }

    /**
     * Remove the parent node of the node
     *
     */
    public removeParentNode() {
        this.parentNode = null;
    }
    /**
     * Add a decorator to a node
     * @param d
     */
    public addDecorator(d: Decorator) {
        this.decorators.push(d);
    }

    /**
     * Remove a decorator of a node
     * @param d
     */
    public removeDecorator(d: Decorator) {
        var number = this.decorators.indexOf(d);
        this.decorators.splice(number, 1);
    }

    public getDecorators() {
        return this.decorators;
    }

    public getParams(): Array<Parameter> {
        return this.params;
    }

}
