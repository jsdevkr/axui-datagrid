import * as React from 'react';

const isHMR = () => module.hot && module.hot.active;

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

    loadComponent() {
      getComponent()
        .then( m => m.default || m )
        .then( m => {
          AsyncRoute.Component = m;
          if ( this._mounted ) {
            this.setState( { Component: m } );
          }
        } )
    }

    componentWillMount() {
      if ( !this.state.Component ) {
        this.loadComponent();
      }
    }

    componentDidMount() {
      this._mounted = true;
    }

    componentWillUnmount() {
      this._mounted = false;
    }

    componentWillReceiveProps( nextProps ) {
      if ( isHMR() ) {
        // console.log( module );
        console.log( 'this.loadComponent()', this.state.Component );
        this.loadComponent();
      }
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
}