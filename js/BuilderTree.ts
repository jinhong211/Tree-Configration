///<reference path="./TreeNode.ts"/>
///<reference path="./ActionTreeNode.ts"/>
///<reference path="./CompositeTreeNode.ts"/>
///<reference path="./Tree.ts"/>
///<reference path="./NavigationMenu.ts"/>
///<reference path="./Edge.ts"/>


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
     * Available nodes in the menu
     */
    private edges:Array<Edge>;

    /**
     * Menu of navigation of available nodes
     */
    private navigationMenu:NavigationMenu;

    /**
     * Constructor
     */
    public constructor() {
        this.edges = [];
        this.selected = [];
        this.available = [];
        this.tree = new Tree(null);
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
     * Get the tree (every node link by a the root)
     * @returns {Tree}
     */
    public getTree():Tree {
        return this.tree;
    }

    /**
     * Construct the tree in setting the root node
     * @param root
     */
    public setRoot(root:TreeNode) {
        this.tree.setRoot(root);

    }

    /**
     *  Add Edge to the Array Edges
     *  @param edge
     */
    public addEdge(edge : Edge){
        this.edges.push(edge);
    }

    /**
     * Get the Edges
     * @returns {Array<Edge>}
     */
    public getEdges():Array<Edge> {
        return this.edges;
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
                "type" : this.available[i].getType()   //TODO : G�rer les types de blocs !
            };
            res.push(j);

       //     console.log(this.available[i].getType());
        }

        this.navigationMenu = new NavigationMenu(res);
        this.navigationMenu.render();
    }

    public getTreeNodeById(id : number) : TreeNode {
        for (var i=0; i<this.selected.length;i++){
            if (this.selected[i].getId() == id) {
                return this.selected[i];
            }
        }
        return null;
    }

    public getRootTree() : TreeNode {
        return this.tree.getRoot();
    }

    public getEdgeById(id : number) : Edge {

        for (var i=0; i<this.edges.length;i++){
            if (this.edges[i].getId() == id) {
                return this.edges[i];
            }
        }
        return null;
    }



    public deleteEdgeById(id : number) {
        var edge = this.getEdgeById(id);
        var pos = this.edges.indexOf(edge);
        this.edges.splice(pos,1);
    }

    public deleteSelectedEdge(id : number) {

        var edge = this.getEdgeById(id);
        var pos = this.edges.indexOf(edge);
        this.edges.splice(pos,1);
        if (edge.getSource() == null) {
            this.tree.deleteRoot();
            return;
        } else {
            edge.getSource().removeChildNode(edge.getTarget());
            edge.getTarget().removeParentNode();
        }
    }

    // Id du noeud � supprimer
    public deleteSelectedNode(id : number) {
        // Suppression du noeud

        var parentNode = this.getTreeNodeById(id).getParentNode();
        var currentNode = this.getTreeNodeById(id);

        var idEdgeToDelete = [];

        for (var i =0; i< this.edges.length; i++){
            if (this.edges[i].getSource() != null && this.edges[i].getSource().getId() == id){
                idEdgeToDelete.push(i);
            }
        }
        for (var i =0; i< this.edges.length; i++){
            if (this.edges[i].getTarget().getId() == id) {
                idEdgeToDelete.push(i);
                if (this.edges[i].getSource() == null) {
                    this.tree.deleteRoot();
                }
            }
        }

        for (var i =0; i< idEdgeToDelete.length; i++){
            this.deleteEdgeById(idEdgeToDelete[i]);
        }

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


    }


}