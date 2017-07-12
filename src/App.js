import React, { Component } from 'react';
import Index from './components';
import '../node_modules/antd/dist/antd.min.css';
import '../node_modules/antd/dist/antd.min.js';
import { LocaleProvider } from 'antd';


class App extends Component {
  render() {
    return (
      <div>
        <LocaleProvider>
          <Index />
        </LocaleProvider>
      </div>
    );
  }
}

export default App;
