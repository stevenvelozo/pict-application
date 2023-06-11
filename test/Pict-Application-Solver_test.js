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

const viewWithSolver = require(`../example_applications/simple/PictView-Simple-WithSolver.js`);

suite
(
	'Pict Core: PictApplication Solvers',
	() =>
	{
		setup(() => { });

		suite
			(
				'Basic Solver Tests',
				() =>
				{
					test(
							'Object Initialization',
							(fDone) =>
							{
								let _Pict = new libPict();
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
								// WARNING: Tests need to pass in the prototype for the application so Pict doesn't use the internally packaged one.
								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, libPictApplication);
								_Pict.addView('Pict-Solver-View', {}, viewWithSolver);
								_PictApplication.initialize();

								_PictApplication.solve();
								_PictApplication.solve();
								_PictApplication.solve();

								return fDone();
							}
						);
				}
			);
	}
);