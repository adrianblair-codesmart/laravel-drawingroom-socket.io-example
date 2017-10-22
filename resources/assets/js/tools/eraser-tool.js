/*
 * Eraser Tool JavaScript Class.
 */

import RGBA from '../models/rgba-model';
import DrawTool from './draw-tool';

let EraserTool = (function() {
	function EraserTool(params) {
		DrawTool.call(this, params);

		DrawTool.prototype.setColor.call(this, new RGBA({
			r: 255,
			g: 255,
			b: 255,
			a: 255
		}));

		this.properties.name = "eraser-tool";
	}

	EraserTool.prototype = Object.create(DrawTool.prototype);
	EraserTool.prototype.constructor = EraserTool;
	EraserTool.prototype.setColor = function(colorRGBA) {

	}

	return EraserTool;
}(EraserTool || {}));


export default EraserTool
