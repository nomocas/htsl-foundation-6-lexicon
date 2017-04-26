/*
 * @Author: Gilles Coomans
 */

import Component from 'htsl-component';
import foundation from './lexicon';

/**
 * Abstract Component for full screen panel with background
 * @abstract
 */
const OverlayPanel = Component.extends(Component, {
	render(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h.overlayPanel(this.props.opt, this.content(firstLevel), this);
	}
});

/**
 * Full screen Confirm Panel Component with background
 */
const ConfirmPanel = Component.extends(OverlayPanel, {
	validate(e) {
		e.preventDefault();
		this.unmount();
		this.state.callback(true);
	},
	cancel(e) {
		e.preventDefault();
		this.unmount();
		this.state.callback(false);
	},
	content(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h.class('confirm-panel')
			.warningDialog(
				h.h3(this.state.title)
				.p(this.state.message)
				.div(
					h.class('dialog-buttons-container')
					.warningButton(h.click(this.validate), '\u2713')
					.alertButton(h.click(this.cancel), '\u00D7')
				)
			);
	}
});

/**
 * Full screen Alert Panel Component with background
 */
const AlertPanel = Component.extends(OverlayPanel, {
	content(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h.class('alert-panel')
			.alertDialog(
				h.h3(this.state.title)
				.p(this.state.message)
				.div(
					h.class('dialog-buttons-container')
					.alertButton(h.click(this.unmount), '\u2713')
				),
				h.click(this.unmount)
			);
	}
});

/**
 * Full screen Modal Component with background
 */
const UikitModal = Component.extends(OverlayPanel, {
	content(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h.class('uik-modal')
			.div(
				h.class('modal-panel')
				.div(
					h.class('modal-panel-content'),
					typeof this.props.content === 'function' ? this.props.content(this.state, this.props, this) : this.props.content
				)
				.closeButton(h.click(this.unmount))
			);
	}
});

/**
 * Side Panel Component with background
 * opt: {
 * 		side: 'left' || 'right',
 * 		width: '100px', 
 * 		height: '100px' 
 * }
 */
const SidePanel = Component.extends(OverlayPanel, {
	content(firstLevel) {
		const h = foundation.initializer(firstLevel),
			opt = this.props.opt;
		return h
			.div(
				h.class('side-panel')
				.class('side-panel--' + opt.side)
				.div(
					h.class('side-panel-content')
					.if(opt.side === 'left' || opt.side === 'right',
						h.style('width', opt.width),
						h.style('height', opt.height)
					),
					typeof this.props.content === 'function' ? this.props.content(this.state, this.props, this) : this.props.content
				)
				.closeButton(h.click(this.unmount))
			);
	}
});

/**
 ******************* LEXEMS
 */
foundation.addCompounds((h) => {
	return {
		/**
		 * overlay panel. if opt.closeOnBackgroundClick : needs that ctrl implements unmount method
		 * @param  {[type]} opt  [description]
		 * @param  {[type]} ctrl [description]
		 * @return {[type]}      [description]
		 */
		overlayPanel(opt, content, ctrl) {
			return h.div(
				h.class('overlay-panel')
				.if(opt.panelClass, h.class(opt.panelClass))
				.if(!opt.noBackground, h.overlayPanelBackground(opt.closeOnBackgroundClick, ctrl)),
				content
			);
		},
		overlayPanelBackground(closeOnBackgroundClick, ctrl) {
			return this.div(
				h.class('overlay-panel-background')
				.if(closeOnBackgroundClick, h.click((e) => {
					if (e.target === e.currentTarget)
						ctrl.unmount();
				}))
			);
		},
		/***********************************
		 *********** DIALOGS PANEL *********
		 ***********************************/
		postalConfirmPanel(channel) {
			return this.postalComponent(channel, ConfirmPanel, { opt: {} });
		},
		postalAlertPanel(channel) {
			return this.postalComponent(channel, AlertPanel, {
				opt: {
					closeOnBackgroundClick: true
				}
			});
		},
		postalUikitModal(channel, opt, content) {
			return this.postalComponent(channel, UikitModal, { content, opt });
		},
		postalSidePanel(channel, opt, content) {
			return this.postalComponent(channel, SidePanel, { opt, content });
		}
	};
});

