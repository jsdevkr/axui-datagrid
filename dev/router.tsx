import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import style from 'Style';
import { withRouter } from 'react-router';
import { SideNav } from 'components';
import * as Pages from 'pages';
import 'scss/index.scss';
import 'datagrid-ts/scss/index.scss';

const RedirectToIntro = () => <Redirect to="/introduction" />;

class AppRouter extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  private toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  public render() {
    const { visible } = this.state;
    const mainStyle = style.main;

    return (
      <div style={style.container}>
        <SideNav style={style.menu} />
        <div style={mainStyle}>
          <Switch>
            <Route exact path="/" render={RedirectToIntro} />
            <Route
              exact
              path="/introduction"
              render={() => <Pages.Introduction />}
            />
            <Route path="/Usage" render={() => <Pages.Usage />} />
            <Route path="/props" render={() => <Pages.Props />} />
            <Route
              path="/sample/:name"
              render={p => <Pages.ExampleRoot {...p} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(withRouter(AppRouter));
