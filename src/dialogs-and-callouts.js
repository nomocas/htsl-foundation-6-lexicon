import foundation from './lexicon';
foundation
	.addCompounds((h) => {
		return {
			callout(type, content, templ) {
				return this.div(
					h.class('callout')
					.class(type),
					content,
					templ
				);
			},
			closableCallout(type, content, templ) {
				return this.container((ctrl) => {
					return h.callout(type, content, h.closeButton(h.click(ctrl.unmount))._use(templ));
				});
			},
			dialog(type, content, templ) {
				return this.div(
					h.class('dialog')
					.class(type),
					content,
					templ
				);
			},
			closableDialog(type, content, templ) {
				return this.container((ctrl) => {
					return h.dialog(type, content, h.closeButton(h.click(ctrl.unmount))._use(templ));
				});
			}
		};
	})
	.addCompounds(() => {
		const coloredAPI = {};
		foundation.colorLabels
		.forEach((color) => {

			const upCaseColor = color[0].toUpperCase() + color.substring(1);

			// DIALOGS AND CALLOUTS
			coloredAPI[color + 'Dialog'] = function(content, templ) {
				return this.dialog(color, content, templ);
			};
			coloredAPI[color + 'Callout'] = function(content, templ) {
				return this.callout(color, content, templ);
			};
			coloredAPI['closable' + upCaseColor + 'Dialog'] = function(content, templ) {
				return this.closableDialog(color, content, templ);
			};
			coloredAPI['closable' + upCaseColor + 'Callout'] = function(content, templ) {
				return this.closableCallout(color, content, templ);
			};

		});
		return coloredAPI;
	});

