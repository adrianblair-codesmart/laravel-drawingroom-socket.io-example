/*
 * Flood Fill Tool JavaScript Class.
 */

import RGBA from '../models/rgba-model';
import DrawingRoomTool from './drawingroom-tool';

let FloodFill = (function() {
	function FloodFill(params) {
		DrawingRoomTool.call(this, params);
		this.properties.name = "flood-fill-tool";
	}

	FloodFill.prototype = Object.create(DrawingRoomTool.prototype);
	FloodFill.prototype.constructor = FloodFill;

	FloodFill.prototype.clearCanvas = function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
		FloodFill.prototype.redraw = function() {
			this.clearCanvas();
			this.context.putImageData(this.colorLayerData, 0, 0);

		},
		FloodFill.prototype.matchStartColor = function(pixelPos, startRGBA) {
			var r = this.colorLayerData.data[pixelPos];
			var g = this.colorLayerData.data[pixelPos + 1];
			var b = this.colorLayerData.data[pixelPos + 2];
			var a = this.colorLayerData.data[pixelPos + 3];

			// If the current pixel matches the clicked color
			if (r === startRGBA.r && g === startRGBA.g && b === startRGBA.b && a === startRGBA.a) {
				return true;
			}

			return false;
		},
		FloodFill.prototype.colorPixel = function(pixelPos, rgba) {
			this.colorLayerData.data[pixelPos] = rgba.r;
			this.colorLayerData.data[pixelPos + 1] = rgba.g;
			this.colorLayerData.data[pixelPos + 2] = rgba.b;
			this.colorLayerData.data[pixelPos + 3] = rgba.a !== undefined ? rgba.a : 255;
		},
		FloodFill.prototype.paintAt = function(startPos) {
			var pixelPos = (startPos.y * this.canvas.width + startPos.x) * 4;

			var startRGBA = new RGBA({
				r: this.colorLayerData.data[pixelPos],
				g: this.colorLayerData.data[pixelPos + 1],
				b: this.colorLayerData.data[pixelPos + 2],
				a: this.colorLayerData.data[pixelPos + 3]
			});

			if (startRGBA.r === this.properties.colorRGBA.r &&
				startRGBA.g === this.properties.colorRGBA.g &&
				startRGBA.b === this.properties.colorRGBA.b &&
				startRGBA.a === this.properties.colorRGBA.a) {
				// Return because trying to fill with the same color
				return;
			}

			this.floodFill(startPos, startRGBA, this.properties.colorRGBA);
			this.redraw();
		},
		FloodFill.prototype.floodFill = function(startPos, startRGBA, newRGBA) {
			var newPos,
				x,
				y,
				pixelPos,
				reachLeft,
				reachRight,
				pixelStack = [
					[startPos.x, startPos.y]
				];

			while (pixelStack.length) {

				newPos = pixelStack.pop();
				x = newPos[0];
				y = newPos[1];

				pixelPos = (y * this.canvas.width + x) * 4;

				// Go up as long as the color matches and are inside the canvas
				while (y >= 0 && this.matchStartColor(pixelPos, startRGBA)) {
					y -= 1;
					pixelPos -= this.canvas.width * 4;
				}

				pixelPos += this.canvas.width * 4;
				y += 1;
				reachLeft = false;
				reachRight = false;

				// Go down as long as the color matches and in inside the canvas
				while (y < this.canvas.height && this.matchStartColor(pixelPos, startRGBA)) {
					y += 1;
					this.colorPixel(pixelPos, newRGBA);

					if (x > 0) {
						if (this.matchStartColor(pixelPos - 4, startRGBA)) {
							if (!reachLeft) {
								// Add pixel to stack
								pixelStack.push([x - 1, y]);
								reachLeft = true;
							}
						} else if (reachLeft) {
							reachLeft = false;
						}
					}

					if (x < this.canvas.width) {

						if (this.matchStartColor(pixelPos + 4, startRGBA)) {
							if (!reachRight) {
								// Add pixel to stack
								pixelStack.push([x + 1, y]);
								reachRight = true;
							}
						} else if (reachRight) {
							reachRight = false;
						}
					}

					pixelPos += this.canvas.width * 4;
				}
			}
		}

	return FloodFill;
}(FloodFill || {}));


export default FloodFill
