///<reference path="./Communication.ts"/>
///<reference path="./BuilderTree.ts"/>
///<reference path="./Parser.ts"/>
///<reference path="./TreeNode.ts"/>
/**
 * Class for the controller between the model and the view page
 * @author Benjamin, Anais, Quentin
 */
var Controller = (function () {
    /**
     * Constructor with all the intelligence use the given url
     * @param url to make the get and post.
     */
    function Controller() {
        this.url = "http://10.212.118.128:3000";
        this.communication = new Communication(this.url);
        this.building = new BuilderTree();
        this.parser = new Parser();
    }
    /**
     * GetInstance method for the singleton pattern
     * @returns {Controller}
     */
    Controller.getInstance = function () {
        if (this.instance == null) {
            this.instance = new Controller();
        }
        return this.instance;
    };
    /**
     * Method for the initialisation of the available bloks
     * @param f
     */
    Controller.prototype.init = function (f) {
        var self = this;
        this.communication.httpGet(function (array) {
            // parse the received blocks JSON to our blocks object
            var nodes;
            nodes = self.parser.parseBlocks(array);
            // set the blocks in our modle
            self.building.setAvailableBlocks(nodes);
            // display the blocks in the menu
            self.building.renderAvailableBlocksMenu();
            // return
            f(self.building.getAvailableBlocks());
        });
    };
    Controller.prototype.initMOCK = function () {
        var self = this;
        var array = this.communication.httpGetMOCK();
        // parse the received blocks JSON to our blocks object
        var nodes;
        nodes = self.parser.parseBlocks(array);
        // set the blocks in our modle
        self.building.setAvailableBlocks(nodes);
        // display the blocks in the menu
        self.building.renderAvailableBlocksMenu();
    };
    /**
     * Method for the sending of the simplified behaviour tree create by the user to a simulator
     */
    Controller.prototype.send = function () {
        // var xml = this.communication.parseXml(this.building.getTree().getRoot());
        var xml = this.parser.parseXml(this.building.getSelectedBlocks()[0]);
        var retour;
        console.log("xml", xml);
        this.communication.httpPost(xml, function (s) {
            retour = s;
            alert("Result : " + retour);
        });
    };
    /**
     * Get the builderTree
     * @returns {BuilderTree}
     */
    Controller.prototype.getBuilderTree = function () {
        return this.building;
    };
    return Controller;
})();
//# sourceMappingURL=Controller.js.map