/**
 * Created by Benjamin Lissilour, Ana�s Marongiu
 */

class TreeNode {

    private name : string;

    public constructor(n : string){
        this.name = n;
    }

    public getName() {
        return this.name;
    }

    public getType():string {
        return "not expected";
    }
}