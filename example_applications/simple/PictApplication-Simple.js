const libPictApplication = require('../../source/Pict-Application.js');

const defaultApplicationConfiguration = (
	{
		"Name": "Simple Test Application"
	});

class SimpleApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
};

module.exports = SimpleApplication

module.exports.default_configuration = defaultApplicationConfiguration;