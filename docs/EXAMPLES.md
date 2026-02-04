# Example Applications

This document provides walkthroughs of the example applications included with Pict Application.

---

## Example Directory Structure

```
example_applications/
├── Build-Examples.sh      # Build script for all examples
├── Clean-Examples.sh      # Clean build artifacts
├── Open-Examples.sh       # Open examples in browser
├── ServeExamples.js       # Development server
├── package.json
├── simple/                # Basic examples
├── bookstore_example/     # Data-driven example
├── historic_events_example/  # Complex data marshaling
└── postcard_example/      # Multi-view navigation
```

---

## Simple Examples

The `simple/` folder contains basic examples demonstrating core concepts.

### Simple Application

**File:** `PictApplication-Simple.js`

The most basic application setup:

```javascript
const libPictApplication = require('../../source/Pict-Application.js');

const defaultApplicationConfiguration = {
    Name: 'Simple Test Application'
};

class SimpleApplication extends libPictApplication {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);
    }
}

module.exports = SimpleApplication;
module.exports.default_configuration = defaultApplicationConfiguration;
```

**Key Points:**
- Minimal configuration with just a name
- Extends base class without overriding methods
- Exports both the class and default configuration

### View with Solver

**File:** `PictView-Simple-WithSolver.js`

Demonstrates the solve lifecycle:

```javascript
const libPictView = require('pict-view');

class SimpleSolverView extends libPictView {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);
    }

    onBeforeSolve() {
        super.onBeforeSolve();
        // Initialize counter if not exists
        if (!('SolveCount' in this.pict.AppData)) {
            this.pict.AppData.SolveCount = 0;
        }
    }

    onSolve() {
        super.onSolve();
        // Increment counter on each solve
        this.pict.AppData.SolveCount++;
    }

    onAfterSolve() {
        this.pict.log.info(`SolveCount: ${this.pict.AppData.SolveCount}`);
    }
}

module.exports = SimpleSolverView;
```

**Key Points:**
- Override lifecycle methods to add custom logic
- Always call `super` method first
- Use `this.pict.AppData` for shared state

### Async View

**File:** `PictView-Simple-AsyncExercises.js`

Demonstrates async initialization patterns:

```javascript
class SimpleAsyncView extends libPictView {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);
        this.preInitState = false;
        this.initState = false;
        this.afterInitState = false;
    }

    onBeforeInitializeAsync(fCallback) {
        super.onBeforeInitialize();
        let tmpInitTime = this.fable.DataGeneration.randomIntegerBetween(10, 150);
        this.preInitState = `${this.Hash} Beginning PRE initialization; waiting ${tmpInitTime}ms.`;
        this.log.info(this.preInitState);

        setTimeout(() => {
            this.preInitState = `${this.Hash} Preinitialization complete.`;
            this.log.info(this.preInitState);
            return fCallback();
        }, tmpInitTime);
    }

    onInitializeAsync(fCallback) {
        super.onInitialize();
        let tmpInitTime = this.fable.DataGeneration.randomIntegerBetween(10, 200);
        this.initState = `${this.Hash} Beginning initialization; waiting ${tmpInitTime}ms.`;
        this.log.info(this.initState);

        setTimeout(() => {
            this.initState = `${this.Hash} Initialize complete!`;
            this.log.info(this.initState);
            return fCallback();
        }, tmpInitTime);
    }

    onAfterInitializeAsync(fCallback) {
        super.onAfterInitialize();
        let tmpInitTime = this.fable.DataGeneration.randomIntegerBetween(10, 80);
        this.afterInitState = `${this.Hash} Beginning AFTER initialization; waiting ${tmpInitTime}ms.`;
        this.log.info(this.afterInitState);

        setTimeout(() => {
            this.afterInitState = `${this.Hash} After-initialize complete!`;
            this.log.info(this.afterInitState);
            return fCallback();
        }, tmpInitTime);
    }
}
```

**Key Points:**
- Async methods receive a callback function
- Always call the callback when done
- Use timeouts to simulate async operations

### Async Provider

**File:** `PictProvider-Simple-AsyncExercises.js`

Similar pattern for providers:

```javascript
const libPictProvider = require('pict-provider');

class SimpleAsyncProvider extends libPictProvider {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);
        this.preInitState = false;
        this.initState = false;
        this.afterInitState = false;
    }

    onBeforeInitializeAsync(fCallback) {
        super.onBeforeInitialize();
        // Async setup logic...
        setTimeout(() => fCallback(), 100);
    }

    onInitializeAsync(fCallback) {
        super.onInitialize();
        // Main initialization...
        setTimeout(() => fCallback(), 150);
    }

    onAfterInitializeAsync(fCallback) {
        super.onAfterInitialize();
        // Post-init cleanup...
        setTimeout(() => fCallback(), 50);
    }
}
```

