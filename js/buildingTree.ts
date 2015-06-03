///<reference path="./treeNode.ts"/>
///<reference path="./tree.ts"/>

/**
 * Created by Benjamin Lissilour, Ana�s Marongiu
 */

class BuildingTree {

    private tree : Tree;
    private selected: Array<TreeNode>;
    private available: Array<TreeNode>;

    public constructor() {
        this.selected = new Array<TreeNode>();
        this.available = new Array<TreeNode>();
    }


    // TODO
    render() : void {
    }

    public setBlockAvailable(node : TreeNode) {
      //  this.available.push(TreeNode);
    }

    public setBlocksAvailable( nodes : Array<TreeNode>){
        // TODO
    }

    // TODO
    public selectNode(node : TreeNode) {

    }

    public getTree() : Tree {
        return this.tree;
    }

    public setRoot(root : TreeNode) {
        this.tree = new Tree(root);
    }
}