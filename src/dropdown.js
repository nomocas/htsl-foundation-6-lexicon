/*
 * @Author: Gilles Coomans
 */
/* global Foundation, $ */

import foundation from './lexicon';

foundation
	.addCompounds((h) => {
		return {
			dropDownMenu(items) {
				return this.ul(
					h.class('dropdown')
					.class('menu')
					.data('dropdownMenu')
					.each(items, function(item) {
						return this.li(item);
					})
				);
			},
			dropDownPane(content) {
				return this.div(
					h.class('dropdown-pane')
					.data('dropdown')
					.data('autoFocus', true)
					.onDom((node) => {
						setTimeout(() => {
							new Foundation.Dropdown($(node), {});
						});
					}),
					content
				);
			}
		};
	});

