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
class GridSelector extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        let sameProps = false;
        if (this.props.selecting !== nextProps.selecting ||
            this.props.selectionMinOffset !== nextProps.selectionMinOffset ||
            this.props.selectionMaxOffset !== nextProps.selectionMaxOffset) {
            sameProps = true;
        }
        return sameProps;
    }
    render() {
        const { selecting, selectionMinOffset, selectionMaxOffset } = this.props;
        if (!selecting)
            return null;
        let selectorStyles = {
            left: selectionMinOffset.x,
            top: selectionMinOffset.y,
            width: selectionMaxOffset.x - selectionMinOffset.x,
            height: selectionMaxOffset.y - selectionMinOffset.y,
        };
        return React.createElement("div", { className: classnames_1.default(''), style: selectorStyles });
    }
}
exports.GridSelector = GridSelector;
