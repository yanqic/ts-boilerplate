/**
 * 链表判断是否有环，输出环的入口位置
 * 1. f = 2s
 * 2. f = s + nr
 * 推出：s = nr
 */
interface ListNode {
    val: number;
    next: ListNode | null;
}

let crossNode: ListNode | null = null;

export const hasCycle = (head: ListNode | null): boolean => {
    if (head === null) {
        return false;
    }
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) {
            crossNode = slow;
            return true;
        }
    }
    return false;
};
export const cycleLength = (head: ListNode | null): number => {
    const isHasCycle = hasCycle(head);
    if (!isHasCycle) {
        return 0;
    }
    let ptr: ListNode | null = crossNode;
    let len = 0;
    while (ptr && ptr !== crossNode) {
        len++;
        ptr = ptr.next;
    }
    return len;
};

export const detectCycle = (head: ListNode | null): ListNode | null => {
    if (head === null) {
        return null;
    }
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) {
            return slow;
        }
    }
    fast = head;
    while (slow !== fast) {
        slow = slow!.next;
        fast = fast!.next;
    }
    return fast;
};
