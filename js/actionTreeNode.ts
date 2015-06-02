///<reference path=".\treeNode.ts"/>

/**
 * Created by Benjamin Lissilour, Anaïs Marongiu
 */


class ActionTreeNode extends TreeNode{

    private name : string;

    public constructor(n : string) {
        super();
        this.name = n;
    }

    public getName() {
        return this.name;
    }

}