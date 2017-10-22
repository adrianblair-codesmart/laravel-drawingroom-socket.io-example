/*
 * Draw Tool JavaScript Class.
 */

import RGBA from '../models/rgba-model';
import DrawingRoomTool from './drawingroom-tool';

let DrawTool = (function() {
	function DrawTool(params) {
		DrawingRoomTool.call(this, params);
		this.context.lineJoin = "round";
		this.context.lineWidth = this.properties.size;
		this.context.strokeStyle = this.properties.colorRGBA.toString();
		this.properties.name = "draw-tool";
	}

	DrawTool.prototype = Object.create(DrawingRoomTool.prototype);
	DrawTool.prototype.constructor = DrawTool;

	DrawTool.prototype.setColor = function(colorRGBA) {
			DrawingRoomTool.prototype.setColor.call(this, colorRGBA);
			this.context.strokeStyle = this.properties.colorRGBA.toString();
		},
		DrawTool.prototype.paintAt = function(positions) {
			this.context.moveTo(positions.previousx, positions.previousy);
			this.context.lineTo(positions.x, positions.y);
			this.context.stroke();
		}
	DrawTool.prototype.setSize = function(size) {
		DrawingRoomTool.prototype.setSize.call(this, size);
		this.context.lineWidth = size;
	}

	return DrawTool;
}(DrawTool || {}));


export default DrawTool
