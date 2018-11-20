import React, { Component } from 'react';
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  getTreeFromFlatData,
} from 'react-sortable-tree';

import Title from '../shared/Title';
import Button from '../shared/Button';

import { stableSort } from '../../utils/stableSort';
import { data } from '../../data';

const sortedData = stableSort(data, (a, b) => {
  return a.position - b.position;
});

const treeData = getTreeFromFlatData({
  flatData: sortedData,
  getKey: node => node.id, // resolve a node's key
  getParentKey: node => node.parent_id, // resolve a node's parent's key
  rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
});

export default class Benchmark extends Component {
  state = {
    product: [{ title: 'Product Title', children: treeData }],
  };

  changeTitleHandler = ({ event, node, path }) => {
    const title = event.target.value;
    this.setState(state => ({
      product: changeNodeAtPath({
        treeData: state.product,
        path,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: { ...node, title },
      }),
    }));
  };

  bottonAddHandler = path => {
    this.setState(state => ({
      product: addNodeUnderParent({
        treeData: state.product,
        parentKey: path[path.length - 1],
        expandParent: true,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: {
          title: '',
        },
        addAsFirstChild: state.addAsFirstChild,
      }).treeData,
    }));
  };

  buttonDeleteHandler = path => {
    this.setState(state => ({
      product: removeNodeAtPath({
        treeData: state.product,
        path,
        getNodeKey: ({ treeIndex }) => treeIndex,
      }),
    }));
  };

  render() {
    return (
      <SortableTree
        treeData={this.state.product}
        onChange={product => this.setState({ product })}
        generateNodeProps={({ node, path }) => {
          return {
            title: (
              <Title
                node={node}
                path={path}
                onChange={this.changeTitleHandler}
              />
            ),
            buttons: [
              <Button
                path={path}
                text="Add Child"
                onClick={this.bottonAddHandler}
              />,
              <Button
                path={path}
                text="Remove"
                onClick={this.buttonDeleteHandler}
              />,
            ],
          };
        }}
        scaffoldBlockPxWidth={24}
      />
    );
  }
}
