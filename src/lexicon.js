/*
 * @Author: Gilles Coomans
 */

import baseLexicon from 'htsl-lexicon';
import imagesUikit from 'htsl-uikit-lexicon/dist/compounds/images';
import spinnerUikit from 'htsl-uikit-lexicon/dist/compounds/spinner';

const foundation = baseLexicon
	.createDialect('foundation')
	.addCompounds(imagesUikit)
	.addCompounds(spinnerUikit);

foundation.colorLabels = ['primary', 'secondary', 'success', 'alert', 'warning'];

foundation.components = {};

export default foundation;

