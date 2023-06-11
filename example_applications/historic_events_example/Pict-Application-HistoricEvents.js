const libPictApplication = require('../../source/Pict-Application.js');

const viewHistoricalEventsCategories = require('./views/PictView-HistoricalEvents-Categories.js');

const defaultApplicationConfiguration = (
	{
		"Name": "My Cool Historical Events Application",

		// The main "viewport" is the view that is used to host our application
		"MainViewportViewIdentifier": 'HistoricalEvents-Categories'
	});

class HistoricalEventsApp extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		// Add the historical events category view
		this.pict.addView('HistoricalEvents-Categories', {}, viewHistoricalEventsCategories);
	}

	onBeforeInitialize()
	{
		// Load the data.  If this were an async load from a server or such we would have to use onBeforeInitializeAsync instead.
		this.AppData.HistoricalEventSet = require('./data/EnglishHistoricEvents-Data.json');
		// Run the static function to generate the category list set into AppData.
		viewHistoricalEventsCategories.marshal_JSONData_Into_Object(this.AppData.HistoricalEventSet, this.AppData);
	}
};

module.exports = HistoricalEventsApp

module.exports.default_configuration = defaultApplicationConfiguration;