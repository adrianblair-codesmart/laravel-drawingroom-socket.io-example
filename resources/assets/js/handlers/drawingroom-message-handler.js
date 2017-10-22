/*
 * Drawing Room Message Handler JavaScript Class.
 */

import RGBA from '../models/rgba-model';
import DrawingRoomTool from '../tools/drawingroom-tool';
import DrawingRoomToolFactory from '../tools/drawingroom-tool-factory';

let DrawingRoomToolHandler = (function() {
	function DrawingRoomToolHandler(activeTool) {
		this.arrayOfProperties = [];
		this.activeTool = activeTool;
	}

	DrawingRoomToolHandler.prototype.push = function(properties) {
		this.arrayOfProperties.push(properties);
	};

	DrawingRoomToolHandler.prototype.startHandler = function() {
		this.openEchoChannel();
		this.startTimer();
	};

	DrawingRoomToolHandler.prototype.startTimer = function() {
		var self = this;
		this.postTimer = setInterval(function() {
			if (self.arrayOfProperties.length > 0) {
				var items = self.arrayOfProperties.splice(0, self.arrayOfProperties.length);
				axios.post('/SendMessage', {
					'properties': items
				}).then(response => {

				});
			}
		}, 500);
	};

	DrawingRoomToolHandler.prototype.openEchoChannel = function() {
		Echo.channel('drawingroom')
			.listen('SendMessage', (e) => {
				this.activeTool.context.beginPath();
				for (var count = 0; count < e.properties.length; count++) {
					var item = e.properties[count];

					//This section should be improved by moving it outside of the loop to save memory
					var factory = new DrawingRoomToolFactory();
					var tool = factory.buildDrawingRoomTool(item.name, {
						canvas: this.activeTool.canvas,
						colorRGBA: new RGBA(item.colorRGBA),
						size: item.size,
					});

					tool.paintAt(item);
					this.activeTool.colorLayerData = tool.colorLayerData;
				}

				this.activeTool.context.closePath();

				//need to revert to the previous colour and size.
				this.activeTool.context.strokeStyle = this.activeTool.properties.colorRGBA.toHexString();
				this.activeTool.context.lineWidth = this.activeTool.properties.size;
			});
	};

	return DrawingRoomToolHandler;
}(DrawingRoomToolHandler || {}));

export default DrawingRoomToolHandler
