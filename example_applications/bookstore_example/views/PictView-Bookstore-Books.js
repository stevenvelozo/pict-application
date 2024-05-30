const libPictView = require('pict-view');

const defaultViewConfiguration = (
{
	ViewIdentifier: 'Postcard-Navigation-View',

	DefaultRenderable: 'Postcard-Navigation',
	DefaultDestinationAddress: '#Postcard-Navigation-Container',

	// If this is set to true, the PictApplication will render this to the default destination when it is fully initialized and loaded
	RenderOnLoad: true,

	Templates: [
		{
			Hash: "Postcard-Navigation-Content",
			Template: /*html*/`
			<div class="Navigation">
				<a href="#Postcard">New Post Card</a>
				<a href="#About">About Post Card</a>
			</div>`
		}],
	Renderables: [
		{
			RenderableHash: "Postcard-Navigation",
			TemplateHash: "Postcard-Navigation-Content",
			DestinationAddress: "#Postcard-Navigation-Container",
		}
	]
});

module.exports = libPictView;

module.exports.default_configuration = defaultViewConfiguration;