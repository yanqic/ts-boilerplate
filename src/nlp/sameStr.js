function printSameStr(a, b) {
    a.split('').forEach((v) => {
        if (b.indexOf(v) !== -1) {
            console.log(v);
        }
    });
}

let a = 'IPO申购流程中费用详情部分字体异常申购流程中费用详情部分字段字号异常，比其他字号要小';
let b =
    '客户表示，沪深港通的A股持仓展示在了美股持仓中，只有APP展示有问题，重新卸载登陆也不行，PC端正常，烦请协助查看，谢谢！';

// printSameStr(a, b);

a = '今天天气';
b = '如何在飞书群顶部添加工单列表或者创建入口';
printSameStr(a, b);
