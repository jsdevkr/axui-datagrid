import * as React from 'react';
import classNames from 'classnames'
import { iGridPage } from '../_inc/namespaces';

export class GridPage extends React.Component<iGridPage.Props, iGridPage.State> {
  constructor(props: iGridPage.Props) {
    super(props);
  }

  public shouldComponentUpdate(nextProps, nextState) {
    let sameProps = false;

    if (
      this.props.mounted !== nextProps.mounted ||
      this.props.pageButtons !== nextProps.pageButtons ||
      this.props.styles !== nextProps.styles
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
        <div className={classNames(gridCSS.pageButtons)} style={{width: pageButtonsContainerWidth}}>
          {pageButtons.map((button, bi) => {
            return <button key={bi} style={{height: pageButtonHeight, width: button.width || pageButtonHeight}} onClick={e => onClickPageButton(e, button.onClick)}>
              <div data-button-svg className={classNames(gridCSS[button.className])} />
            </button>
          })}
        </div>
      </div>
    )
  }
}