---

## Bookstore Example

The `bookstore_example/` demonstrates a data-driven application.

### Structure

```
bookstore_example/
├── index.html
├── package.json
├── dist/
├── externals/
└── views/
    └── PictView-Bookstore-Books.js
```

### View Configuration

**File:** `views/PictView-Bookstore-Books.js`

```javascript
const libPictView = require('pict-view');

const defaultViewConfiguration = {
    ViewIdentifier: 'Postcard-Navigation-View',
    DefaultRenderable: 'Postcard-Navigation',
    DefaultDestinationAddress: '#Postcard-Navigation-Container',
    RenderOnLoad: true,

    Templates: [
        {
            Hash: 'Postcard-Navigation-Content',
            Template: /*html*/`
                <div class="Navigation">
                    <a href="#Postcard">New Post Card</a>
                    <a href="#About">About Post Card</a>
                </div>
            `
        }
    ],

    Renderables: [
        {
            RenderableHash: 'Postcard-Navigation',
            TemplateHash: 'Postcard-Navigation-Content',
            DestinationAddress: '#Postcard-Navigation-Container'
        }
    ]
};

module.exports = libPictView;
module.exports.default_configuration = defaultViewConfiguration;
```

**Key Points:**
- `RenderOnLoad: true` renders on application load
- Simple navigation with anchor links
- Configuration-only view (uses base class directly)

### Running the Example

```bash
# Navigate to example
cd example_applications/bookstore_example

# Install dependencies (from repo root)
npm install

# Build
npx quack build

# Open index.html in browser
# Requires retold-harness Docker image for data endpoints
```

---

## Historic Events Example

The `historic_events_example/` shows complex data processing.

### Data Structure

The example uses Wikipedia historical events data:

```javascript
{
    "date": "1158/11/29",
    "description": "Spain: Raymundo, abbot of the Fitero Abbey...",
    "lang": "en",
    "category1": "By place",
    "category2": "Europe",
    "granularity": "year"
}
```

### Category View

The view processes and displays category statistics:

```javascript
const defaultViewConfiguration = {
    ViewIdentifier: 'HistoricalEvents-Categories',
    DefaultRenderable: 'HistoricalEventCategory-List',
    DefaultDestinationAddress: '#HistoricalEvents-AppContainer',
    DefaultTemplateRecordAddress: 'AppData.EventCategoryList',
    RenderOnLoad: true,

    Templates: [
        {
            Hash: 'HistoricalEventCategory-ListWrapper',
            Template: /*html*/`
                <div id="HistoricalEventCategoryListWrapper" class="HistoricalEventCategoryList">
                    <h2>Historical Event Categories</h2>
                    <h3>(there are {~Data:Record.length~} categories)</h3>
                    <table>
                        <tr>
                            <th align="center">Category</th>
                            <th align="center">Count</th>
                            <th align="center">Earliest</th>
                            <th align="center">Latest</th>
                        </tr>
                        <tbody id="HistoricalEventCategoryListEntries">
                            {~TS:HistoricalEventCategory-Row:AppData.EventCategoryList~}
                        </tbody>
                    </table>
                </div>
            `
        },
        {
            Hash: 'HistoricalEventCategory-Row',
            Template: /*html*/`
                <tr>
                    <td>{~Data:Record.Name~}</td>
                    <td>{~Digits:Record.Count~}</td>
                    <td>{~Data:Record.EventEarliestDate~}</td>
                    <td>{~Data:Record.EventLatestDate~}</td>
                </tr>
            `
        }
    ],

    Renderables: [
        {
            RenderableHash: 'HistoricalEventCategory-List',
            TemplateHash: 'HistoricalEventCategory-ListWrapper',
            TemplateRecordAddress: 'AppData.EventCategoryList',
            DestinationAddress: '#HistoricalEvents-AppContainer',
            RenderMethod: 'replace'
        }
    ]
};
```

**Key Points:**
- Uses `{~TS:...~}` for template sets (loops)
- Uses `{~Digits:...~}` for number formatting
- Nested templates (row inside wrapper)

### Data Marshaling

The example includes a data marshaling function:

