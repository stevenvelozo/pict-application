const libFableServiceBase = require('fable-serviceproviderbase')

const libPackage = require('../package.json');

const defaultPictSettings = (
	{
		Name: 'DefaultPictApplication',

		// The main "viewport" is the view that is used to host our application
		MainViewportViewIdentifier: 'Default-View',
		MainViewportRenderableHash: false,
		MainViewportDestinationAddress: false,
		MainViewportDefaultDataAddress: false,

		// Whether or not we should automatically render the main viewport and other autorender views after we initialize the pict application
		AutoSolveAfterInitialize: true,
		AutoRenderMainViewportViewAfterInitialize: true,
		AutoRenderViewsAfterInitialize: false,
		AutoLoginAfterInitialize: false,
		AutoLoadDataAfterLogin: false,

		ConfigurationOnlyViews: [],

		Manifests: {},
		// The prefix to prepend on all template destination hashes
		IdentifierAddressPrefix: 'PICT-'
	});

/**
 * Base class for pict applications.
 */
class PictApplication extends libFableServiceBase
{
	/**
	 * @param {import('fable')} pFable
	 * @param {Record<string, any>} [pOptions]
	 * @param {string} [pServiceHash]
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpCarryOverConfiguration = (typeof(pFable.settings.PictApplicationConfiguration) === 'object') ? pFable.settings.PictApplicationConfiguration : {};
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictSettings)), tmpCarryOverConfiguration, pOptions);
		super(pFable, tmpOptions, pServiceHash);

		/** @type {any} */
		this.options;
		/** @type {any} */
		this.log;
		/** @type {import('pict') & import('fable')} */
		this.fable;
		/** @type {string} */
		this.UUID;
		/** @type {string} */
		this.Hash;
		/**
		 * @type {{ [key: string]: any }}
		 */
		this.servicesMap;

		this.serviceType = 'PictApplication';
		/** @type {Record<string, any>} */
		this._Package = libPackage;

		// Convenience and consistency naming
		this.pict = this.fable;
		// Wire in the essential Pict state
		/** @type {Record<string, any>} */
		this.AppData = this.fable.AppData;
		/** @type {Record<string, any>} */
		this.Bundle = this.fable.Bundle;

