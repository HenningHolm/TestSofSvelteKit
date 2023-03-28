import type { BaseShape } from "../Systems/GraphicsSystem/Geometri/BaseShape";

export class PatternLibrary {

    static instance : PatternLibrary;
    shapeTable : Array<BaseShape>;

    constructor() 
    {
        PatternLibrary.instance = this;
        this.shapeTable = new Array<BaseShape>();
    }

    get(trackingColor: string) {
        this.shapeTable.filter(s => s.trackingColor == trackingColor )
    }
    set(shape: BaseShape){
        this.shapeTable.push(shape);
    }
}
