// resources/assets/js/components/DrawingToolbar.vue

<template>
<div>
  <div class="toolbar-buttons text-center" role="group" aria-label="A toolbar containing tools for drawing.">
    <button id="draw-tool" type="button" @click="onDrawButtonPress" class="btn btn-default"><i class="glyphicon glyphicon-pencil"></i></br><span>draw</span></button>
    <button id="fill-tool" type="button" @click="onFillButtonPress" class="btn btn-default"><i class="glyphicon glyphicon glyphicon-tint"></i></br><span>fill</span></button>
    <button id="eraser-tool" type="button" @click="onEraserButtonPress" class="btn btn-default"><i class="glyphicon glyphicon-erase"></i></br><span>eraser</span></button>
    <span   id="size-tool-span" @click="onSizeButtonPress" class="btn btn-default"><input id="size-tool" @change="onSizeInputChange" value="5" min='1' max='100' type="number"/></br><span>size</span></span>
    <span @click="onColorButtonPress" class="btn btn-default"><input type="color" id="color-tool" @change="onColorChangePress"/></br><span>color</span></span>
  </div>
</div>
</template>

<style scoped>
.toolbar-buttons {
  width: 260px;
  height: 50px;
  margin: auto;
}

.toolbar-buttons .btn {
  width: 50px;
  height: 50px;
  padding: 2px;
  float: left;
  border: none;
  border-radius: 0px;
}

.toolbar-buttons .btn:focus {
  outline: none;
}

.toolbar-buttons .btn #color-tool {
  width: 22px;
  height: 22px;
  padding: 0px;
  border: none;
  background-color: transparent;
}

.toolbar-buttons .btn #color-tool:focus {
  outline: none;
}

#size-tool-span {
  width:60px;
}

#size-tool {
  width:55px;
  height:23px;
  padding-left:13px;
  padding-right:0px;
  padding-top:0px;
  text-align: center;
}
</style>

<script>
import * as types from '../vuex/drawingroom/mutation_types';
import RGBA from '../models/rgba-model';
import FloodFillTool from '../tools/flood-fill-tool';
import DrawTool from '../tools/draw-tool';
import EraserTool from '../tools/eraser-tool';
import DrawMouseHandler from '../handlers/mouse-handlers/drawingroom-draw-mouse-handler';
import FloodFillMouseHandler from '../handlers/mouse-handlers/drawingroom-flood-fill-mouse-handler';
import DrawingRoomMessageHandler from '../handlers/drawingroom-message-handler';

export default {
  name: 'drawing-toolbar',
  props: {},
  mounted() {
    $('#draw-tool').addClass('active');
  },
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
  methods: {
    onDrawButtonPress: function() {
      $('.active').removeClass('active');
      $('#draw-tool').addClass('active');

      var activeTool = new DrawTool({
        canvas: this.activeCanvas,
        size: $('#size-tool').val()
      });

      window.drawingroom.mouseHandler = new DrawMouseHandler(activeTool);
      window.drawingroom.drawingRoomMessageHandler.activeTool = activeTool;
      window.drawingroom.mouseHandler.subscribe(window.drawingroom.drawingRoomMessageHandler);
      this.onColorChangePress();
    },
    onFillButtonPress: function() {
      $('.active').removeClass('active');
      $('#fill-tool').addClass('active');

      var activeTool = new FloodFillTool({
        canvas: this.activeCanvas,
        size: $('#size-tool').val()
      });

      window.drawingroom.mouseHandler = new FloodFillMouseHandler(activeTool);
      window.drawingroom.drawingRoomMessageHandler.activeTool = activeTool;
      window.drawingroom.mouseHandler.subscribe(window.drawingroom.drawingRoomMessageHandler);
      this.onColorChangePress();
    },
    onEraserButtonPress: function() {
      $('.active').removeClass('active');
      $('#eraser-tool').addClass('active');

      var activeTool = new EraserTool({
        canvas: this.activeCanvas,
        size: $('#size-tool').val()
      });

      window.drawingroom.mouseHandler = new DrawMouseHandler(activeTool);
      window.drawingroom.drawingRoomMessageHandler.activeTool = activeTool;
      window.drawingroom.mouseHandler.subscribe(window.drawingroom.drawingRoomMessageHandler);

    },
    onColorButtonPress: function() {
      var element = document.getElementById('color-tool');
      element.click();
    },
    onSizeButtonPress: function() {
      var element = document.getElementById('size-tool');
      element.focus();
    },
    onSizeInputChange: function() {
      var element = document.getElementById('size-tool');
      var value = $(element).val();
      var regex = /^\d/;

      //check only numbers have been input.
      if(!regex.test(value)) {
        value = window.drawingroom.drawingRoomMessageHandler.activeTool.properties.size;
        $(element).val(value);
        return;
      }

      //perform number boundary checks.
      if(value > 100) {
        value = 100;
        $(element).val(100);
      } else if(value < 1) {
        value = 1;
        $(element).val(1);
      }

      window.drawingroom.drawingRoomMessageHandler.activeTool.setSize(value);
    },
    onColorChangePress: function(e) {
      var colorRGBA = new RGBA();
      colorRGBA.buildFromHexString($('#color-tool').val());
      window.drawingroom.mouseHandler.activeTool.setColor(colorRGBA);
      window.drawingroom.drawingRoomMessageHandler.activeTool.setColor(colorRGBA);
    }
  }
}
</script>
