/*
 * @Author: Gilles Coomans
 * @Date:   2017-03-22 15:11:25
 * @Last Modified by:   Gilles Coomans
 * @Last Modified time: 2017-03-22 16:31:19
 */
/* global Foundation, $ */

import foundation from './lexicon';

foundation
	.addCompounds((h) => {
		return {
			multiLevelAccordionMenu(children) {
				return this.div(
					h.class('multi-level-accordion-menu')
					.ul(
						h.class('accordion-menu')
						.data('accordionMenu', true)
						.class('vertical'),
						children,
						h.onDom((node) => {
							new Foundation.AccordionMenu($(node), {});
						})
					)
				);
			},

			multiLevelAccordionSubMenu(name, depth, children) {
				return this.li(
					h.a('#', name)
					.ul(
						h.class('menu')
						.class('vertical')
						.class('sublevel-' + depth),
						children
					)
				);
			},
			multiLevelAccordionMenuLeaf(href, content) {
				return this.li(
					h.a(href,
						h.class('subitem'),
						content
					)
				);
			},
			testAccordionMenu() {
				return this.multiLevelAccordionMenu(
					h.multiLevelAccordionMenuLeaf('#', 'hello root 1')
					.multiLevelAccordionSubMenu('Item 1', 1,
						h.multiLevelAccordionMenuLeaf('#', 'hello world')
						.multiLevelAccordionSubMenu('Item 1.2', 2,
							h.multiLevelAccordionMenuLeaf('#', 'hello world 1')
							.multiLevelAccordionMenuLeaf('#', 'hello world 2')
							.multiLevelAccordionMenuLeaf('#', 'hello world 3')
						)
					)
					.multiLevelAccordionSubMenu('Item 2', 1,
						h.multiLevelAccordionMenuLeaf('#', 'hello bloupi')
						.multiLevelAccordionMenuLeaf('#', 'hello bloupi 2')
						.multiLevelAccordionSubMenu('Item 2.2', 2,
							h.multiLevelAccordionMenuLeaf('#', 'hello foo 1')
							.multiLevelAccordionMenuLeaf('#', 'hello foo 2')
							.multiLevelAccordionMenuLeaf('#', 'hello foo 3')
						)
					)
				);
			}
		};
	});

