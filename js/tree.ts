///<reference path=".\treeNode.ts"/>

/**
 * Created by ben on 02/06/2015.
 */


class Tree {

    private root : TreeNode;

    public constructor(r : TreeNode) {
        this.root = r;
    }

    public getRoot() : TreeNode{
        return this.root;
    }
}