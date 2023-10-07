const libPictApplication = require('../../source/Pict-Application.js');

const defaultApplicationConfiguration = (
	{
		"Name": "A Plain Old Bookstore Application",
		"MainViewportViewIdentifier": 'Bookstore-Books'
	});

class BookstoreApp extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		// Add the books view
		this.pict.addView('Bookstore-Books', {}, require('./views/PictView-Bookstore-Books.js'));
	}
};

module.exports = BookstoreApp

module.exports.default_configuration = defaultApplicationConfiguration;