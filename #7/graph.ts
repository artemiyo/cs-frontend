class Edge<T> {
  #value: T;
  constructor(readonly value: T) {
    this.#value = value;
  }
}

class Graph<T> {
  #adjList: Map<T, Edge<T>[]>;
  #directed: boolean;

  constructor(readonly directed: boolean) {
    this.#adjList = new Map();
    this.#directed = directed;
  }

  get list() {
    return this.#adjList;
  }

  get size() {
    return this.#adjList.size;
  }

  addVertex(key: T) {
    this.#adjList.set(key, []);
  }

  getAdjacent(point: T) {
    return this.#adjList.get(point);
  }

  addEdge(from: T, to: T) {
    this.getAdjacent(from).push(new Edge<T>(to));

    if (!this.directed) {
      this.getAdjacent(to).push(new Edge<T>(from));
    }
  }

  isAdjacent(from: T, to: T) {
    const adjacent = this.getAdjacent(from);

    if (!adjacent) {
      throw new Error("Vertex not found!");
    }

    return adjacent.some(({ value }) => value === to);
  }

  dfs(startingPoint: T) {
    const visited = new Set();

    const travers = (node: T) => {
      visited.add(node);

      const neighbors = this.getAdjacent(node);

      for (let { value } of neighbors) {
        if (!visited.has(value)) {
          travers(value);
        }
      }
    };

    travers(startingPoint);

    return visited;
  }

  bfs(startingPoint: T) {
    const queue = [startingPoint];
    const result = [];
    const visited: any = {};
    visited[startingPoint] = true;
    let currentVertex;

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

      const neighbors = this.getAdjacent(currentVertex);

      for (const { value } of neighbors) {
        if (!visited[value]) {
          visited[value] = true;
          queue.push(value);
        }
      }
    }

    return result;
  }

  topologicalSorting(startingPoint: T) {
    const visited = new Set();
    const stack = [];

    const innerTraverse = (node: Edge<T>) => {
      visited.add(node);

      const neighbors = this.getAdjacent(node.value);

      if (neighbors.length) {
        neighbors.forEach((node) => {
          if (!visited.has(node)) {
            innerTraverse(node);
          }
        });
      }

      stack.push(node.value);
    };

    for (const node of this.getAdjacent(startingPoint)) {
      if (!visited.has(node)) {
        innerTraverse(node);
      }
    }

    return stack.reverse();
  }
}

const graph = new Graph<string>(true);

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");

graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "D");
graph.addEdge("C", "E");
graph.addEdge("A", "F");

console.log(graph.isAdjacent("A", "B")); // true
console.log(graph.isAdjacent("A", "C")); // false
console.log(graph.isAdjacent("A", "b")); // false

//       A     G
//      / \
//     B   F
//    /
//   C
//  / \
// D   E

console.log(graph.dfs("A")); // [A, B, C, D, E, F]
console.log(graph.bfs("A")); // [A, B, F, C, D, E]
console.log(graph.topologicalSorting("A"));
