import { NlpManager } from 'node-nlp';
import path from 'path';
import fs from 'fs';

const manager = new NlpManager({
    languages: ['zh'],
    forceNER: true,
    autoSave: false
});

function loadCustomDocs() {
    const documents: Array<{
        prompt: string;
        completion?: string;
        intent: string;
    }> = [
        {
            prompt: '【优化建议】讨论区feed流卡片正文字号太小',
            completion:
                '可以用主流的全面屏安卓机实际看下，字号小到阅读已经不适了，而且非常密 麻烦看下这个需求',
            intent: 'question'
        },
        {
            prompt: '【bug】IPO申购流程中费用详情部分字体异常 申购流程中费用详情部分字段字号异常，比其他字号要小；申购股数数字未添加千分位逗号显示，其他字段均有添加，请统一前端计数显示方法；TigerTrade安卓81111，香港已入金客户 ',
            completion: '工单已解决，处理结果：8121版本已解决此问题 ',
            intent: 'question'
        },
        {
            prompt: ' TradeUP 结算金额与卖出收益数额不符 客户在3月2日出金，显示可出金额是6021，客户在3月1日之前卖出的股票应该都结算完毕了，可出金额总数应该是6237。请看以下客户卖出股票的时间 以上5个交易都是我们在后台帮客户trade的，但是都是当天就用 BOS > Marsco FD > Trades > Order Entry 同步到 BOS 里了。为什么结算金额和 sales proceeds 差那么多。',
            completion: '统计的数据源不对，US后台账本数据未启用 ',
            intent: 'question'
        },
        {
            prompt: ' 公众号无法进行绑定 客户点击立即绑定，提示“无法绑定该地区公众号”，烦请协助查看，谢谢！ ',
            completion:
                '用户已经绑定了微信三方，目前的逻辑是用户为海外账号，绑定了微信三方后判断为海外用户，只能绑定海外的微信公众号。',
            intent: 'question'
        },
        {
            prompt: '【用户反馈】无法手动删除post help me delete this post ',
            completion:
                '社区新老服务并行阶段 可能有极少量数据不一致，出现类似问题的概率较小。 目前正在迁移删帖接口，迁移完毕后，可避免此类问题。 ',
            intent: 'question'
        },
        {
            prompt: ' 客户表示，沪深港通的A股持仓展示在了美股持仓中，只有APP展示有问题，重新卸载登陆也不行，PC端正常，烦请协助查看，谢谢！',
            completion:
                ' 已当面确认，是交易接口存在问题，市场判断错误导致的。此问题是历史问题，非近期版本导致的。已修复 812上线',
            intent: 'question'
        },
        {
            prompt: ' 客户在交易页面又查看不到买卖盘口数据了 客户在一月的时候登陆APP后无法查看港股买卖盘口行情，也不显示买卖10档，后面经过处理好了，但目前客户再次反馈又出现了相同的问题，买卖10档又不显示，客户进线还显示地区是美国，但是客户是在国内的，也没有用vpn，辛苦帮忙再看一下，谢谢',
            completion:
                ' ip 数据库不准确，添加白名单修正。后续调研ip数据库更新是否可以解决该问题。',
            intent: 'question'
        },
        {
            prompt: '客户换汇提示无法交易 ',
            completion:
                '客户未通过个人信息校验因此没有交易权限，已通知客户去app操作，工单已解决。 ',
            intent: 'question'
        },
        {
            prompt: '客户MAC电脑端软件无法调整大小，烦请查看视频 版本8.4.1，鼠标放在框的四个角上还是一样的，烦请协助查看，谢谢！',
            completion:
                ' 看用户视频操作的是自选组件，多数组件都定义了可调整的最大宽度，用户应该是已经调整到最大宽度了',
            intent: 'question'
        },
        {
            prompt: '自选列表不展示股票价格和涨跌幅 ',
            completion:
                ' 自选列表-设置按钮-自选行情设置页面底部添加数据项-添加一个数据项这样操作就可以，811全量时候跟新一下包让用户',
            intent: 'question'
        },
        {
            prompt: ' 客户在软件无法查看到港股的卖空参考利率，在APP和PC都无法查看到，卸载再次安装切换网络都已经尝试，请帮忙核实确认，谢谢（如果是由于客户港股底层是TBHK，不支持做空的原因，是不是也应该把做空保证金也去掉',
            completion:
                ' 看了一下服务端代码，目前确实没有根据上手判断是否能做空逻辑，应该是需要加一下',
            intent: 'question'
        },
        {
            prompt: '我什么时候应当关闭工单？ ',
            completion:
                '1. 当工单所涉及的问题已经处理结束或者得出共识结论时，就可以关闭工单了\n2. 如果该问题的处理需要更多时间，可以适当调整截止时间，并继续跟进工单问题处理\n3. 如果该问题需要排期解决，或者延迟版本跟进，可以将该问题记录到Jira或者Asana上，然后将相关链接贴到工单详情中，就可以关闭工单了 ',
            intent: 'question'
        },
        {
            prompt: '什么是隐私工单？',
            completion:
                ' 隐私工单的详情、评论、更新日志等都只允许报告人、负责人、协作人、关注人可以看到，这个可以用来控制一些涉及敏感信息的工单的可见范围，避免信息大面积泄露',
            intent: 'question'
        },
        {
            prompt: '工单审批有什么作用？',
            completion:
                ' 工单创建人可以打开工单审批选项，这样其他人员在尝试将工单关闭时就会自动创建一条飞书审批给创建人，创建人可以决定是否通过OR拒绝，以二次确认工单涉及问题确实已经处理完毕',
            intent: 'question'
        },
        {
            prompt: '我不知道该把工单负责人指派给谁？ ',
            completion:
                '不用苦恼，我们有专门的技术支持团队。如果你不清楚遇到的问题该找谁，请创建工单并一股脑儿的指派给【技术支持】 ',
            intent: 'question'
        },
        {
            prompt: '通知到群是怎么回事？',
            completion:
                '您可以选择将工单同步到一些群会话中，当工单状态变更时将会自动发送消息到群组中，方便群中人员信息共享 ',
            intent: 'question'
        },
        {
            prompt: ' 我已经不是负责人了，为什么还收到飞书日程、任务通知？',
            completion:
                '当负责人变更时，原负责人会被自动添加到协作人中。在工单系统中，负责人和协作人都会收到飞书日程和待办。如果你不再是负责人，也不需要作为协作人关注工单进展，那么你可以将自己从协作人中移除，那么你的飞书日程和待办也将一并关闭。但是，请注意，将自己从协作人移除后，你将一并丧失工单编辑权限，即无法继续对工单进行修改变更（包括再将自己添加回协作人） ',
            intent: 'question'
        },
        {
            prompt: '负责人和协作人有什么不同？ ',
            completion:
                ' JIRA只有一个经办人（负责人），那么工单为什么设计出负责人和协作人两种角色呢？在实践中，一个问题的解决往往需要多方共同参与，JIRA大多是单向流转，这个效率会比较低（一方处理完再转给下一个），我们希望能同时将工单分配给需要参与的人。而多个人同时参与工单处理时，需要有个主负责人（类似于项目开发中的项目经理，不能群龙无首），可以对工作进行分解安排和对结果负责。所以工单中区分了负责人和协作人。一个工单的负责人应当尽可能保持稳定，不应当变来变去的。当负责人无法独立完成问题处理时，他可以将他依赖的其他人添加为协作人，共同参与完成工作。当然，你依然可以将工单像JIRA那样单向流转，但是请注意在工单中，原负责人会自动变为协作人。如果自己不再是负责人后，想彻底不再收到该工单的通知和日程提醒，请参考上一条2.2',
            intent: 'question'
        },
        {
            prompt: '  我希望能添加一些分类和项目 ｜希望xx分类/xx项目下的工单能够自定义一些字段？',
            completion:
                '工单目前支持编辑的字段是经过考虑取舍后的，我们希望无论是作为研发、产品等主要问题解决方，还是客服、运营、商务、市场、财务行政等，大家都能对工单的基本操作和使用有一个简单的上手使用和理解，降低使用门槛。目前工单详情和客户信息两个维度的字段下，基本能够覆盖绝大多数场景下的内容添加。如果个别场景下希望有新的字段可以编辑（可以使用客户信息下的最定义字段功能），或者希望添加一些新的项目、分类等，那么建议考虑使用标签功能。标签可以自由随意添加，完全可以用来打标记、做分类。我们也会后续总结梳理大家的各类反馈，对一些预定义的字段或者特殊类型的工单支持一些定制化的流转流程和功能支持。 ',
            intent: 'question'
        },
        {
            prompt: ' 工单的状态有哪几种？发布工单/删除工单/恢复工单/重新打开等有什么区别？',
            completion:
                '工单的状态我们只做了简单的区分，但是根据工单预期完成时间的不同，以及对工单删除操作带来的变化，在前台显示出的状态会有以下几种：- 草稿 - 刚创建未发布的工单，该工单仅创建人本人可见- 待跟进 - 发布出去的工单（当前要求发布工当前必须指定负责人，后续在梳理了工单的流转SOP后，会放开这个限制）- 跟进中 - 已经指定了负责人的进行中的工单- 已超时 - 超出预期完成时间依然没有结束的工单- 已解决 - 工单已被标记为解决- 已中止 - 工单已被标记为中止- 已删除 - 工单被创建人删除，已删除的工单仅创建人可见根据以上状态，所以几个对工单的操作的含义就明确了：- 发布工单 - 即将工单由草稿状态更改为跟进中- 删除工单 - 即删除自己创建的工单- 恢复工单 - 即将删除的工单重新恢复- 解决工单 - 即将工单变更为已解决- 中止工单 - 即将工单变更为已中止- 重新打开 - 即将已经解决/中止的工单重新变更为跟进中',
            intent: 'question.status'
        },
        {
            prompt: ' 一个工单跟踪的问题需要很长时间解决，应该怎么办？',
            completion:
                '工单注重于快速跟进和解决问题，如果一个工单所涉及的问题暂时不具备解决条件，或者需要很长的一个解决周期，那么建议可以中止该工单，备注清楚原因，然后通过Asana创建project并分解task来专门处理；如果属于bug，可以请QA同事创建相关的JIRA任务来跟踪解决。 ',
            intent: 'question'
        },
        {
            prompt: '  什么是用户组？',
            completion:
                '用户组为一组用户所构成的值班组，由工单管理员创建和管理。当工单需要指派负责人时，可以选择相关用户组，该用户组成员都将收到工作通知和日程安排。用户组主要用于当不清楚具体负责人该是谁时的工单指派。一些一线部门有各自的问题场景对接处理的SOP，工单管理员会针对这些场景，添加对应的工单值班组。在创建工单后，在不清楚具体对接人的情况下，可以选择将工单指派给相关的用户组，例如：当有客户反映交易订单无法撤销时，客服创建一个工单并指派给【交易 ',
            intent: 'question'
        },
        {
            prompt: ' 如何在飞书群顶部添加工单列表或者创建入口',
            completion:
                '您可以点击群标题栏的“+”号添加标签页，输入对应的地址即可增加工单快捷入口。建议在一些固定的问题反馈群、项目问题群中添加。所有工单：https://applink.feishu.cn/client/web_app/open?appId=cli_a1e79252787a900c&mode=sidebar&path=%2Fexplore创建工单：https://applink.feishu.cn/client/web_app/open?appId=cli_a1e79252787a900c&mode=sidebar&path=%2Fticket%2Fnew ',
            intent: 'question'
        }
    ];

    documents.map((doc, index) => {
        manager.addDocument('zh', doc.prompt, index.toString());
        if (doc.completion) {
            manager.addAnswer('zh', index.toString(), doc.completion);
        }
    });
}

