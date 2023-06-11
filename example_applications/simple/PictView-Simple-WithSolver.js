const libPictView = require('pict-view');

class SimpleSolverView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onBeforeSolve()
	{
		super.onBeforeSolve();
		if (!this.pict.AppData.hasOwnProperty('SolveCount'))
		{
			this.pict.AppData.SolveCount = 0;
		}
	}

	onSolve()
	{
		super.onSolve();
		this.pict.AppData.SolveCount++;
	}

	onAfterSolve()
	{
		this.pict.log.info(`SolveCount: ${this.pict.AppData.SolveCount}`);
	}
}

module.exports = SimpleSolverView;