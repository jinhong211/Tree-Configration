/**
 * Class for the representation of a node of a simplified behaviour tree
 * @author Benjamin, Anais
 */
class TreeNode {
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
     * Constructor
     * @param n
     */
    public constructor(n : string, namedisplayed = "", description = ""){
        this.name = n;
        this.nameDisplayed = namedisplayed;
        this.description = description;
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
}
