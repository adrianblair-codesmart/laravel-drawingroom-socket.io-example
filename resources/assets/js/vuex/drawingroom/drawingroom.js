import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import RGBA from '../../models/rgba-model';
import FloodFillTool from '../../tools/flood-fill-tool';
import DrawTool from '../../tools/draw-tool';

var state = {
	activeCanvas: {

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
