import * as React from 'react';
import cx from 'classnames';
export class GridRootContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: cx('ax-datagrid'), tabIndex: (-1), style: this.props.style, onWheel: e => {
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
