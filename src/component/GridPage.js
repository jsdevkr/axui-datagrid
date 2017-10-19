import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

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
          styles = this.props.styles;

    if (!mounted) return null;

    return (
      <div className={classNames(sass.gridPage)} style={{height: styles.pageHeight}}>

      </div>
    )
  }
}

export default GridPage;