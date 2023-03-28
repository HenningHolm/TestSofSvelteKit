<script lang="ts">
	import { onMount } from "svelte";
	import Youtube from "../apps/youtube/youtube.svelte";
	import Youtube2 from "../apps/youtube2.svelte/youtube2.svelte";
  // import dat from "dat.gui";
  // export const prerender = true;
  onMount(() => {
    // new PatternLibrary();
    // new ShapeLibrary();
    // dat.GUI.CLASS_AUTO_PLACE = "false";
  });

let PianoList = new Array<any>();
let YoutubeList = new Array<any>();
let YoutubeList2 = new Array<any>();


  function addWindowElm(list: any) {
    list = [...list, new Date().getTime()];
    return list;
  }
  function removeWindowElm(index: number, list: any) {
    list.splice(index, index + 1);
    return list;
  }
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <header>
    <br />
    <h1>Search of Harmony</h1>  
    <div class="btnWrapper">
        <button
        id="pianoBtn"
        class="btn btn-secondary btn-sm"
        on:click={() => {
          PianoList = addWindowElm(PianoList);
        }}>Piano</button
      >
      <button
      id="YoutubeBtn2"
      class="btn btn-secondary btn-sm"
      on:click={() => {
        YoutubeList2 = addWindowElm(YoutubeList2);
      }}>Youtube2</button
      >
      <button
      id="YoutubeBtn"
      class="btn btn-secondary btn-sm"
      on:click={() => {
        YoutubeList = addWindowElm(YoutubeList);
      }}>Youtube</button
      >
      </div>
      {#each YoutubeList as youtube, index (youtube)}
      <Youtube
        on:close={() => (YoutubeList = removeWindowElm(index, YoutubeList))}
        listIndex={index}
      />  
      {/each}
      {#each YoutubeList2 as youtube2, index (youtube2)}
      <Youtube2
      on:close={() => (YoutubeList2 = removeWindowElm(index, YoutubeList2))}
      listIndex={index}
    />  
    {/each}
      <!-- {#each PianoList as piano, index (piano)}
    <Piano
      on:close={() => (PianoList = removeWindowElm(index, PianoList))}
      listIndex={index}
    />
    {/each} -->
  </header>
</main>

<style>


main {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-row: 12;
  width: 100vw;
  margin: 0;
  /* background: linear-gradient(180deg,rgb(5, 90, 135) 0%, rgb(194, 171, 0) 55%, rgb(255, 255, 255) 100%); */
  background: linear-gradient(180deg,rgb(0, 94, 145) 0%, rgb(255 224 0) 60%, rgb(255 252 193) 100%);
  height: 200vh;
}


header {
  grid-column: 3 / 7;
}

h1 {
  font-family:  Georgia, Times, "Times New Roman", serif;
  -webkit-text-stroke: 0px black;
  font-size: 50px;
  color: rgb(252, 252, 252);
  text-align: center;
  margin: 5px;
  text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;
}
.btn-secondary {
  background-color: #345056;
  font-size: small !important;
}

.btnWrapper {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}


    
    </style>
    