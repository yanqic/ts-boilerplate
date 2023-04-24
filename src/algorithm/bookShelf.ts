/**
 * leetcode 1105
 * @param books
 * @param shelfWidth
 * @returns
 */
export function minHeightShelves(books: number[][], shelfWidth: number): number {
    const cache = new Map<number, number>();
    const subShelves = (index: number) => {
        if (cache.has(index)) {
            return cache.get(index)!;
        }
        let minTotalHeight = 1000 * 1000;
        let maxHeight = 0;
        let totalThickness = 0;
        for (let i = index; i < books.length; i++) {
            totalThickness += books[i][0];
            if (totalThickness > shelfWidth) {
                break;
            }
            if (maxHeight < books[i][1]) {
                maxHeight = books[i][1];
            }
            let currentMinTotalHeight = maxHeight;
            if (i < books.length - 1) {
                currentMinTotalHeight += subShelves(i + 1);
            }
            if (currentMinTotalHeight < minTotalHeight) {
                minTotalHeight = currentMinTotalHeight;
            }
        }
        cache.set(index, minTotalHeight);

        return minTotalHeight;
    };
    return subShelves(0);
}

function main() {
    const b1 = [
        [1, 1],
        [2, 3],
        [2, 3],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 2]
    ];
    const shelfWidth1 = 4;
    console.log('ret1', minHeightShelves(b1, shelfWidth1));
}
main();
