(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("PerspectiveClient"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define("Components", ["PerspectiveClient", "React"], factory);
	else if(typeof exports === 'object')
		exports["Components"] = factory(require("PerspectiveClient"), require("React"));
	else
		root["Components"] = factory(root["PerspectiveClient"], root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__inductiveautomation_perspective_client__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./typescript/client-components.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/bind-decorator/index.js":
/*!******************************************************************************************************************!*\
  !*** C:/Users/travis.cox/Documents/GitHub/perspective-momentary-button/web/node_modules/bind-decorator/index.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants;
(function (constants) {
    constants.typeOfFunction = 'function';
    constants.boolTrue = true;
})(constants || (constants = {}));
function bind(target, propertyKey, descriptor) {
    if (!descriptor || (typeof descriptor.value !== constants.typeOfFunction)) {
        throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
    }
    return {
        configurable: constants.boolTrue,
        get: function () {
            var bound = descriptor.value.bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: constants.boolTrue,
                writable: constants.boolTrue
            });
            return bound;
        }
    };
}
exports.bind = bind;
exports.default = bind;


/***/ }),

/***/ "../../node_modules/classnames/index.js":
/*!**************************************************************************************************************!*\
  !*** C:/Users/travis.cox/Documents/GitHub/perspective-momentary-button/web/node_modules/classnames/index.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./typescript/client-components.ts":
/*!*****************************************!*\
  !*** ./typescript/client-components.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const perspective_client_1 = __webpack_require__(/*! @inductiveautomation/perspective-client */ "@inductiveautomation/perspective-client");
const MomentaryButton_1 = __webpack_require__(/*! ./components/MomentaryButton */ "./typescript/components/MomentaryButton.tsx");
exports.MomentaryButton = MomentaryButton_1.MomentaryButton;
__webpack_require__(/*! ../scss/main */ "./scss/main.scss");
// as new components are implemented, import them, and add their meta to this array
const components = [
    new MomentaryButton_1.MomentaryButtonMeta()
];
// iterate through our components, registering each one with the registry.  Don't forget to register on the Java side too!
components.forEach((c) => perspective_client_1.ComponentRegistry.register(c));


/***/ }),

/***/ "./typescript/components/Button.tsx":
/*!******************************************!*\
  !*** ./typescript/components/Button.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(/*! react */ "react"));
const classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
/**
 * Common Button component.
 *
 * A standardized button component to be used throughout component
 * implementations wherever a button is needed.  Standardized so that we
 * can apply consistent theming wherever this button is used and render
 * a consistent UI across browsers.
 *
 * @prop secondary?: Optional.  If this is a secondary button.
 * Remaining props include your typical React button element props.
 */
class Button extends React.Component {
    render() {
        const { PRIMARY, PRIMARY_DISABLED, SECONDARY, SECONDARY_DISABLED } = Theme;
        const _a = this.props, { children, className, disabled, forwardRef, secondary } = _a, remainingProps = __rest(_a, ["children", "className", "disabled", "forwardRef", "secondary"]);
        const classes = classnames_1.default({
            [SECONDARY]: secondary,
            [SECONDARY_DISABLED]: secondary && disabled,
            [PRIMARY]: !secondary,
            [PRIMARY_DISABLED]: !secondary && disabled
        }, className, "popup-not-draggable");
        return (React.createElement("button", Object.assign({}, remainingProps, { draggable: false, disabled: disabled, className: classes, ref: forwardRef }), children));
    }
}
exports.Button = Button;
/**
 * CSS classnames which are used in theming
 * the button.  If altered, the must also
 * be updated in the theme style sheets as well as
 * any local stylesheets (ie. ../../scss/common/_button.scss)
 */
var Theme;
(function (Theme) {
    Theme["PRIMARY"] = "ia_button--primary";
    Theme["PRIMARY_DISABLED"] = "ia_button--primary--disabled";
    Theme["SECONDARY"] = "ia_button--secondary";
    Theme["SECONDARY_DISABLED"] = "ia_button--secondary--disabled";
})(Theme = exports.Theme || (exports.Theme = {}));


/***/ }),

/***/ "./typescript/components/MomentaryButton.tsx":
/*!***************************************************!*\
  !*** ./typescript/components/MomentaryButton.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(/*! react */ "react"));
