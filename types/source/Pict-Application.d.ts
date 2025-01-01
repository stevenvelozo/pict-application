export = PictApplication;
/**
 * Base class for pict applications.
 */
declare class PictApplication {
    /**
     * @param {import('fable')} pFable
     * @param {any} [pOptions]
     * @param {string} [pServiceHash]
     */
    constructor(pFable: any, pOptions?: any, pServiceHash?: string);
    /** @type {any} */
    options: any;
    /** @type {any} */
    log: any;
    /** @type {import('pict') & import('fable')} */
    fable: import("pict") & any;
    /** @type {string} */
    UUID: string;
    /** @type {string} */
    Hash: string;
    /**
     * @type {{ [key: string]: any }}
     */
    servicesMap: {
        [key: string]: any;
    };
    serviceType: string;
    /** @type {Object} */
    _Package: any;
    pict: any;
    AppData: any;
    /** @type {number} */
    initializeTimestamp: number;
    /** @type {number} */
    lastSolvedTimestamp: number;
    /** @type {number} */
    lastMarshalFromViewsTimestamp: number;
    /** @type {number} */
    lastMarshalToViewsTimestamp: number;
    /** @type {number} */
    lastAutoRenderTimestamp: number;
    /**
     * @return {boolean}
     */
    onPreSolve(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onPreSolveAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onBeforeSolve(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onBeforeSolveAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onSolve(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onSolveAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    solve(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    solveAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onAfterSolve(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onAfterSolveAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onBeforeInitialize(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onBeforeInitializeAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onInitialize(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onInitializeAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    initialize(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    initializeAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onAfterInitialize(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onAfterInitializeAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onBeforeMarshalFromViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onBeforeMarshalFromViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onMarshalFromViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onMarshalFromViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    marshalFromViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    marshalFromViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onAfterMarshalFromViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onAfterMarshalFromViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onBeforeMarshalToViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onBeforeMarshalToViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onMarshalToViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onMarshalToViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    marshalToViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    marshalToViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onAfterMarshalToViews(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onAfterMarshalToViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    onBeforeRender(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onBeforeRenderAsync(fCallback: (error?: Error) => void): void;
    /**
     * @param {string} [pViewIdentifier] - The hash of the view to render. By default, the main viewport view is rendered.
     * @param {string} [pRenderableHash] - The hash of the renderable to render.
     * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
     * @param {string} [pTemplateDataAddress] - The address where the data for the template is stored.
     *
     * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
     */
    render(pViewIdentifier?: string, pRenderableHash?: string, pRenderDestinationAddress?: string, pTemplateDataAddress?: string): boolean;
    /**
     * @return {boolean}
     */
    onRender(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onRenderAsync(fCallback: (error?: Error) => void): void;
    /**
     * @param {string|((error?: Error) => void)} pViewIdentifier - The hash of the view to render. By default, the main viewport view is rendered. (or the callback)
     * @param {string|((error?: Error) => void)} [pRenderableHash] - The hash of the renderable to render. (or the callback)
     * @param {string|((error?: Error) => void)} [pRenderDestinationAddress] - The address where the renderable will be rendered. (or the callback)
     * @param {string|((error?: Error) => void)} [pTemplateDataAddress] - The address where the data for the template is stored. (or the callback)
     * @param {(error?: Error) => void} [fCallback] - The callback, if all other parameters are provided.
     *
     * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
     */
    renderAsync(pViewIdentifier: string | ((error?: Error) => void), pRenderableHash?: string | ((error?: Error) => void), pRenderDestinationAddress?: string | ((error?: Error) => void), pTemplateDataAddress?: string | ((error?: Error) => void), fCallback?: (error?: Error) => void): any;
    /**
     * @return {boolean}
     */
    onAfterRender(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    onAfterRenderAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    renderMainViewport(): boolean;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    renderMainViewportAsync(fCallback: (error?: Error) => void): any;
    /**
     * @return {void}
     */
    renderAutoViews(): void;
    /**
     * @param {(error?: Error) => void} fCallback
     */
    renderAutoViewsAsync(fCallback: (error?: Error) => void): void;
    /**
     * @return {boolean}
     */
    get isPictApplication(): boolean;
}
//# sourceMappingURL=Pict-Application.d.ts.map