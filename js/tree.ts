///<reference path=".\treeNode.ts"/>

/**
 * Created by Benjamin Lissilour, Anaïs Marongiu
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