function loadBaseDatasets() {
    const docFile = path.join(__dirname, 'dureader_data.json');
    const dataSets = JSON.parse(fs.readFileSync(docFile, 'utf8'));

    for (const data of dataSets.data) {
        for (const paragraph of data.paragraphs) {
            // 获取段落文本作为上下文
            for (const qas of paragraph.qas) {
                // 获取问题文本作为文档
                const question = qas.question;
                // 获取答案文本作为回复，如果是不可回答的问题，则回复'No answer'
                const answer = qas.is_impossible
                    ? 'No answer'
                    : qas.answers[0].text;
                // 将文档和回复添加到NLP管理器对象中，指定域名为'squad'
                manager.addDocument('zh', question, qas.id);
                manager.addAnswer('zh', qas.id, answer);
            }
        }
    }
}

export async function trainNlp(srcFileName: string, minified: boolean) {
    loadCustomDocs();
    // loadBaseDatasets();

    await manager.train();
    manager.save(path.join(__dirname, srcFileName), minified);
}

export async function loadNlp(srcFileName: string) {
    const modelFile = path.join(__dirname, srcFileName);
    manager.load(modelFile);
    const testCases: string[] = [
        // '负责人，协作人区别是什么?',
        // '用户组是什么',
        // '工单的状态有哪几种',
        // '如何在飞书添加创建入口',
        '你个老六'
    ];

    for (const item of testCases) {
        const result = await manager.process('zh', item);
        console.log(item, JSON.stringify(result), result.answer, '\n\n');
    }
}

// trainNlp();
