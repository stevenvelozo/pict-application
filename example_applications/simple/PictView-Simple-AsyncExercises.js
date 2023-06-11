/*
 * A simple View to exercise each of the async functions for a view.
 * Meant for test harnesses.
 */

const libPictView = require('pict-view');

class SimpleAsyncView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.preInitState = false;
		this.initState = false;
		this.afterInitState = false;
	}

	onBeforeInitializeAsync(fCallback)
	{
		super.onBeforeInitialize();
		let tmpInitTime = this.fable.DataGeneration.randomIntegerBetween(10,150);
		this.preInitState = `${this.Hash} Beginning PRE initialization routine; waiting ${tmpInitTime}ms.`;
		this.log.info(this.preInitState);
		setTimeout(
			()=>
			{
				if (this.pict.LogNoisiness > 0) this.preInitState = `${this.Hash} Preinitialization complete COMPLETED after waiting ${tmpInitTime}ms.`;
				this.log.info(this.preInitState);
				return fCallback();
			}, tmpInitTime);
	}

	onInitializeAsync(fCallback)
	{
		super.onInitialize();
		let tmpInitTime = this.fable.DataGeneration.randomIntegerBetween(10,200);
		this.initState = `${this.Hash} Beginning initialization routine; waiting ${tmpInitTime}ms.`;
		this.log.info(this.initState);
		setTimeout(
			()=>
			{
				if (this.pict.LogNoisiness > 0) this.initState = `${this.Hash} initialize routine COMPLETED after waiting ${tmpInitTime}ms!`;
				this.log.info(this.initState);
				return fCallback();
			}, tmpInitTime);
	}

	onAfterInitializeAsync(fCallback)
	{
		super.onAfterInitialize();
		let tmpInitTime = this.fable.DataGeneration.randomIntegerBetween(10,80);
		this.afterInitState = `${this.Hash} Beginning AFTER initialization routine; waiting ${tmpInitTime}ms.`;
		this.log.info(this.afterInitState);
		setTimeout(
			()=>
			{
				if (this.pict.LogNoisiness > 0) this.afterInitState = `${this.Hash} Afterinitialize ${this.pict.LogNoisiness} routine COMPLETED after waiting ${tmpInitTime}ms!`;

				this.log.info(this.afterInitState);
				return fCallback();
			}, tmpInitTime);
	}
}

module.exports = SimpleAsyncView;