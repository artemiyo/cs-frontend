interface BinaryTreeNodeOptions<T> {
  parent?: BinaryTreeNode<T>;
  leftChild?: BinaryTreeNode<T>;
  rightChild?: BinaryTreeNode<T>;
}

class BinaryTreeNode<T> {
  value: T;

  parent: BinaryTreeNode<T>;
  leftChild: BinaryTreeNode<T>;
  rightChild: BinaryTreeNode<T>;

  constructor(
    value: T,
    {
      parent = null,
      leftChild = null,
      rightChild = null,
    }: BinaryTreeNodeOptions<T> = {}
  ) {
    this.value = value;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class BST<T> {
  root: BinaryTreeNode<T> | null;

  constructor(rootValue: T, protected comparator: (a: T, b: T) => number) {
    this.root = new BinaryTreeNode<T>(rootValue);
  }

  order(direction: "pre" | "post" | "in") {
    return iterate(this.root);

    function* iterate(node: BinaryTreeNode<T> | null) {
      if (node === null) {
        return;
      }

      if (direction === "pre") {
        yield node.value;
        yield* iterate(node.leftChild);
        yield* iterate(node.rightChild);
      }

      if (direction === "post") {
        yield* iterate(node.leftChild);
        yield* iterate(node.rightChild);
        yield node.value;
      }

      if (direction === "in") {
        yield* iterate(node.leftChild);
        yield node.value;
        yield* iterate(node.rightChild);
      }
    }
  }

  add(value: T) {
    const { comparator } = this;
    recAdd(this.root);

    function recAdd(node: BinaryTreeNode<T> | null) {
      if (node === null) {
        return;
      }

      const comp = comparator(value, node.value);
      if (comp < 0) {
        if (node.leftChild === null) {
          node.leftChild = new BinaryTreeNode<T>(value, { parent: node });
        } else {
          recAdd(node.leftChild);
        }

        return;
      }

      if (comp > 0) {
        if (node.rightChild === null) {
          node.rightChild = new BinaryTreeNode<T>(value, { parent: node });
        } else {
          recAdd(node.rightChild);
        }
        return;
      }
    }
  }

  find(value: T): BinaryTreeNode<T> | null {
    const { comparator } = this;

    return recFind(this.root);

    function recFind(node: BinaryTreeNode<T> | null) {
      if (node === null) {
        return null;
      }

      const comp = comparator(value, node.value);

      if (comp === 0) {
        return node;
      }

      if (comp < 0) {
        return recFind(node.leftChild);
      }

      if (comp > 0) {
        return recFind(node.rightChild);
      }
    }
  }

  delete(value: T): BinaryTreeNode<T> | null {
    const that = this;
    const nodeToRemove = this.find(value);

    if (nodeToRemove === null) {
      return null;
    }

    const nodeToReplace =
      max(nodeToRemove.leftChild) ?? min(nodeToRemove.rightChild);

    if (nodeToReplace === null) {
      removeFromParent(nodeToRemove);
    } else {
      removeFromParent(nodeToRemove);
      nodeToReplace.parent = nodeToRemove.parent;
      nodeToReplace.leftChild = nodeToRemove.leftChild;
      nodeToReplace.rightChild = nodeToRemove.rightChild;
      swapFromParent(nodeToRemove, nodeToReplace);
    }

    function min(node: BinaryTreeNode<T> | null) {
      if (node === null) {
        return;
      }

      return node.leftChild === null ? node : min(node.leftChild);
    }

    function max(node: BinaryTreeNode<T> | null) {
      if (node === null) {
        return;
      }

      return node.rightChild === null ? node : max(node.rightChild);
    }

    function removeFromParent(node: BinaryTreeNode<T> | null) {
      if (node === null) {
        return;
      }

      const { parent } = node;

      if (parent === null) {
        that.root = null;
        return;
      }

      if (parent.leftChild === node) {
        parent.leftChild = null;
      } else {
        parent.rightChild = null;
      }
    }

    function swapFromParent(
      from: BinaryTreeNode<T> | null,
      to: BinaryTreeNode<T>
    ) {
      if (from === null) {
        return;
      }

      const { parent } = from;

      if (parent === null) {
        that.root = to;
        return;
      }

      if (parent.leftChild === from) {
        parent.leftChild = to;
      } else {
        parent.rightChild = to;
      }
    }
  }
}

const bst = new BST(10, (a, b) => a - b);
bst.add(8);
bst.add(4);
bst.add(9);

bst.add(12);
bst.add(11);
bst.add(17);

// console.log(...bst.order("pre"));
// console.log(...bst.order("post"));
// console.log(...bst.order("in"));
console.log(bst.find(11));
