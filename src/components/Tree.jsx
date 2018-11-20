import React, { Component, Fragment } from 'react';

import Benchmark from './Benchmark';
import Product from './Product';

export default class Tree extends Component {
  render() {
    return (
      <Fragment>
        <div style={{ height: 100 + 'vh', width: 50 + '%' }}>
          <Benchmark />
        </div>
        <div style={{ height: 100 + 'vh', width: 50 + '%' }}>
          <Product />
        </div>
      </Fragment>
    );
  }
}
