import * as types from './mutation_types'

export default {
	[types.SET_ACTIVE_CANVAS](state, canvas) {
		state.activeCanvas = canvas;
	}
}
