///<reference path="./TreeNode.ts"/>
///<reference path="./CompositeTreeNode.ts"/>

/**
 * Class for the representation of an edge of a simplified behaviour tree
 * @author Benjamin
 */

class Edge {

    private source : CompositeTreeNode;

    private target : TreeNode;

    private id : number;

    public constructor(id : number, src : CompositeTreeNode, tgt : TreeNode) {
        this.source = src;
        this.target = tgt;
        this.id = id;
    }

    public getSource() : CompositeTreeNode{
        return this.source;
    }

    public getTarget() : TreeNode{
        return this.target;
    }

    public getId() : number{
        return this.id;
    }
}