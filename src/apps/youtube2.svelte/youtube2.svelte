<script lang="ts">
    import SystemWindow from "../../systems/windowSystem/SystemWindow.svelte";
    import { onMount } from "svelte";
    
    let maine:HTMLDivElement;
    //let inframe = '  <iframe width="560" height="315" src="https://www.youtube.com/embed/qB_jyyU-92w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    export let listIndex;
    
    onMount(() => {
        // var ifra =document.createElement("iframe");
        // ifra.setAttribute("src","https://www.youtube.com/embed/U3ASj1L6_sY")
        // maine.appendChild(ifra);
    })
  

    </script>
    <div id="classicSong">
        <SystemWindow on:close>
            <div id="htmlContent" slot="canvas">
                <div bind:this={maine} id="main">
                    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/hLQl3WQQoQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/sPMA1tqWuf4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
                </div>
    
            </div>
            <!-- <ClockSettings
                on:draw={draw}
                on:updateFullRebuild={updateFullRebuild}
                slot="settings"
                bind:settings
            />
            <Canvas
                slot="canvas"
                on:clickDown={clickDown}
                on:clickUp={(e) => clickUp(e)}
                on:movingMouse={moveMouse}
                on:mouseLeft={mouseLeft}
                bind:grid
                bind:this={canvasComponent}
                bind:C={c}
            /> -->
        </SystemWindow>
    </div>
    <style>
     #htmlContent{
        /* width: 400px;
        height:400px; */
        background-color:  rgba(159, 81, 167, 0.30);
        border: 1px solid black;
        padding: 0px 20px 0px 20px;
    
     }
     p{
        color:white
     }
     .gRContainer{
        display: grid;
        grid-template-rows: repeat(4, 1fr) ;
        background-color:  rgba(159, 81, 167, 0.30);
        height:100%;
     }
     .gRowBlock{
        /* background-color: rgba(159, 81, 167, 0.30); */
        margin: 1px;
        border-bottom: 2px solid;
        padding: 0px 20px 0px 20px;
    }
     #main{
        height:100%;
     }
    </style>