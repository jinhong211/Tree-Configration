///<reference path="./treeNode.ts"/>
///<reference path="./actionTreeNode.ts"/>
///<reference path="./compositeTreeNode.ts"/>
///<reference path="./tree.ts"/>
///<reference path="./navigationTree.ts"/>

/**
 * Created by Benjamin Lissilour, Ana�s Marongiu, Quentin Cornevin
 */

class BuildingTree {

    private tree:Tree;
    private selected:Array<TreeNode>;
    private available:Array<TreeNode>;
    private navigationTree:NavigationTree;

    public constructor() {
        this.selected = new Array<TreeNode>();
        this.available = new Array<TreeNode>();

    }


    public setBlocksAvailable(nodes:Array<TreeNode>) {
        for (var i = 0; i < nodes.length; i++) {
            this.available.push(nodes[i]);
        }
    }

    public getBlocksAvailable() : Array<TreeNode> {
        return this.available;
    }

    public getSelectedBlocks() : Array<TreeNode> {
        return this.selected;
    }

    public getTree():Tree {
        return this.tree;
    }

    public setRoot(root:TreeNode) {
        this.tree = new Tree(root);
    }

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

    public renderAvailableBlocksMenu():void {
        var res = [];

        var parent1 = {
            "id": "action",
            "parent": "#",
            "text": "Action"
        }

        var parent2 = {
            "id": "composite",
            "parent": "#",
            "text": "Composite"
        }

        res.push(parent1);
        res.push(parent2);

        for (var i = 0; i < this.available.length; i++) {
            var j = {
                "id": "" + i,
                "parent": this.available[i].getType(),
                "text": this.available[i].getName()
            };
            res.push(j);
        }

        this.navigationTree = new NavigationTree(res);
        this.navigationTree.render();
    }
}