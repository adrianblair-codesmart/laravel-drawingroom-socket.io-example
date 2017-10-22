<style scoped>
.canvas-container {
  overflow: scroll;
}

canvas {
  display: block;
  margin: auto;
  border: #d3e0e9 solid 1px;
}
</style>

<template>
<div class="canvas-container">
  <canvas v-on:mousemove='onMouseMove' v-on:mousedown='onMouseDown' v-on:mouseup='onMouseUp' id='drawing-canvas' width='500' height='500'></canvas>
</div>
</template>

<script>
import * as types from '../vuex/drawingroom/mutation_types';
import RGBA from '../models/rgba-model';
import FloodFillTool from '../tools/flood-fill-tool';
import DrawTool from '../tools/draw-tool';
import DrawingRoomMessageHandler from '../handlers/drawingroom-message-handler';
import DrawMouseHandler from '../handlers/mouse-handlers/drawingroom-draw-mouse-handler';

export default {
  name: 'drawing-canvas',
  computed: {

    activeCanvas: {
      get: function() {
        return this.$store.state.drawingroom.activeCanvas;
      },
      set: function(value) {
        this.$store.commit(types.SET_ACTIVE_CANVAS, value);
      }
    }
  },
  mounted() {
    var activeCanvas = document.getElementById('drawing-canvas');
    var context = activeCanvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, activeCanvas.width, activeCanvas.height);

    var activeTool = new DrawTool({
      canvas: activeCanvas,
    });

    window.drawingroom.drawingRoomMessageHandler = new DrawingRoomMessageHandler(activeTool);
    window.drawingroom.drawingRoomMessageHandler.startHandler();
    window.drawingroom.mouseHandler = new DrawMouseHandler(activeTool);
    window.drawingroom.mouseHandler.subscribe(window.drawingroom.drawingRoomMessageHandler);

    this.activeCanvas = activeCanvas;
  },
  methods: {
    onMouseDown: function(e) {
      window.drawingroom.mouseHandler.onMouseDown(e);
    },
    onMouseMove: function(e) {
      window.drawingroom.mouseHandler.onMouseMove(e);
    },
    onMouseUp: function(e) {
      window.drawingroom.mouseHandler.onMouseUp(e);
    }
  }
}
</script>
