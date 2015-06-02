///<reference path=".\treeNode.ts"/>


/**
 * Created by Benjamin Lissilour, Anaïs Marongiu
 */

class CompositeTreeNode extends TreeNode {

    private childrenNodes : Array<TreeNode>;

    public constructor(children : TreeNode[]) {
        super();
    }

    public addChildNode(node : TreeNode){
        this.childrenNodes.push(node);
    }
    public getChildNode(index : number) : TreeNode{
        return this.childrenNodes[index];
    }

    public removeChildNode(node : TreeNode) {
        var number = this.childrenNodes.indexOf(node);
        delete this.childrenNodes[number];
    }

}