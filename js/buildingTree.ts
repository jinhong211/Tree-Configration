///<reference path="./treeNode.ts"/>
///<reference path="./actionTreeNode.ts"/>
///<reference path="./compositeTreeNode.ts"/>
///<reference path="./tree.ts"/>

/**
 * Created by Benjamin Lissilour, Anaïs Marongiu
 */

class BuildingTree {
    private tree : Tree;
    private selected: Array<TreeNode>;
    private available: Array<TreeNode>;

    public constructor() {
        this.selected = new Array<TreeNode>();
        this.available = new Array<TreeNode>();
    }

    public setBlocksAvailable(nodes:Array<TreeNode>) {
        for (var i = 0; i < nodes.length; i++) {
            this.available.push(nodes[i]);
        }
    }

    public getTree() : Tree {
        return this.tree;
    }

    public setRoot(root : TreeNode) {
        this.tree = new Tree(root);
    }

    public renderAvailableBlocks():string {
        var render:string;
        render += "<p>";
        for (var i = 0; i < this.available.length; i++) {
            //TODO we can do better ?
            if (this.available[i] instanceof ActionTreeNode) {
                render += "action";
            } else if (this.available[i] instanceof CompositeTreeNode) {
                render += "composite";
            }
            render += " : " + this.available[i].getName() + "</p>";
        }
        return render;
    }
}