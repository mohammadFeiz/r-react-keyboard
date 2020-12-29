"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var keyboardContext = /*#__PURE__*/(0, _react.createContext)();

var RReactKeyboard = /*#__PURE__*/function (_Component) {
  _inherits(RReactKeyboard, _Component);

  var _super = _createSuper(RReactKeyboard);

  function RReactKeyboard(props) {
    var _this;

    _classCallCheck(this, RReactKeyboard);

    _this = _super.call(this, props);
    var _this$props = _this.props,
        _this$props$value = _this$props.value,
        value = _this$props$value === void 0 ? '' : _this$props$value,
        theme = _this$props.theme,
        _this$props$languageI = _this$props.languageIndex,
        languageIndex = _this$props$languageI === void 0 ? false : _this$props$languageI,
        languages = _this$props.languages;
    _this.theme = {
      background: '#c9ced4',
      keyColor: '#28292b',
      keyActiveColor: '#1d5ee4',
      keyBackground: '#fff',
      screenBackground: '#eee',
      screenColor: '#666',
      titleColor: '#000',
      highlight: '#7fb9ef',
      keyBoxShadow: undefined,
      ...theme
    };
    _this.state = {
      caps: false,
      sym: false,
      value: value,
      init: true,
      languageIndex: languageIndex,
      isMobile: 'ontouchstart' in document.documentElement ? true : false,
      rows: _this.rows,
      rtl: _this.getRTL()
    };
    _this.state.rows = languageIndex !== false ? _this.getRowsByLanguageIndex(languageIndex) : _this.getOriginalRows();
    return _this;
  }

  _createClass(RReactKeyboard, [{
    key: "changeValue",
    value: function changeValue(value) {
      this.setState({
        value: value
      });

      if (this.props.onChange && !this.props.onSend) {
        this.props.onChange(value);
      }
    }
  }, {
    key: "getRTL",
    value: function getRTL() {
      var _this$props2 = this.props,
          languages = _this$props2.languages,
          languageIndex = _this$props2.languageIndex;
      return languageIndex !== false && languages[languageIndex].direction === 'rtl';
    }
  }, {
    key: "getOriginalRows",
    value: function getOriginalRows() {
      var _this2 = this;

      return [{
        items: [{
          lowerCase: '1',
          sym: '{'
        }, {
          lowerCase: '2',
          sym: '}'
        }, {
          lowerCase: '3',
          sym: '|'
        }, {
          lowerCase: '4',
          sym: '['
        }, {
          lowerCase: '5',
          sym: ']'
        }, {
          lowerCase: '6',
          sym: '\\'
        }, {
          lowerCase: '7',
          sym: '~'
        }, {
          lowerCase: '8',
          sym: '<'
        }, {
          lowerCase: '9',
          sym: '>'
        }, {
          lowerCase: '0',
          sym: '`'
        }]
      }, {
        items: [{
          lowerCase: 'q',
          caps: 'Q',
          hotKey: 'Q',
          sym: '+'
        }, {
          lowerCase: 'w',
          caps: 'W',
          sym: 'x'
        }, {
          lowerCase: 'e',
          caps: 'E',
          sym: '÷'
        }, {
          lowerCase: 'r',
          caps: 'R',
          sym: '='
        }, {
          lowerCase: 't',
          caps: 'T',
          sym: '/'
        }, {
          lowerCase: 'y',
          caps: 'Y',
          sym: '_'
        }, {
          lowerCase: 'u',
          caps: 'U',
          sym: '€'
        }, {
          lowerCase: 'i',
          caps: 'I',
          sym: '£'
        }, {
          lowerCase: 'o',
          caps: 'O',
          sym: '¥'
        }, {
          lowerCase: 'p',
          caps: 'P',
          sym: '*'
        }]
      }, {
        style: {
          padding: '0 5%'
        },
        items: [{
          lowerCase: 'a',
          caps: 'A',
          sym: '!'
        }, {
          lowerCase: 's',
          caps: 'S',
          sym: '@'
        }, {
          lowerCase: 'd',
          caps: 'D',
          sym: '#'
        }, {
          lowerCase: 'f',
          caps: 'F',
          sym: '$'
        }, {
          lowerCase: 'g',
          caps: 'G',
          sym: '%'
        }, {
          lowerCase: 'h',
          caps: 'H',
          sym: '^'
        }, {
          lowerCase: 'j',
          caps: 'J',
          sym: '&'
        }, {
          lowerCase: 'k',
          caps: 'K',
          sym: '('
        }, {
          lowerCase: 'l',
          caps: 'L',
          sym: ')'
        }]
      }, {
        items: [{
          icon: 'caps',
          id: 'key-caps',
          flex: 1.5,
          keyDown: function keyDown() {
            return _this2.setState({
              caps: !_this2.state.caps
            });
          }
        }, {
          lowerCase: 'z',
          caps: 'Z',
          sym: '-'
        }, {
          lowerCase: 'x',
          caps: 'X',
          sym: '\''
        }, {
          lowerCase: 'c',
          caps: 'C',
          sym: '\"'
        }, {
          lowerCase: 'v',
          caps: 'V',
          sym: ':'
        }, {
          lowerCase: 'b',
          caps: 'B',
          sym: ';'
        }, {
          lowerCase: 'n',
          caps: 'N',
          sym: ','
        }, {
          lowerCase: 'm',
          caps: 'M',
          sym: '?'
        }, {
          keyDown: function keyDown() {
            var _this2$state = _this2.state,
                init = _this2$state.init,
                value = _this2$state.value;

            if (init) {
              _this2.changeValue('');

              _this2.setState({
                init: false
              });
            } else if (value.length > 0) {
              _this2.changeValue(value.slice(0, value.length - 1));
            }
          },
          icon: 'back',
          id: 'key-back',
          sym: '+',
          flex: 1.5
        }]
      }, {
        items: [{
          lowerCase: '!#1',
          id: 'sym',
          flex: 1.5,
          keyDown: function keyDown() {
            return _this2.setState({
              sym: !_this2.state.sym
            });
          }
        }, {
          lowerCase: ','
        }, {
          lowerCase: 'English',
          id: 'key-space',
          flex: 5,
          keyDown: function keyDown() {
            var _this2$state2 = _this2.state,
                init = _this2$state2.init,
                value = _this2$state2.value;

            if (init) {
              _this2.changeValue('');

              _this2.setState({
                init: false
              });
            } else if (value.length > 0 && value[value.length - 1] !== ' ') {
              _this2.changeValue(value + ' ');
            }
          }
        }, {
          lowerCase: '.'
        }, {
          icon: 'inter',
          id: 'key-inter',
          flex: 1.5,
          keyDown: function keyDown() {
            return _this2.inter();
          }
        }]
      }];
    }
  }, {
    key: "getIcon",
    value: function getIcon(type) {
      var caps = this.state.caps;
      var _this$theme = this.theme,
          keyColor = _this$theme.keyColor,
          keyActiveColor = _this$theme.keyActiveColor,
          keyBackground = _this$theme.keyBackground;
      var capsColor = caps ? keyActiveColor : keyColor;
      var icons = {
        inter: /*#__PURE__*/_react.default.createElement("svg", {
          style: {
            width: "20px",
            height: "14px"
          },
          width: 20,
          height: 14
        }, /*#__PURE__*/_react.default.createElement("path", {
          stroke: keyColor,
          fill: "none",
          d: "M18 2 L18 8 L6 8",
          strokeWidth: 4
        }), /*#__PURE__*/_react.default.createElement("path", {
          stroke: keyColor,
          d: "M6 8 L6 11 L2 8 L6 5 L6 8",
          strokeWidth: 2
        })),
        caps: /*#__PURE__*/_react.default.createElement("svg", {
          style: {
            width: "20px",
            height: "14px"
          },
          width: 20,
          height: 14
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: capsColor,
          d: "M12 7 L12 14 L8 14 L8 7"
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: capsColor,
          d: "M17 7 L10 0 L3 7"
        })),
        back: /*#__PURE__*/_react.default.createElement("svg", {
          style: {
            width: "20px",
            height: "12px"
          },
          width: 20,
          height: 12
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: keyColor,
          d: "M5 0 L0 6 L5 12 L20 12 L20 0 L5 0"
        }), /*#__PURE__*/_react.default.createElement("path", {
          stroke: keyBackground,
          d: "M10 4 L14 8"
        }), /*#__PURE__*/_react.default.createElement("path", {
          stroke: keyBackground,
          d: "M14 4 L10 8"
        }))
      };
      return icons[type];
    }
  }, {
    key: "getUpper",
    value: function getUpper(item) {
      var _this$state = this.state,
          caps = _this$state.caps,
          sym = _this$state.sym;

      if (item.icon) {
        return this.getIcon(item.icon);
      }

      if (this.hotKeyMode && item.hotKey) {
        return item.hotKey;
      }

      if (sym && item.sym) {
        return item.sym;
      }

      if (caps && item.caps) {
        return item.caps;
      }

      return item.lowerCase;
    }
  }, {
    key: "inter",
    value: function inter() {
      if (this.props.onSend) {
        this.props.onSend(this.state.value);
        this.changeValue('');
        this.setState({
          init: true
        });
      }
    }
  }, {
    key: "keydown",
    value: function keydown(item) {
      var _this3 = this;

      var _this$state2 = this.state,
          rows = _this$state2.rows,
          isMobile = _this$state2.isMobile;
      var keyDown = item.keyDown;

      if (keyDown) {
        item.keyDown();
      } else {
        (0, _jquery.default)(window).bind(isMobile ? 'touchend' : 'mouseup', _jquery.default.proxy(this.keyup, this));
        this.active = item;
        item.active = true;
        this.setState({
          rows: rows
        });
        this.timeout = setTimeout(function () {
          _this3.hotKeyMode = true;

          _this3.keyup();
        }, 600);
      }
    }
  }, {
    key: "keyup",
    value: function keyup() {
      clearTimeout(this.timeout);
      var isMobile = this.state.isMobile;
      (0, _jquery.default)(window).unbind(isMobile ? 'touchend' : 'mouseup', this.keyup);
      var _this$state3 = this.state,
          rows = _this$state3.rows,
          value = _this$state3.value,
          init = _this$state3.init;
      this.active.active = false;

      if (init) {
        this.setState({
          rows: rows,
          init: false
        });
        this.changeValue(this.getUpper(this.active));
      } else {
        this.setState({
          rows: rows
        });
        this.changeValue(value + this.getUpper(this.active));
      }

      this.hotKeyMode = false;
      this.active = false;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$props$style = this.props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      var rtl = this.state.rtl;
      var background = this.theme.background;
      return {
        background: background,
        direction: rtl ? 'rtl' : 'ltr',
        ...style
      };
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        init: true
      });
      this.props.onClose();
    }
  }, {
    key: "lcdMouseDown",
    value: function lcdMouseDown() {
      var init = this.state.init;
      this.setState({
        init: !init
      });
    }
  }, {
    key: "SetState",
    value: function SetState(obj) {
      this.setState(obj);
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(index) {
      if (index === false) {
        this.setState({
          rows: this.getOriginalRows(),
          rtl: false,
          languageIndex: index
        });
        return;
      }

      this.setState({
        rows: this.getRowsByLanguageIndex(index),
        rtl: this.getRTL(),
        languageIndex: index
      });
    }
  }, {
    key: "getRowsByLanguageIndex",
    value: function getRowsByLanguageIndex(index) {
      var rows = this.getOriginalRows();

      if (index === false) {
        return rows;
      }

      var languages = this.props.languages;
      var language = languages[index];

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        for (var j = 0; j < row.items.length; j++) {
          var key = row.items[j];

          if (!key.lowerCase) {
            continue;
          }

          if (!language.dictionary[key.lowerCase]) {
            continue;
          }

          var _language$dictionary$ = language.dictionary[key.lowerCase],
              lowerCase = _language$dictionary$.lowerCase,
              upperCase = _language$dictionary$.upperCase,
              hotKey = _language$dictionary$.hotKey;
          key.lowerCase = lowerCase;
          key.caps = upperCase;
          key.hotKey = hotKey;
        }

        if (i === 2) {
          if (language.extraKey) {
            row.items.push(language.extraKey);
            row.style = undefined;
          } else {
            row.style = {
              padding: '0 5%'
            };
          }
        }
      }

      return rows;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
          rtl = _this$state4.rtl,
          rows = _this$state4.rows,
          languages = _this$state4.languages,
          languageIndex = _this$state4.languageIndex,
          caps = _this$state4.caps,
          value = _this$state4.value,
          sym = _this$state4.sym,
          init = _this$state4.init,
          isMobile = _this$state4.isMobile;
      var _this$props3 = this.props,
          languages = _this$props3.languages,
          onSend = _this$props3.onSend;
      var _this$props4 = this.props,
          _this$props4$title = _this$props4.title,
          title = _this$props4$title === void 0 ? '' : _this$props4$title,
          _this$props4$keyHeigh = _this$props4.keyHeight,
          keyHeight = _this$props4$keyHeigh === void 0 ? 36 : _this$props4$keyHeigh,
          _this$props4$gap = _this$props4.gap,
          gap = _this$props4$gap === void 0 ? 2 : _this$props4$gap;
      var contextValue = {
        caps: caps,
        sym: sym,
        value: value,
        init: init,
        title: title,
        keyHeight: keyHeight,
        gap: gap,
        isMobile: isMobile,
        theme: this.theme,
        languages: languages,
        rtl: rtl,
        keydown: this.keydown.bind(this),
        getUpper: this.getUpper.bind(this),
        lcdMouseDown: this.lcdMouseDown.bind(this),
        SetState: this.SetState.bind(this),
        languageIndex: languageIndex,
        changeLanguage: this.changeLanguage.bind(this)
      };

      var backDropProps = _defineProperty({
        className: 'back-drop'
      }, isMobile ? 'onTouchStart' : 'onMouseDown', this.close.bind(this));

      return /*#__PURE__*/_react.default.createElement(keyboardContext.Provider, {
        value: contextValue
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "keyboard" + (caps ? ' caps' : ''),
        style: this.getStyle()
      }, /*#__PURE__*/_react.default.createElement("div", backDropProps), /*#__PURE__*/_react.default.createElement(KeyboardTitle, null), onSend && /*#__PURE__*/_react.default.createElement(KeyboardHeader, null), rows.map(function (row, i) {
        return /*#__PURE__*/_react.default.createElement(KeyboardRow, {
          key: i,
          row: row,
          index: i
        });
      })));
    }
  }]);

  return RReactKeyboard;
}(_react.Component);

