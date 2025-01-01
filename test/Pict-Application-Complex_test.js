/*
	Unit tests for Pict View: PictApplication
*/

// This is temporary, but enables unit tests
const libBrowserEnv = require('browser-env')
libBrowserEnv();

const Chai = require('chai');
const Expect = Chai.expect;

const libPict = require('pict');

const appHistoricalEvents = require(`../example_applications/historic_events_example/Pict-Application-HistoricEvents.js`);

suite
(
	'Pict Core: PictApplication Complex Historical Events App Tests',
	() =>
	{
		setup(() => { });

		suite
			(
				'Make a HistoricEvents App',
				() =>
				{
					test(
							'Object Initialization with AutoRender',
							(fDone) =>
							{
								let _Pict = new libPict();
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);

								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, appHistoricalEvents);

								_PictApplication.initialize();

								// The default renderer should have assigned our HTML wrapper and rows to this Assignment log entry 
								Expect(_PictEnvironment.eventLog.Assign.length).to.equal(1);
								Expect(_PictEnvironment.eventLog.Assign[0].Content).to.equal(`\n\t<div id=\"HistoricalEventCategoryListWrapper\" class=\"HistoricalEventCategoryList\">\n\t\t<h2>Historical Event Categories</h2>\n\t\t<h3>(there are 66 categories)</h3>\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<th align=\"center\">Category</th>\n\t\t\t\t<th align=\"center\">Count</th>\n\t\t\t\t<th align=\"center\">Earliest</th>\n\t\t\t\t<th align=\"center\">Latest</th>\n\t\t\t</tr>\n\n\t\t\t<tbody id=\"HistoricalEventCategoryListEntries\">\n<tr>\n\t<td>By place</td>\n\t<td>7,173.00</td>\n\t<td>-300</td>\n\t<td>1299/12/01</td>\n</tr>\n<tr>\n\t<td>By topic</td>\n\t<td>1,651.00</td>\n\t<td>-300</td>\n\t<td>1299/12/01</td>\n</tr>\n<tr>\n\t<td></td>\n\t<td>875.00</td>\n\t<td>-233</td>\n\t<td>1975/01/29</td>\n</tr>\n<tr>\n\t<td>Asia</td>\n\t<td>30.00</td>\n\t<td>-40</td>\n\t<td>1270/10/30</td>\n</tr>\n<tr>\n\t<td>By Place</td>\n\t<td>14.00</td>\n\t<td>11</td>\n\t<td>945</td>\n</tr>\n<tr>\n\t<td>By places</td>\n\t<td>7.00</td>\n\t<td>42</td>\n\t<td>42</td>\n</tr>\n<tr>\n\t<td>Roman Empire</td>\n\t<td>6.00</td>\n\t<td>94</td>\n\t<td>342</td>\n</tr>\n<tr>\n\t<td>Ongoing events</td>\n\t<td>5.00</td>\n\t<td>133</td>\n\t<td>1960/12/31</td>\n</tr>\n<tr>\n\t<td>By Topic</td>\n\t<td>2.00</td>\n\t<td>268/12/26</td>\n\t<td>579/11/26</td>\n</tr>\n<tr>\n\t<td>Religion</td>\n\t<td>2.00</td>\n\t<td>324/12/19</td>\n\t<td>324/12/19</td>\n</tr>\n<tr>\n\t<td>Europe</td>\n\t<td>19.00</td>\n\t<td>348</td>\n\t<td>1270/09/01</td>\n</tr>\n<tr>\n\t<td>556</td>\n\t<td>2.00</td>\n\t<td>556</td>\n\t<td>556</td>\n</tr>\n<tr>\n\t<td>Near East</td>\n\t<td>4.00</td>\n\t<td>636/08/15</td>\n\t<td>636/11/16</td>\n</tr>\n<tr>\n\t<td>By region</td>\n\t<td>2.00</td>\n\t<td>706/07/02</td>\n\t<td>706/07/02</td>\n</tr>\n<tr>\n\t<td>Mesoamerica</td>\n\t<td>1.00</td>\n\t<td>724</td>\n\t<td>724</td>\n</tr>\n<tr>\n\t<td>By area</td>\n\t<td>696.00</td>\n\t<td>900</td>\n\t<td>1298/09/09</td>\n</tr>\n<tr>\n\t<td>Literature</td>\n\t<td>2.00</td>\n\t<td>931</td>\n\t<td>931</td>\n</tr>\n<tr>\n\t<td>By  topic</td>\n\t<td>1.00</td>\n\t<td>1066/12/30</td>\n\t<td>1066/12/30</td>\n</tr>\n<tr>\n\t<td>By location</td>\n\t<td>8.00</td>\n\t<td>1101</td>\n\t<td>1101/06/22</td>\n</tr>\n<tr>\n\t<td>Africa</td>\n\t<td>8.00</td>\n\t<td>1117</td>\n\t<td>1270/10/30</td>\n</tr>\n<tr>\n\t<td>Education</td>\n\t<td>1.00</td>\n\t<td>1117/05/03</td>\n\t<td>1117/05/03</td>\n</tr>\n<tr>\n\t<td>Technology</td>\n\t<td>1.00</td>\n\t<td>1117/05/03</td>\n\t<td>1117/05/03</td>\n</tr>\n<tr>\n\t<td>by area</td>\n\t<td>6.00</td>\n\t<td>1169</td>\n\t<td>1169</td>\n</tr>\n<tr>\n\t<td>By topics</td>\n\t<td>7.00</td>\n\t<td>1282/12/11</td>\n\t<td>1282/12/11</td>\n</tr>\n<tr>\n\t<td>January - December</td>\n\t<td>899.00</td>\n\t<td>1300/02/22</td>\n\t<td>1499/11/28</td>\n</tr>\n<tr>\n\t<td>Date unknown</td>\n\t<td>4,170.00</td>\n\t<td>1300/06/15</td>\n\t<td>2012/12/31</td>\n</tr>\n<tr>\n\t<td>December</td>\n\t<td>1,204.00</td>\n\t<td>1317/12/10</td>\n\t<td>2012/12/31</td>\n</tr>\n<tr>\n\t<td>January–December</td>\n\t<td>16.00</td>\n\t<td>1345/01/01</td>\n\t<td>1468/12/03</td>\n</tr>\n<tr>\n\t<td>Undated</td>\n\t<td>38.00</td>\n\t<td>1422/10/21</td>\n\t<td>1940/12/30</td>\n</tr>\n<tr>\n\t<td>Ongoing</td>\n\t<td>8.00</td>\n\t<td>1479/10/13</td>\n\t<td>1867/12/02</td>\n</tr>\n<tr>\n\t<td>January - June</td>\n\t<td>1,842.00</td>\n\t<td>1500/01/05</td>\n\t<td>1818/05/11</td>\n</tr>\n<tr>\n\t<td>July - December</td>\n\t<td>1,788.00</td>\n\t<td>1500/07/14</td>\n\t<td>1818/12/24</td>\n</tr>\n<tr>\n\t<td>In fiction</td>\n\t<td>1.00</td>\n\t<td>1728/10/20</td>\n\t<td>1728/10/20</td>\n</tr>\n<tr>\n\t<td>January - February</td>\n\t<td>19.00</td>\n\t<td>1776/01/15</td>\n\t<td>1909/01/28</td>\n</tr>\n<tr>\n\t<td>March - April</td>\n\t<td>22.00</td>\n\t<td>1776/03/04</td>\n\t<td>1909/04/27</td>\n</tr>\n<tr>\n\t<td>May - June</td>\n\t<td>20.00</td>\n\t<td>1776/05/01</td>\n\t<td>1902/06/26</td>\n</tr>\n<tr>\n\t<td>July - August</td>\n\t<td>24.00</td>\n\t<td>1776/07/02</td>\n\t<td>1909/08/02</td>\n</tr>\n<tr>\n\t<td>September - October</td>\n\t<td>18.00</td>\n\t<td>1776/08/27</td>\n\t<td>1909/10/26</td>\n</tr>\n<tr>\n\t<td>November - December</td>\n\t<td>13.00</td>\n\t<td>1776/11/16</td>\n\t<td>1909/12/17</td>\n</tr>\n<tr>\n\t<td>January - March</td>\n\t<td>1,113.00</td>\n\t<td>1792/01/09</td>\n\t<td>1899/03/24</td>\n</tr>\n<tr>\n\t<td>April - June</td>\n\t<td>966.00</td>\n\t<td>1792/04/02</td>\n\t<td>1899/06/30</td>\n</tr>\n<tr>\n\t<td>July - September</td>\n\t<td>877.00</td>\n\t<td>1792/08/10</td>\n\t<td>1899/09/19</td>\n</tr>\n<tr>\n\t<td>October - December</td>\n\t<td>808.00</td>\n\t<td>1792/10/12</td>\n\t<td>1899/12/31</td>\n</tr>\n<tr>\n\t<td>October–December</td>\n\t<td>21.00</td>\n\t<td>1874/10/19</td>\n\t<td>1897/12/30</td>\n</tr>\n<tr>\n\t<td>January</td>\n\t<td>1,288.00</td>\n\t<td>1900/01/01</td>\n\t<td>2012/01/23</td>\n</tr>\n<tr>\n\t<td>February</td>\n\t<td>1,145.00</td>\n\t<td>1900/02/01</td>\n\t<td>2012/02/27</td>\n</tr>\n<tr>\n\t<td>March</td>\n\t<td>1,378.00</td>\n\t<td>1900/03/02</td>\n\t<td>2012/03/22</td>\n</tr>\n<tr>\n\t<td>April</td>\n\t<td>1,160.00</td>\n\t<td>1900/03/31</td>\n\t<td>2012/04/26</td>\n</tr>\n<tr>\n\t<td>May</td>\n\t<td>1,369.00</td>\n\t<td>1900/05/01</td>\n\t<td>2012/05/22</td>\n</tr>\n<tr>\n\t<td>June</td>\n\t<td>1,137.00</td>\n\t<td>1900/06/01</td>\n\t<td>2012/06/05</td>\n</tr>\n<tr>\n\t<td>July</td>\n\t<td>1,210.00</td>\n\t<td>1900/07/02</td>\n\t<td>2012/07/30</td>\n</tr>\n<tr>\n\t<td>August</td>\n\t<td>1,081.00</td>\n\t<td>1900/08/04</td>\n\t<td>2012/08/06</td>\n</tr>\n<tr>\n\t<td>September</td>\n\t<td>1,108.00</td>\n\t<td>1900/09/08</td>\n\t<td>2012/09/11</td>\n</tr>\n<tr>\n\t<td>November</td>\n\t<td>1,289.00</td>\n\t<td>1900/11/03</td>\n\t<td>2011/11/26</td>\n</tr>\n<tr>\n\t<td>October</td>\n\t<td>1,224.00</td>\n\t<td>1901</td>\n\t<td>2011/10/27</td>\n</tr>\n<tr>\n\t<td>January–February</td>\n\t<td>6.00</td>\n\t<td>1906/01/12</td>\n\t<td>1906/02/11</td>\n</tr>\n<tr>\n\t<td>March–April</td>\n\t<td>5.00</td>\n\t<td>1906/03/10</td>\n\t<td>1906/04/23</td>\n</tr>\n<tr>\n\t<td>May–June</td>\n\t<td>2.00</td>\n\t<td>1906/04/23</td>\n\t<td>1906/06/07</td>\n</tr>\n<tr>\n\t<td>July–August</td>\n\t<td>5.00</td>\n\t<td>1906/07/06</td>\n\t<td>1906/08/23</td>\n</tr>\n<tr>\n\t<td>September–October</td>\n\t<td>9.00</td>\n\t<td>1906/09/11</td>\n\t<td>1906/10/28</td>\n</tr>\n<tr>\n\t<td>November–December</td>\n\t<td>6.00</td>\n\t<td>1906/11/03</td>\n\t<td>1906/12/26</td>\n</tr>\n<tr>\n\t<td>January - April</td>\n\t<td>6.00</td>\n\t<td>1907/01/06</td>\n\t<td>1907/03/22</td>\n</tr>\n<tr>\n\t<td>May - August</td>\n\t<td>7.00</td>\n\t<td>1907/06/15</td>\n\t<td>1907/08/31</td>\n</tr>\n<tr>\n\t<td>September - December</td>\n\t<td>11.00</td>\n\t<td>1907/09/07</td>\n\t<td>1907/12/21</td>\n</tr>\n<tr>\n\t<td>World population</td>\n\t<td>21.00</td>\n\t<td>1950/12/28</td>\n\t<td>1960/12/31</td>\n</tr>\n<tr>\n\t<td>Dates Unknown</td>\n\t<td>2.00</td>\n\t<td>1968/12/24</td>\n\t<td>1999/12/27</td>\n</tr></tbody>\n\t\t</table>\n\t</div>`);

								return fDone();
							}
						);
					test(
							'Object Initialization without AutoRender',
							(fDone) =>
							{
								let _Pict = new libPict();
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);

								let _PictApplication = _Pict.addApplication('Pict-PictApplication', {}, appHistoricalEvents);

								_PictApplication.options.AutoRenderMainViewportViewAfterInitialize = false;

								_PictApplication.initialize();

								Expect(_PictApplication.lastMarshalFromViewsTimestamp).to.not.exist;
								_PictApplication.marshalFromViews();
								Expect(_PictApplication.lastMarshalFromViewsTimestamp).to.be.a('number');

								// The default renderer should have done nothing
								Expect(_PictEnvironment.eventLog.Assign.length).to.equal(0);

								return fDone();
							}
						);
				}
			);
	}
);
