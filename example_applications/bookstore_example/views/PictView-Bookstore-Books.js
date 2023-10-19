const libPictView = require('pict-view');

const defaultViewConfiguration = (
{
	ViewIdentifier: 'BookList',

	DefaultRenderable: 'Book-List',
	DefaultDestinationAddress: '#BookstoreContainer-Book-List',

	// If this is set to true, the PictApplication will render this to the default destination when it is fully initialized and loaded
	RenderOnLoad: true,

	Templates: [
		{
			Hash: "Book-ListWrapper",
			Template: /*html*/`
			<div class="BookList">
				<h1>Book List</h1>
				<table>
					<tr>
						<th align="center">Title</th>
						<th align="center">Publication Year</th>
						<th align="center">Author</th>
						<th align="center">ISBN</th>
						<th align="center">Cover</th>
					</tr>
					<tbody id="BookListEntries">{~TS:Book-Row:AppData.CurrentBookList~}</tbody>
				</table>
			</div>`
		},
		{
			Hash: "Book-Row",
			Template: /*html*/`
<tr>
	<td>{~Data:Record.Title~}</td>
	<td>{~Data:Record.PublicationYear~}</td>
	<td>{~Data:Record.IDAuthor~}</td>
	<td>{~Data:Record.ISBN~}</td>
	<td>[<a href="{~Data:Record.ImageURL~}">{~Data:Record.ImageURL~}</a>]</td>
</tr>`
		}
	],
	Renderables: [
		{
			RenderableHash: "Book-List",
			TemplateHash: "Book-ListWrapper",
			TemplateRecordAddress: false,
			DestinationAddress: "#BookstoreContainer-Book-List"
		}
	]
});

// This is a configuration-only view; this code is here to aid in tweaking stuff for live testing
class BookstoreBooksView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onBeforeInitialize()
	{
		super.onBeforeInitialize();

		this.log.trace(`Loading Mock Book Database`);

		this.AppData.MockDatabase = {};

		this.AppData.MockDatabase.Book = require('../data/bookstore-Book.json');
		this.log.trace(`Loaded ${this.AppData.MockDatabase.Book.length} Books`);

		this.AppData.MockDatabase.Author = require('../data/bookstore-Author.json');
		this.log.trace(`Loaded ${this.AppData.MockDatabase.Author.length} Authors`);

		this.AppData.MockDatabase.BookAuthorJoin = require('../data/bookstore-BookAuthorJoin.json');
		this.log.trace(`Loaded ${this.AppData.MockDatabase.BookAuthorJoin.length} Book to Author Joins`);

		this.AppData.CurrentBookList = [];

		for (let i = 0; i < 100; i++)
		{
			this.AppData.CurrentBookList.push(this.AppData.MockDatabase.Book[i]);
		}
	}
}

module.exports = BookstoreBooksView;

module.exports.default_configuration = defaultViewConfiguration;