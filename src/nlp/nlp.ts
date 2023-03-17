import { NlpManager } from 'node-nlp'

const manager = new NlpManager({ languages: ['zh'], forceNER: true });
// // Adds the utterances and intents for the NLP
// manager.addDocument('zh', '再见了', 'greetings.bye');
// manager.addDocument('zh', '再见了，照顾好自己', 'greetings.bye');
// manager.addDocument('zh', '好的，下次见了', 'greetings.bye');
// manager.addDocument('zh', '下次见了', 'greetings.bye');
// manager.addDocument('zh', '我要走了', 'greetings.bye');
// manager.addDocument('zh', '你好', 'greetings.hello');
// manager.addDocument('zh', '嗨', 'greetings.hello');
// manager.addDocument('zh', '吃了吗', 'greetings.hello');

// // Train also the NLG
// manager.addAnswer('zh', 'greetings.bye', '直到下次');
// manager.addAnswer('zh', 'greetings.bye', '再见朋友!');
// manager.addAnswer('zh', 'greetings.hello', '哈喽!');
// manager.addAnswer('zh', 'greetings.hello', '吃了吗!');

const dicts = [
    ['请问为啥我按拼音首字母kzkc在APP搜不到空中客车', 'question'],
    ['请问咱们APP上可以看到新股的流通股指标吗。我看富途是有的 我们没有 不知道是不是我没找到', 'question'],
    ['hello, 请问PC端的watchlist要怎样删除掉不想要的股票信息，比如某些下单后自动添加的股票', 'question'],
    ['请问,app总让重新登录怎么解决着', 'question'],
    ['加上昨晚做交易的纪录也没有显示，但是在我们系统有昨晚的交易记录。劳烦查看', 'question'],
    ['客户也表示从上个星期就收不到所有的stock price alert. apps 设置也都没问题。 麻烦查看', 'question'],
    ['用户反馈“最新版老虎APP耗电飞快，请优化一下。耗电异常的快', 'question'],
    ['20671391717937，安卓版；可以帮忙查一下用户日志看看有什么问题吗？', 'question'],
    ['模拟账户 IOS最新版本 会显示一条黑线，持仓展示不完整，麻烦帮忙看下 谢谢', 'question'],
    ['这个接口，频繁报500的错误，谁给看看', 'question'],
    // ['好的哈，我们先看看', 'statement'],
    // ['有可能是公司网络问题 有人反馈说9层断网了 运维值班正在联系', 'statement'],
    // ['目前已定位原因，正在请运维协助恢复', 'statement'],
    // ['可能和网络有关系', 'statement'],
    // [
    //     '我们会安排开放更多有交易量的外汇期货  但土耳其里拉暂时不会  即便最近行情大  这期货商品仍没有啥交易量 ',
    //     'statement'
    // ],
    [
        'TBSG客户注销账户，操作过程中持续出现“Sorry ,address does not exist",前几步可以忽视信息continue，到最后一步CONFIRM的时候无法提交，辛苦查看下~',
        'question.customer',
        '是的,我们会马上解决，应该没问题'
    ],
    // ['根因是我们的tigersecurities.com域名被电信网络DNS劫持了，工程这边通过CG下放了入口指向', 'statement'],
    // ['稍等下，我们更新下邀请链接。', 'statement'],
    // ['不好意思，这个情况我们尽快排查下哈！我新拉个群吧', 'statement'],
    [
        '升到5.2看到openDepartmentId的支持了[鼓掌]，反馈个小bug，选择部门后右侧顶部文案显示有异常，可以确认下',
        'question'
    ],
    // ['我们没有统一的报错文档。不过，1001就是你截图上的意思，网络连接超时了', 'statement'],
    [
        '50663267 TAY JOO HENG - 客户想观看学堂里的影片但不管是英文或中文版都没有学堂的tab, 客户也提供的应用软件的版本 烦请协助查看，谢谢',
        'question'
    ],
    // ['应该就是资讯详情页打不开导致的', 'statement'],
    // ['目前观察看北京ng入口可能有些性能瓶颈，我们这边跟进扩容一下', 'statement'],
    // ['OK 类似问题可以先把具体情况收集一下，不然不太好定位问题', 'statement'],
    // ['可以私聊给我哈', 'statement'],
    // [
    //     '社区的问题，是由于社区前端waf优化防护规则，触发了开源引擎的bug导致，将新规则下线后恢复了。后续线上防护规则暂时停止变动，排查解决代码bug。[谢谢]',
    //     'statement'
    // ],
    ['是图中的用户吗？头像框有佩戴吗？出现问题的用户id麻烦提供一下', 'question.pic', '是的，你真棒'],
    [
        '盘前竞价下单问题',
        'question.trade',
        'IB底层不支持A股盘前盘后竞价，环球和综合账户都不支持。客户订单数量较大，开盘后逐笔成交。成交价格是正常的。'
    ],
    [
        '社区页面没有中英文互翻的按钮，且客户的关注没有更新',
        'question.trade2',
        '7.1.4版本海外用户不显示翻译按钮是正常逻辑，关注没有更新的问题在工单：https://ticket.tigerfintech.com/ticket/2021122100004，这个先关闭了'
    ],
    ['12-23 ios端-用户更新版本之后消息通知不更新', 'question.123123', '用户升级app，切换到海外社区，正常。'],
    ['CRM】下雨了我说的不是天气🌦 - 老虎工单', 'question.weather', '你说的是啥'],
    ['盘前竞价下单问题', 'QUESTION.TRADE', 'B底层不支持A股盘前盘后竞价，环球和综合账户都不支持。客户订单数量较大，开盘后逐笔成交。成交价格是正常的.'],
    ['你瞅啥,想打架吗','QUESTION.TT','瞅你咋地']
];

