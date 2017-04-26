/*
 * @Author: Gilles Coomans
 * @Date:   2017-03-22 15:09:40
 * @Last Modified by:   Gilles Coomans
 * @Last Modified time: 2017-03-22 16:31:12
 */
import foundation from './lexicon';
import './buttons';

foundation
	.addCompounds((h) => {
		return {
			/********************************
			 ****************** FORM ********
			 ********************************/

			radioSwitch(groupName, text) {
				return this.div(
					h.class('switch')
					.input('radio', '',
						h.id(name)
						.attr('name', groupName)
					)
					.label(
						h.class('switch-paddle')
						.attr('for', name)
						.span(
							h.class('show-for-sr'),
							text
						)
					)
				);
			},
			fieldSet(legend, content) {
				return this.tag('fieldset', [
					h.class('fieldset')
					.tag('legend', legend),
					content
				]);
			},
			helpText(targetId, text) {
				return this.p(
					h.class('help-text')
					.attr('id', targetId),
					text
				);
			},
			radio(opt) {
				opt.id = opt.id || opt.name + opt.value;
				return this
					.input('radio', opt.value,
						h.attr('name', opt.name)
						.attr('id', opt.id)
						.if(opt.required, h.attr('required', ''))
					)
					.label(
						h.attr('for', opt.id),
						opt.text || opt.value
					);
			},
			// checkbox: function(id, value, text) {
			// 	return this.input('checkbox', value, h.attr('id', id))
			// 		.label(h.attr('for', id), text);
			// },
			inlineLabelInputRow(opt) {
				return this.div(
					h.class('row')
					.div(
						h.class('small-3')
						.class('columns')
						.label(
							h.class('text-right')
							.class('middle')
							.attr('for', opt.id),
							opt.label
						)
					)
					.div(
						h.class('small-9')
						.class('columns')
						.input('text', opt.value,
							h.attr('id', opt.id)
							.if(opt.placeholder, h.attr('placeholder', opt.placeholder))
						)
					)
				);
			},
			inputField(opts) {
				return this.div(
					h.class('input-field')
					.if(opts.icon,
						h.label(
							h.attr('for', opts.id)
							.icon(opts.icon)
						)
					)
					.input(opts.type || 'text', (typeof opts.val !== 'undefined') ? opts.val : '{{ ' + opts.path + ' }}',
						h.attr('id', opts.id)
						.attr('placeholder', opts.placeholder)
						.attr('required', opts.required)
						.if(opts.icon, h.class('labeled'))
					)
					.div(
						h.visible('{{ $error.' + opts.path + ' }}')
						.class('formfield-error')
						.text('{{ $error.' + opts.path + '.detail }}')
					)
				);
			},
			/**
			 * an input-group with coloredLabel-input-button
			 * @param  {Object} opt { label:String|Template, value:*, required:Bool(false by def), placeholder:String, buttonText:String|Template }
			 * @return {Template}     chainable
			 */
			inlineColoredLabelInputButton(opt) {
				return this
					.div(
						h.class('input-group')
						.span(h.class('input-group-label'), opt.label)
						.input(opt.type || 'text', opt.value || '',
							h.class('input-group-field')
							.id(opt.id)
							.if(opt.required, h.prop('required', true))
							.if(opt.placeholder, h.attr('placeholder', opt.placeholder))
						)
						.div(
							// warning : foundation 6.2.4 button height issue that has been corrected in develop branch for the moment
							// see : https://github.com/zurb/foundation-sites/pull/9308/files
							h.class('input-group-button')
							.primaryButton(opt.buttonText || 'Submit')
						)
					);
			},
			inlineColoredLabelInput(opt) {
				return this
					.div(
						h.class('input-group')
						.span(h.class('input-group-label'), opt.label)
						.input(opt.type || 'text', opt.value || '',
							h.class('input-group-field')
							.id(opt.id)
							.if(opt.required, h.prop('required', true))
							.if(opt.placeholder, h.attr('placeholder', opt.placeholder))
						)
					);
			},
			fileUploadButton(id, text, handler) {
				return this
					.label(
						h.class('button')
						.attr('for', id),
						text
					)
					.input('file', '',
						h.class('show-for-sr')
						.attr('name', 'photo')
						.id(id)
						.on('change', handler)
					);
			}
		};
	});

