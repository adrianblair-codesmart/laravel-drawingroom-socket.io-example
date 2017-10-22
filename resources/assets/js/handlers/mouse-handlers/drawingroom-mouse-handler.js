/*
 * Drawing Room Mouse Handler JavaScript Class.
 */

let DrawingRoomMouseHandler = (function() {
	function DrawingRoomMouseHandler(activeTool) {
		this.mousedown = false;
		this.activeTool = activeTool;
	}

	DrawingRoomMouseHandler.prototype.onMouseDown = function(e) {
			this.mouseDown = true;
		},
		DrawingRoomMouseHandler.prototype.onMouseDownMove = function(e) {},
		DrawingRoomMouseHandler.prototype.onMouseMove = function(e) {
			this.activeTool.context.moveTo(this.activeTool.properties.x, this.activeTool.properties.y);
			this.activeTool.properties.previousx = this.activeTool.properties.x;
			this.activeTool.properties.previousy = this.activeTool.properties.y;
			// Get the mouse position relative to the <canvas> element
			if (e.layerX || e.layerX == 0) { // Firefox
				this.activeTool.properties.x = e.layerX;
				this.activeTool.properties.y = e.layerY;
			} else if (e.offsetX || e.offsetX == 0) { // Opera
				this.activeTool.properties.x = e.offsetX;
				this.activeTool.properties.y = e.offsetY;
			}

			if (this.mouseDown) {
				this.onMouseDownMove(event);
			}
		},
		DrawingRoomMouseHandler.prototype.onMouseUp = function(e) {
			this.mouseDown = false;
		},
		DrawingRoomMouseHandler.prototype.subscribe = function(messageHandler) {
			if (messageHandler) {
				this.messageHandler = messageHandler;
				this.messageHandler.startHandler();
			}
		},
		DrawingRoomMouseHandler.prototype.notify = function() {
			if (this.messageHandler) {
				this.messageHandler.push(JSON.parse(JSON.stringify(this.activeTool.properties)));
			}
		}

	return DrawingRoomMouseHandler;
}(DrawingRoomMouseHandler || {}));

export default DrawingRoomMouseHandler
