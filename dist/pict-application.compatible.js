"use strict";

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.PictApplication = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      /**
      * Fable Service Base
      * @author <steven@velozo.com>
      */
      var FableServiceProviderBase = /*#__PURE__*/function () {
        // The constructor can be used in two ways:
        // 1) With a fable, options object and service hash (the options object and service hash are optional)
        // 2) With an object or nothing as the first parameter, where it will be treated as the options object
        function FableServiceProviderBase(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, FableServiceProviderBase);
          // Check if a fable was passed in; connect it if so
          if (_typeof(pFable) === 'object' && pFable.isFable) {
            this.connectFable(pFable);
          } else {
            this.fable = false;
          }

          // initialize options and UUID based on whether the fable was passed in or not.
          if (this.fable) {
            this.UUID = pFable.getUUID();
            this.options = _typeof(pOptions) === 'object' ? pOptions : {};
          } else {
            // With no fable, check to see if there was an object passed into either of the first two
            // Parameters, and if so, treat it as the options object
            this.options = _typeof(pFable) === 'object' && !pFable.isFable ? pFable : _typeof(pOptions) === 'object' ? pOptions : {};
            this.UUID = "CORE-SVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          }

          // It's expected that the deriving class will set this
          this.serviceType = "Unknown-".concat(this.UUID);

          // The service hash is used to identify the specific instantiation of the service in the services map
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : !this.fable && typeof pOptions === 'string' ? pOptions : "".concat(this.UUID);
        }
        return _createClass(FableServiceProviderBase, [{
          key: "connectFable",
          value: function connectFable(pFable) {
            if (_typeof(pFable) !== 'object' || !pFable.isFable) {
              var tmpErrorMessage = "Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [".concat(_typeof(pFable), "].}");
              console.log(tmpErrorMessage);
              return new Error(tmpErrorMessage);
            }
            if (!this.fable) {
              this.fable = pFable;
            }
            if (!this.log) {
              this.log = this.fable.Logging;
            }
            if (!this.services) {
              this.services = this.fable.services;
            }
            if (!this.servicesMap) {
              this.servicesMap = this.fable.servicesMap;
            }
            return true;
          }
        }]);
      }();
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;

      // This is left here in case we want to go back to having different code/base class for "core" services
      module.exports.CoreServiceProviderBase = FableServiceProviderBase;
    }, {}],
    2: [function (require, module, exports) {
      var libFableServiceBase = require('fable-serviceproviderbase');
      var defaultPictSettings = {
        Name: 'DefaultPictApplication',
        // The main "viewport" is the view that is used to host our application
        MainViewportViewIdentifier: 'Default-View',
        MainViewportRenderableHash: false,
        MainViewportDestinationAddress: false,
        MainViewportDefaultDataAddress: false,
        // Whether or not we should automatically render the main viewport and other autorender views after we initialize the pict application
        AutoSolveAfterInitialize: true,
        AutoRenderMainViewportViewAfterInitialize: true,
        AutoRenderViewsAfterInitialize: false,
        ConfigurationOnlyViews: [],
        Manifests: {},
        // The prefix to prepend on all template destination hashes
        IdentifierAddressPrefix: 'PICT-'
      };
      var PictApplication = /*#__PURE__*/function (_libFableServiceBase) {
        function PictApplication(pFable, pOptions, pServiceHash) {
          var _this;
          _classCallCheck(this, PictApplication);
          var tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictSettings)), pOptions);
          _this = _callSuper(this, PictApplication, [pFable, tmpOptions, pServiceHash]);
          _this.serviceType = 'PictApplication';

          // Convenience and consistency naming
          _this.pict = _this.fable;
          // Wire in the essential Pict state
          _this.AppData = _this.fable.AppData;
          _this.initializeTimestamp = false;
          _this.lastSolvedTimestamp = false;
          _this.lastMarshalFromViewsTimestamp = false;
          _this.lastMarshalToViewsTimestamp = false;
          _this.lastAutoRenderTimestamp = false;

          // Load all the manifests for the application
          var tmpManifestKeys = Object.keys(_this.options.Manifests);
          if (tmpManifestKeys.length > 0) {
            for (var i = 0; i < tmpManifestKeys.length; i++) {
              // Load each manifest
              var tmpManifestKey = tmpManifestKeys[i];
              _this.fable.instantiateServiceProvider('Manifest', _this.options.Manifests[tmpManifestKey], tmpManifestKey);
            }
          }
          return _this;
        }

        /* -------------------------------------------------------------------------- */
        /*                     Code Section: Solve All Views                          */
        /* -------------------------------------------------------------------------- */
        _inherits(PictApplication, _libFableServiceBase);
        return _createClass(PictApplication, [{
          key: "onPreSolve",
          value: function onPreSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onPreSolve:"));
            }
            return true;
          }
        }, {
          key: "onPreSolveAsync",
          value: function onPreSolveAsync(fCallback) {
            this.onPreSolve();
            return fCallback();
          }
        }, {
          key: "onBeforeSolve",
          value: function onBeforeSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeSolve:"));
            }
            return true;
          }
        }, {
          key: "onBeforeSolveAsync",
          value: function onBeforeSolveAsync(fCallback) {
            this.onBeforeSolve();
            return fCallback();
          }
        }, {
          key: "onSolve",
          value: function onSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onSolve:"));
            }
            return true;
          }
        }, {
          key: "onSolveAsync",
          value: function onSolveAsync(fCallback) {
            this.onSolve();
            return fCallback();
          }
        }, {
          key: "solve",
          value: function solve() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " executing solve() function..."));
            }

            // Walk through any loaded providers and solve them as well.
            var tmpLoadedProviders = Object.keys(this.pict.providers);
            var tmpProvidersToSolve = [];
            for (var i = 0; i < tmpLoadedProviders.length; i++) {
              var tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
              if (tmpProvider.options.AutoSolveWithApp) {
                tmpProvidersToSolve.push(tmpProvider);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpProvidersToSolve.sort(function (a, b) {
              return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal;
            });
            for (var _i = 0; _i < tmpProvidersToSolve.length; _i++) {
              tmpProvidersToSolve[_i].solve(tmpProvidersToSolve[_i]);
            }
            this.onBeforeSolve();
            // Now walk through any loaded views and initialize them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToSolve = [];
            for (var _i2 = 0; _i2 < tmpLoadedViews.length; _i2++) {
              var tmpView = this.pict.views[tmpLoadedViews[_i2]];
              if (tmpView.options.AutoInitialize) {
                tmpViewsToSolve.push(tmpView);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpViewsToSolve.sort(function (a, b) {
              return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
            });
            for (var _i3 = 0; _i3 < tmpViewsToSolve.length; _i3++) {
              tmpViewsToSolve[_i3].solve();
            }
            this.onSolve();
            this.onAfterSolve();
            this.lastSolvedTimestamp = this.fable.log.getTimeStamp();
            return true;
          }
        }, {
          key: "solveAsync",
          value: function solveAsync(fCallback) {
            var _this2 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
            tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " solveAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this2.log.error("PictApp [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.Name, " solveAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            // Walk through any loaded providers and solve them as well.
            var tmpLoadedProviders = Object.keys(this.pict.providers);
            var tmpProvidersToSolve = [];
            for (var i = 0; i < tmpLoadedProviders.length; i++) {
              var tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
              if (tmpProvider.options.AutoSolveWithApp) {
                tmpProvidersToSolve.push(tmpProvider);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpProvidersToSolve.sort(function (a, b) {
              return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal;
            });
            for (var _i4 = 0; _i4 < tmpProvidersToSolve.length; _i4++) {
              tmpAnticipate.anticipate(tmpProvidersToSolve[_i4].solveAsync.bind(tmpProvidersToSolve[_i4]));
            }

            // Walk through any loaded views and solve them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToSolve = [];
            for (var _i5 = 0; _i5 < tmpLoadedViews.length; _i5++) {
              var tmpView = this.pict.views[tmpLoadedViews[_i5]];
              if (tmpView.options.AutoSolveWithApp) {
                tmpViewsToSolve.push(tmpView);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpViewsToSolve.sort(function (a, b) {
              return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal;
            });
            for (var _i6 = 0; _i6 < tmpViewsToSolve.length; _i6++) {
              tmpAnticipate.anticipate(tmpViewsToSolve[_i6].solveAsync.bind(tmpViewsToSolve[_i6]));
            }
            tmpAnticipate.anticipate(this.onSolveAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this2.pict.LogNoisiness > 2) {
                _this2.log.trace("PictApp [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.Name, " solveAsync() complete."));
              }
              _this2.lastSolvedTimestamp = _this2.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }
        }, {
          key: "onAfterSolve",
          value: function onAfterSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterSolve:"));
            }
            return true;
          }
        }, {
          key: "onAfterSolveAsync",
          value: function onAfterSolveAsync(fCallback) {
            this.onAfterSolve();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Initialize Application                   */
          /* -------------------------------------------------------------------------- */
        }, {
          key: "onBeforeInitialize",
          value: function onBeforeInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeInitialize:"));
            }
            return true;
          }
        }, {
          key: "onBeforeInitializeAsync",
          value: function onBeforeInitializeAsync(fCallback) {
            this.onBeforeInitialize();
            return fCallback();
          }
        }, {
          key: "onInitialize",
          value: function onInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onInitialize:"));
            }
            return true;
          }
        }, {
          key: "onInitializeAsync",
          value: function onInitializeAsync(fCallback) {
            this.onInitialize();
            return fCallback();
          }
        }, {
          key: "initialize",
          value: function initialize() {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initialize:"));
            }
            if (!this.initializeTimestamp) {
              this.onBeforeInitialize();
              if ('ConfigurationOnlyViews' in this.options) {
                // Load all the configuration only views
                for (var i = 0; i < this.options.ConfigurationOnlyViews.length; i++) {
                  var tmpViewIdentifier = typeof this.options.ConfigurationOnlyViews[i].ViewIdentifier === 'undefined' ? "AutoView-".concat(this.fable.getUUID()) : this.options.ConfigurationOnlyViews[i].ViewIdentifier;
                  this.log.info("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " adding configuration only view: ").concat(tmpViewIdentifier));
                  this.pict.addView(tmpViewIdentifier, this.options.ConfigurationOnlyViews[i]);
                }
              }
              this.onInitialize();

              // Walk through any loaded providers and initialize them as well.
              var tmpLoadedProviders = Object.keys(this.pict.providers);
              var tmpProvidersToInitialize = [];
              for (var _i7 = 0; _i7 < tmpLoadedProviders.length; _i7++) {
                var tmpProvider = this.pict.providers[tmpLoadedProviders[_i7]];
                if (tmpProvider.options.AutoInitialize) {
                  tmpProvidersToInitialize.push(tmpProvider);
                }
              }
              // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
              tmpProvidersToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i8 = 0; _i8 < tmpProvidersToInitialize.length; _i8++) {
                tmpProvidersToInitialize[_i8].initialize();
              }

              // Now walk through any loaded views and initialize them as well.
              var tmpLoadedViews = Object.keys(this.pict.views);
              var tmpViewsToInitialize = [];
              for (var _i9 = 0; _i9 < tmpLoadedViews.length; _i9++) {
                var tmpView = this.pict.views[tmpLoadedViews[_i9]];
                if (tmpView.options.AutoInitialize) {
                  tmpViewsToInitialize.push(tmpView);
                }
              }
              // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
              tmpViewsToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i10 = 0; _i10 < tmpViewsToInitialize.length; _i10++) {
                tmpViewsToInitialize[_i10].initialize();
              }
              this.onAfterInitialize();
              if (this.options.AutoSolveAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto solving after initialization..."));
                }
                // Solve the template synchronously
                this.solve();
              }
              // Now check and see if we should automatically render as well
              if (this.options.AutoRenderMainViewportViewAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto rendering after initialization..."));
                }
                // Render the template synchronously
                this.render();
              }
              this.initializeTimestamp = this.fable.log.getTimeStamp();
              return true;
            } else {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initialize called but initialization is already completed.  Aborting."));
              return false;
            }
          }
        }, {
          key: "initializeAsync",
          value: function initializeAsync(fCallback) {
            var _this3 = this;
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initializeAsync:"));
            }

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initializeAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this3.log.error("PictApp [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.Name, " initializeAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (!this.initializeTimestamp) {
              var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
              if (this.pict.LogNoisiness > 3) {
                this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " beginning initialization..."));
              }
              if ('ConfigurationOnlyViews' in this.options) {
                // Load all the configuration only views
                for (var i = 0; i < this.options.ConfigurationOnlyViews.length; i++) {
                  var tmpViewIdentifier = typeof this.options.ConfigurationOnlyViews[i].ViewIdentifier === 'undefined' ? "AutoView-".concat(this.fable.getUUID()) : this.options.ConfigurationOnlyViews[i].ViewIdentifier;
                  this.log.info("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " adding configuration only view: ").concat(tmpViewIdentifier));
                  this.pict.addView(tmpViewIdentifier, this.options.ConfigurationOnlyViews[i]);
                }
              }
              tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));

              // Walk through any loaded providers and solve them as well.
              var tmpLoadedProviders = Object.keys(this.pict.providers);
              var tmpProvidersToInitialize = [];
              for (var _i11 = 0; _i11 < tmpLoadedProviders.length; _i11++) {
                var tmpProvider = this.pict.providers[tmpLoadedProviders[_i11]];
                if (tmpProvider.options.AutoInitialize) {
                  tmpProvidersToInitialize.push(tmpProvider);
                }
              }
              // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
              tmpProvidersToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i12 = 0; _i12 < tmpProvidersToInitialize.length; _i12++) {
                tmpAnticipate.anticipate(tmpProvidersToInitialize[_i12].initializeAsync.bind(tmpProvidersToInitialize[_i12]));
              }

              // Now walk through any loaded views and initialize them as well.
              // TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
              var tmpLoadedViews = Object.keys(this.pict.views);
              var tmpViewsToInitialize = [];
              for (var _i13 = 0; _i13 < tmpLoadedViews.length; _i13++) {
                var tmpView = this.pict.views[tmpLoadedViews[_i13]];
                if (tmpView.options.AutoInitialize) {
                  tmpViewsToInitialize.push(tmpView);
                }
              }
              // Sort the views by their priority
              // If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
              tmpViewsToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i14 = 0; _i14 < tmpViewsToInitialize.length; _i14++) {
                var _tmpView = tmpViewsToInitialize[_i14];
                tmpAnticipate.anticipate(_tmpView.initializeAsync.bind(_tmpView));
              }
              tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));
              if (this.options.AutoSolveAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto solving (asynchronously) after initialization..."));
                }
                tmpAnticipate.anticipate(this.solveAsync.bind(this));
              }
              if (this.options.AutoRenderMainViewportViewAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto rendering (asynchronously) after initialization..."));
                }
                tmpAnticipate.anticipate(this.renderMainViewportAsync.bind(this));
              }
              tmpAnticipate.wait(function (pError) {
                _this3.initializeTimestamp = _this3.fable.log.getTimeStamp();
                if (_this3.pict.LogNoisiness > 2) {
                  _this3.log.trace("PictApp [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.Name, " initialization complete."));
                }
                return tmpCallback();
              });
            } else {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " async initialize called but initialization is already completed.  Aborting."));
              // TODO: Should this be an error?
              return tmpCallback();
            }
          }
        }, {
          key: "onAfterInitialize",
          value: function onAfterInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterInitialize:"));
            }
            return true;
          }
        }, {
          key: "onAfterInitializeAsync",
          value: function onAfterInitializeAsync(fCallback) {
            this.onAfterInitialize();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal Data From All Views              */
          /* -------------------------------------------------------------------------- */
        }, {
          key: "onBeforeMarshalFromViews",
          value: function onBeforeMarshalFromViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeMarshalFromViews:"));
            }
            return true;
          }
        }, {
          key: "onBeforeMarshalFromViewsAsync",
          value: function onBeforeMarshalFromViewsAsync(fCallback) {
            this.onBeforeMarshalFromViews();
            return fCallback();
          }
        }, {
          key: "onMarshalFromViews",
          value: function onMarshalFromViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onMarshalFromViews:"));
            }
            return true;
          }
        }, {
          key: "onMarshalFromViewsAsync",
          value: function onMarshalFromViewsAsync(fCallback) {
            this.onMarshalFromViews();
            return fCallback();
          }
        }, {
          key: "marshalFromViews",
          value: function marshalFromViews() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " executing marshalFromViews() function..."));
            }
            this.onBeforeMarshalFromViews();
            // Now walk through any loaded views and initialize them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalFromViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalFromViews.push(tmpView);
            }
            for (var _i15 = 0; _i15 < tmpViewsToMarshalFromViews.length; _i15++) {
              tmpViewsToMarshalFromViews[_i15].marshalFromView();
            }
            this.onMarshalFromViews();
            this.onAfterMarshalFromViews();
            this.lastMarshalFromViewsTimestamp = this.fable.log.getTimeStamp();
            return true;
          }
        }, {
          key: "marshalFromViewsAsync",
          value: function marshalFromViewsAsync(fCallback) {
            var _this4 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalFromViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this4.log.error("PictApp [".concat(_this4.UUID, "]::[").concat(_this4.Hash, "] ").concat(_this4.options.Name, " marshalFromViewsAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalFromViewsAsync.bind(this));
            // Walk through any loaded views and marshalFromViews them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalFromViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalFromViews.push(tmpView);
            }
            for (var _i16 = 0; _i16 < tmpViewsToMarshalFromViews.length; _i16++) {
              tmpAnticipate.anticipate(tmpViewsToMarshalFromViews[_i16].marshalFromViewAsync.bind(tmpViewsToMarshalFromViews[_i16]));
            }
            tmpAnticipate.anticipate(this.onMarshalFromViewsAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalFromViewsAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this4.pict.LogNoisiness > 2) {
                _this4.log.trace("PictApp [".concat(_this4.UUID, "]::[").concat(_this4.Hash, "] ").concat(_this4.options.Name, " marshalFromViewsAsync() complete."));
              }
              _this4.lastMarshalFromViewsTimestamp = _this4.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }
        }, {
          key: "onAfterMarshalFromViews",
          value: function onAfterMarshalFromViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterMarshalFromViews:"));
            }
            return true;
          }
        }, {
          key: "onAfterMarshalFromViewsAsync",
          value: function onAfterMarshalFromViewsAsync(fCallback) {
            this.onAfterMarshalFromViews();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal Data To All Views                */
          /* -------------------------------------------------------------------------- */
        }, {
          key: "onBeforeMarshalToViews",
          value: function onBeforeMarshalToViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeMarshalToViews:"));
            }
            return true;
          }
        }, {
          key: "onBeforeMarshalToViewsAsync",
          value: function onBeforeMarshalToViewsAsync(fCallback) {
            this.onBeforeMarshalToViews();
            return fCallback();
          }
        }, {
          key: "onMarshalToViews",
          value: function onMarshalToViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onMarshalToViews:"));
            }
            return true;
          }
        }, {
          key: "onMarshalToViewsAsync",
          value: function onMarshalToViewsAsync(fCallback) {
            this.onMarshalToViews();
            return fCallback();
          }
        }, {
          key: "marshalToViews",
          value: function marshalToViews() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " executing marshalToViews() function..."));
            }
            this.onBeforeMarshalToViews();
            // Now walk through any loaded views and initialize them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalToViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalToViews.push(tmpView);
            }
            for (var _i17 = 0; _i17 < tmpViewsToMarshalToViews.length; _i17++) {
              tmpViewsToMarshalToViews[_i17].marshalToView();
            }
            this.onMarshalToViews();
            this.onAfterMarshalToViews();
            this.lastMarshalToViewsTimestamp = this.fable.log.getTimeStamp();
            return true;
          }
        }, {
          key: "marshalToViewsAsync",
          value: function marshalToViewsAsync(fCallback) {
            var _this5 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalToViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this5.log.error("PictApp [".concat(_this5.UUID, "]::[").concat(_this5.Hash, "] ").concat(_this5.options.Name, " marshalToViewsAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalToViewsAsync.bind(this));
            // Walk through any loaded views and marshalToViews them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalToViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalToViews.push(tmpView);
            }
            for (var _i18 = 0; _i18 < tmpViewsToMarshalToViews.length; _i18++) {
              tmpAnticipate.anticipate(tmpViewsToMarshalToViews[_i18].marshalToViewAsync.bind(tmpViewsToMarshalToViews[_i18]));
            }
            tmpAnticipate.anticipate(this.onMarshalToViewsAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalToViewsAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this5.pict.LogNoisiness > 2) {
                _this5.log.trace("PictApp [".concat(_this5.UUID, "]::[").concat(_this5.Hash, "] ").concat(_this5.options.Name, " marshalToViewsAsync() complete."));
              }
              _this5.lastMarshalToViewsTimestamp = _this5.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }
        }, {
          key: "onAfterMarshalToViews",
          value: function onAfterMarshalToViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterMarshalToViews:"));
            }
            return true;
          }
        }, {
          key: "onAfterMarshalToViewsAsync",
          value: function onAfterMarshalToViewsAsync(fCallback) {
            this.onAfterMarshalToViews();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Render View                              */
          /* -------------------------------------------------------------------------- */
        }, {
          key: "onBeforeRender",
          value: function onBeforeRender() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeRender:"));
            }
            return true;
          }
        }, {
          key: "onBeforeRenderAsync",
          value: function onBeforeRenderAsync(fCallback) {
            this.onBeforeRender();
            return fCallback();
          }
        }, {
          key: "render",
          value: function render(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress) {
            var tmpViewIdentifier = typeof pViewIdentifier !== 'string' ? this.options.MainViewportViewIdentifier : pViewIdentifier;
            var tmpRenderableHash = typeof pRenderableHash !== 'string' ? this.options.MainViewportRenderableHash : pRenderableHash;
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress !== 'string' ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
            var tmpTemplateDataAddress = typeof pTemplateDataAddress !== 'string' ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " VIEW Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateDataAddress[").concat(tmpTemplateDataAddress, "] render:"));
            }
            this.onBeforeRender();

            // Now get the view (by hash) from the loaded views
            var tmpView = typeof tmpViewIdentifier === 'string' ? this.servicesMap.PictView[tmpViewIdentifier] : false;
            if (!tmpView) {
              this.log.error("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " could not render from View ").concat(tmpViewIdentifier, " because it is not a valid view."));
              return false;
            }
            this.onRender();
            tmpView.render(tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress);
            this.onAfterRender();
            return true;
          }
        }, {
          key: "onRender",
          value: function onRender() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onRender:"));
            }
            return true;
          }
        }, {
          key: "onRenderAsync",
          value: function onRenderAsync(fCallback) {
            this.onRender();
            return fCallback();
          }
        }, {
          key: "renderAsync",
          value: function renderAsync(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress, fCallback) {
            var _this6 = this;
            var tmpViewIdentifier = typeof pViewIdentifier !== 'string' ? this.options.MainViewportViewIdentifier : pViewIdentifier;
            var tmpRenderableHash = typeof pRenderableHash !== 'string' ? this.options.MainViewportRenderableHash : pRenderableHash;
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress !== 'string' ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
            var tmpTemplateDataAddress = typeof pTemplateDataAddress !== 'string' ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : typeof pTemplateDataAddress === 'function' ? pTemplateDataAddress : typeof pRenderDestinationAddress === 'function' ? pRenderDestinationAddress : typeof pRenderableHash === 'function' ? pRenderableHash : typeof pViewIdentifier === 'function' ? pViewIdentifier : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this6.log.error("PictApp [".concat(_this6.UUID, "]::[").concat(_this6.Hash, "] ").concat(_this6.options.Name, " renderAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " VIEW Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateDataAddress[").concat(tmpTemplateDataAddress, "] renderAsync:"));
            }
            var tmpRenderAnticipate = this.fable.newAnticipate();
            tmpRenderAnticipate.anticipate(this.onBeforeRenderAsync.bind(this));
            var tmpView = typeof tmpViewIdentifier === 'string' ? this.servicesMap.PictView[tmpViewIdentifier] : false;
            if (!tmpView) {
              var tmpErrorMessage = "PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " could not asynchronously render from View ").concat(tmpViewIdentifier, " because it is not a valid view.");
              if (this.pict.LogNoisiness > 3) {
                this.log.error(tmpErrorMessage);
              }
              return tmpCallback(new Error(tmpErrorMessage));
            }
            tmpRenderAnticipate.anticipate(this.onRenderAsync.bind(this));
            tmpRenderAnticipate.anticipate(function (fNext) {
              tmpView.renderAsync.call(tmpView, tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress, fNext);
            });
            tmpRenderAnticipate.anticipate(this.onAfterRenderAsync.bind(this));
            return tmpRenderAnticipate.wait(tmpCallback);
          }
        }, {
          key: "onAfterRender",
          value: function onAfterRender() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterRender:"));
            }
            return true;
          }
        }, {
          key: "onAfterRenderAsync",
          value: function onAfterRenderAsync(fCallback) {
            this.onAfterRender();
            return fCallback();
          }
        }, {
          key: "renderMainViewport",
          value: function renderMainViewport() {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderMainViewport:"));
            }
            return this.render();
          }
        }, {
          key: "renderMainViewportAsync",
          value: function renderMainViewportAsync(fCallback) {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderMainViewportAsync:"));
            }
            return this.renderAsync(fCallback);
          }
        }, {
          key: "renderAutoViews",
          value: function renderAutoViews() {
            var _this7 = this;
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " beginning renderAutoViews..."));
            }
            // Now walk through any loaded views and sort them by the AutoRender ordinal
            var tmpLoadedViews = Object.keys(this.pict.views);
            // Sort the views by their priority
            // If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
            tmpLoadedViews.sort(function (a, b) {
              return _this7.pict.views[a].options.AutoRenderOrdinal - _this7.pict.views[b].options.AutoRenderOrdinal;
            });
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              if (tmpView.options.AutoRender) {
                tmpView.render();
              }
            }
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAutoViewsAsync complete."));
            }
          }
        }, {
          key: "renderAutoViewsAsync",
          value: function renderAutoViewsAsync(fCallback) {
            var _this8 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : typeof pTemplateDataAddress === 'function' ? pTemplateDataAddress : typeof pRenderDestinationAddress === 'function' ? pRenderDestinationAddress : typeof pRenderableHash === 'function' ? pRenderableHash : typeof pViewIdentifier === 'function' ? pViewIdentifier : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAutoViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this8.log.error("PictApp [".concat(_this8.UUID, "]::[").concat(_this8.Hash, "] ").concat(_this8.options.Name, " renderAutoViewsAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " beginning renderAutoViewsAsync..."));
            }

            // Now walk through any loaded views and sort them by the AutoRender ordinal
            // TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
            var tmpLoadedViews = Object.keys(this.pict.views);
            // Sort the views by their priority
            // If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
            tmpLoadedViews.sort(function (a, b) {
              return _this8.pict.views[a].options.AutoRenderOrdinal - _this8.pict.views[b].options.AutoRenderOrdinal;
            });
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              if (tmpView.options.AutoRender) {
                tmpAnticipate.anticipate(tmpView.renderAsync.bind(tmpView));
              }
            }
            tmpAnticipate.wait(function (pError) {
              _this8.lastAutoRenderTimestamp = _this8.fable.log.getTimeStamp();
              if (_this8.pict.LogNoisiness > 0) {
                _this8.log.trace("PictApp [".concat(_this8.UUID, "]::[").concat(_this8.Hash, "] ").concat(_this8.options.Name, " renderAutoViewsAsync complete."));
              }
              return tmpCallback(pError);
            });
          }
        }, {
          key: "isPictApplication",
          get: function get() {
            return true;
          }
        }]);
      }(libFableServiceBase);
      module.exports = PictApplication;
    }, {
      "fable-serviceproviderbase": 1
    }]
  }, {}, [2])(2);
});