const libPictView = require('pict-view');

const defaultViewConfiguration = (
{
	ViewIdentifier: '',

	DefaultRenderable: '',
	DefaultDestinationAddress: '',
	DefaultTemplateRecordAddress: '',

	// If this is set to true, the PictApplication will render this to the default destination when it is fully initialized and loaded
	RenderOnLoad: true,

	Templates: [
		{
			Hash: "-ListWrapper",
			Template: /*html*/``
		},
		{
			Hash: "-Row",
			Template: /*html*/``
		}
	],
	Renderables: [
		{
			RenderableHash: "-List",
			TemplateHash: "",
			TemplateRecordAddress: false,
			DestinationAddress: "#"
		}
	]
});

// This is a configuration-only view; this code is here to aid in tweaking stuff for live testing
class BookstoreBooksView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

module.exports = HistoricalEventsView;

module.exports.default_configuration = defaultViewConfiguration;