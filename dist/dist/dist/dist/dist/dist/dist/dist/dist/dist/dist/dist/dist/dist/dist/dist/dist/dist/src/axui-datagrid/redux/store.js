"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducer_1 = require("./reducer");
exports.store = redux_1.createStore(reducer_1.gridReducer, window['__REDUX_DEVTOOLS_EXTENSION__'] &&
    window['__REDUX_DEVTOOLS_EXTENSION__']());
//# sourceMappingURL=store.js.map