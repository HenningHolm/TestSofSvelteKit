import type { Coordinate2D } from "../GraphicsSystem/Geometri/GeoTypes";

export class CanvasSystem{
    htmlCanvas: HTMLCanvasElement| any;
    secondCanvas : HTMLCanvasElement | any; 
    ctx: CanvasRenderingContext2D | any;
    secondCtx: CanvasRenderingContext2D | any;
    cOrigo:Coordinate2D;
    
    //maybe remove
    constructor(){
      this.cOrigo = {x:0, y:0} 
    }
      // const buffer = new CanvasRenderingContext2D();
  }