import * as React from 'react';
import * as UTIL from '../util';
import cx from 'classnames';
import { GridHeaderPanel } from './GridHeaderPanel';
export class GridHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnResizing: false,
            columnResizerLeft: 0
        };
        this.onMouseDownColumnResizer = this.onMouseDownColumnResizer.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        let sameProps = false;
        if (this.props.mounted !== nextProps.mounted ||
            this.props.optionsHeader !== nextProps.optionsHeader ||
            this.props.styles !== nextProps.styles ||
            this.props.headerColGroup !== nextProps.headerColGroup ||
            this.props.scrollLeft !== nextProps.scrollLeft ||
            this.props.selectionCols !== nextProps.selectionCols ||
            this.props.focusedCol !== nextProps.focusedCol ||
            this.state.columnResizing !== nextState.columnResizing ||
            this.state.columnResizerLeft !== nextState.columnResizerLeft ||
            this.props.sortInfo !== nextProps.sortInfo) {
            sameProps = true;
        }
        return sameProps;
    }
    onMouseDownColumnResizer(e, col) {
        e.preventDefault();
        const resizer = e.target;
        const prevLeft = Number(resizer.getAttribute('data-prev-left'));
        const currLeft = Number(resizer.getAttribute('data-left'));
        const { x: rootX } = this.props.getRootBounding();
        let newWidth;
        let startMousePosition = UTIL.getMousePosition(e).x;
        const onMouseMove = (ee) => {
            const { x, y } = UTIL.getMousePosition(ee);
            let newLeft = currLeft + x - startMousePosition;
            if (newLeft < prevLeft) {
                newLeft = prevLeft;
            }
            newWidth = newLeft - prevLeft;
            this.setState({
                columnResizing: true,
                columnResizerLeft: x - rootX + 1
            });
        };
        const offEvent = (ee) => {
            ee.preventDefault();
            startMousePosition = null;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', offEvent);
            document.removeEventListener('mouseleave', offEvent);
            this.setState({
                columnResizing: false
            });
            if (typeof newWidth !== 'undefined')
                this.props.onResizeColumnResizer(e, col, newWidth);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', offEvent);
        document.addEventListener('mouseleave', offEvent);
    }
    printHeader(_panelName, _colGroup, _bodyRow, _style) {
    }
    render() {
        const { mounted, optionsHeader, styles, frozenColumnIndex, colGroup, asideColGroup, leftHeaderColGroup, headerColGroup, asideHeaderData, leftHeaderData, headerData, scrollLeft } = this.props;
        if (!mounted)
            return null;
        let asideHeaderPanelStyle = {
            left: 0,
            width: styles.asidePanelWidth,
            height: styles.headerHeight
        };
        let leftHeaderPanelStyle = {
            left: styles.asidePanelWidth,
            width: styles.frozenPanelWidth,
            height: styles.headerHeight
        };
        let headerPanelStyle = {
            left: styles.frozenPanelWidth + styles.asidePanelWidth,
            width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
            height: styles.headerHeight
        };
        let headerScrollStyle = {
            height: styles.headerHeight,
            left: scrollLeft
        };
        return (React.createElement("div", { className: cx('axd-header'), style: { height: styles.headerHeight } },
            (styles.asidePanelWidth > 0) ? React.createElement(GridHeaderPanel, { panelName: 'aside-header', colGroup: asideColGroup, bodyRow: asideHeaderData, style: asideHeaderPanelStyle, optionsHeader: this.props.optionsHeader, focusedCol: this.props.focusedCol, selectionCols: this.props.selectionCols, onClickHeader: this.props.onClickHeader, sortInfo: this.props.sortInfo, onMouseDownColumnResizer: this.onMouseDownColumnResizer }) : null,
            (frozenColumnIndex > 0) ? React.createElement(GridHeaderPanel, { panelName: 'left-header', colGroup: leftHeaderColGroup, bodyRow: leftHeaderData, style: leftHeaderPanelStyle, optionsHeader: this.props.optionsHeader, focusedCol: this.props.focusedCol, selectionCols: this.props.selectionCols, onClickHeader: this.props.onClickHeader, sortInfo: this.props.sortInfo, onMouseDownColumnResizer: this.onMouseDownColumnResizer }) : null,
            React.createElement("div", { "data-scroll-container": 'header-scroll-container', style: headerPanelStyle },
                React.createElement(GridHeaderPanel, { panelName: 'header-scroll', colGroup: headerColGroup, bodyRow: headerData, style: headerScrollStyle, optionsHeader: this.props.optionsHeader, focusedCol: this.props.focusedCol, selectionCols: this.props.selectionCols, onClickHeader: this.props.onClickHeader, sortInfo: this.props.sortInfo, onMouseDownColumnResizer: this.onMouseDownColumnResizer })),
            this.state.columnResizing ? React.createElement("div", { "data-column-resizing": true, style: { left: this.state.columnResizerLeft } }) : null));
    }
}
