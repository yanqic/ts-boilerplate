/**
 * 迷宫生成
 * https://blog.csdn.net/imred/article/details/105329806
 */

class Maze {
    constructor(width, height, startX, startY) {
        this.width = width;
        this.height = height;
        this.startX = startX;
        this.startY = startY;
        this.cells = Array(height)
            .fill()
            .map(() => Array(width).fill(0));
    }

    inBounds(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    getNeighbors(x, y) {
        const neighbors = [];

        if (this.inBounds(x + 1, y) && !this.getCell(x + 1, y)) neighbors.push([x + 1, y]);
        if (this.inBounds(x - 1, y) && !this.getCell(x - 1, y)) neighbors.push([x - 1, y]);
        if (this.inBounds(x, y + 1) && !this.getCell(x, y + 1)) neighbors.push([x, y + 1]);
        if (this.inBounds(x, y - 1) && !this.getCell(x, y - 1)) neighbors.push([x, y - 1]);

        return neighbors;
    }

    getCell(x, y) {
        return this.cells[y][x];
    }

    setCell(x, y, value) {
        this.cells[y][x] = value;
    }

    randomWalk() {
        let x = Math.floor(Math.random() * this.width);
        let y = Math.floor(Math.random() * this.height);
        let visitedCount = 0;

        while (visitedCount < this.width * this.height) {
            this.setCell(x, y, 2);
            visitedCount++;

            const neighbors = this.getNeighbors(x, y);

            if (neighbors.length > 0) {
                const next = neighbors[Math.floor(Math.random() * neighbors.length)];
                const [nextX, nextY] = next;

                // Connect current cell to next cell
                this.setCell((x + nextX) / 2, (y + nextY) / 2, 1);

                x = nextX;
                y = nextY;
            } else {
                // Backtrack to a random visited cell
                const visited = [];

                for (let i = 0; i < this.width; i++) {
                    for (let j = 0; j < this.height; j++) {
                        if (this.getCell(i, j) === 2) visited.push([i, j]);
                    }
                }

                const [backX, backY] = visited[Math.floor(Math.random() * visited.length)];

                x = backX;
                y = backY;
            }
        }
    }

    createMaze() {
        // Initialize the maze with a random walk
        this.randomWalk();

        // Initialize the disjoint set
        const ds = new DisjointSet();

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.getCell(i, j) !== 1) continue;

                ds.makeSet([i, j]);

                if (i > 0 && this.getCell(i - 1, j) === 1) ds.union([i, j], [i - 1, j]);
                if (j > 0 && this.getCell(i, j - 1) === 1) ds.union([i, j], [i, j - 1]);
            }
        }

        // Check if the start and end are in the same set
        const startSet = ds.find([this.startX, this.startY]);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.getCell(i, j) !== 1) continue;

                if (ds.find([i, j]) === startSet) this.setCell(i, j, 3);
            }
        }
    }
}

class DisjointSet {
    constructor() {
        this.sets = new Map();
    }

    makeSet(x) {
        this.sets.set(JSON.stringify(x), { parent: x, rank: 0 });
    }

    find(x) {
        if (JSON.stringify(x) !== JSON.stringify(this.sets.get(JSON.stringify(x)).parent)) {
            this.sets.set(JSON.stringify(x), {
                parent: this.find(this.sets.get(JSON.stringify(x)).parent),
                rank: this.sets.get(JSON.stringify(x)).rank
            });
        }

        return this.sets.get(JSON.stringify(x)).parent;
    }

    union(x, y) {
        const xRoot = this.find(x);
        const yRoot = this.find(y);
        if (xRoot === yRoot) return;

        if (this.sets.get(JSON.stringify(xRoot)).rank < this.sets.get(JSON.stringify(yRoot)).rank) {
            this.sets.set(JSON.stringify(xRoot), { parent: yRoot, rank: this.sets.get(JSON.stringify(xRoot)).rank });
        } else if (this.sets.get(JSON.stringify(xRoot)).rank > this.sets.get(JSON.stringify(yRoot)).rank) {
            this.sets.set(JSON.stringify(yRoot), { parent: xRoot, rank: this.sets.get(JSON.stringify(yRoot)).rank });
        } else {
            this.sets.set(JSON.stringify(yRoot), { parent: xRoot, rank: this.sets.get(JSON.stringify(yRoot)).rank });
            this.sets.set(JSON.stringify(xRoot), {
                parent: xRoot,
                rank: this.sets.get(JSON.stringify(xRoot)).rank + 1
            });
        }
    }
}

// Example usage
const maze = new Maze(10, 10, 0, 0);
maze.createMaze();

console.log(maze.cells);
