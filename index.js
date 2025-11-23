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

    preOrderForEach(callback) {
        this._preOrder(this.root, callback);
    }

    _preOrder(node, callback) {
        if (node === null) return;

        callback(node.value);              // Visit root
        this._preOrder(node.left, callback);   // Visit left subtree
        this._preOrder(node.right, callback);  // Visit right subtree
    }

    inOrderForEach(callback) {
        this._inOrder(this.root, callback);
    }

    _inOrder(node, callback) {
        if (node === null) return;

        this._inOrder(node.left, callback);   // Visit left subtree
        callback(node.value);                 // Visit root
        this._inOrder(node.right, callback);  // Visit right subtree
    }

    postOrderForEach(callback) {
        this._postOrder(this.root, callback);
    }

    _postOrder(node, callback) {
        if (node === null) return;

        this._postOrder(node.left, callback);   // Visit left subtree
        this._postOrder(node.right, callback);  // Visit right subtree
        callback(node.value);                   // Visit root
    }

    _findNode(value, root) {
        if (root === null) return null;         // value not found
        if (value === root.value) return root;  // value found

        if (value < root.value) {
            return this._findNode(value, root.left);   // go left
        } else {
            return this._findNode(value, root.right);  // go right
        }
    }

    _nodeHeight(node) {
        if (node === null) return -1;

        let leftHeight = this._nodeHeight(node.left);
        let rightHeight = this._nodeHeight(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    height(value) {
        let node = this._findNode(value, this.root);
        if (node === null) return null;

        return this._nodeHeight(node);
    }

    _depthRec(node, value) {
        if (node === null) return null;
        if (node.value === value) return 0;

        let left = this._depthRec(node.left, value);
        if (left !== null) return 1 + left;

        let right = this._depthRec(node.right, value);
        if (right !== null) return 1 + right; return null;
    }

    depth(value) {
        return this._depthRec(this.root, value);
    }

    // Optimized balance check
    _checkBalanceAndHeight(node) {
        if (node === null) return { height: -1, balanced: true };

        let left = this._checkBalanceAndHeight(node.left);
        let right = this._checkBalanceAndHeight(node.right);

        if (!left.balanced || !right.balanced) {
            return { height: 1 + Math.max(left.height, right.height), balanced: false };
        }

        if (Math.abs(left.height - right.height) > 1) {
            return { height: 1 + Math.max(left.height, right.height), balanced: false };
        }

        let currentHeight = 1 + Math.max(left.height, right.height);
        return { height: currentHeight, balanced: true };
    }

    isBalanced() {
        return this._checkBalanceAndHeight(this.root).balanced;
    }

    rebalance() {
        const values = [];
        this.inOrderForEach(value => values.push(value)); // collect all values in sorted order
        this.root = this.sortedArrayToBST(values);       // rebuild a balanced tree
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

// Helper function to generate an array of random numbers < 100
function generateRandomArray(size = 15) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

// 1. Create a BST from random numbers
const randomArray = generateRandomArray();
const tree = new Tree(randomArray);

// 2. Confirm tree is balanced
console.log("Tree balanced? ", tree.isBalanced());

// 3. Print all traversals
console.log("Level order:");
tree.levelOrderForEach(value => console.log(value));

console.log("Pre-order:");
tree.preOrderForEach(value => console.log(value));

console.log("Post-order:");
tree.postOrderForEach(value => console.log(value));

console.log("In-order:");
tree.inOrderForEach(value => console.log(value));

// 4. Unbalance the tree by adding numbers > 100
tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log("After adding large numbers...");
console.log("Tree balanced? ", tree.isBalanced());

// 5. Rebalance the tree
tree.rebalance();

// 6. Confirm tree is balanced again
console.log("After rebalancing...");
console.log("Tree balanced? ", tree.isBalanced());

// 7. Print all traversals again
console.log("Level order:");
tree.levelOrderForEach(value => console.log(value));

console.log("Pre-order:");
tree.preOrderForEach(value => console.log(value));

console.log("Post-order:");
tree.postOrderForEach(value => console.log(value));

console.log("In-order:");
tree.inOrderForEach(value => console.log(value));