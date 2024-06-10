const libPictApplication = require('../../source/Pict-Application.js');

const libPictSectionForm = require('pict-section-form');

const libProviderDynamicSection = require('./providers/PictProvider-Dynamic-Sections.js');

const libMainApplicationView = require('./views/PictView-Postcard-MainApplication.js')

class PostcardApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.pict.addProvider('Postcard-DynamicSection-Provider', libProviderDynamicSection.default_configuration, libProviderDynamicSection);
		this.pict.addProvider('Postcard-Default-Theme-Provider', {}, require('./providers/PictProvider-BestPostcardTheme.js'));

		// Add the pict form service
		this.pict.addServiceType('PictSectionForm', libPictSectionForm);

		// Add the pict form metacontroller service, which provides programmaatic view construction from manifests and render/marshal methods.
		this.pict.addView('PictFormMetacontroller', {}, libPictSectionForm.PictFormMetacontroller);

		this.pict.addView('PostcardMainApplication', libMainApplicationView.default_configuration, libMainApplicationView);
	}

	changeToDefaultTheme()
	{
		this.pict.views.PictFormMetacontroller.formTemplatePrefix = _Pict.providers.PictFormSectionDefaultTemplateProvider.formsTemplateSetPrefix
		this.pict.views.PictFormMetacontroller.regenerateFormSectionTemplates();
		this.pict.views.PictFormMetacontroller.renderFormSections();
		this.marshalDataFromAppDataToView();
	}

	changeToPostcardTheme()
	{
		this.pict.views.PictFormMetacontroller.formTemplatePrefix = _Pict.providers['Postcard-Default-Theme-Provider'].formsTemplateSetPrefix;
		this.pict.views.PictFormMetacontroller.regenerateFormSectionTemplates();
		this.pict.views.PictFormMetacontroller.renderFormSections();
		this.marshalDataFromAppDataToView();
	}

	onAfterInitializeAsync(fCallback)
	{
		// Default to the Pure theme
		this.pict.views.PictFormMetacontroller.formTemplatePrefix = _Pict.providers['Postcard-Default-Theme-Provider'].formsTemplateSetPrefix;

		// Set a custom address for all the views to marshal to.
		// This can also be set on specific views (same property)
		this.pict.views.PictFormMetacontroller.viewMarshalDestination = 'AppData.PostKard';

		this.pict.views.PostcardNavigation.render()
		this.pict.views.PostcardMainApplication.render();
		this.pict.views.PictFormMetacontroller.render();

		return super.onAfterInitialize(fCallback);
	}

	marshalDataFromViewToAppData()
	{
		this.pict.views.PictFormMetacontroller.marshalFromView();
	}

	marshalDataFromAppDataToView()
	{
		this.pict.views.PictFormMetacontroller.marshalToView();
	}
};

module.exports = PostcardApplication

module.exports.default_configuration = (
{
	"Name": "A Simple Postcard Application",
	"Hash": "Postcard",

	"MainViewportViewIdentifier": "PostcardNavigation",

	"ConfigurationOnlyViews":
	[	require('./views/PictView-Postcard-Navigation.json'),
		require('./views/PictView-Postcard-Content-About.json'),
		require('./views/PictView-Postcard-Content-Legal.json')
	],

	"pict_configuration":
		{
			"Product": "Postkard-Pict-Application"
		}
});