type Comparator<T> = (a: T, B: T) => number;

interface BinaryTreeNodeOptions<T> {
  comparator: Comparator<T>;

  parent?: BinaryTreeNode<T> | null;
  leftChild?: BinaryTreeNode<T> | null;
  rightChild?: BinaryTreeNode<T> | null;
}

class BinaryTreeNode<T> {
  value: T;
  comparator: Comparator<T>;

  parent: BinaryTreeNode<T> | null;
  leftChild: BinaryTreeNode<T> | null;
  rightChild: BinaryTreeNode<T> | null;

  constructor(
    value: T,

    {
      comparator,
      parent = null,
      leftChild = null,
      rightChild = null,
    }: BinaryTreeNodeOptions<T>
  ) {
    this.value = value;
    this.comparator = comparator;

    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }

  remove() {
    if (this.parent == null) {
      return;
    }

    if (this.parent.leftChild === this) {
      this.parent.leftChild = null;
    } else {
      this.parent.rightChild = null;
    }

    this.parent = null;
  }

  setParent(parent: BinaryTreeNode<T> | null) {
    this.remove();

    if (parent == null) {
      return;
    }

    this.parent = parent;

    if (this.comparator(this.value, parent.value) > 0) {
      parent.rightChild = this;
    } else {
      parent.leftChild = this;
    }
  }

  setLeftChild(child: BinaryTreeNode<T> | null) {
    if (child == null) {
      this.leftChild = null;
    } else {
      child.setParent(this);
    }
  }

  setRightChild(child: BinaryTreeNode<T> | null) {
    if (child == null) {
      this.rightChild = null;
    } else {
      child.setParent(this);
    }
  }
}

class BST<T> {
  root: BinaryTreeNode<T> | null;

  constructor(rootValue: T, protected comparator: (a: T, B: T) => number) {
    this.root = new BinaryTreeNode<T>(rootValue, { comparator });
  }

  preOrder() {
    return iterate(this.root);

    function* iterate(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return;
      }

      yield node.value;
      yield* iterate(node.leftChild);
      yield* iterate(node.rightChild);
    }
  }

  postOrder() {
    return iterate(this.root);

    function* iterate(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return;
      }

      yield* iterate(node.leftChild);
      yield* iterate(node.rightChild);
      yield node.value;
    }
  }

  inOrder() {
    return iterate(this.root);

    function* iterate(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return;
      }

      yield* iterate(node.leftChild);
      yield node.value;
      yield* iterate(node.rightChild);
    }
  }

  find(value: T): BinaryTreeNode<T> | null {
    const { comparator } = this;

    return recFind(this.root);

    function recFind(node: BinaryTreeNode<T> | null) {
      if (node == null) {
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

  remove(value: T): BinaryTreeNode<T> | null {
    const that = this,
      nodeToRemove = this.find(value);

    if (nodeToRemove == null) {
      return null;
    }

    const nodeToReplace =
      max(nodeToRemove.leftChild) ?? min(nodeToRemove.rightChild);

    if (nodeToReplace == null) {
      removeFromParent(nodeToRemove);
    } else {
      removeFromParent(nodeToReplace);
      nodeToReplace.setParent(nodeToRemove.parent);

      if (nodeToRemove.parent == null) {
        this.root = nodeToReplace;
      }

      if (nodeToRemove.leftChild != null) {
        if (nodeToReplace.leftChild == null) {
          nodeToReplace.setLeftChild(nodeToRemove.leftChild);
        } else {
          const leaf = min(nodeToReplace.leftChild);
          leaf.setLeftChild(nodeToRemove.leftChild);
        }
      }

      if (nodeToRemove.rightChild != null) {
        if (nodeToReplace.rightChild == null) {
          nodeToReplace.setRightChild(nodeToRemove.rightChild);
        } else {
          const leaf = max(nodeToReplace.rightChild);
          leaf.setRightChild(nodeToRemove.rightChild);
        }
      }
    }

    return nodeToRemove;

    function min(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return null;
      }

      return node.leftChild == null ? node : min(node.leftChild);
    }

    function max(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return null;
      }

      return node.rightChild == null ? node : max(node.rightChild);
    }

    function removeFromParent(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return;
      }

      const { parent } = node;
      node.remove();

      if (parent == null) {
        that.root = null;
        return;
      }
    }
  }

  add(value: T) {
    const { comparator } = this;

    recAdd(this.root);

    function recAdd(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return;
      }

      const comp = comparator(value, node.value);

      if (comp < 0) {
        if (node.leftChild == null) {
          node.leftChild = new BinaryTreeNode<T>(value, {
            comparator,
            parent: node,
          });
        } else {
          recAdd(node.leftChild);
        }

        return;
      }

      if (comp > 0) {
        if (node.rightChild == null) {
          node.rightChild = new BinaryTreeNode<T>(value, {
            comparator,
            parent: node,
          });
        } else {
          recAdd(node.rightChild);
        }

        return;
      }
    }
  }
}

const t = new BST(15, (a, b) => a - b);

t.add(13);
t.add(9);
t.add(7);
t.add(3);

t.add(11);
t.add(10);

t.add(18);
t.add(23);
t.add(20);
t.add(21);
t.add(22);

console.log(...t.preOrder());

t.remove(18);
t.remove(20);
t.remove(21);

console.log(...t.preOrder());
