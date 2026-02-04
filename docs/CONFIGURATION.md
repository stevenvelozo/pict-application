# Configuration Reference

Complete reference for all configuration options in Pict Application and Pict View.

---

## Application Configuration

### Core Settings

```javascript
{
    // Application name - appears in log entries
    Name: 'DefaultPictApplication',

    // Prefix for all template destination hashes
    IdentifierAddressPrefix: 'PICT-'
}
```

### Main Viewport Settings

The main viewport is the primary rendering target for your application.

```javascript
{
    // View identifier for the main viewport
    MainViewportViewIdentifier: 'Default-View',

    // Default renderable hash within the main viewport view
    MainViewportRenderableHash: false,

    // DOM selector for main content area
    MainViewportDestinationAddress: false,

    // Default data address for main viewport templates
    MainViewportDefaultDataAddress: false
}
```

### Auto Behavior Settings

Control what happens automatically during application lifecycle.

```javascript
{
    // Run solve() after initialize() completes
    AutoSolveAfterInitialize: true,

    // Render main viewport view after initialization
    AutoRenderMainViewportViewAfterInitialize: true,

    // Render all views marked for auto-render after initialization
    AutoRenderViewsAfterInitialize: false,

    // Trigger loginAsync() after initialization
    AutoLoginAfterInitialize: false,

    // Trigger loadDataAsync() after successful login
    AutoLoadDataAfterLogin: false
}
```

### View and Manifest Configuration

```javascript
{
    // Array of view configurations to load without custom classes
    ConfigurationOnlyViews: [],

    // Object containing manifest definitions for data transformation
    Manifests: {}
}
```

---

## View Configuration

### Identity Settings

```javascript
{
    // Unique identifier for the view (appears in logs)
    ViewIdentifier: false,

    // Unique hash for CSS block identification
    CSSHash: false
}
```

### Default Rendering Settings

```javascript
{
    // Default renderable hash when none specified
    DefaultRenderable: false,

    // Default DOM selector for content projection
    DefaultDestinationAddress: false,

    // Default data address for template records
    DefaultTemplateRecordAddress: false
}
```

### Auto Behavior Settings

```javascript
{
    // Initialize when application initializes
    AutoInitialize: true,

    // Priority for auto-initialization (lower = earlier)
    AutoInitializeOrdinal: 0,

    // Render when application auto-renders
    AutoRender: true,

    // Priority for auto-rendering
    AutoRenderOrdinal: 0,

    // Solve when application solves
    AutoSolveWithApp: true,

    // Priority for auto-solving
    AutoSolveOrdinal: 0
}
```

### CSS Configuration

```javascript
{
    // CSS content to inject for this view
    CSS: false,

    // Unique identifier for CSS block
    CSSHash: false,

    // Provider identifier for CSS source tracking
    CSSProvider: false,

    // Priority for CSS injection (higher = later in cascade)
    CSSPriority: 500
}
```

### Templates Configuration

```javascript
{
    // Array of template definitions
    Templates: [],

    // Array of default template definitions with pattern matching
    DefaultTemplates: []
}
```

#### Template Object Structure

```javascript
{
    // Unique identifier for the template
    Hash: 'Template-Identifier',

    // Template content with Pict syntax
    Template: '<div>{~Data:Record.value~}</div>',

    // Optional: Description of template source
    Source: 'Optional source description'
}
```

#### Default Template Object Structure

Default templates use prefix/postfix matching for automatic template selection.

```javascript
{
    // Match templates starting with this prefix
    Prefix: '',

    // Match templates ending with this postfix
    Postfix: '-List-Row',

    // Template content
    Template: '<tr>{~Data:Record.name~}</tr>',

    // Optional: Description
    Source: 'Optional source description'
}
```

### Renderables Configuration

```javascript
{
    // Array of renderable definitions
    Renderables: []
}
```

#### Renderable Object Structure

```javascript
{
    // Unique identifier for this renderable
    RenderableHash: 'Content-List',

    // Template to use for rendering
    TemplateHash: 'Content-List-Template',

    // Data address for template records
    TemplateRecordAddress: 'AppData.ContentList',

    // DOM selector for content destination
    DestinationAddress: '#content-container',

    // How to insert content (replace, append, prepend, append_once, virtual-assignment)
    RenderMethod: 'replace'
}
```

---

## Provider Configuration

### Auto Behavior Settings

```javascript
{
    // Initialize when application initializes
    AutoInitialize: true,

    // Priority for auto-initialization
    AutoInitializeOrdinal: 0,

    // Solve when application solves
    AutoSolveWithApp: true,

    // Priority for auto-solving
    AutoSolveOrdinal: 0,

    // Load data when application loads data
    AutoLoadDataWithApp: true,

    // Priority for auto data loading
    AutoLoadDataOrdinal: 0,

    // Save data when application saves data
    AutoSaveDataWithApp: true,

    // Priority for auto data saving
    AutoSaveDataOrdinal: 0
}
```

---

## Render Methods

The `RenderMethod` property controls how content is inserted at the destination.

| Method | Description | Use Case |
|--------|-------------|----------|
| `replace` | Overwrite all content at destination | Single-content containers, page refreshes |
| `append` | Add content after existing content | Growing lists, chat messages, logs |
| `prepend` | Add content before existing content | New items at top, notifications |
| `append_once` | Append only if content doesn't exist | Initial load protection, modals |
| `virtual-assignment` | Deferred assignment for transactions | Complex multi-step renders |

---

