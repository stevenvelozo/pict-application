/*
	Unit tests for Pict View: PictApplication
*/

// This is temporary, but enables unit tests
const libBrowserEnv = require('browser-env')
libBrowserEnv();

const Chai = require('chai');
const Expect = Chai.expect;

const libPict = require('pict');

const libPictApplication = require(`../source/Pict-Application.js`);

const libPictView = require('pict-view');

const libSimpleAsyncView = require('../example_applications/simple/PictView-Simple-AsyncExercises.js');

suite
(
	'Pict Core: PictApplication',
	() =>
	{
		setup(() => { });

		suite
			(
				'Basic Tests',
				() =>
				{
					test(
							'Object Initialization',
							(fDone) =>
							{
								let _Pict = new libPict();
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, libPictApplication);
								Expect(_PictApplication).to.be.an('object');
								_PictApplication.initialize();
								return fDone();
							}
						);
					test(
							'Simple View Initialization',
							(fDone) =>
							{
								let _Pict = new libPict();
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, libPictApplication);

								_Pict.addView({}, 'Pict-View', libPictView);
								_PictApplication.initialize();

								return fDone();
							}
						);
					test(
							'Simple View Initialization with control flow logged out (for wkhtmltopdf etc.)',
							(fDone) =>
							{
								let _Pict = new libPict();
								_Pict.LogControlFlow = true;
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, libPictApplication);

								_Pict.addView({}, 'Pict-View', libPictView);
								_PictApplication.initialize();

								return fDone();
							}
						);
					test(
							'Simple View double Initialization',
							(fDone) =>
							{
								let _Pict = new libPict();
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, libPictApplication);

								_Pict.addView({}, 'Pict-View', libPictView);
								_PictApplication.initialize();
								_PictApplication.initialize();

								return fDone();
							}
						);
					test(
							'Async View Initialization',
							(fDone) =>
							{
								let _Pict = new libPict();
								_Pict.LogNoisiness = 5;
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, libPictApplication);

								_Pict.addView({}, 'Pict-View-Async', libSimpleAsyncView);
								_PictApplication.initializeAsync(
									(pError) =>
									{
										return fDone();
									}
								)
							}
						);
					test(
							'Async View Initialization with Priorities',
							(fDone) =>
							{
								let _Pict = new libPict();
								_Pict.LogNoisiness = 1;
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
								let _PictApplication = _Pict.addApplication('Pict-PictApplication',  {}, libPictApplication);

								for (let i = 0; i < 2; i++)
								{
									_Pict.addView(`Pict-View-Async-0${i}`, {}, libSimpleAsyncView);
								}
								_Pict.addView('Pict-View', {ViewIdentifier:'Deferred-View', AutoInitializeOrdinal: 1}, libPictView);
								for (let i = 0; i < 2; i++)
								{
									_Pict.addView(`Pict-View-Async-1${i}`, {}, libSimpleAsyncView);
								}

								_PictApplication.initializeAsync(
									(pError) =>
									{
										return fDone();
									}
								)
							}
						);
				}
			);
	}
);