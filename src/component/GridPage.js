import React from 'react';
import classNames from 'classnames'

class GridPage extends React.Component {
  constructor(props) {
    super(props);

  }

  shouldComponentUpdate(nextProps, nextState) {
    let sameProps = false;

    if (
      this.props.mounted !== nextProps.mounted ||
      JSON.stringify(this.props.styles) !== JSON.stringify(nextProps.styles)
    ) {

      sameProps = true;
    }

    return sameProps;
  }

  render() {
    const mounted = this.props.mounted,
          gridCSS = this.props.gridCSS,
          styles = this.props.styles;

    if (!mounted) return null;

    return (
      <div className={classNames(gridCSS.page)} style={{height: styles.pageHeight}}>

      </div>
    )
  }
}

export default GridPage;