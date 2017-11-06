import React from 'react';
import classNames from 'classnames'

class GridPage extends React.Component {
  constructor(props) {
    super(props);

    this.onClickPageButton = this.onClickPageButton.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let sameProps = false;

    if (
      this.props.mounted !== nextProps.mounted ||
      this.props.pageButtons !== nextProps.pageButtons ||
      JSON.stringify(this.props.styles) !== JSON.stringify(nextProps.styles)
    ) {

      sameProps = true;
    }

    return sameProps;
  }

  onClickPageButton(e, onClick) {
    console.log(onClick);

  }

  render() {
    const mounted                   = this.props.mounted,
          gridCSS                   = this.props.gridCSS,
          styles                    = this.props.styles,
          pageButtonsContainerWidth = this.props.pageButtonsContainerWidth,
          pageButtons               = this.props.pageButtons,
          pageButtonHeight          = this.props.pageButtonHeight;

    if (!mounted) return null;

    return (
      <div className={classNames(gridCSS.page)} style={{height: styles.pageHeight}}>
        <div className={classNames(gridCSS.pageButtons)} style={{width: pageButtonsContainerWidth, paddingTop: (styles.pageHeight - pageButtonHeight) / 2 - 1}}>
          {pageButtons.map((button, bi) => {
            return <button key={bi} style={{height: pageButtonHeight, width: button.width || pageButtonHeight}} onClick={e => this.onClickPageButton(e, button.onClick)}>
              <div data-button-svg className={classNames(gridCSS[button.className])}></div>
            </button>
          })}
        </div>
      </div>
    )
  }
}

export default GridPage;