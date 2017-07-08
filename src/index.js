/**
 * Foundation 6 api for htsl
 */
/* global Foundation, $ */
import foundation from './lexicon';
import './buttons';
import './accordion-menu';
import './dropdown';
import './form';
import './overlay-panel';
import './images';
import './side-panel';
import './dialogs-and-callouts';
import './image-upload-form-button';

export default foundation
	.addCompounds((h) => {
		return {
			/**
			 * MISC
			 */
			faicon(type, templ) {
				return this.i(h.class('fa').class('fa-' + type), templ);
			},
			icon(type) {
				return this.i(h.class('fi-' + type));
			},
			badge(text, type) {
				return this.span(h.class('badge').if(type, h.class(type)), text);
			},
			coloredLabel(text, type) {
				return this.span(h.class('label').if(type, h.class(type)), text);
			},

			/**
			 * HELPERS
			 */

			tooltip(title, opt) {
				opt = opt || {};
				let tooltip;
				return this.class('has-tip')
					.if(opt.top, h.class('top'))
					.data('tooltip')
					.attr('role', 'tooltip')
					.data('clickOpen', !opt.noClickOpen)
					.attr('aria-haspopup', true)
					.data('disableHover', !!opt.disableHover)
					.attr('title', title)
					// .data('hoverDelay', opt.hoverDelay || 0)
					.onDom((node) => {
						tooltip = new Foundation.Tooltip($(node), opt);
					}, null, () => {
						if (tooltip && tooltip.$element)
							tooltip.destroy();
					});
			},

			// breadcrumb: function(label, elements) {
			// 	return this
			// 		.nav(h.attr('aria-label', label)
			// 			.attr('role', 'navigation')
			// 			.ul(
			// 				h.class('breadcrumbs')
			// 				.li(h.a('#', 'Home'))
			// 				.li(h.a('#', 'Features'))
			// 				.li(h.class('disabled'), 'Gene Splicing')
			// 				.li(
			// 					h.span(h.class('show-for-sr'), 'Current: '),
			// 					' Cloning'
			// 				)
			// 			)
			// 		);
			// },


			/**
			 * NAV
			 */

			// subNav: function(title, label) {
			// 	return this.ul(
			// 		h.class("sub-nav")
			// 		.class("menu")
			// 		.attr("role", "navigation")
			// 		// label title
			// 		.attr("title", label)
			// 		// title
			// 		.li(h.class("sub-nav-title"), title)
			// 		// children
			// 		.li(
			// 			h.class("active")
			// 			.span(
			// 				h.class("show-for-sr"),
			// 				"You're viewing "
			// 			)
			// 			.a(h.prop("href"), "All")
			// 		)
			// 		.li(h.a(h.attr("href", "#"), "Active"))
			// 		.li(h.a(h.attr("href", "#"), "Pending"))
			// 		.li(h.a(h.attr("href", "#"), "Suspended"))
			// 	);
			// },



			/***********************************
			 *************** CARDS *************
			 ***********************************/

			productCard(title, price, imgSrc, details) {
				return this.div(
					h.class('product-card')
					.class('item-wrapper')
					.div(
						h.class('img-wrapper')
						.a('#',
							h.class('button')
							.class('expand')
							.class('add-to-cart'),
							'Add to Cart'
						)
						.a('#', h.img(imgSrc))
					)
					.a('#', h.h3(title))
					.h5(price)
					.p(details)
				);
			},

			/***********************************
			 *************** CONTAINERS ********
			 ***********************************/
			topBar(contentLeft, contentRight) {
				return this.div(
					h.class('top-bar')
					.div(
						h.class('top-bar-left'),
						contentLeft
					)
					.div(
						h.class('top-bar-right'),
						contentRight
					)
				);
			},
			offCanvas(leftMenuContent, content, rightMenuContent) {
				return this.div(
					h.class('off-canvas-wrapper')
					.div(
						h.class('off-canvas-wrapper-inner')
						.data('offCanvasWrapper')
						.if(leftMenuContent,
							h.div(
								h.class('off-canvas')
								.class('position-left')
								.attr('id', 'offCanvas')
								.data('offCanvas', true)
								.closeButton(h.data('close')),
								leftMenuContent
							))
						.div(
							h.class('off-canvas')
							.class('position-right')
							.attr('id', 'offCanvasRight')
							.data('offCanvas', true)
							.data('position', 'right'),
							content
						)
						.if(rightMenuContent,
							h.div(
								h.class('off-canvas-content')
								.data('offCanvasContent', true)
								.closeButton(h.data('close')),
								rightMenuContent
							))
					)
				);
			}
		};
	})
	.addCompounds(() => {
		const coloredAPI = {};
		foundation.colorLabels
			.forEach((color) => {
				coloredAPI[color + 'Badge'] = function(text) {
					return this.badge(text, color);
				};
				coloredAPI[color + 'Label'] = function(text) {
					return this.coloredLabel(text, color);
				};
			});
		return coloredAPI;
	});

