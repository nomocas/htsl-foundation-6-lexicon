/*
 * @Author: Gilles Coomans
 */

import Component from 'htsl-component';
import foundation from './lexicon';
import anime from 'animejs';

/**
 * Abstract Component for full screen panel with background
 * @abstract
 */
const OverlayPanel = Component.extends(Component, {
	hide() {
		// this.setState({ opened: false });
		const targets = [];
		if (this.panelBackground)
			targets.push(this.panelBackground);
		if (this.innerPanel)
			targets.push(this.innerPanel);
		if (!targets.length)
			this.unmount();
		else
			anime({
				targets,
				opacity: 0,
				easing: 'easeInOutQuart',
				duration: this.props.opt.delay || 400,
				complete: () => {
					this.unmount();
				}
			});
	},
	show() {
		// this.setState({ opened: true });
		anime({
			targets: [this.panelBackground, this.innerPanel],
			opacity: 1,
			easing: 'easeInOutQuart',
			duration: this.props.opt.delay || 400,
			complete: () => {
				console.log('panel shown'); // eslint-disable-line
			}
		});
	},
	componentDidMount() {
		this.show();
	},
	componentWillReceiveProps() {
		this.show();
	},
	render(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h.overlayPanel(this.props, this.state, this.renderPanel(firstLevel), this);
	}
});

/**
 * Full screen Confirm Panel Component with background
 */
const ConfirmPanel = Component.extends(OverlayPanel, {
	validate(e) {
		e.preventDefault();
		this.hide();
		this.state.callback(true);
	},

	cancel(e) {
		e.preventDefault();
		this.hide();
		this.state.callback(false);
	},
	renderPanel(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h
			.class('confirm-panel')
			.warningDialog(
				h.h3(this.state.title)
				.style('opacity', 0)
				.ref('innerPanel')
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
	renderPanel(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h.class('alert-panel')
			.alertDialog(
				h.h3(this.state.title)
				.style('opacity', 0)
				.ref('innerPanel')
				.p(this.state.message)
				.div(
					h.class('dialog-buttons-container')
					.alertButton(h.click(this.hide), '\u2713')
				),
				h.click(this.hide)
			);
	}
});

/**
 * Full screen Modal Component with background
 */
const UikitModal = Component.extends(OverlayPanel, {
	renderPanel(firstLevel) {
		const h = foundation.initializer(firstLevel),
			subcontent = this.props.content || this.content(firstLevel);

		return h
			.class('uik-modal')
			.div(
				h.class('modal-panel')
				.style('opacity', 0)
				.ref('innerPanel')
				.div(
					h.class('modal-panel-content'),
					typeof subcontent === 'function' ? subcontent(this.state, this.props, this) : subcontent
				)
				.closeButton(h.click(this.hide)),
				this.props.template
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
		overlayPanel(props, state, content, ctrl) {
			return h.div(
				h.class('overlay-panel')
				.class('opened', !!state.opened)
				.ref('panel')
				.if(props.opt.panelClass, h.class(props.opt.panelClass))
				.if(!props.opt.noBackground, h.overlayPanelBackground(props.opt.closeOnBackgroundClick, ctrl)),
				content
			);
		},
		overlayPanelBackground(closeOnBackgroundClick, ctrl) {
			return this.div(
				h.class('overlay-panel-background')
				.ref('panelBackground')
				.style('opacity', 0)
				.if(closeOnBackgroundClick, h.click((e) => {
					if (e.target === e.currentTarget)
						ctrl.hide();
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
		postalUikitModal(channel, opt, content, template = undefined) {
			return this.postalComponent(channel, UikitModal, { content, opt, template });
		}
	};
});

Object.assign(foundation.components, {
	OverlayPanel,
	UikitModal,
	ConfirmPanel,
	AlertPanel
});

export default OverlayPanel;

