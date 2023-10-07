const libFableServiceBase = require('fable-serviceproviderbase')

const defaultPictSettings = (
	{
		Name: 'DefaultPictApplication',

		// The main "viewport" is the view that is used to host our application
		MainViewportViewIdentifier: 'Default-View',
		MainViewportRenderableHash: false,
		MainViewportDestinationAddress: false,
		MainViewportDefaultDataAddress: false,

		// Whether or not we should automatically render the main viewport after we initialize the pict application
		AutoSolveAfterInitialize: true,
		AutoRenderMainViewportViewAfterInitialize: true,

		Manifests: {},
		// The prefix to prepend on all template destination hashes
		IdentifierAddressPrefix: 'PICT-'
	});

class PictApplication extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictSettings)), pOptions);
		super(pFable, tmpOptions, pServiceHash);
		this.serviceType = 'PictApplication';

		// Convenience and consistency naming
		this.pict = this.fable;
		// Wire in the essential Pict state
		this.AppData = this.fable.AppData;

		this.initializeTimestamp = false;
		this.lastSolvedTimestamp = false;
		this.lastMarshalFromViewsTimestamp = false;
		this.lastMarshalToViewsTimestamp = false;

		// Load all the manifests for the application
		let tmpManifestKeys = Object.keys(this.options.Manifests);
		if (tmpManifestKeys.length > 0)
		{
			for (let i = 0; i < tmpManifestKeys.length; i++)
			{
				// Load each manifest
				let tmpManifestKey = tmpManifestKeys[i];
				this.fable.instantiateServiceProvider('Manifest', this.options.Manifests[tmpManifestKey], tmpManifestKey);
			}
		}
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Solve All Views                          */
	/* -------------------------------------------------------------------------- */
	onBeforeSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeSolve:`);
		}
		return true;
	}
	onBeforeSolveAsync(fCallback)
	{
		this.onBeforeSolve();
		return fCallback();
	}

	onSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onSolve:`);
		}
		return true;
	}
	onSolveAsync(fCallback)
	{
		this.onSolve();
		return fCallback();
	}

	solve()
	{
		if (this.pict.LogNoisiness > 2)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} executing solve() function...`)
		}
		this.onBeforeSolve();
		// Now walk through any loaded views and initialize them as well.
		let tmpLoadedViews = Object.keys(this.pict.views);
		let tmpViewsToSolve = [];
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			if (tmpView.options.AutoInitialize)
			{
				tmpViewsToSolve.push(tmpView);
			}
		}
		// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
		tmpViewsToSolve.sort((a, b) => { return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal; });
		for (let i = 0; i < tmpViewsToSolve.length; i++)
		{
			tmpViewsToSolve[i].solve();
		}
		this.onSolve();
		this.onAfterSolve();
		this.lastSolvedTimestamp = this.fable.log.getTimeStamp();
		return true;
	}
	solveAsync(fCallback)
	{
		let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));
		// Walk through any loaded views and solve them as well.
		let tmpLoadedViews = Object.keys(this.pict.views);
		let tmpViewsToSolve = [];
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			if (tmpView.options.AutoSolveWithApp)
			{
				tmpViewsToSolve.push(tmpView);
			}
		}
		// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
		tmpViewsToSolve.sort((a, b) => { return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal; });
		for (let i = 0; i < tmpViewsToSolve.length; i++)
		{
			tmpAnticipate.anticipate(tmpViewsToSolve[i].solveAsync.bind(tmpViewsToSolve[i]));
		}
		tmpAnticipate.anticipate(this.onSolveAsync.bind(this));
		tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));

		tmpAnticipate.wait(
			(pError) =>
			{
				if (this.pict.LogNoisiness > 2)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync() complete.`);
				}
				this.lastSolvedTimestamp = this.fable.log.getTimeStamp();
				return fCallback(pError);
			});
	}

	onAfterSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterSolve:`);
		}
		return true;
	}
	onAfterSolveAsync(fCallback)
	{
		this.onAfterSolve();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Initialize Application                   */
	/* -------------------------------------------------------------------------- */
	onBeforeInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeInitialize:`);
		}
		return true;
	}
	onBeforeInitializeAsync(fCallback)
	{
		this.onBeforeInitialize();
		return fCallback();
	}

	onInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onInitialize:`);
		}
		return true;
	}
	onInitializeAsync(fCallback)
	{
		this.onInitialize();
		return fCallback();
	}

	initialize()
	{
		if (!this.initializeTimestamp)
		{
			this.onBeforeInitialize();
			this.onInitialize();
			// Now walk through any loaded views and initialize them as well.
			let tmpLoadedViews = Object.keys(this.pict.views);
			let tmpViewsToInitialize = [];
			for (let i = 0; i < tmpLoadedViews.length; i++)
			{
				let tmpView = this.pict.views[tmpLoadedViews[i]];
				if (tmpView.options.AutoInitialize)
				{
					tmpViewsToInitialize.push(tmpView);
				}
			}
			// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
			tmpViewsToInitialize.sort((a, b) => { return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal; });
			for (let i = 0; i < tmpViewsToInitialize.length; i++)
			{
				tmpViewsToInitialize[i].initialize();
			}
			this.onAfterInitialize();
			if (this.options.AutoSolveAfterInitialize)
			{
				if (this.pict.LogNoisiness > 1)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto solving after initialization...`);
				}
				// Solve the template synchronously
				this.solve();
			}
			// Now check and see if we should automatically render as well
			if (this.options.AutoRenderMainViewportViewAfterInitialize)
			{
				if (this.pict.LogNoisiness > 1)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto rendering after initialization...`);
				}
				// Render the template synchronously
				this.render();
			}
			this.initializeTimestamp = this.fable.log.getTimeStamp();
			return true;
		}
		else
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initialize called but initialization is already completed.  Aborting.`);
			return false;
		}
	}
	initializeAsync(fCallBack)
	{
		if (!this.initializeTimestamp)
		{
			let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

			if (this.pict.LogNoisiness > 3)
			{
				this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} beginning initialization...`);
			}

			tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
			tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
			// Now walk through any loaded views and initialize them as well.
			// TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
			let tmpLoadedViews = Object.keys(this.pict.views);
			let tmpViewsToInitialize = [];
			for (let i = 0; i < tmpLoadedViews.length; i++)
			{
				let tmpView = this.pict.views[tmpLoadedViews[i]];
				if (tmpView.options.AutoInitialize)
				{
					tmpViewsToInitialize.push(tmpView);
				}
			}
			// Sort the views by their priority
			// If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
			tmpViewsToInitialize.sort((a, b) => { return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal; });
			for (let i = 0; i < tmpViewsToInitialize.length; i++)
			{
				let tmpView = tmpViewsToInitialize[i];
				tmpAnticipate.anticipate(tmpView.initializeAsync.bind(tmpView));
			}
			tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));

			if (this.options.AutoSolveAfterInitialize)
			{
				if (this.pict.LogNoisiness > 1)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto solving (asynchronously) after initialization...`);
				}
				tmpAnticipate.anticipate(this.solveAsync.bind(this));
			}

			if (this.options.AutoRenderMainViewportViewAfterInitialize)
			{
				if (this.pict.LogNoisiness > 1)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto rendering (asynchronously) after initialization...`);
				}
				tmpAnticipate.anticipate(this.renderMainViewportAsync.bind(this));
			}

			tmpAnticipate.wait(
				(pError) =>
				{
					this.initializeTimestamp = this.fable.log.getTimeStamp();
					if (this.pict.LogNoisiness > 2)
					{
						this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initialization complete.`);
					}
					return fCallBack();
				});
		}
		else
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} async initialize called but initialization is already completed.  Aborting.`);
			// TODO: Should this be an error?
			return fCallback();
		}
	}

	onAfterInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterInitialize:`);
		}
		return true;
	}
	onAfterInitializeAsync(fCallback)
	{
		this.onAfterInitialize();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Marshal Data From All Views              */
	/* -------------------------------------------------------------------------- */
	onBeforeMarshalFromViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeMarshalFromViews:`);
		}
		return true;
	}
	onBeforeMarshalFromViewsAsync(fCallback)
	{
		this.onBeforeMarshalFromViews();
		return fCallback();
	}

	onMarshalFromViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onMarshalFromViews:`);
		}
		return true;
	}
	onMarshalFromViewsAsync(fCallback)
	{
		this.onMarshalFromViews();
		return fCallback();
	}

	marshalFromViews()
	{
		if (this.pict.LogNoisiness > 2)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} executing marshalFromViews() function...`)
		}
		this.onBeforeMarshalFromViews();
		// Now walk through any loaded views and initialize them as well.
		let tmpLoadedViews = Object.keys(this.pict.views);
		let tmpViewsToMarshalFromViews = [];
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			tmpViewsToMarshalFromViews.push(tmpView);
		}
		for (let i = 0; i < tmpViewsToMarshalFromViews.length; i++)
		{
			tmpViewsToMarshalFromViews[i].marshalFromView();
		}
		this.onMarshalFromViews();
		this.onAfterMarshalFromViews();
		this.lastMarshalFromViewsTimestamp = this.fable.log.getTimeStamp();
		return true;
	}
	marshalFromViewsAsync(fCallback)
	{
		let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		tmpAnticipate.anticipate(this.onBeforeMarshalFromViewsAsync.bind(this));
		// Walk through any loaded views and marshalFromViews them as well.
		let tmpLoadedViews = Object.keys(this.pict.views);
		let tmpViewsToMarshalFromViews = [];
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			tmpViewsToMarshalFromViews.push(tmpView);
		}
		for (let i = 0; i < tmpViewsToMarshalFromViews.length; i++)
		{
			tmpAnticipate.anticipate(tmpViewsToMarshalFromViews[i].marshalFromViewAsync.bind(tmpViewsToMarshalFromViews[i]));
		}
		tmpAnticipate.anticipate(this.onMarshalFromViewsAsync.bind(this));
		tmpAnticipate.anticipate(this.onAfterMarshalFromViewsAsync.bind(this));

		tmpAnticipate.wait(
			(pError) =>
			{
				if (this.pict.LogNoisiness > 2)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewsAsync() complete.`);
				}
				this.lastMarshalFromViewsTimestamp = this.fable.log.getTimeStamp();
				return fCallback(pError);
			});
	}

	onAfterMarshalFromViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterMarshalFromViews:`);
		}
		return true;
	}
	onAfterMarshalFromViewsAsync(fCallback)
	{
		this.onAfterMarshalFromViews();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Marshal Data To All Views                */
	/* -------------------------------------------------------------------------- */
	onBeforeMarshalToViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeMarshalToViews:`);
		}
		return true;
	}
	onBeforeMarshalToViewsAsync(fCallback)
	{
		this.onBeforeMarshalToViews();
		return fCallback();
	}

	onMarshalToViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onMarshalToViews:`);
		}
		return true;
	}
	onMarshalToViewsAsync(fCallback)
	{
		this.onMarshalToViews();
		return fCallback();
	}

	marshalToViews()
	{
		if (this.pict.LogNoisiness > 2)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} executing marshalToViews() function...`)
		}
		this.onBeforeMarshalToViews();
		// Now walk through any loaded views and initialize them as well.
		let tmpLoadedViews = Object.keys(this.pict.views);
		let tmpViewsToMarshalToViews = [];
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			tmpViewsToMarshalToViews.push(tmpView);
		}
		for (let i = 0; i < tmpViewsToMarshalToViews.length; i++)
		{
			tmpViewsToMarshalToViews[i].marshalToView();
		}
		this.onMarshalToViews();
		this.onAfterMarshalToViews();
		this.lastMarshalToViewsTimestamp = this.fable.log.getTimeStamp();
		return true;
	}
	marshalToViewsAsync(fCallback)
	{
		let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		tmpAnticipate.anticipate(this.onBeforeMarshalToViewsAsync.bind(this));
		// Walk through any loaded views and marshalToViews them as well.
		let tmpLoadedViews = Object.keys(this.pict.views);
		let tmpViewsToMarshalToViews = [];
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			tmpViewsToMarshalToViews.push(tmpView);
		}
		for (let i = 0; i < tmpViewsToMarshalToViews.length; i++)
		{
			tmpAnticipate.anticipate(tmpViewsToMarshalToViews[i].marshalToViewAsync.bind(tmpViewsToMarshalToViews[i]));
		}
		tmpAnticipate.anticipate(this.onMarshalToViewsAsync.bind(this));
		tmpAnticipate.anticipate(this.onAfterMarshalToViewsAsync.bind(this));

		tmpAnticipate.wait(
			(pError) =>
			{
				if (this.pict.LogNoisiness > 2)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewsAsync() complete.`);
				}
				this.lastMarshalToViewsTimestamp = this.fable.log.getTimeStamp();
				return fCallback(pError);
			});
	}

	onAfterMarshalToViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterMarshalToViews:`);
		}
		return true;
	}
	onAfterMarshalToViewsAsync(fCallback)
	{
		this.onAfterMarshalToViews();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Render View                              */
	/* -------------------------------------------------------------------------- */
	render(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress)
	{
		let tmpViewIdentifier = (typeof(pViewIdentifier) === 'undefined') ? this.options.MainViewportViewIdentifier : pViewIdentifier;
		let tmpRenderableHash = (typeof(pRenderableHash) === 'undefined') ? this.options.MainViewportRenderableHash : pRenderableHash;
		let tmpRenderDestinationAddress = (typeof(pRenderDestinationAddress) === 'undefined') ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
		let tmpTemplateDataAddress = (typeof(pTemplateDataAddress) === 'undefined') ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;

		// Now get the view (by hash) from the loaded views
		let tmpView = (typeof (tmpViewIdentifier) === 'string') ? this.servicesMap.PictView[tmpViewIdentifier] : false;
		if (!tmpView)
		{
			this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not render from View ${tmpViewIdentifier} because it is not a valid view.`);
			return false;
		}

		return tmpView.render(tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress);
	}
	renderMainViewport()
	{
		return this.render(this.options.MainViewportViewIdentifier, this.options.MainViewportRenderableHash, this.options.MainViewportDestinationAddress, this.options.MainViewportDefaultDataAddress);
	}

	renderAsync(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress, fCallback)
	{
		let tmpViewIdentifier = (typeof(pViewIdentifier) === 'undefined') ? this.options.MainViewportViewIdentifier : pViewIdentifier;
		let tmpRenderableHash = (typeof(pRenderableHash) === 'undefined') ? this.options.MainViewportRenderableHash : pRenderableHash;
		let tmpRenderDestinationAddress = (typeof(pRenderDestinationAddress) === 'undefined') ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
		let tmpTemplateDataAddress = (typeof(pTemplateDataAddress) === 'undefined') ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;

		let tmpView = (typeof (tmpViewIdentifier) === 'string') ? this.servicesMap.PictView[tmpViewIdentifier] : false;
		if (!tmpView)
		{
			let tmpErrorMessage = `PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not asynchronously render from View ${tmpViewIdentifier} because it is not a valid view.`;
			if (this.pict.LogNoisiness > 3)
			{
				this.log.error(tmpErrorMessage);
			}
			return fCallback(new Error(tmpErrorMessage));
		}

		return tmpView.renderAsync(tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress, fCallback);
	}
	renderMainViewportAsync(fCallback)
	{
		return this.renderAsync(this.options.MainViewportViewIdentifier, this.options.MainViewportRenderableHash, this.options.MainViewportDestinationAddress, this.options.MainViewportDefaultDataAddress, fCallback);
	}
}

module.exports = PictApplication;