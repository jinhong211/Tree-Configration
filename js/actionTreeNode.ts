///<reference path=".\treeNode.ts"/>

/**
 * Created by ben on 02/06/2015.
 */


class ActionTreeNode extends TreeNode{

    private name : string;

    public constructor(n : string) {
        super();
        this.name = n;
    }

    public getName() {
        return name;
    }

}