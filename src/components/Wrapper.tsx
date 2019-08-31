import * as React from 'react';

type padding = boolean | 0 | 5 | 10 | 20;

interface IProps {
  padded?: padding;
}

class Wrapper extends React.Component<IProps, any> {
  getStylePadding = (padded: padding) => {
    let paddingStyleValue = '';
    switch (padded) {
      case true:
        paddingStyleValue = '10px';
        break;
      case false:
      case 0:
        paddingStyleValue = '0';
        break;
      case 5:
        paddingStyleValue = '5px';
        break;
      case 10:
        paddingStyleValue = '10px';
        break;
      case 20:
        paddingStyleValue = '20px';
        break;
      default:
        break;
    }
    return paddingStyleValue;
  };

  render() {
    const { padded = false } = this.props;
    let myStyle = {
      padding: this.getStylePadding(padded),
    };

    return <div style={myStyle}>{this.props.children}</div>;
  }
}

export default Wrapper;
