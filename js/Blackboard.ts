/**
 * Created by Quentin on 11/06/2015.
 */


class Blackboard {

    private name : string;

    private type : string;

    private description : string;

    public constructor(name: string, myType :string, description = "") {
        this.name = name;
        this.type = myType;
        this.description = description;
    }

    /**
     *
     * @returns {string}
     */
    public getName() : string {
        return this.name;
    }



}
