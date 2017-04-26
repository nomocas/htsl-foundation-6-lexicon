/*
 * @Author: Gilles Coomans
 * Foundation 6 button api for htsl
 */
import foundation from './lexicon';

foundation
	.addCompounds((h) => {
		return {
			iconButton(icon, content) {
				return this.button(h.class('icon-button').faicon(icon), content);
			},
			// basical button
			simpleButton(content, type, templ) {
				return this.button(
					h.class(type, !!type)
					.class('button'),
					content, templ
				);
			},
			// hollow button (mean just-border style)
			hollowButton(content, type, templ) {
				return this.button(
					h.class(type, !!type)
					.classes('button hollow'),
					content, templ
				);
			},
			// anchor button
			aButton(href, content, type, templ) {
				return this.a(href,
					h.class(type, !!type)
					.class('button'),
					content,
					templ
				);
			},
			aHollowButton(href, content, type, templ) {
				return this.a(href,
					h.class(type, !!type)
					.classes('button hollow'),
					content,
					templ
				);
			},
			// close button : for closing action : templ = h.data('close') || h.click(...)
			closeButton(templ) {
				return this.button(
					h.class('close-button')
					.attr('aria-label', 'Close alert')
					.attr('type', 'button')
					.span(h.attr('aria-hidden', 'true'), '\u00D7'),
					templ
				);
			},
			buttonGroup(buttons) {
				return this.div(h.class('button-group'), buttons);
			},
			smallButtonGroup(buttons) {
				return this.div(
					h.classes('small button-group'),
					buttons
				);
			},
			switchButton(name, text) {
				return this.div(
					h.class('switch')
					.input('checkbox', '',
						h.id(name)
						.class('show-for-sr')
						.attr('name', name)
					)
					.label(
						h.class('switch-paddle')
						.attr('for', name)
						.span(
							h.class('show-for-sr')
							.text(text)
						)
					)
				);
			}
		};
	})
	.addCompounds(() => {
		const coloredAPI = {};
		foundation.colorLabels
			.forEach((color) => {
				// BUTTONS
				coloredAPI[color + 'Button'] = function(content, templ) {
					return this.simpleButton(content, color, templ);
				};
				coloredAPI[color + 'AButton'] = function(href, content, templ) {
					return this.aButton(href, content, color, templ);
				};
				coloredAPI[color + 'AHollowButton'] = function(href, content, templ) {
					return this.aHollowButton(href, content, color, templ);
				};
				coloredAPI[color + 'HollowButton'] = function(content, templ) {
					return this.hollowButton(content, color, templ);
				};
			});
		return coloredAPI;
	});