## Template Syntax

Pict templates use a special syntax for data binding and control flow.

### Data Output

```html
<!-- Simple data binding -->
{~Data:Record.propertyName~}

<!-- Nested property -->
{~Data:Record.user.profile.name~}

<!-- Array access -->
{~Data:Record.items[0].name~}
```

### Template Sets (Loops)

```html
<!-- Render template for each item in array -->
{~TS:Template-Hash:AppData.ArrayPath~}

<!-- Example: List of items -->
<ul>
    {~TS:Item-Row:AppData.Items~}
</ul>
```

### Formatting

```html
<!-- Format as digits with commas -->
{~Digits:Record.count~}

<!-- Output: 1,234,567 -->
```

### Conditionals

Use template sets with conditional logic in your view's solve phase to control visibility.

---

## Configuration Inheritance

Configuration values cascade and merge in this order:

1. **Default Settings** - Built-in defaults from Pict Application
2. **Carried Over Configuration** - Values from `pict.settings.PictApplicationConfiguration`
3. **Constructor Options** - Values passed to constructor
4. **Runtime Modifications** - Values changed after construction

```javascript
// 1. Default settings
const defaults = { AutoRender: true, Name: 'DefaultApp' };

// 2. Carried over from Pict
const pict = new libPict({
    PictApplicationConfiguration: {
        Name: 'CarriedOverApp'
    }
});

// 3. Constructor options
const app = pict.addApplication('MyApp', {
    Name: 'FinalAppName'  // This wins
}, libPictApplication);

// app.options.Name === 'FinalAppName'
```

---

## Complete Example

```javascript
const appConfig = {
    // Core
    Name: 'Complete Example App',
    IdentifierAddressPrefix: 'MYAPP-',

    // Main Viewport
    MainViewportViewIdentifier: 'Dashboard',
    MainViewportRenderableHash: 'Dashboard-Main',
    MainViewportDestinationAddress: '#app-container',
    MainViewportDefaultDataAddress: 'AppData.Dashboard',

    // Auto Behaviors
    AutoSolveAfterInitialize: true,
    AutoRenderMainViewportViewAfterInitialize: true,
    AutoRenderViewsAfterInitialize: false,
    AutoLoginAfterInitialize: true,
    AutoLoadDataAfterLogin: true,

    // Configuration-Only Views
    ConfigurationOnlyViews: [
        {
            ViewIdentifier: 'Header-View',
            DefaultRenderable: 'Header-Content',
            DefaultDestinationAddress: '#header',
            Templates: [
                {
                    Hash: 'Header-Template',
                    Template: '<header><h1>{~Data:AppData.Title~}</h1></header>'
                }
            ],
            Renderables: [
                {
                    RenderableHash: 'Header-Content',
                    TemplateHash: 'Header-Template',
                    DestinationAddress: '#header',
                    RenderMethod: 'replace'
                }
            ]
        }
    ],

    // Manifests
    Manifests: {
        'UserManifest': {
            Scope: 'AppData.User',
            // ... manifest definition
        }
    }
};

const viewConfig = {
    // Identity
    ViewIdentifier: 'Dashboard',
    CSSHash: 'dashboard-styles',

    // Defaults
    DefaultRenderable: 'Dashboard-Main',
    DefaultDestinationAddress: '#dashboard',
    DefaultTemplateRecordAddress: 'AppData.Dashboard',

    // Auto Behaviors
    AutoInitialize: true,
    AutoInitializeOrdinal: 0,
    AutoRender: true,
    AutoRenderOrdinal: 0,
    AutoSolveWithApp: true,
    AutoSolveOrdinal: 0,

    // CSS
    CSS: `
        .dashboard { padding: 20px; }
        .dashboard-card { border: 1px solid #ddd; }
    `,
    CSSPriority: 600,

    // Templates
    Templates: [
        {
            Hash: 'Dashboard-Template',
            Template: /*html*/`
                <div class="dashboard">
                    <h2>Welcome, {~Data:AppData.User.name~}</h2>
                    <div class="dashboard-cards">
                        {~TS:Card-Template:AppData.Dashboard.cards~}
                    </div>
                </div>
            `,
            Source: 'Main dashboard template'
        },
        {
            Hash: 'Card-Template',
            Template: /*html*/`
                <div class="dashboard-card">
                    <h3>{~Data:Record.title~}</h3>
                    <p>{~Data:Record.value~}</p>
                </div>
            `
        }
    ],

    // Default Templates (pattern matching)
    DefaultTemplates: [
        {
            Prefix: 'Dashboard-',
            Postfix: '-Row',
            Template: '<div class="row">{~Data:Record.content~}</div>'
        }
    ],

    // Renderables
    Renderables: [
        {
            RenderableHash: 'Dashboard-Main',
            TemplateHash: 'Dashboard-Template',
            TemplateRecordAddress: 'AppData.Dashboard',
            DestinationAddress: '#dashboard',
            RenderMethod: 'replace'
        }
    ],

    // Manifests
    Manifests: {}
};
```

---

## TypeScript Support

Pict Application includes TypeScript declarations. Import types:

```typescript
import PictApplication = require('pict-application');

// Type-safe configuration
const config: Record<string, any> = {
    Name: 'TypeScript App',
    AutoRender: true
};

// Type-safe application
class MyApp extends PictApplication {
    constructor(pFable: any, pOptions?: Record<string, any>, pServiceHash?: string) {
        super(pFable, pOptions, pServiceHash);
    }
}
```
