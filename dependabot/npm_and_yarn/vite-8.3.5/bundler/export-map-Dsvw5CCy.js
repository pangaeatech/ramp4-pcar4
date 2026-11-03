import { s as e } from "./main-B9Cz8139.js";
import { fabric as t } from "fabric";
// src/fixtures/export-map/index.ts
var n = class extends e {
	get config() {
		return this.$iApi.fixture.get("export").config?.map;
	}
	async make(e) {
		let n = await this.$iApi.geo.map.takeScreenshot({
			quality: 1,
			format: "png"
		}), r = new Image();
		r.src = n.dataUrl;
		let i = await new Promise((e) => r.onload = () => e(r));
		return new t.Image(i, e);
	}
};
export { n as default };