```javascript
module.exports.marshal_JSONData_Into_Object = (pDataHistoricEventSet, pDestinationObject) => {
    pDestinationObject.EventCategoryList = [];
    pDestinationObject.EventCategoryMap = {};

    for (let i = 0; i < pDataHistoricEventSet.length; i++) {
        const event = pDataHistoricEventSet[i];

        // Create category if not exists
        if (!(event.category1 in pDestinationObject.EventCategoryMap)) {
            pDestinationObject.EventCategoryMap[event.category1] = {
                Name: event.category1,
                Count: 0,
                EventEarliestDate: event.date,
                EventEarliestDescription: event.description
            };
            pDestinationObject.EventCategoryList.push(
                pDestinationObject.EventCategoryMap[event.category1]
            );
        }

        // Update statistics
        const category = pDestinationObject.EventCategoryMap[event.category1];
        category.Count++;
        category.EventLatestDate = event.date;
        category.EventLatestDescription = event.description;
    }
};
```

**Key Points:**
- Transforms raw data into view-ready format
- Creates both array (for rendering) and map (for lookup)
- Calculates aggregate statistics

---

## Postcard Example

The `postcard_example/` demonstrates multi-view navigation.

### Structure

```
postcard_example/
├── index.html
├── package.json
├── dist/
└── views/
    ├── PictView-Navigation.js
    ├── PictView-Postcard.js
    └── PictView-About.js
```

### Navigation Pattern

```javascript
// Navigation view manages routing
class NavigationView extends libPictView {
    onAfterRender() {
        super.onAfterRender();

        // Handle hash navigation
        window.addEventListener('hashchange', () => {
            this.handleRoute(window.location.hash);
        });

        // Initial route
        this.handleRoute(window.location.hash || '#Postcard');
    }

    handleRoute(hash) {
        switch (hash) {
            case '#Postcard':
                this.pict.views['Postcard-View'].render();
                break;
            case '#About':
                this.pict.views['About-View'].render();
                break;
        }
    }
}
```

---

## Running Examples

### Build All Examples

```bash
cd example_applications
./Build-Examples.sh
```

### Serve Examples

```bash
node ServeExamples.js
# Server runs on http://localhost:8080
```

### Clean Build Artifacts

```bash
./Clean-Examples.sh
```

---

## Testing Patterns

The test files demonstrate usage patterns:

### Basic Initialization

```javascript
const libPict = require('pict');
const libPictApplication = require('pict-application');

test('Object Initialization', (fDone) => {
    let _Pict = new libPict();
    let _PictEnvironment = new libPict.EnvironmentLog(_Pict);
    let _PictApplication = _Pict.addApplication(
        'Pict-PictApplication',
        {},
        libPictApplication
    );

    expect(_PictApplication).to.be.an('object');
    _PictApplication.initialize();

    return fDone();
});
```

### Async Initialization with Multiple Views

```javascript
test('Async View Initialization with Priorities', (fDone) => {
    let _Pict = new libPict();
    _Pict.LogNoisiness = 1;

    let _PictApplication = _Pict.addApplication(
        'Pict-PictApplication',
        {},
        libPictApplication
    );

    // Add views with different priorities
    for (let i = 0; i < 2; i++) {
        _Pict.addView(`View-Async-0${i}`, {}, SimpleAsyncView);
    }

    // This view initializes after the async views
    _Pict.addView('Deferred-View', {
        ViewIdentifier: 'Deferred-View',
        AutoInitializeOrdinal: 1  // Higher ordinal = later
    }, libPictView);

    _PictApplication.initializeAsync((pError) => {
        return fDone();
    });
});
```

### Provider and View Integration

```javascript
test('Async View and Provider Initialization', (fDone) => {
    let _Pict = new libPict();

    let _PictApplication = _Pict.addApplication(
        'Pict-PictApplication',
        {},
        libPictApplication
    );

    // Add providers
    _Pict.addProvider('Provider-0', {}, SimpleAsyncProvider);
    _Pict.addProvider('Provider-1', {
        AutoInitializeOrdinal: 1
    }, SimpleAsyncProvider);

    // Add views
    _Pict.addView('View-0', {}, SimpleAsyncView);
    _Pict.addView('View-1', {
        AutoInitializeOrdinal: 1
    }, SimpleAsyncView);

    _PictApplication.initializeAsync((pError) => {
        return _PictApplication.renderAutoViewsAsync(fDone);
    });
});
```

---

## Best Practices from Examples

1. **Export both class and configuration**
   ```javascript
   module.exports = MyClass;
   module.exports.default_configuration = defaultConfig;
   ```

2. **Use configuration-only views when possible**
   - No custom class needed for simple templates
   - Easier to maintain and test

3. **Leverage ordinals for initialization order**
   - Default is 0
   - Higher numbers initialize later
   - Useful for dependencies

4. **Use template sets for lists**
   - `{~TS:Template-Hash:Data.Path~}`
   - Cleaner than manual loops

5. **Separate data marshaling from views**
   - Keep views focused on presentation
   - Marshal data in providers or application
