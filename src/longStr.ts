/**
 * 在给定的字符串中，找到其中最长的子串，除其首尾字符之外其他字符都不重复，如输入 abcdefgdb 返回 defgd
 */

function getLongestStr(str: string) {
    let prePtr = 0;
    let maxStrIndex = [0, 0];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const subStr = str.slice(prePtr, i);
        const index = subStr.indexOf(char);
        if (index === -1) {
            continue;
        } else {
            prePtr = index;
            if (i - prePtr > maxStrIndex[1] - maxStrIndex[0]) {
                maxStrIndex = [prePtr, i];
            }
            prePtr++;
        }
    }
    return str.slice(maxStrIndex[0], maxStrIndex[1]);
}

export default getLongestStr;
