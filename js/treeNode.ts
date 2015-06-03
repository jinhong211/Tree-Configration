/**
 * Created by Benjamin Lissilour, Anaïs Marongiu
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