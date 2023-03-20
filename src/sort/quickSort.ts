/**
 *
 * @param arr 
 * @returns
 */
export function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const pivotIndex = arr.length >> 1;
    const pivot = arr[pivotIndex];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== pivotIndex) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}
