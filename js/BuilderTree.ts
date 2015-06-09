///<reference path="./TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path="./CompositeTreeNode.ts"/>
///<reference path="./Tree.ts"/>
///<reference path="./NavigationMenu.ts"/>
///<reference path="./DecoratorTreeNode.ts"/>

/**
 * Class for the building of a simplified behaviour tree with available blocks
 * @author Benjamin, Anais, Quentin
 */
class BuilderTree {

    /**
     * Simplified behaviour tree (nodes link by the node root)
     */
    private tree:Tree;

    /**
     * Selected nodes = nodes in the building zone
     */
    private selected:Array<TreeNode>;

    /**
     * Available nodes in the menu
     */
    private available:Array<TreeNode>;

    /**
     * Menu of navigation of available nodes
     */
    private navigationMenu:NavigationMenu;

    /**
     * Decorator nodes available (not displayed in the menu)
     */
    private decorators:Array<DecoratorTreeNode>;


    /**
     * Constructor
     */
    public constructor() {
        this.selected = [];
        this.available = [];
        this.tree = new Tree();
    }


    /**
     * Set the available blocks received by a simulator
     * @param nodes
     */
    public setAvailableBlocks(nodes:Array<TreeNode>) {
        for (var i = 0; i < nodes.length; i++) {
            this.available.push(nodes[i]);
        }
    }

    /**
     * Get the available blocs
     * @returns {Array<TreeNode>}
     */
    public getAvailableBlocks():Array<TreeNode> {
        return this.available;
    }

    /**
     * Get the blocks in the building zone
     * @returns {Array<TreeNode>}
     */
    public getSelectedBlocks():Array<TreeNode> {
        return this.selected;
    }


    /**
     * Set the available decorators
     * @param decos
     */
    public setDecorators(decos:Array<DecoratorTreeNode>) {
        this.decorators=decos;
    }

    /**
     * Get the available decorators
     * @returns {Array<DecoratorTreeNode>}
     */
    public getDecorators():Array<DecoratorTreeNode>{
        return this.decorators;
    }

    /**
     * Get the tree (every node link by a the root)
     * @returns {Tree}
     */
    public getTree():Tree {
        return this.tree;
    }


    /**
     * Generate a textual display of the available blocks
     * @returns {string}
     */
    public renderAvailableBlocks():string {
        var render:string;
        render = "";
        for (var i = 0; i < this.available.length; i++) {
            render += "<p>";
            if (this.available[i] instanceof ActionTreeNode) {
                render += "action";
            } else if (this.available[i] instanceof CompositeTreeNode) {
                render += "composite";
            }
            render += " : " + this.available[i].getName() + "</p>";
        }
        return render;
    }

    /**
     * Generate a menu display of the available blocks
     * and active the rendering
     */
    public renderAvailableBlocksMenu():void {
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
                "type" : this.available[i].getType()   //TODO : Gérer les types de blocs !
            };
            res.push(j);

       //     console.log(this.available[i].getType());
        }

        this.navigationMenu = new NavigationMenu(res);
        this.navigationMenu.render();
    }

    public getTreeNodeById(id : number) : TreeNode {
        for (var i=0; this.selected.length>i;i++){
            if (this.selected[i].getId() == id) {
                return this.selected[i];
            }
        }
        return null;
    }


    // Id du noeud à supprimer
    public deleteSelectedNode(id : number) {
        // Suppression du noeud

        var parentNode = this.getTreeNodeById(id).getParentNode();
        var currentNode = this.getTreeNodeById(id);

        if (currentNode instanceof CompositeTreeNode){
            for (var l = 0; l < currentNode.getChildrenNodes().length; l++) {
                currentNode.getChildNode(l).setParentNode(null);
            }
        }
        var numb = this.selected.indexOf(this.getTreeNodeById(id));
        this.selected.splice(numb, 1);


        if (parentNode instanceof CompositeTreeNode) {
            parentNode.removeChildNode(currentNode);
        }



        for (var i = 0; i < this.selected.length; i++) {
            var nodeSelect = this.selected[i];
            if (nodeSelect instanceof CompositeTreeNode) {
                for (var l = 0; l < nodeSelect.getChildrenNodes().length; l++) {
                    console.log("enfant de  " + nodeSelect.getName() + " : " + nodeSelect.getChildNode(l).getName());
                }
            }
            if (nodeSelect.getParentNode() != null) {
                console.log("parent de " + nodeSelect.getName() + " : " + nodeSelect.getParentNode().getName());

            }
        }

    }


}