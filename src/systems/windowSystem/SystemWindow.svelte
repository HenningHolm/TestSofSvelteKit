<script lang="ts">

import {createEventDispatcher } from "svelte";
import  {fade, slide, scale} from 'svelte/transition'

// dragbar background? #30223a / #2e223a

  const dispatchClose = createEventDispatcher();
  let selected = '';
  let canvasWrapper: HTMLElement;
  let hideCanvas = false;
  let hideSettings = true;
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let movementInstruct = "Click to move"
  if(document.body.clientWidth<1400){
    movementInstruct = "Scroll left"
  }

  function dragMouseDown(e: MouseEvent) {
    console.log("document.body.style.width", document.body.style.width)
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

//   function dragTouchDown(e) {
//     //e.preventDefault();
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.ontouchcancel = closeDragElement;
//     document.ontouchmove = elementTouchDrag;
//   }

//   function elementTouchDrag(e) {
//     e.preventDefault();
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     if (e.clientY > 15) {
//       canvasWrapper.style.top = canvasWrapper.offsetTop - pos2 + "px";
//     }
//     canvasWrapper.style.left = canvasWrapper.offsetLeft - pos1 + "px";
//   }

  function elementDrag(e: MouseEvent) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    if (e.clientY > 15) {
      canvasWrapper.style.top = canvasWrapper.offsetTop - pos2 + "px";
    }
    canvasWrapper.style.left = canvasWrapper.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
</script>
<div in:fade out:scale bind:this={canvasWrapper} class="canvasWrapper">
  <div on:mousedown={dragMouseDown} class="canvasWrapperHeader" id="wrapperHeaderText" >
    {movementInstruct}
    <button
      on:click={()=> dispatchClose("close")}
      class="windowOptions btn-secondary btn-sm ">x</button>
    <button
      on:click={() => (hideSettings = !hideSettings)}
      class="windowOptions btn-secondary btn-sm {hideSettings === false ? 'selected' : ''}">s</button
    >
    <button
      on:click={() => (hideCanvas = !hideCanvas)}
      class="windowOptions btn-secondary btn-sm ">{hideCanvas ? "+" : "-" }</button
    >
  </div>
  <div class:hideSettings>
    <slot name="settings" />
  </div>
  <div class:hideCanvas>
    <slot name="canvas" />
  </div>
</div>
<style>
  .hideCanvas {
    display: none;
  }
  .hideSettings {
    display: none;
  }

  .windowOptions {
    display: inline;
    float: right;
    margin-right: 3px;
    border-radius: 3px;
    font-size: 11px;
    background-color: #f6f6fe;
    padding: 1px 6px;
  }

  .canvasWrapper {
    position: absolute;
    text-align: left;
    z-index: 9;
    top: 300px;
    left: 50%;
    min-width:300px;
  }
  .btn-secondary{
    margin-top:-3px;
    background-color: rgb(84,84,84) !important;

  }

  .selected {
		background-color: #303030 !important;
	}

  .canvasWrapperHeader {
    border: 2px solid rgb(72, 72, 72);
    border-bottom: 1px solid rgb(72, 72, 72);
    font-size: small;
    padding: 10px;
    height: 40px;
    cursor: grab;
    z-index: 10;
    background-color: #34373b;
    color: rgb(255, 255, 255);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  #wrapperHeaderText{
    padding: 10px;
  }

  :global(.settingsDiv) {
    display: none;
    border: 2px solid rgb(89, 84, 84);
    border-top: none;
    font-size: small;
    padding: 5px;
    height: 140px;
    z-index: 10;
    background-color: rgb(0, 0, 0);
    color: rgb(0, 0, 0);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }


  @media only screen and (max-width: 1400px) {
    .canvasWrapper {
    position: static;
    text-align: left;
    z-index: 9;
    top:auto;
    margin-bottom: -8px;
    max-width: 100v;
    min-width:300px;
  }
}
</style>
