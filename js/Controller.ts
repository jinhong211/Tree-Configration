///<reference path="./Communication.ts"/>
///<reference path="./BuilderTree.ts"/>
///<reference path="./Parser.ts"/>
///<reference path="./TreeNode.ts"/>

/**
 * Class for the controller between the model and the view page
 * @author Benjamin, Anais, Quentin
 */
class Controller {

    /**
     * Communication class
     */
    private communication : Communication;

    /**
     * Parser for the communication
     */
    private parser:Parser;

    /**
     * Builder of the tree
     */
    private building:BuilderTree;

    private url : string;

    /**
     * Instance of the class for the singleton pattern
     */
    private static instance : Controller;

    /**
     * Constructor with all the intelligence use the given url
     * @param url to make the get and post.
     */
    public constructor() {
        this.url = "";    //"http://10.212.118.128:3000";
        this.communication = new Communication(this.url);
        this.building = new BuilderTree();
        this.parser = new Parser();
    }

    /**
     * GetInstance method for the singleton pattern
     * @returns {Controller}
     */
    public static getInstance() : Controller {
        if(this.instance == null) {
            this.instance = new Controller();
        }
        return this.instance;
    }

    /**
     * Method for the initialisation of the available bloks
     * @param f
     */
    public init(f: (n : Array<TreeNode>) => void) : void  {
        var self = this;
        this.communication.httpGet(function (array:Array<JSON> ) {
            // parse the received blocks JSON to our blocks object
            var nodes:Array<TreeNode>;
            nodes = self.parser.parseBlocks2(array);

            // set the blocks in our modle
            self.building.setAvailableBlocks(nodes);

            // display the blocks in the menu
            self.building.renderAvailableBlocksMenu();

            // return
            f(self.building.getAvailableBlocks());
        });
    }

    public initMOCK() : void  {
        var self = this;
        var array = this.communication.httpGetMOCK();

        // parse the received blocks JSON to our blocks object
        var nodes:Array<TreeNode>;
        nodes = self.parser.parseBlocks(array);

        // set the blocks in our modle
        self.building.setAvailableBlocks(nodes);

        // display the blocks in the menu
        self.building.renderAvailableBlocksMenu();
    }

    /**
     * Method for the sending of the simplified behaviour tree create by the user to a simulator
     */
    public send() {
        // var xml = this.communication.parseXml(this.building.getTree().getRoot());
        var xml = this.parser.parseXml2(this.building.getSelectedBlocks()[0]);
        var retour:string;
        console.log("xml", xml);
        this.communication.httpPost(xml, function (s:string) {
            retour = s;
            alert("Result : " + retour);
        });
    }

    /**
     * Get the builderTree
     * @returns {BuilderTree}
     */
    public getBuilderTree():BuilderTree {
        return this.building;
    }

    /**
     * This method set the old url with the given url
     * @param newUrl
     */
    public setUrl(newUrl : string) : void {
        this.url = newUrl;
        this.communication.setUrl(newUrl);
    }

    /**
     * This method return the actual url of the server.
     * @returns {string}
     */
    public getUrl() : string {
        return this.url;
    }
}

