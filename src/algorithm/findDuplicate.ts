/**
 *一个数组arr包含n个数, 其中 0<arr[i] <n; 每个数字可能出现一次或两次，找出所有出现两次的数？不使用额外空间
 * @param arr
 */
export const findDuplicate = (nums: number[]) => {
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (nums[index] < 0) {
            result.push(index + 1);
        } else {
            nums[index] = -nums[index];
        }
    }
    return result;
};

const testNums = [2, 3, 2, 3, 1];
console.log(findDuplicate(testNums));
