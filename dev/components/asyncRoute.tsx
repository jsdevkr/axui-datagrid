import * as React from 'react';

const moduleDefaultExport = module => module.export || module;

export default function asyncRoute( getComponent ) {

  return class AsyncRoute extends React.Component<any, any> {
    static Component = null;
    _mounted: boolean = false;

    constructor( props ) {
      super( props );

      this.state = {
        Component: AsyncRoute.Component
      }
    }

    componentWillMount() {
      if ( !this.state.Component ) {
        getComponent()
          .then( moduleDefaultExport )
          .then( Component => {
            AsyncRoute.Component = Component;

            if ( this._mounted ) {
              this.setState( { Component } );
            } else {
              // this.state.Component = component;
            }
          } )
      }
    }

    componentDidMount() {
      this._mounted = true;
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
}