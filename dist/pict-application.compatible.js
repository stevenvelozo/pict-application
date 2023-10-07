"use strict";

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
        _createClass(FableServiceProviderBase, [{
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
        return FableServiceProviderBase;
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
        // Whether or not we should automatically render the main viewport after we initialize the pict application
        AutoSolveAfterInitialize: true,
        AutoRenderMainViewportViewAfterInitialize: true,
        Manifests: {},
        // The prefix to prepend on all template destination hashes
        IdentifierAddressPrefix: 'PICT-'
      };
      var PictApplication = /*#__PURE__*/function (_libFableServiceBase) {
        _inherits(PictApplication, _libFableServiceBase);
        var _super = _createSuper(PictApplication);
        function PictApplication(pFable, pOptions, pServiceHash) {
          var _this;
          _classCallCheck(this, PictApplication);
          var tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictSettings)), pOptions);
          _this = _super.call(this, pFable, tmpOptions, pServiceHash);
          _this.serviceType = 'PictApplication';

          // Convenience and consistency naming
          _this.pict = _this.fable;
          // Wire in the essential Pict state
          _this.AppData = _this.fable.AppData;
          _this.initializeTimestamp = false;
          _this.lastSolvedTimestamp = false;
          _this.lastMarshalFromViewsTimestamp = false;
          _this.lastMarshalToViewsTimestamp = false;

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
        _createClass(PictApplication, [{
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
            this.onBeforeSolve();
            // Now walk through any loaded views and initialize them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToSolve = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              if (tmpView.options.AutoInitialize) {
                tmpViewsToSolve.push(tmpView);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpViewsToSolve.sort(function (a, b) {
              return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
            });
            for (var _i = 0; _i < tmpViewsToSolve.length; _i++) {
              tmpViewsToSolve[_i].solve();
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
            // Walk through any loaded views and solve them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToSolve = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              if (tmpView.options.AutoSolveWithApp) {
                tmpViewsToSolve.push(tmpView);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpViewsToSolve.sort(function (a, b) {
              return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal;
            });
            for (var _i2 = 0; _i2 < tmpViewsToSolve.length; _i2++) {
              tmpAnticipate.anticipate(tmpViewsToSolve[_i2].solveAsync.bind(tmpViewsToSolve[_i2]));
            }
            tmpAnticipate.anticipate(this.onSolveAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this2.pict.LogNoisiness > 2) {
                _this2.log.trace("PictApp [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.Name, " solveAsync() complete."));
              }
              _this2.lastSolvedTimestamp = _this2.fable.log.getTimeStamp();
              return fCallback(pError);
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
            if (!this.initializeTimestamp) {
              this.onBeforeInitialize();
              this.onInitialize();
              // Now walk through any loaded views and initialize them as well.
              var tmpLoadedViews = Object.keys(this.pict.views);
              var tmpViewsToInitialize = [];
              for (var i = 0; i < tmpLoadedViews.length; i++) {
                var tmpView = this.pict.views[tmpLoadedViews[i]];
                if (tmpView.options.AutoInitialize) {
                  tmpViewsToInitialize.push(tmpView);
                }
              }
              // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
              tmpViewsToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i3 = 0; _i3 < tmpViewsToInitialize.length; _i3++) {
                tmpViewsToInitialize[_i3].initialize();
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
          value: function initializeAsync(fCallBack) {
            var _this3 = this;
            if (!this.initializeTimestamp) {
              var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
              if (this.pict.LogNoisiness > 3) {
                this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " beginning initialization..."));
              }
              tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
              // Now walk through any loaded views and initialize them as well.
              // TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
              var tmpLoadedViews = Object.keys(this.pict.views);
              var tmpViewsToInitialize = [];
              for (var i = 0; i < tmpLoadedViews.length; i++) {
                var tmpView = this.pict.views[tmpLoadedViews[i]];
                if (tmpView.options.AutoInitialize) {
                  tmpViewsToInitialize.push(tmpView);
                }
              }
              // Sort the views by their priority
              // If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
              tmpViewsToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i4 = 0; _i4 < tmpViewsToInitialize.length; _i4++) {
                var _tmpView = tmpViewsToInitialize[_i4];
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
                return fCallBack();
              });
            } else {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " async initialize called but initialization is already completed.  Aborting."));
              // TODO: Should this be an error?
              return fCallback();
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
            for (var _i5 = 0; _i5 < tmpViewsToMarshalFromViews.length; _i5++) {
              tmpViewsToMarshalFromViews[_i5].marshalFromView();
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
            tmpAnticipate.anticipate(this.onBeforeMarshalFromViewsAsync.bind(this));
            // Walk through any loaded views and marshalFromViews them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalFromViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalFromViews.push(tmpView);
            }
            for (var _i6 = 0; _i6 < tmpViewsToMarshalFromViews.length; _i6++) {
              tmpAnticipate.anticipate(tmpViewsToMarshalFromViews[_i6].marshalFromViewAsync.bind(tmpViewsToMarshalFromViews[_i6]));
            }
            tmpAnticipate.anticipate(this.onMarshalFromViewsAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalFromViewsAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this4.pict.LogNoisiness > 2) {
                _this4.log.trace("PictApp [".concat(_this4.UUID, "]::[").concat(_this4.Hash, "] ").concat(_this4.options.Name, " marshalFromViewsAsync() complete."));
              }
              _this4.lastMarshalFromViewsTimestamp = _this4.fable.log.getTimeStamp();
              return fCallback(pError);
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
            for (var _i7 = 0; _i7 < tmpViewsToMarshalToViews.length; _i7++) {
              tmpViewsToMarshalToViews[_i7].marshalToView();
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
            tmpAnticipate.anticipate(this.onBeforeMarshalToViewsAsync.bind(this));
            // Walk through any loaded views and marshalToViews them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalToViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalToViews.push(tmpView);
            }
            for (var _i8 = 0; _i8 < tmpViewsToMarshalToViews.length; _i8++) {
              tmpAnticipate.anticipate(tmpViewsToMarshalToViews[_i8].marshalToViewAsync.bind(tmpViewsToMarshalToViews[_i8]));
            }
            tmpAnticipate.anticipate(this.onMarshalToViewsAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalToViewsAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this5.pict.LogNoisiness > 2) {
                _this5.log.trace("PictApp [".concat(_this5.UUID, "]::[").concat(_this5.Hash, "] ").concat(_this5.options.Name, " marshalToViewsAsync() complete."));
              }
              _this5.lastMarshalToViewsTimestamp = _this5.fable.log.getTimeStamp();
              return fCallback(pError);
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
          key: "render",
          value: function render(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress) {
            var tmpViewIdentifier = typeof pViewIdentifier === 'undefined' ? this.options.MainViewportViewIdentifier : pViewIdentifier;
            var tmpRenderableHash = typeof pRenderableHash === 'undefined' ? this.options.MainViewportRenderableHash : pRenderableHash;
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'undefined' ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
            var tmpTemplateDataAddress = typeof pTemplateDataAddress === 'undefined' ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;

            // Now get the view (by hash) from the loaded views
            var tmpView = typeof tmpViewIdentifier === 'string' ? this.servicesMap.PictView[tmpViewIdentifier] : false;
            if (!tmpView) {
              this.log.error("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " could not render from View ").concat(tmpViewIdentifier, " because it is not a valid view."));
              return false;
            }
            return tmpView.render(tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress);
          }
        }, {
          key: "renderMainViewport",
          value: function renderMainViewport() {
            return this.render(this.options.MainViewportViewIdentifier, this.options.MainViewportRenderableHash, this.options.MainViewportDestinationAddress, this.options.MainViewportDefaultDataAddress);
          }
        }, {
          key: "renderAsync",
          value: function renderAsync(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress, fCallback) {
            var tmpViewIdentifier = typeof pViewIdentifier === 'undefined' ? this.options.MainViewportViewIdentifier : pViewIdentifier;
            var tmpRenderableHash = typeof pRenderableHash === 'undefined' ? this.options.MainViewportRenderableHash : pRenderableHash;
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'undefined' ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
            var tmpTemplateDataAddress = typeof pTemplateDataAddress === 'undefined' ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;
            var tmpView = typeof tmpViewIdentifier === 'string' ? this.servicesMap.PictView[tmpViewIdentifier] : false;
            if (!tmpView) {
              var tmpErrorMessage = "PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " could not asynchronously render from View ").concat(tmpViewIdentifier, " because it is not a valid view.");
              if (this.pict.LogNoisiness > 3) {
                this.log.error(tmpErrorMessage);
              }
              return fCallback(new Error(tmpErrorMessage));
            }
            return tmpView.renderAsync(tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress, fCallback);
          }
        }, {
          key: "renderMainViewportAsync",
          value: function renderMainViewportAsync(fCallback) {
            return this.renderAsync(this.options.MainViewportViewIdentifier, this.options.MainViewportRenderableHash, this.options.MainViewportDestinationAddress, this.options.MainViewportDefaultDataAddress, fCallback);
          }
        }]);
        return PictApplication;
      }(libFableServiceBase);
      module.exports = PictApplication;
    }, {
      "fable-serviceproviderbase": 1
    }]
  }, {}, [2])(2);
});