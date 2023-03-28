export function getRandomColorAlpha(alpha: number = 0.8) {
    return "rgba(" + Math.floor(Math.random() * 255) + ","
        + Math.floor(Math.random() * 255) + ","
        + Math.floor(Math.random() * 255) + "," + alpha + ")"
}


//make sure collition cant occure
export function getRandomColor() {
    return "rgb(" + Math.floor(Math.random() * 255) + ","
        + Math.floor(Math.random() * 255) + ","
        + Math.floor(Math.random() * 255) + ")"
}


export function getTrackingColor(ctx: CanvasRenderingContext2D, location: { x: number; y: number }) { 
    var data = ctx.getImageData(location.x, location.y, 1, 1);
    return (
        "rgb(" + data.data[0] + "," + data.data[1] + "," + data.data[2] + ")"
    );
}

//TODO fix alpha with or without


export function getCanvasMouseLocation(event: any, c: HTMLCanvasElement, mainCxt: CanvasRenderingContext2D, secondCtx: CanvasRenderingContext2D) {
    let rect = event.target.getBoundingClientRect();
    let loc = {
        x: Math.floor(
            (c.width * (event.clientX - rect.left)) / (rect.right - rect.left)
        ),
        y: Math.floor(
            (c.height * (event.clientY - rect.top)) / (rect.bottom - rect.top)
        ),
    };
    // console.log("loc.x", loc.x, "loc.y", loc.y);
    return loc;
}

export function getCanvasMouseLocation2(event: any, c: HTMLCanvasElement, mainCxt: CanvasRenderingContext2D, secondCtx: CanvasRenderingContext2D) {
    let rect = event.target.getBoundingClientRect();
    let loc = {
        x: Math.floor(
            (c.width * (event.clientX - rect.left)) / (rect.right - rect.left)
        ),
        y: Math.floor(
            (c.height * (event.clientY - rect.top)) / (rect.bottom - rect.top)
        ),
    };
    // console.log("loc.x", loc.x, "loc.y", loc.y);
    return loc;
}

export function GenerateId(){
    return Math.floor(Math.random()*new Date().getTime()) 
  }

    //p5
function map(input, inMin, inMax, retStart, retStop) {
    let inRange = inMax - inMin;
    let inPos = input - inMin;
    let relVal = inPos / inRange;
    let val = relVal * (retStop - retStart) + retStart;
    return val;
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ex: modulo(noteNumber, numberNotes)
export function modulo(n,m){
    return ((n%m)+m)%5
}
