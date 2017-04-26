/*
 * @Author: Gilles Coomans
 * @Date:   2017-03-22 15:22:44
 * @Last Modified by:   Gilles Coomans
 * @Last Modified time: 2017-03-22 19:31:31
 */


import foundation from './lexicon';

foundation
	.addCompounds((h) => {
		return {
			backgroundImage(url, backgroundSize) {
				backgroundSize = backgroundSize || 'cover';
				return this.style('background', 'url(' + url + ') no-repeat center center')
					.style('backgroundSize', backgroundSize);
			},
			thumbnail(src, alt, templ) {
				return this.img(src,
					h.class('thumbnail')
					.attr('alt', alt || 'image with no alternate text'),
					templ
				);
			},
			roundedThumbnail(src, alt, templ) {
				return this.img(src,
					h.classes('thumbnail rounded')
					.attr('alt', alt || 'image with no alternate text'),
					templ
				);
			}
		};
	});

