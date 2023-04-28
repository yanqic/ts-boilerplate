/**
 * 简易版并查集
 */
export class UnionFind {
    private _count: number;
    private parent: number[];
    constructor(n: number) {
        this._count = n;
        this.parent = new Array(n).fill(0).map((_, i) => i);
    }
    find(x: number) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent[rootX] = rootY;
            this._count--;
        }
    }

    isConnected(x: number, y: number) {
        return this.find(x) === this.find(y);
    }
    count() {
        return this._count;
    }
}

/**
 * 并查集增加按秩合并
 * 有了路径压缩，不必要
 */
export class DisjointSet {
    private _count: number;
    private parent: number[];
    private weights: number[];
    constructor(n: number) {
        // 开始不互联互通
        this._count = n;
        this.parent = new Array(n).fill(0).map((_, i) => i);
        // 最初每棵树只有一个节点 init weight 1
        this.weights = new Array(n).fill(1);
    }

    find(x: number) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    unionSet(x: number, y: number) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            const weights = this.weights;
            // 小树合并到大树上面;
            if (weights[rootX] < weights[rootY]) {
                this.parent[rootX] = rootY;
                weights[rootY] += weights[rootX];
            } else {
                this.parent[rootY] = rootX;
                weights[rootX] += weights[rootY];
            }
            this._count--;
        }
    }

    isConnected(x: number, y: number) {
        return this.find(x) === this.find(y);
    }

    count() {
        return this._count;
    }
}