exports.default = RReactKeyboard;

var KeyboardRow = /*#__PURE__*/function (_Component2) {
  _inherits(KeyboardRow, _Component2);

  var _super2 = _createSuper(KeyboardRow);

  function KeyboardRow() {
    _classCallCheck(this, KeyboardRow);

    return _super2.apply(this, arguments);
  }

  _createClass(KeyboardRow, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          row = _this$props5.row,
          index = _this$props5.index;
      var items = row.items,
          style = row.style;
      var keys = items.map(function (item, i) {
        return /*#__PURE__*/_react.default.createElement(KeyboardKey, {
          key: index + '/' + i,
          item: item
        });
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: "keyboard-row",
        style: style
      }, keys);
    }
  }]);

  return KeyboardRow;
}(_react.Component);

_defineProperty(KeyboardRow, "contextType", keyboardContext);

var KeyboardKey = /*#__PURE__*/function (_Component3) {
  _inherits(KeyboardKey, _Component3);

  var _super3 = _createSuper(KeyboardKey);

  function KeyboardKey() {
    _classCallCheck(this, KeyboardKey);

    return _super3.apply(this, arguments);
  }

  _createClass(KeyboardKey, [{
    key: "getColor",
    value: function getColor() {
      var _this$context = this.context,
          sym = _this$context.sym,
          theme = _this$context.theme;
      var keyColor = theme.keyColor,
          keyActiveColor = theme.keyActiveColor;
      var item = this.props.item;

      if (item.id === 'sym') {
        return sym ? keyActiveColor : keyColor;
      } else {
        return keyColor;
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$context2 = this.context,
          keyHeight = _this$context2.keyHeight,
          gap = _this$context2.gap;
      var item = this.props.item,
          _item$flex = item.flex,
          flex = _item$flex === void 0 ? 1 : _item$flex;
      return {
        height: keyHeight + 'px',
        flex: flex,
        padding: gap + 'px'
      };
    }
  }, {
    key: "getKeyStyle",
    value: function getKeyStyle(mode) {
      var theme = this.context.theme;
      var keyBackground = theme.keyBackground,
          keyColor = theme.keyColor,
          keyBoxShadow = theme.keyBoxShadow;
      return {
        color: mode === 'shadow' ? keyBackground : this.getColor(),
        background: mode === 'shadow' ? keyColor : keyBackground,
        boxShadow: keyBoxShadow
      };
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      var _this$context3 = this.context,
          keydown = _this$context3.keydown,
          getUpper = _this$context3.getUpper,
          isMobile = _this$context3.isMobile;

      var containerProps = _defineProperty({
        className: "key-container",
        style: this.getStyle()
      }, isMobile ? 'onTouchStart' : 'onMouseDown', function () {
        return keydown(item);
      });

      var keyProps = {
        className: item.className + ' keyboard-key',
        id: item.id,
        style: this.getKeyStyle()
      };
      return /*#__PURE__*/_react.default.createElement("div", containerProps, /*#__PURE__*/_react.default.createElement("div", keyProps, item.hotKey && /*#__PURE__*/_react.default.createElement("span", null, item.hotKey), getUpper(item), item.active && /*#__PURE__*/_react.default.createElement("div", {
        className: "keyboard-key key-shadow",
        style: this.getKeyStyle('shadow')
      }, getUpper(item))));
    }
  }]);

  return KeyboardKey;
}(_react.Component);

_defineProperty(KeyboardKey, "contextType", keyboardContext);

var KeyboardHeader = /*#__PURE__*/function (_Component4) {
  _inherits(KeyboardHeader, _Component4);

  var _super4 = _createSuper(KeyboardHeader);

  function KeyboardHeader(props) {
    _classCallCheck(this, KeyboardHeader);

    return _super4.call(this, props);
  }

  _createClass(KeyboardHeader, [{
    key: "getLCDStyle",
    value: function getLCDStyle() {
      var _this$context4 = this.context,
          theme = _this$context4.theme,
          keyHeight = _this$context4.keyHeight,
          gap = _this$context4.gap;
      var screenBackground = theme.screenBackground;
      return {
        background: screenBackground,
        minHeight: keyHeight - 2 * gap + 'px',
        maxHeight: keyHeight * 3 + 'px'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context5 = this.context,
          value = _this$context5.value,
          gap = _this$context5.gap,
          init = _this$context5.init,
          lcdMouseDown = _this$context5.lcdMouseDown,
          theme = _this$context5.theme,
          isMobile = _this$context5.isMobile;
      var highlight = theme.highlight,
          screenColor = theme.screenColor;

      var lcdProps = _defineProperty({
        className: 'keyboard-lcd',
        style: this.getLCDStyle()
      }, isMobile ? 'onTouchStart' : 'onMouseDown', lcdMouseDown);

      var markProps = {
        style: {
          background: init ? highlight : 'none',
          color: init ? '#fff' : screenColor
        }
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "keyboard-header"
      }, /*#__PURE__*/_react.default.createElement("div", lcdProps, /*#__PURE__*/_react.default.createElement("mark", markProps, value)));
    }
  }]);

  return KeyboardHeader;
}(_react.Component);

_defineProperty(KeyboardHeader, "contextType", keyboardContext);

var KeyboardTitle = /*#__PURE__*/function (_Component5) {
  _inherits(KeyboardTitle, _Component5);

  var _super5 = _createSuper(KeyboardTitle);

  function KeyboardTitle(props) {
    _classCallCheck(this, KeyboardTitle);

    return _super5.call(this, props);
  }

  _createClass(KeyboardTitle, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context6 = this.context,
          keyHeight = _this$context6.keyHeight,
          theme = _this$context6.theme,
          gap = _this$context6.gap;
      var titleColor = theme.titleColor;
      return {
        height: keyHeight + 'px',
        color: titleColor
      };
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage() {
      var _this$context7 = this.context,
          changeLanguage = _this$context7.changeLanguage,
          languageIndex = _this$context7.languageIndex,
          languages = _this$context7.languages;

      if (languageIndex === false) {
        languageIndex = 0;
      } else if (languageIndex < languages.length - 1) {
        languageIndex++;
      } else {
        languageIndex = false;
      }

      changeLanguage(languageIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$context8 = this.context,
          title = _this$context8.title,
          languages = _this$context8.languages;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "keyboard-title",
        style: this.getStyle()
      }, /*#__PURE__*/_react.default.createElement("span", null, title), languages && languages.length !== 0 && /*#__PURE__*/_react.default.createElement("svg", {
        onClick: function onClick() {
          return _this4.changeLanguage();
        },
        style: {
          width: "24px",
          height: "24px",
          background: "#000000"
        },
        width: 24,
        height: 24
      }, /*#__PURE__*/_react.default.createElement("path", {
        fill: "transparent",
        stroke: "#ffffff",
        d: "M5 20 L12 3 L19 20",
        strokeLinejoin: "round",
        strokeLinecap: "round",
        strokeWidth: 3
      }), /*#__PURE__*/_react.default.createElement("path", {
        fill: "transparent",
        stroke: "#ffffff",
        d: "M8 14 L16 14",
        strokeLinejoin: "round",
        strokeLinecap: "round",
        strokeWidth: 3
      })));
    }
  }]);

  return KeyboardTitle;
}(_react.Component);

_defineProperty(KeyboardTitle, "contextType", keyboardContext);