class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const sortedArray = this.arraySort(array);
        return this.sortedArrayToBST(sortedArray);
    }

    arraySort(array) {
        const uniqueArray = [...new Set(array)];
        uniqueArray.sort((a, b) => a - b);
        return uniqueArray;
    }

    sortedArrayToBSTRecur(array, start, end) {
        if (start > end) return null;

        const mid = start + Math.floor((end - start) / 2);
        const root = new Node(array[mid]);

        root.left = this.sortedArrayToBSTRecur(array, start, mid - 1);
        root.right = this.sortedArrayToBSTRecur(array, mid + 1, end);

        return root;
    }

    sortedArrayToBST(array) {
        return this.sortedArrayToBSTRecur(array, 0, array.length - 1);
    }

    printTree() {
        this.prettyPrint(this.root);
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) return;

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }

        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(value) {
        this.root = this._insertRec(this.root, value);
    }

    // Helper recursive function
    _insertRec(root, value) {
        if (root === null) return new Node(value);

        if (value < root.value) {
            root.left = this._insertRec(root.left, value);
        } else if (value > root.value) {
            root.right = this._insertRec(root.right, value);
        }

        return root;
    }
    // Delete a node
    deleteItem(value) {
        this.root = this._deleteRec(this.root, value);
    }

    // Helper recursive function
    _deleteRec(root, value) {
        if (root === null) return root;

        if (value < root.value) {
            root.left = this._deleteRec(root.left, value);
        } else if (value > root.value) {
            root.right = this._deleteRec(root.right, value);
        } else {
            // Node with 0 or 1 child
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            // Node with 2 children
            const succ = this._getSuccessor(root);
            root.value = succ.value;
            root.right = this._deleteRec(root.right, succ.value);
        }

        return root;
    }

    // Find in-order successor
    _getSuccessor(node) {
        node = node.right;
        while (node !== null && node.left !== null)
            node = node.left;
        return node;
    }


    _find(value, root) {
        if (root === null) return false;     // value not found

        if (value === root.value) return true;

        if (value < root.value) {
            return this._find(value, root.left);   // go left
        } else {
            return this._find(value, root.right);  // go right
        }
    }

    find(value) {
        return this._find(value, this.root);
    }

    levelOrderForEach(callback) {
        if (this.root === null) return;

        let nodeQueue = new Queue();
        nodeQueue.enqueue(this.root);

        while (!nodeQueue.isEmpty()) {
            const currentNode = nodeQueue.dequeue();

            callback(currentNode.value);

            if (currentNode.left) nodeQueue.enqueue(currentNode.left);
            if (currentNode.right) nodeQueue.enqueue(currentNode.right);
        }
    }

}

class Queue {
    constructor() {
        this.queueArray = [];
    }

    enqueue(node) {
        this.queueArray.push(node);
    }

    dequeue() {
        return this.queueArray.shift();
    }

    isEmpty() {
        return this.queueArray.length === 0;

    }
}


const tree = new Tree([1, 7, 4, 3, 4, 6, 123, 654, 8, 34, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.printTree();