///<reference path=".\treeNode.ts"/>

/**
 * Created by Benjamin Lissilour, Ana�s Marongiu
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