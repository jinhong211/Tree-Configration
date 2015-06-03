/**
 * Created by Benjamin Lissilour, Anaïs Marongiu, Quentin Cornevin
 */

class TreeNode {

    private name : string;
    private weigth : number;
    private faveColor : string;
/*
    public constructor(){
        this.name = "default";
        this.weigth = 65;
        this.faveColor = "#6FB1FC";
    }
*/
    public constructor(name: string) {
        this.name = name;
        this.weigth = 65;
        this.faveColor = "#6FB1FC";
    }

    public getJSON() : string {
        var json;
        json = { data :
        {
            id : this.name,
            name : this.name,
            weigth : this.weigth,
            faveColor : this.faveColor
        }};
        return json;
    }
}