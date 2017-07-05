'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = initializeApollo;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonActions = require('@storybook/addon-actions');

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _reactApollo = require('react-apollo');

var _graphqlTools = require('graphql-tools');

var _redux = require('redux');

var _apolloTestUtils = require('apollo-test-utils');

var _reduxLogger = require('redux-logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Log redux actions to Storybook
 * @type {Object}
 */
var storybookReduxLogger = _extends({}, console, {
  log: function log() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, _toConsumableArray(args)); // eslint-disable-line no-console

    var _args = _slicedToArray(args, 3),
        lastItem = _args[2];

    if (lastItem && lastItem.type) {
      (0, _addonActions.action)('' + lastItem.type)(lastItem);
    }
  }
});

function initializeApollo(_ref) {
  var typeDefs = _ref.typeDefs,
      mocks = _ref.mocks,
      _ref$reducers = _ref.reducers,
      reducers = _ref$reducers === undefined ? {} : _ref$reducers;

  var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs });
  if (!!mocks) {
    (0, _graphqlTools.addMockFunctionsToSchema)({
      schema: schema,
      mocks: mocks
    });
  }

  var graphqlClient = new _apolloClient2.default({
    addTypename: true,
    networkInterface: (0, _apolloTestUtils.mockNetworkInterfaceWithSchema)({ schema: schema }),
    connectToDevTools: true
  });

  var logger = (0, _reduxLogger.createLogger)({
    logger: storybookReduxLogger
  });

  var reducer = (0, _redux.combineReducers)(_extends({
    apollo: graphqlClient.reducer()
  }, reducers));

  var store = (0, _redux.createStore)(reducer, (0, _redux.applyMiddleware)(logger, graphqlClient.middleware()));

  function StorybookProvider(_ref2) {
    var children = _ref2.children;

    return _react2.default.createElement(
      _reactApollo.ApolloProvider,
      { store: store, client: graphqlClient },
      _react2.default.createElement(
        'div',
        null,
        children
      )
    );
  }

  return function (story) {
    return _react2.default.createElement(
      StorybookProvider,
      null,
      story()
    );
  };
}