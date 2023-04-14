import { encode } from 'gpt-3-encoder';

function extractToken(text: string, tokenLimit: number) {
    // 文本拆分成 chunk
    const chunks = text.match(/[^.。!！?？\n]+[.。!！?？\n]+|[^.。!！?？\n]+$/g) || [];

    let splitText = '';

    for (const chunk of chunks) {
        const tokens = encode(splitText + chunk).length;

        if (tokens >= tokenLimit) {
            break;
        }

        splitText += chunk;
    }

    console.log('length', encode(splitText).length);

    return splitText;
}

const ret = extractToken(
    '看看onlyRth传false了吧，MKT/STP不支持onlyRth为false\n严祺:回复@严祺:\nhi. @测试-严祺 问题已确认，是客户端这边下单 盘前盘后 onlyRth 传值的问题引起的；我这边900 版本修复下该问题；\n影响范围：支持碎股交易的标的，默认进入下单页为 市价单 时（用户上次使用市价单下单碎股标的，再次进入时会默认使用 市价单），会有该问题\n临时解决方案：\n1、切换下订单类型：让用户切换到 限价单，再切换回市价单，会解决该问题\n2、引导用户使用老版本：\n海外包： Join the Tiger Trade: Invest Globally beta - TestFlight - Apple\n国内包：Join the 老虎国际 beta - TestFlight - Apple\n严祺:> 工单已解决，处理结果：\n> \n> 在ONES中继续跟进：#42097 - [工单]客户盘中下单提示不支持盘前盘后交易',
    2000
);

console.log(ret);
