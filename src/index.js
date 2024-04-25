import React from 'react';
import ReactDOM from 'react-dom/client';
import LegacyReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  log(...args) {
    console.log(this.props.tag, ...args);
  }

  componentDidMount() {
    this.log('componentDidMount');
  }

  componentDidUpdate() {
    this.log('componentDidUpdate');
  }

  componentWillUnmount() {
    this.log('componentWillUnmount');
  }

  componentDidCatch(error) {
    this.log('componentDidCatch', error);
  }

  onClick() {
    this.log('onClick');
    setTimeout(() => {
      try { 
        this.log('onClick async 1');
        this.setState({}, () => {
          this.log('onClick setState callback 1');
        });
        this.log('onClick async 2');
        this.setState({}, () => {
          this.log('onClick setState callback 2');
        });
        this.log('onClick async finish');
      } catch (e) {
        this.log('onClick async error', e);
      }
    }, 1);
    this.log('onClick finish');
  }

  onClickError() {
    this.log('onClickError');
    setTimeout(() => {
      try { 
        this.log('onClickError async');
        this.setState({}, () => {
          this.log('onClickError setState callback');
          throw new Error('onClickError');
        });
        this.log('onClickError async finish');
      } catch (e) {
        this.log('onClickError async error', e);
      }
    }, 1);
    this.log('onClickError finish');
  }

  onClickSync() {
    this.log('onClickSync');
    setTimeout(() => {
      try { 
        this.log('onClickSync async 1');
        LegacyReactDOM.flushSync(() => {
          this.setState({}, () => {
            this.log('onClickSync setState callback 1');
          });
        });
        this.log('onClickSync async 2');
        LegacyReactDOM.flushSync(() => {
          this.setState({}, () => {
            this.log('onClickSync setState callback 2');
          });
        });
        this.log('onClickSync async finish');
      } catch (e) {
        this.log('onClickSync async error', e);
      }
    }, 1);
    this.log('onClickSync finish');
  }

  render() {
    this.log('render');
    return (<>
      <button type="button" onClick={() => this.onClick()}>Button: {JSON.stringify(this.props)}</button>
      <button type="button" onClick={() => this.onClickSync()}>Sync: {JSON.stringify(this.props)}</button>
      <button type="button" onClick={() => this.onClickError()}>Error: {JSON.stringify(this.props)}</button>
    </>);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App tag="normal" />);
LegacyReactDOM.render(<App tag="legacy" />, document.getElementById('root-legacy'));
