/*
 * Draw Tool JavaScript Class.
 */

import RGBA from '../models/rgba-model';
import FloodFillTool from './flood-fill-tool';
import DrawTool from './draw-tool';
import EraserTool from './eraser-tool';

let DrawingRoomToolFactory = (function() {
	function DrawingRoomToolFactory() {}

	DrawingRoomToolFactory.prototype.buildDrawingRoomTool = function(name, params) {

		switch (name) {
			case 'draw-tool':
				{
					return new DrawTool(params);
				}
			case 'flood-fill-tool':
				{
					return new FloodFillTool(params);
				}
			case 'eraser-tool':
				{
					return new EraserTool(params);
				}
			default:
				throw "The tool name provided was not a valid case.";
		}


	}

	return DrawingRoomToolFactory;
}(DrawingRoomToolFactory || {}));


export default DrawingRoomToolFactory
