/*
* @Author: Gilles Coomans
* @Date:   2017-06-20 14:35:39
* @Last Modified by:   Gilles Coomans
* @Last Modified time: 2017-06-20 15:22:10
*/

'use strict';
import Component from 'htsl-component';
import foundation from './lexicon';

const OverlayedOpenablePanel = Component.extends(Component, {
	hide() {
		this.setState({ opened: false });
		this.unmount();
	},
	show() {
		this.setState({ opened: true });
	},
	commonentDidMount() {
		this.show();
	},
	componentWillReceiveProps() {
		this.show();
	},
	render(firstLevel) {
		const h = foundation.initializer(firstLevel);
		return h.div(
			h.class('overlay-panel')
			.class(this.props.panelClass)
			.class('opened', this.state.opened)
			.overlayPanelBackground(this.props.closeOnBackgroundClick, this)
			.div(
				h.class('openable-panel-content')
				.div(
					h.class('openable-panel-inner-content'),
					this.content(firstLevel)
				)
				.closeButton(h.click(this.hide))
			)
		);
	},
	content( /* firstLevel */ ) {
		// to be overriden
	}
});

foundation.components.OverlayedOpenablePanel = OverlayedOpenablePanel;

export default OverlayedOpenablePanel;


/**
 * @example
 *
 * const MyPanel;
 *
 *
 *
 * h.postalComponent('your-channel', OverlayedOpenablePanel, { panelClass:'...', closeOnBackgroundClick: true})
 */