class PriorityQueue {
  queArray: number[];
  nItems: number;
  constructor() {
    this.queArray = [];
    this.nItems = 0;
  }

  insert(item) {
    let j;
    if (this.nItems === 0) {
      this.queArray[this.nItems++] = item;
    } else {
      for (j = this.nItems - 1; j >= 0; j--) {
        if (item > this.queArray[j]) {
          this.queArray[j + 1] = this.queArray[j];
        } else {
          break;
        }
      }
      this.queArray[j + 1] = item;
      this.nItems++;
    }
  }

  remove() {
    return this.queArray[--this.nItems];
  }

  pickMin() {
    return this.queArray[this.nItems - 1];
  }
}

const pq = new PriorityQueue();
pq.insert(30);
pq.insert(50);
pq.insert(10);
pq.insert(40);
pq.insert(20);
pq.remove(); // 10
pq.pickMin(); // 20