dicts.map((dict) => {
    // result = nodejieba.cut(dict[0]);
    // console.log(result);
    // classifier.addDocument(result, dicts[1]);
    manager.addDocument('zh', dict[0], dict[1]);
    if (dict.length > 2) {
        manager.addAnswer('zh', dict[1], dict[2]);
    }
});

const testCase = [
    // '请问用户显示APP社区内容加载不出来，可以帮忙看看吗',
    // '渠道后台复制出来的开户链接 打不开 麻烦哪位同事帮看下？',
    // '好的，我看一下',
    // '稍等下，我们更新下邀请链接。',
    // '但看用户截图连的是无线， 网络还可以吧。',
    // '正在排查解决，谢谢',
    // '应安全和审计需求，CRM权限做了改造，组织架构在研发下的人员以后需要用新域名登陆CRM',
    // '在社区帖子评论留言区里如果用户有头像框，应该可以展示头像框，新上线了一款圣诞头像框，没有在留言区展示出来，这块展示与否的逻辑是啥',
    // '3570010942140204 客户的app 版本是7.1.4.0，IOS，社区页面没有中英文互翻的按钮，且客户的关注没有更新，客户点击我的—设置—通用—语言设置，里面没有“内容翻译”开关，麻烦看下这个问题，谢谢',
    // '用户出金，不懂交易规则：t+2交收以后提取出金金额才准确。未交收出金导致用户账户欠款引发不满意。'，
    '下雨了我说的不是天气?',
    // 'ios端-用户更新版本之后消息通知不更新,可用帮忙看看吗',
    // '客户周伟，环球账户U8520322，早上9点22下单了a股的000831，一直没还有成交，可以帮忙看下吗？开盘的时候成交了，但不是以开盘价成交的，现在客户还要索赔，可以帮忙看下吗[捂脸]',
    // "小明,你瞅啥"
];

// Train and save the model.
(async () => {
    await manager.load();
    manager.save();
    testCase.map(async (text, index) => {
        const result = await manager.process('zh', text);
        console.log(index, result.classifications, result.answer);
    });
})();
