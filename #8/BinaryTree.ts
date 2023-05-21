interface BinaryTreeOptions<T> {
  parent?: BinaryTreeNode<T> | null;
  leftChild?: BinaryTreeNode<T> | null;
  rightChild?: BinaryTreeNode<T> | null;
}

class BinaryTreeNode<T> {
  value: T;
  parent: BinaryTreeNode<T> | null;
  leftChild: BinaryTreeNode<T> | null;
  rightChild: BinaryTreeNode<T> | null;

  constructor(
    value: T,
    {
      parent = null,
      leftChild = null,
      rightChild = null,
    }: BinaryTreeOptions<T> = {}
  ) {
    this.value = value;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

// Binary Search Tree
class BTree<T> {
  root: BinaryTreeNode<T>;
  constructor(rootValue: T, protected comparator: (a: T, b: T) => number) {
    this.root = new BinaryTreeNode<T>(rootValue);
  }

  add(value: T) {
      recAdd(this.root);
      function recAdd(node: BinaryTreeNode<T>) {

      }
  }
}
