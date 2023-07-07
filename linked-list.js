/** Node: node for a singly linked list. */

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (this.length === 0) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val, this.head);
    if (this.length === 0) this.head = newNode;
    if (this.length === 0) this.tail = newNode;
    this.head = newNode;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    let removedNode = this.tail;

    // set the second to last item to be the new tail
    let current = this.head;
    while (current !== null) {
      if (current.next === removedNode) {
        this.tail = current;
        this.tail.next = null;
      }
      current = current.next;
    }

    this.length -= 1;

    // if there is nothing left in the list, remove the head and tail
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return removedNode.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    let removedNode = this.head;
    this.length -= 1;

    // set the second item as the new head
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    return removedNode.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current.next;
    }
    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current.next;
    }
    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // if the list is empty, add new node and set head/tail
    if (this.length === 0) {
      let newNode = new Node(val);
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
      return newNode;
    }

    this.length += 1;

    // if anywhere else:
    let nodeBefore = this.head;
    for (let i = 0; i < idx - 1; i++) {
      nodeBefore = nodeBefore.next;
    }
    let nodeAfter = this.length === idx ? null : nodeBefore.next;

    let newNode = new Node(val, nodeAfter);
    nodeBefore.next = newNode;

    if (this.length >= idx) this.tail = newNode;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    this.length -= 1;

    // if the first index, handle remove:
    if (idx === 0) {
      let current = this.head;
      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = current.next;
      }
      return current;
    }

    // otherwise, get the node before:
    let nodeBefore = this.head;
    for (let i = 0; i < idx - 1; i++) {
      nodeBefore = nodeBefore.next;
    }
    //
    let current = nodeBefore.next;
    let after = current.next;
    nodeBefore.next = after;
    if (!after) this.tail = nodeBefore;
    return current;
  }

  /** average(): return an average of all values in the list */

  average() {
    let total = 0;
    let numOfNums = 0;

    if (this.length === 0) return 0;

    let current = this.head;
    while (current !== null) {
      total += current.val;
      current = current.next;
      numOfNums += 1;
    }
    return total / numOfNums;
  }
}

module.exports = LinkedList;
