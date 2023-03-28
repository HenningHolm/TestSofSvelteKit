import type { CanvasSystem } from "../WindowSystem/CanvasSystem";
import type { BaseShape } from "./Geometri/BaseShape";

//add touch transform 
export class GraphicsManager {
    mainShape : BaseShape;
    secondaryShape: BaseShape;
    trackerShape: BaseShape;
	path: Path2D;

	SetShape(next:BaseShape, main:boolean = true){
        if(main){
    		this.mainShape = next;
			this.trackerShape = next;
        }
        else{
            this.secondaryShape = next;
			this.trackerShape = next;
        }
    }

    SetTrackerShape(next:BaseShape){
        this.trackerShape = next;
    }

    SetShapeByPath(path:Path2D){

    }
	SetPath(path:Path2D){

    }

    Draw(c: CanvasSystem, color: string, trackingColor: string){
		try {
			if(color != "none" && this.mainShape != undefined ){
			this.mainShape.draw(c.ctx, color, true)
		}
			this.trackerShape.draw(c.secondCtx, trackingColor)
		} catch (error) {
			console.error("GraphicsManager Draw Failed", error)
		}
    }

	//scale, rotate, 
}

// c.secondCtx.beginPath();
// c.secondCtx.arc(this.x,  this.y, this.radius, 0, Math.PI * 2);
// c.secondCtx.fillStyle = trackingColor;
// c.secondCtx.lineWidth = 1;
// c.secondCtx.stroke();
// c.secondCtx.fill();

