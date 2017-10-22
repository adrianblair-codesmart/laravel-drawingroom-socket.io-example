/*
 * Drawing Room Draw Mouse Handler JavaScript Class.
 */

import DrawingRoomMouseHandler from './drawingroom-mouse-handler';

let DrawMouseHandler = (function() {
	function DrawMouseHandler(activeTool) {
		DrawingRoomMouseHandler.call(this, activeTool);
	}

	DrawMouseHandler.prototype = Object.create(DrawingRoomMouseHandler.prototype);
	DrawMouseHandler.prototype.constructor = DrawMouseHandler;

	DrawMouseHandler.prototype.onMouseDown = function(e) {
			DrawingRoomMouseHandler.prototype.onMouseDown.call(this, e);
			this.activeTool.context.beginPath();
		},
		DrawMouseHandler.prototype.onMouseDownMove = function(e) {
			this.activeTool.context.lineTo(this.activeTool.properties.x, this.activeTool.properties.y);
			this.activeTool.context.stroke();
			this.notify();
		},
		DrawMouseHandler.prototype.onMouseUp = function(e) {
			this.activeTool.context.closePath();
			DrawingRoomMouseHandler.prototype.onMouseUp.call(this, e);
		}

	return DrawMouseHandler;
}(DrawMouseHandler || {}));

export default DrawMouseHandler
