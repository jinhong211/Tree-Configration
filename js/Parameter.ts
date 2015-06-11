///<reference path="./Blackboard.ts"/>
/**
 * @author Quentin Cornevin
 *
 * This class handle the paramter. A paramter can be add to any type of block. And there
 * is no limit of block numbers.
 */
class Parameter {

    /**
     * This is the name of the paramter
     */
    private name : string;

    /**
     * This is the value of the parameter
     */
    private value : string | number | Blackboard;

    /***
     * This constructor initialize a new Paramter with a given name and a given value
     *
     * @param name of the new paramter
     * @param value of the new paramter
     */
    public constructor(name : string, value : string | number | Blackboard) {
        this.name = name;
        this.value = value;
    }

    public getName() : string {
        return this.name;
    }

    public setName(newName : string) {
        this.name = newName;
    }

    public getValue() : string | number | Blackboard {
        return this.value;
    }

    public setValue(newValue: string | number){
        this.value = newValue;
    }

}
