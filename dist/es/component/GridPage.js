import * as React from 'react';
import classNames from 'classnames';
export class GridPage extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        let sameProps = false;
        if (this.props.mounted !== nextProps.mounted ||
            this.props.pageButtons !== nextProps.pageButtons ||
            this.props.styles !== nextProps.styles) {
            sameProps = true;
        }
        return sameProps;
    }
    render() {
        const { mounted, styles, pageButtonsContainerWidth, pageButtons, pageButtonHeight, onClickPageButton } = this.props;
        if (!mounted)
            return null;
        return (React.createElement("div", { className: classNames('axd-page'), style: { height: styles.pageHeight } },
            React.createElement("div", { className: classNames('axd-page-buttons'), style: { width: pageButtonsContainerWidth } }, pageButtons.map((button, bi) => {
                return React.createElement("button", { key: bi, style: { height: pageButtonHeight, width: button.width || pageButtonHeight }, onClick: e => onClickPageButton(e, button.onClick) },
                    React.createElement("div", { "data-button-svg": true, className: classNames(button.className) }));
            }))));
    }
}
