import React from 'react';
import { sortable } from 'react-anything-sortable';

@sortable
export default class DemoHOCItem extends React.Component {
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
