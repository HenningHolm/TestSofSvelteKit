<script  lang="ts">
    import { Grid2D } from "../GraphicsSystem/Geometri/GeoTypes";
    import { onMount, createEventDispatcher } from "svelte";
    import type { Coordinate2D, GridCoordinate2D } from "../graphicsSystem/geometri/GeoTypes";
    import { getCanvasMouseLocation, getRandomColorAlpha, getTrackingColor } from "../../utils/Utils";

    import { onDestroy } from "svelte";
    import { Chord, Midi, Note } from "tonal";
	import { CanvasSystem } from "./CanvasSystem";


    
        // considering remove
        const initView : Coordinate2D = { x: 1080, y: 540 };
        export const screenSize: Coordinate2D = { x: initView.x/2, y: initView.y/2 };
        export let C = new CanvasSystem() ;
    
        //Call from parent
        export const parentsCalling = (message:string) => console.log(`hi my child, ${message}, I just called render`);
        //Called from parent
        const ParentDispatcher = createEventDispatcher();
    
        export let grid = new Grid2D();
        export let drawing = false;
    
        let mouseLoc!: Coordinate2D;
        let mouseDown = false;
        let mouseDownGobalStart: Coordinate2D = { x: 0, y: 0 };
        let sWidthBeforeResize: number;
        let dragging: boolean;
        let midi; 
        let trackingColorPressed = new Set<string>();
        
        onMount(()=> {
    
            C.ctx = C.htmlCanvas.getContext("2d");
            C.secondCanvas = document.createElement("canvas");
            C.secondCtx = C.secondCanvas.getContext("2d");
            setResolution(initView);
            document.addEventListener("mouseup", onMouseUp);
            setupTouch();
    
    
      let setupTouch =()=>{
            C.htmlCanvas.addEventListener("touchstart", e =>{
            touchStart(e)
                if(e.touches[0].clientX >30){
                    if (e.cancelable) e.preventDefault();
                }
           })
           C.htmlCanvas.addEventListener("touchmove",  e =>{
                if(e.touches[0].clientX > 30){
                    if (e.cancelable) e.preventDefault();
                }
                touchMove(e)
           })
           C.htmlCanvas.addEventListener("touchend",  e =>{
                touchEnd(e)
           })
      }
    
        //delete eventlisteners
        onDestroy(()=>{})
    
        // in following code trackingcolor used in different ways, make clearer
        let touchStart= (e) =>{
            mouseLoc = getCanvasMouseLocation(e.changedTouches[0],C.htmlCanvas,C.ctx,C.secondCtx);
            let trackingColor = getTrackingColor(C.secondCtx, mouseLoc);
            if(!trackingColorPressed.has(trackingColor)){
                trackingColorPressed.add(trackingColor);
                ParentDispatcher("clickDown", {coordinate:mouseLoc, trackingColor })
            }
        }
    
        let touchMove= (e:TouchEvent) =>{
            let targetTouchesArray  = [];
            let mouseLoc;
            for (const t of e.targetTouches){
                let trackingColor
                mouseLoc = getCanvasMouseLocation(t,C.htmlCanvas,C.ctx,C.secondCtx);
                trackingColor = getTrackingColor(C.secondCtx, mouseLoc);
                targetTouchesArray.push(trackingColor);
            }   
            let released = Array.from(new Set(trackingColorPressed)).filter(x => !Array.from(new Set(targetTouchesArray)).includes(x));
            let newtouch = Array.from(new Set(targetTouchesArray)).filter(x => !Array.from(new Set(trackingColorPressed)).includes(x));
    
            released.forEach(trackingColor => {
                ParentDispatcher("clickUp",{coordinate:mouseLoc, trackingColor })
                trackingColorPressed.delete(trackingColor)
            });
            newtouch.forEach(trackingColor => {
                ParentDispatcher("clickDown", {coordinate:mouseLoc, trackingColor })
                trackingColorPressed.add(trackingColor)
            });
        }
        
        let touchEnd= (e) =>{
            let mouseLoc = getCanvasMouseLocation(e.changedTouches[0],C.htmlCanvas,C.ctx,C.secondCtx);
            let trackingColor = getTrackingColor(C.secondCtx, mouseLoc);
            if(trackingColorPressed.has(trackingColor)){ //replace with try
                trackingColorPressed.delete(trackingColor);
                ParentDispatcher("clickUp",{coordinate:mouseLoc, trackingColor })
            }
            //console.log("touchEnd",e, trackingColorPressed)
        }
    
        let onMouseDown = (event: any) => {
              event.preventDefault();
              mouseDown = true;
              let mouseLoc = getCanvasMouseLocation(event,C.htmlCanvas,C.ctx,C.secondCtx);
              let trackingColor = getTrackingColor(C.secondCtx, mouseLoc);
              trackingColorPressed.add(trackingColor);
              ParentDispatcher("clickDown", {coordinate:mouseLoc, trackingColor })
              mouseDownGobalStart.x = event.clientX;
              if(mouseLoc.x > C.htmlCanvas.width-30 && mouseLoc.y > C.htmlCanvas.height-30){
                dragging = true;
                document.addEventListener("mousemove", resizeCanvas, true);
            }
        };
    
        let onMouseUp = (event: MouseEvent) => {
            if (mouseDown) {
                mouseDown = false;
                let mouseLoc = getCanvasMouseLocation(event,C.htmlCanvas,C.ctx,C.secondCtx);
                let trackingColor = getTrackingColor(C.secondCtx, mouseLoc);
                ParentDispatcher("clickUp",{coordinate:mouseLoc, trackingColor })
                trackingColorPressed = new Set<string>();
            }
            if(dragging){
                dragging = false;
                document.removeEventListener("mousemove", resizeCanvas, true);
                sWidthBeforeResize = parseInt(C.htmlCanvas.style.width);
            }
        };
    
        let onMouseMove = (event: MouseEvent) => { 
            mouseLoc = getCanvasMouseLocation(event,C.htmlCanvas,C.ctx,C.secondCtx);
            let trackingColor = getTrackingColor(C.secondCtx, mouseLoc)
    
            if(mouseDown){
                if(!trackingColorPressed.has(trackingColor)){
                    trackingColorPressed.forEach(tc => {
                        ParentDispatcher("clickUp",{coordinate:mouseLoc, trackingColor:tc })
                        trackingColorPressed.delete(tc)
                    });
                    ParentDispatcher("clickDown", {coordinate:mouseLoc, trackingColor })
                    trackingColorPressed.add(trackingColor)
                }
            }
            if(trackingColor != "rgb(0,0,0)"){
                C.htmlCanvas.style.cursor = "pointer";
            }
            else{
                C.htmlCanvas.style.cursor = "auto";
            }
            if(dragging){
                resizeCanvas(event);
            }
            if(drawing){
                ParentDispatcher("movingMouse", {coordinate:mouseLoc, trackingColor});
                return;
            }
            
            if(mouseLoc.x > C.htmlCanvas.width-30 && mouseLoc.y > C.htmlCanvas.height-30){
                C.htmlCanvas.style.cursor = "move";
                if(mouseDown && dragging){
                C.htmlCanvas.style.cursor = "move";
            }
        }
    };
    
       function resizeCanvas(event: MouseEvent) {
          let deltaX = event.clientX - mouseDownGobalStart.x;
          C.htmlCanvas.style.width= sWidthBeforeResize+ deltaX+"px";
      }
    
      export function setResolution(res:{x:number, y:number}){
        C.htmlCanvas.width = res.x;
        C.htmlCanvas.height = res.y;
        C.secondCanvas.width = res.x;
        C.secondCanvas.height = res.y;
    
        C.htmlCanvas.style.width = screenSize.x+"px";
        C.cOrigo = {x:res.x/2,y:res.y/2}
        console.log("C.cOrigo", C.cOrigo)
      }
    
      export function getResolution(){
       return {x:C.htmlCanvas.width,y:C.htmlCanvas.height};
      }
    
      export function scaleViewSize(value){
        let current = parseInt(C.htmlCanvas.style.width);
        C.htmlCanvas.style.width = current*value+"px"
        sWidthBeforeResize = parseInt(C.htmlCanvas.style.width);
      }
    
      export function drawHelpers(canvasSettings :any){
        if(canvasSettings.grid){
          setGridSize(canvasSettings.gridSize, grid)
          showGrid(grid, C.secondCtx, C.ctx) //bufferCtx?
        }
        drawCoor(C.ctx,C.cOrigo,C.htmlCanvas.width,C.htmlCanvas.height)
      }
    
      function drawCoor(ctx,cOrigo,edgX,edgY) {
          ctx.beginPath();
          ctx.moveTo(cOrigo.x, 0);
          ctx.lineTo(cOrigo.x, edgY);
          ctx.moveTo(0, cOrigo.y);
          ctx.lineTo(edgX, cOrigo.y);
          ctx.setLineDash([6, 4]);
          ctx.stroke();
          //reset
          ctx.setLineDash([]);
        }
    
      //Think deeper, resolution change
      function setGridSize(sections:number, grid: { sections:number, vertecies : GridCoordinate2D[]}){
        grid.vertecies = new Array<GridCoordinate2D>();
        for(let x = 0; x<=sections; x++){
          let tempX = (C.htmlCanvas.width/sections)*x
          for(let y = 0; y<=sections; y++){
            let tempY = (C.htmlCanvas.height/sections)*y
            grid.vertecies.push({x:tempX, y:tempY,indexX:x, indexY:y})
          }
        }
        grid.sections = sections;
      }
      function showGrid(grid: { sections:number, vertecies : Coordinate2D[]}, bufferCtx:CanvasRenderingContext2D, showCtx: CanvasRenderingContext2D ) {
        let sections = grid.sections;
        bufferCtx.setLineDash([2, 4]);
        for(let x = 1; x<sections; x++){
          let xPoint = (C.htmlCanvas.width/sections)*x
          bufferCtx.beginPath();
          bufferCtx.moveTo(xPoint,0)
          bufferCtx.lineTo(xPoint, C.htmlCanvas.height)
          bufferCtx.stroke();
        }
        for(let y = 1; y<sections; y++){
          let yPoint = (C.htmlCanvas.height/sections)*y
          bufferCtx.beginPath();
          bufferCtx.moveTo(0,yPoint)
          bufferCtx.lineTo(C.htmlCanvas.width, yPoint)
          bufferCtx.stroke();
        }
        showCtx.drawImage(bufferCtx.canvas, 0, 0, bufferCtx.canvas.width, bufferCtx.canvas.height, 0, 0, bufferCtx.canvas.width, bufferCtx.canvas.height);
        C.ctx.setLineDash([]);
      }
    
    </script>
    <canvas bind:this ={C.htmlCanvas} on:mousedown="{onMouseDown}" on:mousemove="{onMouseMove}"/>
    <!-- <slot /> -->
    
    <style>
        canvas {
          border: 2px solid rgb(89, 84, 84);
          border-top: 0px solid black;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          background-color: rgba(159, 81, 167, 0.30);
          /* width: 600px; */
    
      }
    </style>
    
    
    
    
    
    
    
    
    <!-- let touchMove= (e) =>{
        let tCpressedArray = [...trackingColorPressed];
        [...e.changedTouches].forEach((ct,i)=>{
            let mouseLoc = getCanvasMouseLocation(e.changedTouches[i],C.htmlCanvas,C.ctx,C.secondCtx);
            let trackingColor = getTrackingColor(C.secondCtx, mouseLoc);
            trackingColorsReleased = tCpressedArray.filter(t=> t!=trackingColor)
            if(trackingColorsReleased.length >0){
                console.log("this whas release", trackingColorsReleased[0] );
                trackingColorPressed.delete(trackingColorsReleased[0]);
            }
    
        })
        let mouseLoc = getCanvasMouseLocation(e.changedTouches[0],C.htmlCanvas,C.ctx,C.secondCtx);
        let trackingColor = getTrackingColor(C.secondCtx, mouseLoc);
        trackingColorPressed.add(trackingColor);
    }
     -->
    
    
    
    
    
    
    
    <!--
    let gridOn = true;
    let gridSize = 2;
    let snapToGrid = false;
    let expanded = false;
    let pxRatio = 2; // vector?
    let reSizable = true; //add r button to drawing -->
    
    
    <!--
    // this.sWidthBeforeResize = this.resolution.x/this.pxRatio;
    //   this.sHeightBeforeResize = this.resolution.x/this.pxRatio;
      //set at every resize end
    //   sWidthBeforeResize: number;
    // sHeightBeforeResize: number;
    
    // onMouseMove = (event: MouseEvent) => {
    //   this.mouseLoc = getCanvasMouseLocation(event,this.htmlCanvas,this.ctx,this.secondCtx);
    //   var trackingColor = getTrackingColor(this.secondCtx, this.mouseLoc);
    //   this.resetHoverStates();
    //   var Asteroid = this.isHovering(trackingColor);
    //   if (Asteroid) {
    //     Asteroid.hover = true;
    //     this.htmlCanvas.style.cursor = "pointer";
    //   } else {
    //     this.htmlCanvas.style.cursor = "auto";
    //   }
    //   if(this.mouseLoc.x > this.resolution.x-30 && this.mouseLoc.y > this.resolution.y-30){
    //     this.htmlCanvas.style.cursor = "move";
    //     if(this.mouseDown){
    //     document.addEventListener("mousemove", this.resizeCanvas);
    //     }
    //   }
    // }
    
    // resizeCanvas = (event: MouseEvent) => {
    //       let deltaX = event.clientX -this.mouseDownGobalStart.x;
    //       let deltaY = event.clientY -this.mouseDownGobalStart.y;
    //       this.htmlCanvas.style.width= this.sWidthBeforeResize+ deltaX+"px";
    // }
    
    // expandSettings(this: HTMLElement) {
    //   let parent = this.parentElement as HTMLElement;
    //   let settings = parent.nextElementSibling as HTMLElement;
    //   if (settings.style.display == "block") settings.style.display = "none";
    //   else settings.style.display = "block";
    // }
    // expandToScreenWidth = () => {
    //   if (this.expanded) {
    
    //     //Update ratio!!
    //     this.htmlCanvas.style.width = this.resolution.x/this.pxRatio +"px"
    //     this.sWidthBeforeResize = parseInt(this.htmlCanvas.style.width);
    //     this.expanded = false;
    //   } else {
    //     this.htmlCanvas.style.width = "99vw";
    //     this.canvasWrapper.style.left = "0px";
    //     this.expanded = true;
    //   }
    // }; -->