/*
 * @Author: Gilles Coomans
 * @Date:   2017-06-09 01:31:03
 * @Last Modified by:   Gilles Coomans
 * @Last Modified time: 2017-06-21 11:22:43
 */

'use strict';
import Component from 'htsl-component';
import foundation from './lexicon';
import OverlayPanel from './overlay-panel';
import anime from 'animejs';

const SidePanel = Component.extends(OverlayPanel, {
	hide() {
		anime({
			targets: this.innerPannel,
			width: 0,
			duration: this.props.opt.delay || 500,
			easing: 'easeInOutQuart',
			complete: () => {
				this.unmount();
			}
		});
	},
	show() {
		console.log('side panel show : ', this.props.opt.width); // eslint-disable-line
		anime({
			targets: this.innerPannel,
			width: this.props.opt.width,
			easing: 'easeInOutQuart',
			duration: this.props.opt.delay || 500,
			complete: () => {
				console.log('panel shown'); // eslint-disable-line
			}
		});
	},
	renderPanel(firstLevel) {
		const h = foundation.initializer(firstLevel),
			opt = this.props.opt,
			subcontent = this.props.content || this.content;
		return h
			.div(
				h.class('side-panel')
				.ref('innerPannel')
				.style('width', '0px')
				.class('side-panel--' + opt.side)
				.div(
					h.class('side-panel-content'),
					typeof subcontent === 'function' ? subcontent(this.state, this.props, this) : subcontent
				)
				.closeButton(h.click(this.hide))
			);
	}
});

/**
 ******************* LEXEMS
 */
foundation.addCompounds(() => {
	return {
		postalSidePanel(channel, opt, content) {
			return this.postalComponent(channel, SidePanel, { opt, content });
		},
		sidePanel(opt, content) {
			return this.component(SidePanel, { opt, content });
		}
	};
});

foundation.components.SidePanel = SidePanel;

export default SidePanel;

