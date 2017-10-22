/*
 * Flood Fill Tool JavaScript Class.
 */

import RGBA from '../models/rgba-model';

let DrawingRoomTool = (function() {
	DrawingRoomTool = function(params) {
		if (!params) {
			throw 'The params object passed was undefined.'
		}

		if (!params['canvas']) {
			throw 'The canvas parameter passed was undefined.'
		}

		this.canvas = params['canvas'];
		this.context = this.canvas.getContext('2d');
		this.colorLayerData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		this.properties = {};

		this.properties.colorRGBA = params['colorRGBA'] || new RGBA({
			r: 0,
			g: 0,
			b: 0,
			a: 255
		});

		this.properties.size = params["size"] || 5;

		this.properties.x = 0;
		this.properties.y = 0;
		this.properties.previousx = 0;
		this.properties.previousy = 0;
		this.arrayOfProperties = [];
	};

	DrawingRoomTool.prototype.setColor = function(colorRGBA) {
		this.properties.colorRGBA = colorRGBA;
	}
	DrawingRoomTool.prototype.setSize = function(size) {
		this.properties.size = size;
	}

	return DrawingRoomTool;
}(DrawingRoomTool || {}));

export default DrawingRoomTool
