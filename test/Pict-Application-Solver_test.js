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

const libSimpleAsyncView = require('./views/PictView-SimpleAsync.js');

class SimpleSolverView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onBeforeSolve()
	{
		super.onBeforeSolve();
		if (!this.pict.AppData.hasOwnProperty('ViewCount'))
		{
			this.pict.AppData.ViewCount = 0;
		}
	}

	onSolve()
	{
		super.onSolve();
		this.pict.AppData.ViewCount++;
	}

	onAfterSolve()
	{
		this.pict.log.info(`ViewCount: ${this.pict.AppData.ViewCount}`);
	}
}

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
								let _PictApplication = _Pict.addApplication({}, 'Pict-PictApplication',  libPictApplication);
								_Pict.addView({}, 'Pict-Solver-View', SimpleSolverView);
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