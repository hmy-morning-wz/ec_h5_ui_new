const Mock = require('mockjs');

let db = Mock.mock({
    'data|3-6': [{
        id: '@id',
        name: '@name',
        'age|18-32': 1
    }]
});
let putOnJson = Mock.mock({
    "cityCode": "000000",
    "city": "测试",
    json: {
        cardName: '杭州通电子公交卡',
        ownerName: 'xxx',//业主名称
        cardImg: 'https://images.allcitygo.com/202004202123323083OVyHn.png',//卡片图（带卡名）
        energyImg: 'https://gw.alipayobjects.com/mdn/rms_88bb4d/afts/img/A*IiqiRqMqvUMAAAAAAAAAAABkARQnAQ',//绿色能量广告位整图
        getCardTitle: '领卡乘公交咯',//领卡区大标题
        discountImg: 'https://images.allcitygo.com/20200420195016293lG8UE4.png',//限时特惠折扣整图
        benefitPointList: [ //利益点列表
            {
                image: 'https://images.allcitygo.com/20200420201241808k7zgeo.png',
                text: '自定义文案自定义文案自定义文案自定义文案自定义文案'
            },
            {
                image: 'https://images.allcitygo.com/20200420201241808k7zgeo.png',
                text: '自定义文案'
            },
            {
                image: 'https://images.allcitygo.com/20200420201241808k7zgeo.png',
                text: '自定义文案'
            }
        ],
        tips: {
            image: 'https://images.allcitygo.com/20200421141234378aWjwcH.png',
            text: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
        },
        agreements: [//协议列表
            {
                "protocolUrl": "/protocol/320200/v1/protocol.htm"
            },
            {
                "protocolUrl": "/protocol/320200/v1/protocol-ant.htm"
            }
        ],
        succPageLists: [ //领卡成功页营销列表
            {
                title: '查看更多乘车资讯查看更多乘车资讯查看更多乘车资讯',
                subTitle: 'xxx城市小程序查看更多乘车资讯查看更多乘车资讯查看更多乘车资讯',
                iconImg: 'https://images.allcitygo.com/20200420201703176QAwdNo.png',
                buttonName: '去乘车去乘车去乘车v',
                color: 'red',
                link: 'https://images.allcitygo.com/20200420201703176QAwdNo.png'
            },
            {
                title: '查看更多乘车资讯',
                subTitle: 'xxx城市小程序',
                iconImg: 'https://images.allcitygo.com/20200420201703176QAwdNo.png',
                buttonName: '去乘车2',
                color: 'yellow',
                link: 'https://images.allcitygo.com/20200420201703176QAwdNo.png'
            }
        ],
    }
});

let commonJson = Mock.mock({
    "title": "成功结果页",
    "key": "success_page",
    json: {
        succPageImg: 'https://images.allcitygo.com/20200420201844349mZHYFf.png',//领卡成功页图片
        succPageInfo: '点击支付宝首页右上角[+]进入乘车码2',//领卡成功页文字
        errorPageInfo: '点击支付宝首页右上角[+]进入乘车码',
        errorPageImg: 'https://images.allcitygo.com/20200420202020179AtrUU5.png',
        errorPageLists: [ //失败页营销列表
            {
                title: '查看更多乘车资讯',
                subTitle: 'xxx城市小程序',
                iconImg: 'https://images.allcitygo.com/20200420201703176QAwdNo.png',
                buttonName: '去乘车',
                link: 'https://images.allcitygo.com/20200420201703176QAwdNo.png'
            },
            {
                title: '查看更多乘车资讯',
                subTitle: 'xxx城市小程序',
                iconImg: 'https://images.allcitygo.com/20200420201703176QAwdNo.png',
                buttonName: '去乘车',
                link: 'https://images.allcitygo.com/20200420201703176QAwdNo.png'
            }
        ],
    }
})

let certUrl = Mock.mock({
    url: 'https://www.baidu.com'
})

let faq = Mock.mock({
    "title": "你问我答",
    "cityCode": "000000",
    json: [
        {
            question: '1. 随便问吧',
            answer: '哦，那我问啦',
        },
        {
            question: '2. 公交线路',
            answer: '请查看线路菜单',
        },
        {
            question: '3. 有的问题标题很长很长很长很长很长很长很长很长很长',
            answer: '所有对于这种问题，他的答案也很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长，至少都要换几行',
        }
    ]
})
let strategy = Mock.mock({
    "title": "使用攻略",
    "cityCode": "000000",
    json: [
        {
            "subject": "多渠道自动扣款更安心多渠道自动扣款更安心",
            "desc": "支持花呗/信用卡/储蓄卡等丰富渠道",
            "icon": "https://images.allcitygo.com/20200420205341100OF3R1U.png"
        },
        {
            "subject": "多渠道自动扣款更安心多渠道自动扣款更安心",
            "desc": "支持花呗/信用卡/储蓄卡等丰富渠道",
            "icon": "https://images.allcitygo.com/20200420205341100OF3R1U.png"
        },
        {
            "subject": "多渠道自动扣款更安心多渠道自动扣款更安心",
            "desc": "支持花呗/信用卡/储蓄卡等丰富渠道",
            "icon": "https://images.allcitygo.com/20200420205341100OF3R1U.png"
        },
        {
            "subject": "多渠道自动扣款更安心多渠道自动扣款更安心",
            "desc": "支持花呗/信用卡/储蓄卡等丰富渠道",
            "icon": "https://images.allcitygo.com/20200420205341100OF3R1U.png"
        }
    ]
})

module.exports = {
    [`GET /api/ioc/ebuscard/certification/url`](req, res) {
        setTimeout(() => {
            res.status(200).json({
                code: 200,
                message: "OK",
                data: certUrl
            });
        }, 1500);
    },

    [`GET /api/ioc/ebuscard/card/open`](req, res) {
        res.status(200).json({
            code: 200,
            message: "OK",
            data: putOnJson
        });
    },

    [`GET /api/ioc/ebuscard/card/common`](req, res) {
        res.status(200).json({
            code: 200,
            message: "OK",
            data: commonJson
        });
    },

    [`GET /api/ioc/ebuscard/card/faq`](req, res) {
        res.status(200).json({
            code: 200,
            message: "OK",
            data: faq
        });
    },

    [`GET /api/ioc/ebuscard/card/guide`](req, res) {
        res.status(200).json({
            code: 200,
            message: "OK",
            redirectUrl: 'https://www.baidu.com',
            data: strategy
        });
    },

    [`GET /api/ioc/ebuscard/card/register`](req, res) {
        setTimeout(() => {
            res.status(200).json({
                code: 200,
                message: "OK",
                redirectUrl: 'https://www.baidu.com',
                data: {
                    alipayMiniappUrl: 'alipays://platformapi/startapp?appId=20000021'
                }
            });
        }, 1500);
    },

    [`GET /api/ioc/ebuscard/card/my`](req, res) {
        setTimeout(() => {
            res.status(200).json({
                code: 200,
                message: "OK",
                data: {
                    cardId: '2378327'
                }
            });
        }, 1500);
    },
}