const perspective_client_1 = __webpack_require__(/*! @inductiveautomation/perspective-client */ "@inductiveautomation/perspective-client");
const bind_decorator_1 = __webpack_require__(/*! bind-decorator */ "../../node_modules/bind-decorator/index.js");
const Button_1 = __webpack_require__(/*! ./Button */ "./typescript/components/Button.tsx");
exports.COMPONENT_TYPE = "imdc.perspective.momentarybutton";
const logger = perspective_client_1.makeLogger(exports.COMPONENT_TYPE);
class MomentaryButton extends perspective_client_1.Component {
    constructor(props) {
        super(props);
        const { indicatorValue, onValue } = this.props.props;
        this.state = {
            isActive: (indicatorValue == onValue)
        };
    }
    componentDidMount() {
        logger.debug("Component mounted");
        window.addEventListener("unload", this.setOff);
    }
    componentDidUpdate(prevProps) {
        logger.debug("Component updated");
        const { indicatorValue, onValue } = this.props.props;
        if ((indicatorValue == onValue) !== this.state.isActive) {
            this.setState({
                isActive: (indicatorValue == onValue)
            });
        }
    }
    componentWillUnmount() {
        logger.debug("Component unmounted");
    }
    setOn() {
        const { props: { maxOnTime, onValue }, componentEvents } = this.props;
        if (this.minHoldTimerId) {
            clearInterval(this.minHoldTimerId);
            this.minHoldTimerId = null;
        }
        if (maxOnTime > 0) {
            this.maxHoldTimerId = setInterval(this.setOff, maxOnTime);
        }
        this.pressedTime = Date.now();
        this.props.store.props.write('controlValue', onValue);
        componentEvents.fireComponentEvent("onActionPerformed", {});
    }
    setOff() {
        const { props: { offValue } } = this.props;
        if (this.mouseInitiated) {
            this.mouseInitiated = false;
            this.props.store.props.write('controlValue', offValue);
            if (this.minHoldTimerId) {
                clearInterval(this.minHoldTimerId);
                this.minHoldTimerId = null;
            }
            if (this.maxHoldTimerId) {
                clearInterval(this.maxHoldTimerId);
                this.maxHoldTimerId = null;
            }
        }
    }
    handleMouseDown(e) {
        const { enabled } = this.props.props;
        if (enabled && !this.state.isActive) {
            this.mouseInitiated = true;
            this.setOn();
            window.addEventListener("pointerup", this.handleMouseUp);
            window.addEventListener("mouseup", this.handleMouseUp);
            window.addEventListener("touchend", this.handleMouseUp);
        }
    }
    handleMouseUp(e) {
        const { enabled, onTime } = this.props.props;
        if (enabled && this.mouseInitiated) {
            window.removeEventListener("pointerup", this.handleMouseUp);
            window.removeEventListener("mouseup", this.handleMouseUp);
            window.removeEventListener("touchend", this.handleMouseUp);
            const timeLeft = onTime - (Date.now() - this.pressedTime);
            if (onTime == 0 || timeLeft <= 0) {
                this.setOff();
            }
            else if (this.minHoldTimerId == null) {
                this.minHoldTimerId = setInterval(this.setOff, timeLeft);
            }
        }
    }
    render() {
        const { emit } = this.props;
        const { enabled, activeState, inactiveState, style, disabledStyle } = this.props.props;
        const { isActive } = this.state;
        const stateConfig = isActive ? activeState : inactiveState;
        const buttonText = stateConfig.text === undefined ? '' : String(stateConfig.text);
        const buttonStyle = perspective_client_1.PropertyTree.parseStyle(stateConfig.style || {});
        const buttonIconConfig = stateConfig.icon || {};
        const iconElement = getIcon(buttonIconConfig);
        let textElement;
        if (iconElement) {
            textElement = (React.createElement("span", { style: { zIndex: 20 } },
                React.createElement(perspective_client_1.I18n, null, buttonText)));
        }
        else {
            textElement = (React.createElement(perspective_client_1.I18n, null, buttonText));
        }
        const additionalButtonStyles = iconElement ? Object.assign({ flex: "1" }, flexButtonStyles) : { flex: "1" };
        const styles = style.clone().applyStyle(buttonStyle).applyCssProperties(additionalButtonStyles);
        if (!enabled) {
            styles.applyStyle(disabledStyle);
        }
        const styleProps = styles.toStyleProps();
        const emitProps = {
            classes: ['component-wrapper']
        };
        return (React.createElement("div", Object.assign({}, emit(emitProps, true)),
            React.createElement(Button_1.Button, Object.assign({}, styleProps, { disabled: !enabled, secondary: false, onPointerUp: this.handleMouseUp, onPointerDown: this.handleMouseDown }),
                textElement,
                iconElement)));
    }
}
__decorate([
    bind_decorator_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MomentaryButton.prototype, "setOn", null);
__decorate([
    bind_decorator_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MomentaryButton.prototype, "setOff", null);
__decorate([
    bind_decorator_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MomentaryButton.prototype, "handleMouseDown", null);
__decorate([
    bind_decorator_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MomentaryButton.prototype, "handleMouseUp", null);
exports.MomentaryButton = MomentaryButton;
const flexButtonStyles = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    justifyItems: "center"
};
function getIcon(icon) {
    if (icon && (icon.path || (icon.library && icon.name))) {
        return (React.createElement(perspective_client_1.IconRenderer, Object.assign({}, icon)));
    }
    return null;
}
class MomentaryButtonMeta {
    getComponentType() {
        return exports.COMPONENT_TYPE;
    }
    getViewComponent() {
        return MomentaryButton;
    }
    getDefaultSize() {
        return ({
            width: 140,
            height: 36
        });
    }
    getPropsReducer(tree) {
        return {
            enabled: tree.readBoolean('enabled', true),
            controlValue: tree.read("controlValue", 0),
            indicatorValue: tree.read("indicatorValue", 0),
            onValue: tree.read("onValue", 1),
            offValue: tree.read("offValue", 0),
            onTime: tree.readNumber("onTime", 1000),
            maxOnTime: tree.readNumber("maxOnTime", 0),
            activeState: tree.readObject('activeState'),
            inactiveState: tree.readObject('inactiveState'),
            style: tree.readStyle('style'),
            disabledStyle: tree.readStyle('disabledStyle')
        };
    }
}
exports.MomentaryButtonMeta = MomentaryButtonMeta;


/***/ }),

/***/ "@inductiveautomation/perspective-client":
/*!************************************!*\
  !*** external "PerspectiveClient" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__inductiveautomation_perspective_client__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ });
});
//# sourceMappingURL=Components.js.map