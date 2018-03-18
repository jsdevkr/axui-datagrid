"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
class GridRootContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: classnames_1.default('ax-datagrid'), tabIndex: (-1), style: this.props.style, onWheel: e => {
                this.props.onFireEvent('wheel', e);
            }, onKeyDown: e => {
                this.props.onFireEvent('keydown', e);
            }, onKeyUp: e => {
                this.props.onFireEvent('keyup', e);
            }, onMouseDown: e => {
                this.props.onFireEvent('mousedown', e);
            }, onMouseUp: e => {
                this.props.onFireEvent('mouseup', e);
            }, onClick: e => {
                this.props.onFireEvent('click', e);
            } }, this.props.children));
    }
}
exports.GridRootContainer = GridRootContainer;
