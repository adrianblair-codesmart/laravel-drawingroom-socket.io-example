/*
 RGBA Model JavaScript Class.
 */

/*
 * params:
 * r - Integer ( e.g. 0)
 * g - Integer ( e.g. 0)
 * b - Integer ( e.g. 0)
 * a - Integer ( e.g. 0)
 */

let RGBA = (function() {
	function RGBA(params) {
		var r = 0;
		var g = 0;
		var b = 0;
		var a = 0;

		function checkColorParamValidity(color) {
			return (color !== undefined && color >= 0 && color <= 255)
		}

		function checkParamsValidity(params, color) {
			return (params && checkColorParamValidity(params[color]));
		}

		function returnValidParam(params, color) {
			return checkParamsValidity(params, color) ? params[color] : 0;
		}

		this.build = function(params) {
				this.r = returnValidParam(params, 'r');
				this.g = returnValidParam(params, 'g');
				this.b = returnValidParam(params, 'b');
				this.a = returnValidParam(params, 'a');
				return this;
			},
			this.toString = function() {
				return 'rgba(' + this.r +
					', ' + this.g +
					', ' + this.b +
					', ' + this.a + ')';
			},
			this.toHexString = function() {
				return "#" +
					("0" + parseInt(this.r, 10).toString(16)).slice(-2) +
					("0" + parseInt(this.g, 10).toString(16)).slice(-2) +
					("0" + parseInt(this.b, 10).toString(16)).slice(-2);
			},
			this.buildFromHexString = function(hex, alpha) {
				var c;
				if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
					c = hex.substring(1).split('');
					if (c.length == 3) {
						c = [c[0], c[0], c[1], c[1], c[2], c[2]];
					}
					c = '0x' + c.join('');

					this.r = (c >> 16) & 255;
					this.g = (c >> 8) & 255;
					this.b = c & 255;
					this.a = alpha || 255;

				}
				return this;
			}


		this.build(params);
	}
	return RGBA;

}(RGBA || {}));

export default RGBA
