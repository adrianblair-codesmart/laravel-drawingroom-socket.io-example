import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';
import drawingroom from './drawingroom/drawingroom';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	strict: debug,
	plugins: debug ? [createLogger()] : [],
	modules: {
		drawingroom: drawingroom
	}
});
