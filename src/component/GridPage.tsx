import * as React from 'react';
import classNames from 'classnames'

export namespace GridPage {
  export interface Props {
    mounted: boolean;
    gridCSS: any;
    styles: any;
    pageButtonsContainerWidth: number;
    pageButtons: any;
    pageButtonHeight: number;
    onClickPageButton: Function
  }

  export interface State {
    /* empty */
  }
}


export class GridPage extends React.Component<GridPage.Props, GridPage.State> {
  constructor(props) {
    super(props);
  }

  public shouldComponentUpdate(nextProps, nextState) {
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

  public render() {
    const {
      mounted,
      gridCSS,
      styles,
      pageButtonsContainerWidth,
      pageButtons,
      pageButtonHeight,
      onClickPageButton
    } = this.props;

    if (!mounted) return null;

    return (
      <div className={classNames(gridCSS.page)} style={{height: styles.pageHeight}}>
        <div className={classNames(gridCSS.pageButtons)} style={{width: pageButtonsContainerWidth, paddingTop: (styles.pageHeight - pageButtonHeight) / 2 - 1}}>
          {pageButtons.map((button, bi) => {
            return <button key={bi} style={{height: pageButtonHeight, width: button.width || pageButtonHeight}} onClick={e => onClickPageButton(e, button.onClick)}>
              <div data-button-svg className={classNames(gridCSS[button.className])}></div>
            </button>
          })}
        </div>
      </div>
    )
  }
}
