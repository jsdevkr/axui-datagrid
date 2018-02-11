import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Range } from 'immutable';
import throttle from 'lodash-es/throttle';
import classNames from 'classnames';
import { getInnerHeight } from '../util';
export class GridColumnFilterOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: props.options.length * 20,
            optionItemHeight: 20
        };
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        const clientHeight = getInnerHeight(ReactDOM.findDOMNode(this.refs['options-container']));
        this.setState({
            mounted: true,
            clientHeight: clientHeight
        });
    }
    getOption() {
        const { options, onChange } = this.props;
        let sIndex = Math.floor(this.state.scrollTop / this.state.optionItemHeight);
        let eIndex = Math.floor(this.state.scrollTop / this.state.optionItemHeight) + Math.ceil(this.state.clientHeight / this.state.optionItemHeight);
        if (eIndex > options.length)
            eIndex = options.length;
        const paddingTopNode = React.createElement("div", { style: { height: sIndex * this.state.optionItemHeight } });
        const paddingBottomNode = React.createElement("div", { style: { height: (options.length - eIndex) * this.state.optionItemHeight } });
        return React.createElement("div", null,
            paddingTopNode,
            Range(sIndex, eIndex).map((i) => {
                const option = options[i];
                return React.createElement("div", { key: i, "data-option": true, "data-checked": option.checked, style: { lineHeight: this.state.optionItemHeight + 'px' }, onClick: e => {
                        onChange(option.value, !option.checked, option.checkAll);
                    } },
                    React.createElement("div", { className: classNames('axd-option-check-box') }),
                    React.createElement("span", { className: classNames('axd-option-text') }, option.text));
            }),
            paddingBottomNode);
    }
    onScroll(e) {
        this.setState({
            scrollTop: e.target.scrollTop
        });
    }
    render() {
        return React.createElement("div", { "data-options": '', ref: 'options-container', onScroll: throttle(this.onScroll, 10) }, this.state.mounted ? this.getOption() : null);
    }
}
