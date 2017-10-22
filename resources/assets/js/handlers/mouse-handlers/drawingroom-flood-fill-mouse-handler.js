/*
 * Drawing Room Flood Fill Mouse Handler JavaScript Class.
 */

import DrawingRoomMouseHandler from './drawingroom-mouse-handler';

let FloodFillMouseHandler = (function() {
	function FloodFillMouseHandler(activeTool) {
		DrawingRoomMouseHandler.call(this, activeTool);
	}

	FloodFillMouseHandler.prototype = Object.create(DrawingRoomMouseHandler.prototype);
	FloodFillMouseHandler.prototype.constructor = FloodFillMouseHandler;

	FloodFillMouseHandler.prototype.onMouseUp = function(e) {
		DrawingRoomMouseHandler.prototype.onMouseUp.call(this, e);
		this.activeTool.paintAt({
			x: this.activeTool.properties.x,
			y: this.activeTool.properties.y
		});

		this.notify();
	}

	return FloodFillMouseHandler;
}(FloodFillMouseHandler || {}));

export default FloodFillMouseHandler
