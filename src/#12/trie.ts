export class TrieNode {
  word: boolean;
  value: string;
  children: Map<string, number> = new Map();

  constructor(char: string, word: boolean = false) {
    this.value = char;
    this.word = word;
  }
}

export class Trie {
  protected buffer: TrieNode[] = [new TrieNode("")];

  addWord(iterable: Iterable<string>) {
    let cursor = 0;

    for (const str of iterable) {
      const current = this.buffer[cursor];
      const childIndex = current.children.get(str);

      if (childIndex != null) {
        cursor = childIndex;
      } else {
        const node = new TrieNode(str);
        const pointer = this.buffer.push(node) - 1;
        current.children.set(str, pointer);
        cursor = pointer;
      }
    }

    this.buffer[cursor].word = true;
  }

  go(value: string) {
    return new TrieView(0, this.buffer).go(value);
  }
}

class TrieView {
  constructor(protected start: number, protected buffer: TrieNode[]) {}

  get isWord() {
    if (this.start === -1 || this.buffer[this.start] === null) {
      return false;
    }

    return this.buffer[this.start].word;
  }

  go(value: string) {
    if (this.start === -1 || this.buffer[this.start] === null) {
      return this;
    }

    return new TrieView(
      this.buffer[this.start].children.get(value) ?? -1,
      this.buffer
    );
  }
}

const trie = new Trie();
trie.addWord("мясо");
trie.addWord("мясорубка");
trie.addWord("мир");

console.log(trie.go("м").go("я").go("с").go("о").isWord); // true
console.log(trie.go("м").go("и").go("р").isWord); // true
