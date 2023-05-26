interface BinaryNodeChildren<T> {
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

class BinaryNode<T> {
  value: T;

  parent: BinaryNode<T> | null;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;

  constructor(
    value: T,
    {
      parent,
      left,
      right,
    }: BinaryNodeChildren<T> & { parent?: BinaryNode<T> } = {}
  ) {
    this.value = value;
    this.parent = parent ?? null;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

class BinaryTree<T> {
  root: BinaryNode<T>;

  constructor(value: T, { left, right }: BinaryNodeChildren<T> = {}) {
    this.root = new BinaryNode<T>(value, { left, right });
  }

  min() {
    let min = this.root.value;

    function findMin(node: BinaryNode<T>) {
      if (node === null) {
        return null;
      }

      if (node.value < min) {
        min = node.value;
      }

      return findMin(node.left);
    }

    findMin(this.root);
    return min;
  }

  max() {
    let max = this.root.value;

    function findMax(node: BinaryNode<T>) {
      if (node === null) {
        return null;
      }

      if (node.value > max) {
        max = node.value;
      }

      return findMax(node.right);
    }

    findMax(this.root);
    return max;
  }

  find(value: T) {
    function findNode(node: BinaryNode<T>) {
      if (node === null) {
        return null;
      }

      if (value === node.value) {
        return node;
      }

      if (value < node.value) {
        return findNode(node.left);
      }

      return findNode(node.right);
    }

    return findNode(this.root);
  }

  insert(value: T, node: BinaryNode<T> = this.root) {
    if (value >= node.value) {
      if (node.right === null) {
        node.right = new BinaryNode<T>(value);

        return;
      }

      this.insert(value, node.right);
    }

    if (value < node.value) {
      if (node.left === null) {
        node.left = new BinaryNode<T>(value);

        return;
      }

      this.insert(value, node.left);
    }
  }

  getSuccessor(node: BinaryNode<T>) {
    let parent = node;
    let successor = node;
    let current = node.right;

    while (current !== null) {
      parent = successor;
      successor = current;
      current = current.left;
    }

    if (successor !== node.right) {
      parent.left = successor.right;
      successor.right = node.right;
    }

    return successor;
  }

  delete(value: T) {
    let current = this.root;
    let parent = this.root;
    let isLeftChild = true;

    // 1. Поиск удаляемого элемента
    while (current.value !== value) {
      parent = current;
      if (value < current.value) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }

      if (current === null) {
        return false;
      }
    }

    // 2.Узел не имеет потомков
    if (current.right === null && current.left === null) {
      if (this.root === current) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // 3. Удаляемый узел имеет олного потомка
    if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    }

    if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }

    // 4. Удаляемый узел имеет двух потомков
    const successor = this.getSuccessor(current);
    if (current === this.root) {
      this.root = successor;
    } else if (isLeftChild) {
      parent.left = successor;
    } else {
      parent.right = successor;
      successor.left = current.left;
    }
    return true;
  }

  inOrder(node: BinaryNode<T> | null = this.root) {
    if (node !== null) {
      this.inOrder(node.left);
      console.log(node.value);
      this.inOrder(node.right);
    }
  }

  postOrder(node: BinaryNode<T> | null = this.root): void {
    if (node === null) return;

    this.postOrder(node.left);
    this.postOrder(node.right);

    console.log(node.value);
  }
}

const tree = new BinaryTree(87, {
  left: new BinaryNode<number>(49, {
    left: new BinaryNode<number>(10, {
      right: new BinaryNode<number>(40, {
        right: new BinaryNode<number>(45),
      }),
    }),
    right: new BinaryNode<number>(83, {
      left: new BinaryNode<number>(57),
    }),
  }),
  right: new BinaryNode<number>(99, {
    left: new BinaryNode<number>(96, {
      left: new BinaryNode<number>(88),
    }),
  }),
});

tree.insert(8);
console.log(tree.find(8));
console.log(tree);
console.log(tree.inOrder());
console.log(tree.postOrder());
