///<reference path="./TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path="./CompositeTreeNode.ts"/>
///<reference path="./Tree.ts"/>
///<reference path="./NavigationMenu.ts"/>
/**
 * Class for the building of a simplified behaviour tree with available blocks
 * @author Benjamin, Anais, Quentin
 */
var BuilderTree = (function () {
    /**
     * Constructor
     */
    function BuilderTree() {
        this.selected = [];
        this.available = [];
    }
    /**
     * Set the available blocks received by a simulator
     * @param nodes
     */
    BuilderTree.prototype.setAvailableBlocks = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.available.push(nodes[i]);
        }
    };
    /**
     * Get the available blocs
     * @returns {Array<TreeNode>}
     */
    BuilderTree.prototype.getAvailableBlocks = function () {
        return this.available;
    };
    /**
     * Get the blocks in the building zone
     * @returns {Array<TreeNode>}
     */
    BuilderTree.prototype.getSelectedBlocks = function () {
        return this.selected;
    };
    /**
     * Get the tree (every node link by a the root)
     * @returns {Tree}
     */
    BuilderTree.prototype.getTree = function () {
        return this.tree;
    };
    /**
     * Construct the tree in setting the root node
     * @param root
     */
    BuilderTree.prototype.setRoot = function (root) {
        this.tree = new Tree(root);
    };
    /**
     * Generate a textual display of the available blocks
     * @returns {string}
     */
    BuilderTree.prototype.renderAvailableBlocks = function () {
        var render;
        render = "";
        for (var i = 0; i < this.available.length; i++) {
            render += "<p>";
            if (this.available[i] instanceof ActionTreeNode) {
                render += "action";
            }
            else if (this.available[i] instanceof CompositeTreeNode) {
                render += "composite";
            }
            render += " : " + this.available[i].getName() + "</p>";
        }
        return render;
    };
    /**
     * Generate a menu display of the available blocks
     * and active the rendering
     */
    BuilderTree.prototype.renderAvailableBlocksMenu = function () {
        var res = [];
        var parent1 = {
            "id": "action",
            "parent": "#",
            "text": "Action",
            "type": "actions"
        };
        var parent2 = {
            "id": "composite",
            "parent": "#",
            "text": "Composite",
            "type": "conditions"
        };
        res.push(parent1);
        res.push(parent2);
        for (var i = 0; i < this.available.length; i++) {
            var j = {
                "id": "" + i,
                "parent": this.available[i].getType(),
                "text": this.available[i].getName(),
                "type": "action" //TODO : G�rer les types de blocs !
            };
            res.push(j);
        }
        this.navigationMenu = new NavigationMenu(res);
        this.navigationMenu.render();
    };
    return BuilderTree;
})();
//# sourceMappingURL=BuilderTree.js.map