/*
 * @Author: Gilles Coomans
 * @Date:   2017-07-08 13:19:40
 * @Last Modified by:   Gilles Coomans
 * @Last Modified time: 2017-07-08 13:20:48
 */

'use strict';

import foundation from './lexicon';
import './buttons';

foundation
	.addCompounds((h) => {
		return {
			imageUploadButton(index, ctrl) {
				return h.form(
						h.class('show-for-sr')
						.attr('enctype', 'multipart/form-data')
						.attr('action', 'post')
						.input('file', '',
							h.display(false)
							.attr('name', 'photo')
							.on('change', (e) => {
								const fileInput = e.currentTarget,
									form = fileInput.parentNode;
								if (fileInput.files && fileInput.files[0])
									ctrl.uploadPosterImage(index, form)
									.then(() => {
										form.reset();
									});
							})
						)
					)
					.iconButton('image', h.classes('box-button').click((e) => {
						e.currentTarget.previousSibling[0].click();
					}));
			}
		};
	});

