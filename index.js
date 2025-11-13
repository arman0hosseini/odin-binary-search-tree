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

    sortedArrayToBSTRecur(array, start, end) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(array[mid]);

        root.left = this.sortedArrayToBSTRecur(array, start, mid - 1);
        root.right = this.sortedArrayToBSTRecur(array, mid + 1, end);

        return root;
    }

    sortedArrayToBST(arr) {
        return this.sortedArrayToBSTRecur(arr, 0, arr.length - 1);
    }

    arraySort(array) {
        const uniqueArray = [...new Set(array)];
        uniqueArray.sort((a, b) => a - b);
        return uniqueArray;
    }
}
