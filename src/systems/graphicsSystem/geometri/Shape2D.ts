import { GenerateId } from "../../../Utils/Utils";
import type { Coordinate2D } from "./GeoTypes";
import { BaseShape } from "./BaseShape";
//create basic shape infterface
export class Shape2D extends BaseShape {
    constructor(path, id = GenerateId(), description = "") {
      super(id, description);
      this.path = path;
    }
    path : Coordinate2D[];
    pivIndex: number;

}

//maybe add scale, rotate, translate? Make a ShapeHandler with copy?