		/** @type {number} */
		this.initializeTimestamp;
		/** @type {number} */
		this.lastSolvedTimestamp;
		/** @type {number} */
		this.lastLoginTimestamp;
		/** @type {number} */
		this.lastMarshalFromViewsTimestamp;
		/** @type {number} */
		this.lastMarshalToViewsTimestamp;
		/** @type {number} */
		this.lastAutoRenderTimestamp;
		/** @type {number} */
		this.lastLoadDataTimestamp;

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
	/**
	 * @return {boolean}
	 */
	onPreSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onPreSolve:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onPreSolveAsync(fCallback)
	{
		this.onPreSolve();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	onBeforeSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeSolve:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeSolveAsync(fCallback)
	{
		this.onBeforeSolve();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	onSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onSolve:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onSolveAsync(fCallback)
	{
		this.onSolve();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	solve()
	{
		if (this.pict.LogNoisiness > 2)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} executing solve() function...`)
		}

		// Walk through any loaded providers and solve them as well.
		let tmpLoadedProviders = Object.keys(this.pict.providers);
		let tmpProvidersToSolve = [];
		for (let i = 0; i < tmpLoadedProviders.length; i++)
		{
			let tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
			if (tmpProvider.options.AutoSolveWithApp)
			{
				tmpProvidersToSolve.push(tmpProvider);
			}
		}
		// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
		tmpProvidersToSolve.sort((a, b) => { return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal; });
		for (let i = 0; i < tmpProvidersToSolve.length; i++)
		{
			tmpProvidersToSolve[i].solve(tmpProvidersToSolve[i]);
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
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	solveAsync(fCallback)
	{
		let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));


		// Allow the callback to be passed in as the last parameter no matter what
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : false;

		if (!tmpCallback)
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync Auto Callback Error: ${pError}`, pError)
					}
				};
		}
		// Walk through any loaded providers and solve them as well.
		let tmpLoadedProviders = Object.keys(this.pict.providers);
		let tmpProvidersToSolve = [];
		for (let i = 0; i < tmpLoadedProviders.length; i++)
		{
			let tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
			if (tmpProvider.options.AutoSolveWithApp)
			{
				tmpProvidersToSolve.push(tmpProvider);
			}
		}
		// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
		tmpProvidersToSolve.sort((a, b) => { return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal; });
		for (let i = 0; i < tmpProvidersToSolve.length; i++)
		{
			tmpAnticipate.anticipate(tmpProvidersToSolve[i].solveAsync.bind(tmpProvidersToSolve[i]));
		}

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
				return tmpCallback(pError);
			});
	}

	/**
	 * @return {boolean}
	 */
	onAfterSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterSolve:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterSolveAsync(fCallback)
	{
		this.onAfterSolve();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Application Login                        */
	/* -------------------------------------------------------------------------- */

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeLoginAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeLoginAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onLoginAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onLoginAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	loginAsync(fCallback)
	{
		const tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		let tmpCallback = fCallback;

		if (typeof(tmpCallback) !== 'function')
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loginAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loginAsync Auto Callback Error: ${pError}`, pError);
					}
				};
		}

		tmpAnticipate.anticipate(this.onBeforeLoginAsync.bind(this));
		tmpAnticipate.anticipate(this.onLoginAsync.bind(this));
		tmpAnticipate.anticipate(this.onAfterLoginAsync.bind(this));

		// check and see if we should automatically trigger a data load
		if (this.options.AutoLoadDataAfterLogin)
		{
			tmpAnticipate.anticipate((fNext) =>
			{
				if (!this.isLoggedIn())
				{
					return fNext();
				}
				if (this.pict.LogNoisiness > 1)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto loading data after login...`);
				}
				//TODO: should data load errors funnel here? this creates a weird coupling between login and data load callbacks
				this.loadDataAsync((pError) =>
				{
					fNext(pError);
				});
			});
		}

		tmpAnticipate.wait(
			(pError) =>
			{
				if (this.pict.LogNoisiness > 2)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loginAsync() complete.`);
				}
				this.lastLoginTimestamp = this.fable.log.getTimeStamp();
				return tmpCallback(pError);
			});
	}

	/**
	 * Check if the application state is logged in. Defaults to true. Override this method in your application based on login requirements.
	 *
	 * @return {boolean}
	 */
	isLoggedIn()
	{
		return true;
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterLoginAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterLoginAsync:`);
		}
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Application LoadData                     */
	/* -------------------------------------------------------------------------- */

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeLoadDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeLoadDataAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onLoadDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onLoadDataAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	loadDataAsync(fCallback)
	{
		const tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		let tmpCallback = fCallback;

		if (typeof(tmpCallback) !== 'function')
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loadDataAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loadDataAsync Auto Callback Error: ${pError}`, pError);
					}
				};
		}

		tmpAnticipate.anticipate(this.onBeforeLoadDataAsync.bind(this));

		// Walk through any loaded providers and load their data as well.
		let tmpLoadedProviders = Object.keys(this.pict.providers);
		let tmpProvidersToLoadData = [];
		for (let i = 0; i < tmpLoadedProviders.length; i++)
		{
			let tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
			if (tmpProvider.options.AutoLoadDataWithApp)
			{
				tmpProvidersToLoadData.push(tmpProvider);
			}
		}
		// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
		tmpProvidersToLoadData.sort((a, b) => { return a.options.AutoLoadDataOrdinal - b.options.AutoLoadDataOrdinal; });

		for (const tmpProvider of tmpProvidersToLoadData)
		{
			tmpAnticipate.anticipate(tmpProvider.onBeforeLoadDataAsync.bind(tmpProvider));
		}

		tmpAnticipate.anticipate(this.onLoadDataAsync.bind(this));

		//TODO: think about ways to parallelize these
		for (const tmpProvider of tmpProvidersToLoadData)
		{
			tmpAnticipate.anticipate(tmpProvider.onLoadDataAsync.bind(tmpProvider));
		}

		tmpAnticipate.anticipate(this.onAfterLoadDataAsync.bind(this));

		for (const tmpProvider of tmpProvidersToLoadData)
		{
			tmpAnticipate.anticipate(tmpProvider.onAfterLoadDataAsync.bind(tmpProvider));
		}

		tmpAnticipate.wait(
			/** @param {Error} [pError] */
			(pError) =>
			{
				if (this.pict.LogNoisiness > 2)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loadDataAsync() complete.`);
				}
				this.lastLoadDataTimestamp = this.fable.log.getTimeStamp();
				return tmpCallback(pError);
			});
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterLoadDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterLoadDataAsync:`);
		}
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Application SaveData                     */
	/* -------------------------------------------------------------------------- */

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeSaveDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeSaveDataAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onSaveDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onSaveDataAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	saveDataAsync(fCallback)
	{
		const tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		let tmpCallback = fCallback;

		if (typeof(tmpCallback) !== 'function')
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} saveDataAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} saveDataAsync Auto Callback Error: ${pError}`, pError);
					}
				};
		}

		tmpAnticipate.anticipate(this.onBeforeSaveDataAsync.bind(this));

		// Walk through any loaded providers and load their data as well.
		let tmpLoadedProviders = Object.keys(this.pict.providers);
		let tmpProvidersToSaveData = [];
		for (let i = 0; i < tmpLoadedProviders.length; i++)
		{
			let tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
			if (tmpProvider.options.AutoSaveDataWithApp)
			{
				tmpProvidersToSaveData.push(tmpProvider);
			}
		}
		// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
		tmpProvidersToSaveData.sort((a, b) => { return a.options.AutoSaveDataOrdinal - b.options.AutoSaveDataOrdinal; });

		for (const tmpProvider of tmpProvidersToSaveData)
		{
			tmpAnticipate.anticipate(tmpProvider.onBeforeSaveDataAsync.bind(tmpProvider));
		}

		tmpAnticipate.anticipate(this.onSaveDataAsync.bind(this));

		//TODO: think about ways to parallelize these
		for (const tmpProvider of tmpProvidersToSaveData)
		{
			tmpAnticipate.anticipate(tmpProvider.onSaveDataAsync.bind(tmpProvider));
		}

		tmpAnticipate.anticipate(this.onAfterSaveDataAsync.bind(this));

		for (const tmpProvider of tmpProvidersToSaveData)
		{
			tmpAnticipate.anticipate(tmpProvider.onAfterSaveDataAsync.bind(tmpProvider));
		}

		tmpAnticipate.wait(
			/** @param {Error} [pError] */
			(pError) =>
			{
				if (this.pict.LogNoisiness > 2)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} saveDataAsync() complete.`);
				}
				this.lastSaveDataTimestamp = this.fable.log.getTimeStamp();
				return tmpCallback(pError);
			});
	}

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterSaveDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterSaveDataAsync:`);
		}
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Initialize Application                   */
	/* -------------------------------------------------------------------------- */
	/**
	 * @return {boolean}
	 */
	onBeforeInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeInitialize:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeInitializeAsync(fCallback)
	{
		this.onBeforeInitialize();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	onInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onInitialize:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onInitializeAsync(fCallback)
	{
		this.onInitialize();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	initialize()
	{
		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} initialize:`);
		}

		if (!this.initializeTimestamp)
		{
			this.onBeforeInitialize();

			if ('ConfigurationOnlyViews' in this.options)
			{
				// Load all the configuration only views
				for (let i = 0; i < this.options.ConfigurationOnlyViews.length; i++)
				{
					let tmpViewIdentifier = (typeof(this.options.ConfigurationOnlyViews[i].ViewIdentifier) === 'undefined') ? `AutoView-${this.fable.getUUID()}`
											: this.options.ConfigurationOnlyViews[i].ViewIdentifier;
					this.log.info(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} adding configuration only view: ${tmpViewIdentifier}`);
					this.pict.addView(tmpViewIdentifier, this.options.ConfigurationOnlyViews[i]);
				}
			}

			this.onInitialize();

			// Walk through any loaded providers and initialize them as well.
			let tmpLoadedProviders = Object.keys(this.pict.providers);
			let tmpProvidersToInitialize = [];
			for (let i = 0; i < tmpLoadedProviders.length; i++)
			{
				let tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
				if (tmpProvider.options.AutoInitialize)
				{
					tmpProvidersToInitialize.push(tmpProvider);
				}
			}
			// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
			tmpProvidersToInitialize.sort((a, b) => { return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal; });
			for (let i = 0; i < tmpProvidersToInitialize.length; i++)
			{
				tmpProvidersToInitialize[i].initialize();
			}

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
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	initializeAsync(fCallback)
	{
		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync:`);
		}

		// Allow the callback to be passed in as the last parameter no matter what
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : false;

		if (!tmpCallback)
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync Auto Callback Error: ${pError}`, pError)
					}
				};
		}

		if (!this.initializeTimestamp)
		{
			let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

			if (this.pict.LogNoisiness > 3)
			{
				this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} beginning initialization...`);
			}

			if ('ConfigurationOnlyViews' in this.options)
			{
				// Load all the configuration only views
				for (let i = 0; i < this.options.ConfigurationOnlyViews.length; i++)
				{
					let tmpViewIdentifier = (typeof(this.options.ConfigurationOnlyViews[i].ViewIdentifier) === 'undefined') ? `AutoView-${this.fable.getUUID()}`
											: this.options.ConfigurationOnlyViews[i].ViewIdentifier;
					this.log.info(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} adding configuration only view: ${tmpViewIdentifier}`);
					this.pict.addView(tmpViewIdentifier, this.options.ConfigurationOnlyViews[i]);
				}
			}

			tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
			tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));

			// Walk through any loaded providers and solve them as well.
			let tmpLoadedProviders = Object.keys(this.pict.providers);
			let tmpProvidersToInitialize = [];
			for (let i = 0; i < tmpLoadedProviders.length; i++)
			{
				let tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
				if (tmpProvider.options.AutoInitialize)
				{
					tmpProvidersToInitialize.push(tmpProvider);
				}
			}
			// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
			tmpProvidersToInitialize.sort((a, b) => { return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal; });
			for (let i = 0; i < tmpProvidersToInitialize.length; i++)
			{
				tmpAnticipate.anticipate(tmpProvidersToInitialize[i].initializeAsync.bind(tmpProvidersToInitialize[i]));
			}

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

			if (this.options.AutoLoginAfterInitialize)
			{
				if (this.pict.LogNoisiness > 1)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto login (asynchronously) after initialization...`);
				}
				tmpAnticipate.anticipate(this.loginAsync.bind(this));
			}

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
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync Error: ${pError.message || pError}`, { stack: pError.stack });
					}
					this.initializeTimestamp = this.fable.log.getTimeStamp();
					if (this.pict.LogNoisiness > 2)
					{
						this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initialization complete.`);
					}
					return tmpCallback();
				});
		}
		else
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} async initialize called but initialization is already completed.  Aborting.`);
			// TODO: Should this be an error?
			return tmpCallback();
		}
	}

	/**
	 * @return {boolean}
	 */
	onAfterInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterInitialize:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterInitializeAsync(fCallback)
	{
		this.onAfterInitialize();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Marshal Data From All Views              */
	/* -------------------------------------------------------------------------- */
	/**
	 * @return {boolean}
	 */
	onBeforeMarshalFromViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeMarshalFromViews:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeMarshalFromViewsAsync(fCallback)
	{
		this.onBeforeMarshalFromViews();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	onMarshalFromViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onMarshalFromViews:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onMarshalFromViewsAsync(fCallback)
	{
		this.onMarshalFromViews();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
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

	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	marshalFromViewsAsync(fCallback)
	{
		let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		// Allow the callback to be passed in as the last parameter no matter what
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : false;

		if (!tmpCallback)
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewsAsync Auto Callback Error: ${pError}`, pError)
					}
				};
		}

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
				return tmpCallback(pError);
			});
	}

	/**
	 * @return {boolean}
	 */
	onAfterMarshalFromViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterMarshalFromViews:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterMarshalFromViewsAsync(fCallback)
	{
		this.onAfterMarshalFromViews();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Marshal Data To All Views                */
	/* -------------------------------------------------------------------------- */
	/**
	 * @return {boolean}
	 */
	onBeforeMarshalToViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeMarshalToViews:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeMarshalToViewsAsync(fCallback)
	{
		this.onBeforeMarshalToViews();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	onMarshalToViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onMarshalToViews:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onMarshalToViewsAsync(fCallback)
	{
		this.onMarshalToViews();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
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
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	marshalToViewsAsync(fCallback)
	{
		let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		// Allow the callback to be passed in as the last parameter no matter what
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : false;

		if (!tmpCallback)
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewsAsync Auto Callback Error: ${pError}`, pError)
					}
				};
		}

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
				return tmpCallback(pError);
			});
	}

	/**
	 * @return {boolean}
	 */
	onAfterMarshalToViews()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterMarshalToViews:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterMarshalToViewsAsync(fCallback)
	{
		this.onAfterMarshalToViews();
		return fCallback();
	}

	/* -------------------------------------------------------------------------- */
	/*                     Code Section: Render View                              */
	/* -------------------------------------------------------------------------- */
	/**
	 * @return {boolean}
	 */
	onBeforeRender()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeRender:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onBeforeRenderAsync(fCallback)
	{
		this.onBeforeRender();
		return fCallback();
	}

	/**
	 * @param {string} [pViewIdentifier] - The hash of the view to render. By default, the main viewport view is rendered.
	 * @param {string} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string} [pTemplateDataAddress] - The address where the data for the template is stored.
	 *
	 * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
	 */
	render(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress)
	{
		let tmpViewIdentifier = (typeof(pViewIdentifier) !== 'string') ? this.options.MainViewportViewIdentifier : pViewIdentifier;
		let tmpRenderableHash = (typeof(pRenderableHash) !== 'string') ? this.options.MainViewportRenderableHash : pRenderableHash;
		let tmpRenderDestinationAddress = (typeof(pRenderDestinationAddress) !== 'string') ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
		let tmpTemplateDataAddress = (typeof(pTemplateDataAddress) !== 'string') ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;

		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} VIEW Renderable[${tmpRenderableHash}] Destination[${tmpRenderDestinationAddress}] TemplateDataAddress[${tmpTemplateDataAddress}] render:`);
		}

		this.onBeforeRender();

		// Now get the view (by hash) from the loaded views
		let tmpView = (typeof (tmpViewIdentifier) === 'string') ? this.servicesMap.PictView[tmpViewIdentifier] : false;
		if (!tmpView)
		{
			this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not render from View ${tmpViewIdentifier} because it is not a valid view.`);
			return false;
		}

		this.onRender();

		tmpView.render(tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress);

		this.onAfterRender();

		return true;
	}
	/**
	 * @return {boolean}
	 */
	onRender()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onRender:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onRenderAsync(fCallback)
	{
		this.onRender();
		return fCallback();
	}

	/**
	 * @param {string|((error?: Error) => void)} pViewIdentifier - The hash of the view to render. By default, the main viewport view is rendered. (or the callback)
	 * @param {string|((error?: Error) => void)} [pRenderableHash] - The hash of the renderable to render. (or the callback)
	 * @param {string|((error?: Error) => void)} [pRenderDestinationAddress] - The address where the renderable will be rendered. (or the callback)
	 * @param {string|((error?: Error) => void)} [pTemplateDataAddress] - The address where the data for the template is stored. (or the callback)
	 * @param {(error?: Error) => void} [fCallback] - The callback, if all other parameters are provided.
	 *
	 * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
	 */
	renderAsync(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress, fCallback)
	{
		let tmpViewIdentifier = (typeof(pViewIdentifier) !== 'string') ? this.options.MainViewportViewIdentifier : pViewIdentifier;
		let tmpRenderableHash = (typeof(pRenderableHash) !== 'string') ? this.options.MainViewportRenderableHash : pRenderableHash;
		let tmpRenderDestinationAddress = (typeof(pRenderDestinationAddress) !== 'string') ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
		let tmpTemplateDataAddress = (typeof(pTemplateDataAddress) !== 'string') ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;

		// Allow the callback to be passed in as the last parameter no matter what
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback :
							(typeof(pTemplateDataAddress) === 'function') ? pTemplateDataAddress :
							(typeof(pRenderDestinationAddress) === 'function') ? pRenderDestinationAddress :
							(typeof(pRenderableHash) === 'function') ? pRenderableHash :
							(typeof(pViewIdentifier) === 'function') ? pViewIdentifier :
							false;

		if (!tmpCallback)
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAsync Auto Callback Error: ${pError}`, pError)
					}
				};
		}

		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} VIEW Renderable[${tmpRenderableHash}] Destination[${tmpRenderDestinationAddress}] TemplateDataAddress[${tmpTemplateDataAddress}] renderAsync:`);
		}

		let tmpRenderAnticipate = this.fable.newAnticipate();

		tmpRenderAnticipate.anticipate(this.onBeforeRenderAsync.bind(this));

		let tmpView = (typeof (tmpViewIdentifier) === 'string') ? this.servicesMap.PictView[tmpViewIdentifier] : false;
		if (!tmpView)
		{
			let tmpErrorMessage = `PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not asynchronously render from View ${tmpViewIdentifier} because it is not a valid view.`;
			if (this.pict.LogNoisiness > 3)
			{
				this.log.error(tmpErrorMessage);
			}
			return tmpCallback(new Error(tmpErrorMessage));
		}

		tmpRenderAnticipate.anticipate(this.onRenderAsync.bind(this));

		tmpRenderAnticipate.anticipate(
			(fNext) =>
			{
				tmpView.renderAsync.call(tmpView, tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress, fNext);
			});

		tmpRenderAnticipate.anticipate(this.onAfterRenderAsync.bind(this));

		return tmpRenderAnticipate.wait(tmpCallback);
	}

	/**
	 * @return {boolean}
	 */
	onAfterRender()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterRender:`);
		}
		return true;
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	onAfterRenderAsync(fCallback)
	{
		this.onAfterRender();
		return fCallback();
	}

	/**
	 * @return {boolean}
	 */
	renderMainViewport()
	{
		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderMainViewport:`);
		}

		return this.render();
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	renderMainViewportAsync(fCallback)
	{
		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderMainViewportAsync:`);
		}

		return this.renderAsync(fCallback);
	}
	/**
	 * @return {void}
	 */
	renderAutoViews()
	{
		if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} beginning renderAutoViews...`);
		}
		// Now walk through any loaded views and sort them by the AutoRender ordinal
		let tmpLoadedViews = Object.keys(this.pict.views);
		// Sort the views by their priority
		// If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
		tmpLoadedViews.sort((a, b) =>
		{
			return this.pict.views[a].options.AutoRenderOrdinal - this.pict.views[b].options.AutoRenderOrdinal;
		});
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			if (tmpView.options.AutoRender)
			{
				tmpView.render();
			}
		}
		if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync complete.`);
		}
	}
	/**
	 * @param {(error?: Error) => void} fCallback
	 */
	renderAutoViewsAsync(fCallback)
	{
		let tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

		// Allow the callback to be passed in as the last parameter no matter what
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback :
							false;

		if (!tmpCallback)
		{
			this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);
			tmpCallback = (pError) =>
				{
					if (pError)
					{
						this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync Auto Callback Error: ${pError}`, pError)
					}
				};
		}

		if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} beginning renderAutoViewsAsync...`);
		}

		// Now walk through any loaded views and sort them by the AutoRender ordinal
		// TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
		let tmpLoadedViews = Object.keys(this.pict.views);
		// Sort the views by their priority
		// If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
		tmpLoadedViews.sort((a, b) =>
		{
			return this.pict.views[a].options.AutoRenderOrdinal - this.pict.views[b].options.AutoRenderOrdinal;
		});
		for (let i = 0; i < tmpLoadedViews.length; i++)
		{
			let tmpView = this.pict.views[tmpLoadedViews[i]];
			if (tmpView.options.AutoRender)
			{
				tmpAnticipate.anticipate(tmpView.renderAsync.bind(tmpView));
			}
		}

		tmpAnticipate.wait(
			(pError) =>
			{
				this.lastAutoRenderTimestamp = this.fable.log.getTimeStamp();
				if (this.pict.LogNoisiness > 0)
				{
					this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync complete.`);
				}
				return tmpCallback(pError);
			});
	}

	/**
	 * @return {boolean}
	 */
	get isPictApplication()
	{
		return true;
	}
}

module.exports = PictApplication;
