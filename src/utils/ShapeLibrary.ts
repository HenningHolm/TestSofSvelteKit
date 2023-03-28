import type { BaseShape } from "../Systems/GraphicsSystem/Geometri/BaseShape";


// Library for common and custom build shapes, only unique shapes here.
export class ShapeLibrary {

    static instance : ShapeLibrary;
    shapeTable : Array<BaseShape>;

    constructor() 
    {
        ShapeLibrary.instance = this;
        this.shapeTable = new Array<BaseShape>();
    }

    add(shape: BaseShape){
        this.shapeTable.push(shape);
    }
    remove(id: number){
        this.shapeTable = this.shapeTable.filter((s) => s.id != id);
    }
    getByDescription(description: string){
        this.shapeTable = this.shapeTable.filter((s) => s.description = description);
        if(this.shapeTable.length = 1){
            return this.shapeTable[0];
        }
    }
}
