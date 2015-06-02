///<reference path=".\treeNode.ts"/>

/**
 * Created by Benjamin Lissilour, Ana�s Marongiu
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