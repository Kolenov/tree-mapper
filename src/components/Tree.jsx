import React, { Component } from "react";
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  getFlatDataFromTree,
  getTreeFromFlatData,
} from "react-sortable-tree";

// import "react-sortable-tree/style.css";
import "../components/node-renderer-default.css";
import "../components/tree-node.css";
import "../components/react-sortable-tree.css";

import { stableSort } from "../utils/stableSort";
import { data } from "../data";

const sortedData = stableSort(data, (a, b) => {
  return a.position - b.position;
});

const treeData = {
  treeData: getTreeFromFlatData({
    flatData: sortedData,
    getKey: node => node.id, // resolve a node's key
    getParentKey: node => node.parent_id, // resolve a node's parent's key
    rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
  }),
};

export default class Tree extends Component {
  state = treeData;

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div style={{ height: 100 + "vh" }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          generateNodeProps={({ node, path }) => {
            return {
              title: (
                <input
                  value={node.title}
                  onChange={event => {
                    const title = event.target.value;

                    this.setState(state => ({
                      treeData: changeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                        newNode: { ...node, title },
                      }),
                    }));
                  }}
                />
              ),
              treeIndex: node.position,
              buttons: [
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: addNodeUnderParent({
                        treeData: state.treeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {
                          title: "",
                        },
                        addAsFirstChild: state.addAsFirstChild,
                      }).treeData,
                    }))
                  }
                >
                  Add Child
                </button>,
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }))
                  }
                >
                  Remove
                </button>,
                node.children && <span>{node.children.length}</span>,
              ],
            };
          }}
          scaffoldBlockPxWidth={24}
        />
      </div>
    );
  }
}
