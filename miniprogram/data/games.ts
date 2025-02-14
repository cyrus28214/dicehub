// 新增子类型定义
interface ProcessStep {
  title: string;
  content: string;
  image?: string;
}

interface GameRole {
  id: number;
  name: string;
  team: '好人' | '坏人' | '中立';
  description: string;
  complexity?: number;  // 难度等级 1-5

}

export interface ErrataItem {
  id: number;
  question: string;
  answer: string;
  status: 'confirmed' | 'pending';  // 确认状态
  source?: string;                  // 规则来源
  reportCount?: number;             // 反馈次数
}

// 修改主接口
export interface Game {
  id: number;
  title: string;
  description: string;
  cover: string;      // 修改字段名与数据一致（原image改为cover）
  playCount: number;
  rating: number;
  tags: string[];
  minPlayers: number; // 新增最小人数
  maxPlayers: number; // 新增最大人数
  duration: number;   // 新增游戏时长（分钟）
  processSteps: ProcessStep[];  // 游戏流程
  roles: GameRole[];            // 身份信息
  errataList: ErrataItem[];     // 易漏规则
}
export const games: Game[] = [
// export let games: Game[] = [
  {
    id: 1,
    title: "阿瓦隆",
    description: "正义与邪恶阵营对抗的社交推理游戏，通过投票完成任务决定胜负。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 9.2,
    playCount: 23421,
    tags: ["推理", "社交", "聚会"],
    minPlayers: 5,
    maxPlayers: 10,
    duration: 45,
    processSteps: [
      {
        title: "确定角色",
        content: `6人局: 
        好人阵营: 梅林, 派西维尔, 忠臣×2;
        坏人阵营: 莫德雷德, 刺客
        特别规则: 莫甘娜替换奥伯伦:cite[4]
        10人局: 
        好人阵营: 梅林, 派西维尔, 忠臣×4, 湖中仙女; 
        坏人阵营: 莫德雷德, 刺客, 莫甘娜, 奥伯伦
        特殊规则: 新增双面人角色，第3轮可能变阵营`
      },
      {
        title: "角色分配",
        content: "随机分配角色卡，包含梅林、派西维尔、忠臣和莫德雷德阵营",
        image: "/images/process/avalon1.jpg"
      },
      {
        title: "任务投票",
        content: "每轮由队长选择队员，全员投票决定是否执行该队伍。投票失败3次后进入强制轮:cite[4]",
        image: "/images/process/avalon2.jpg"
      },
      {
        title: "任务执行",
        content: "被选队员暗投任务卡，若有1张反对票则任务失败（第4轮需2张反对票失败）:cite[7]",
        image: "/images/process/avalon3.jpg"
      },
      {
        title: "刺杀阶段",
        content: "蓝方累计3次任务成功时，刺客需在限定时间内指认梅林身份:cite[4]"
      }
    ],
    roles: [
      {
        id: 1,
        name: "梅林",
        team: "好人",
        description: "知晓所有坏人身份（除莫德雷德），需隐藏自己",
        complexity: 4
      },
      {
        id: 2,
        name: "派西维尔",
        team: "好人",
        description: "能识别梅林和莫甘娜，需判断真先知",
        complexity: 3
      },
      {
        id: 3,
        name: "莫德雷德",
        team: "坏人",
        description: "红方首领，梅林无法识别其身份:cite[7]",
        complexity: 5
      },
      {
        id: 4,
        name: "刺客",
        team: "坏人",
        description: "在蓝方获胜后可通过刺杀梅林翻盘",
        complexity: 4
      },
      {
        id: 5,
        name: "奥伯伦",
        team: "坏人",
        description: "隐狼角色，队友无法确认其身份",
        complexity: 2
      }
    ],
    errataList: [
      {
        id: 1,
        question: "刺客在游戏结束后是否可以查看梅林身份？",
        answer: "只有游戏失败时刺客可以指认梅林，成功后需公开验证",
        status: "confirmed",
        source: "官方规则书P23",
        reportCount: 12
      },
      {
        id: 2,
        question: "梅林能否直接透露坏人身份？",
        answer: "过度暴露会被刺客刺杀，需通过隐晦暗示引导队友",
        status: "confirmed",
        source: "社区FAQ",
        reportCount: 34
      },
      {
        id: 3,
        question: "8人局新增角色规则",
        answer: "加入湖中仙女角色，第二轮后可查验他人阵营（可撒谎）:cite[7]",
        status: "confirmed",
        source: "扩展规则v2.1"
      },
      {
        id: 4,
        question: "新增规则王者之剑应该如何游玩",
        answer: "队长可指定王者之剑持有者，任务卡可被强制更换结果:cite[9]",
        status: "confirmed",
        source: "扩展规则v2.1"
        }
      ],
  },
  {
    id: 2,
    title: "狼人杀",
    description: "狼人隐藏身份猎杀村民，村民通过推理找出狼人的社交游戏。",
    cover: "https://pic1.imgdb.cn/item/67ab9736d0e0a243d4fe75a5.jpg",
    rating: 8.8,
    playCount: 45231,
    tags: ["推理", "社交", "聚会"],
    minPlayers: 6,
    maxPlayers: 18, 
    duration: 60,
    processSteps: [], // 示例数据
    roles: [],
    errataList: []
  },
  {
    id: 3,
    title: "UNO",
    description: "全球畅销的快速卡牌游戏，通过颜色/数字匹配与功能牌组合制造连锁反应，+2、反转、万能牌等特殊机制带来瞬息万变的局势。",
    cover: "https://pic1.imgdb.cn/item/67ab9693d0e0a243d4fe7596.jpg",
    rating: 8.5,
    playCount: 34152,
    tags: ["毛线", "家庭", "聚会", "卡牌"],
    minPlayers: 2,
    maxPlayers: 10,
    duration: 15,
    processSteps: [
      { title: "分发起始", content: "每人发7张手牌，剩余牌堆作为抽牌区" },
      { title: "核心回合", content: "匹配上家卡牌颜色/数字，或使用功能牌改变局势" },
      { title: "特殊机制", content: "+4黑牌可指定颜色并让下家抽4张，反转牌改变出牌顺序" }
    ],
    roles: [],
    errataList: []
  },
  {
    id: 4,
    title: "卡坦岛：开拓者版",
    description: "2025新版重塑经典，新增航海扩展与3D地形模块，支持动态版图拼接与资源交易策略。文明建设游戏标杆，荣获2025年度最佳焕新桌游奖:cite[2]:cite[4]:cite[6]",
    cover: "https://pic1.imgdb.cn/item/67ab9693d0e0a243d4fe7595.jpg",
    rating: 9.6, // 评分提升反映新版优化
    playCount: 45678, // 更新玩家基数
    tags: ["德式", "策略", "资源管理", "扩展"],
    minPlayers: 3,
    maxPlayers: 6,
    duration: 90,
    processSteps: [
      { title: "版图创建", content: "随机拼接六边形地形板块，生成独特岛屿", image: "/images/catan_map.jpg" },
      { title: "资源循环", content: "通过骰子结算资源产出，建造道路/村庄/城市" },
      { title: "贸易博弈", content: "港口交易与玩家间资源谈判策略" }
    ],
    roles: [],
    errataList: [
      {
        id: 401,
        question: "新版航海扩展是否兼容旧版组件？",
        answer: "完全兼容，新增船只单位可替换原有道路模块",
        status: "confirmed",
        source: "官方FAQ"
      }
    ]
  },
  {
    id: 5,
    title: "达芬奇密码",
    description: "数字推理巅峰之作，通过对手牌排列的试探性猜测，结合排除法破解4位数字密码。2023年推出双人快速对战变体规则",
    cover: "https://pic1.imgdb.cn/item/67ab9735d0e0a243d4fe75a1.jpg",
    rating: 8.6,
    playCount: 12543,
    tags: ["益智", "家庭", "解密", "数字"],
    minPlayers: 2,
    maxPlayers: 4,
    duration: 20,
    processSteps: [],
    roles: [],
    errataList: []
  },
  {
    id: 6,
    title: "卡卡颂20周年纪念版",
    description: "新增公会与修道院扩展，磁吸式地形板块提升拼图体验。支持进阶计分规则：农夫占领区域计分方式优化",
    cover: "https://pic1.imgdb.cn/item/67ab9736d0e0a243d4fe75a4.jpg",
    rating: 9.2, // 纪念版评分提升
    playCount: 32890,
    tags: ["德式", "策略", "抽象", "拼图"],
    minPlayers: 2,
    maxPlayers: 5,
    duration: 45,
    processSteps: [],
    roles: [],
    errataList: []
  }
  // 其他游戏保持原有数据结构，补充新增字段：
  ,{
    id: 7,
    title: "谁是牛头人",
    description: "虚实博弈社交游戏，通过道具卡牌制造信息差，2024年新增「黑暗交易」扩展包引入双重身份机制",
    cover: "https://pic1.imgdb.cn/item/67ab977ed0e0a243d4fe75a8.jpg",
    rating: 8.7,
    playCount: 19234,
    tags: ["毛线", "聚会", "社交", "角色"],
    minPlayers: 4,
    maxPlayers: 12,
    duration: 30,
    processSteps: [],
    roles: [],
    errataList: []
  },
  {
    id: 8,
    title: "山屋惊魂（新版）",
    description: "沉浸式恐怖剧情游戏，新增AR线索扫描功能，通过手机摄像头解谜。2024年推出「血色遗产」扩展包",
    cover: "https://pic1.imgdb.cn/item/67ab977ed0e0a243d4fe75ab.jpg",
    rating: 9.3, // 新版评分提升
    playCount: 24567,
    tags: ["美式", "剧情", "推理", "恐怖", "AR"],
    minPlayers: 3,
    maxPlayers: 6,
    duration: 120,
    processSteps: [
      { 
        title: "序幕阶段", 
        content: "随机选择剧本，分配初始物品和秘密任务",
        image: "/images/betrayal_setup.jpg"
      },
      {
        title: "探索阶段",
        content: "移动探索房间，触发预兆事件和超自然现象"
      },
      {
        title: "转折时刻",
        content: "当预兆条件满足时，开启专属剧本的最终对抗"
      }
    ],
    roles: [],
    errataList: [
      {
        id: 801,
        question: "新版AR线索是否影响原有剧本平衡？",
        answer: "AR功能为可选模块，不影响核心规则平衡性",
        status: "confirmed",
        source: "设计师访谈"
      }
    ]
  },
  {
    id: 9,
    title: "德国心脏病：动物乐园版",
    description: "新增30种濒危动物卡牌，配套生态知识问答机制，适合亲子环保教育",
    cover: "https://pic1.imgdb.cn/item/67ab9735d0e0a243d4fe75a3.jpg",
    rating: 8.7,
    playCount: 34567,
    tags: ["毛线", "家庭", "反应", "教育"],
    minPlayers: 2,
    maxPlayers: 8,
    duration: 15,
    processSteps: [
      { title: "卡牌分发", content: "每人获得5张动物卡，中央放置铃铛" },
      { title: "快速匹配", content: "当出现相同动物时立即抢铃，正确者获得卡牌" },
      { title: "知识问答", content: "特殊标记卡触发生态保护知识挑战" }
    ],
    roles:[],
    errataList: [],
  },
  {
    id: 10,
    title: "三国杀：界限突破版",
    description: "重构经典武将技能体系，新增军争篇扩展和3D立体卡牌。支持在线身份场匹配功能",
    cover: "https://pic1.imgdb.cn/item/67ab977ed0e0a243d4fe75aa.jpg",
    rating: 9.0,
    playCount: 89234,
    tags: ["中式", "卡牌", "策略", "电子化"],
    minPlayers: 4,
    maxPlayers: 10,
    duration: 45,
    processSteps: [],
    roles: [
      {
        id: 1001,
        name: "界关羽",
        team: "坏人",
        description: "武圣：可将红色牌当【杀】使用或打出",
        complexity: 3
      },
      {
        id: 1002,
        name: "SP貂蝉",
        team: "中立",
        description: "离魂：出牌阶段可交换两名其他角色手牌",
        complexity: 4
      }
    ],
    errataList: [
      {
        id: 1001,
        question: "新版【闪电】判定规则是否有变化？",
        answer: "保持原有判定流程，新增数字传感器自动判定功能",
        status: "confirmed",
        reportCount: 28
      }
    ]
  },
  {
    id: 11,
    title: "怒海求生：风暴来袭扩展",
    description: "新增动态天气系统和救援直升机机制，支持6-12人大型团队合作模式",
    cover: "https://pic1.imgdb.cn/item/67ab977ed0e0a243d4fe75a9.jpg",
    rating: 9.4,
    playCount: 23456,
    tags: ["美式", "合作", "剧情", "扩展"],
    minPlayers: 4,
    maxPlayers: 12,
    duration: 90,
    processSteps: [
      { title: "角色分配", content: "随机抽取船员/叛徒身份" },
      { title: "资源争夺", content: "每回合争夺有限淡水和食物" },
      { title: "事件阶段", content: "触发随机海难事件（鲨鱼袭击/暴风雨等）" }
    ],
    roles:[],
    errataList:[]
  },
  {
    id: 12,
    title: "大富翁：元宇宙版",
    description: "结合NFT地产交易系统，支持AR虚拟建筑投影。新增股票市场和加密货币玩法",
    cover: "https://pic1.imgdb.cn/item/67ab9735d0e0a243d4fe75a2.jpg",
    rating: 8.8,
    playCount: 45678,
    tags: ["家庭", "策略", "经济", "数字"],
    minPlayers: 2,
    maxPlayers: 6,
    duration: 120,
    processSteps: [],
    roles:[],
    errataList: [
      {
        id: 1201,
        question: "实体版是否兼容虚拟资产？",
        answer: "通过扫码实现实体卡牌与区块链资产绑定",
        status: "pending",
        reportCount: 15
      }
    ]
  },
  {
    id: 13,
    title: "龙与地下城：龙焰传承",
    description: "2024年核心规则更新版，新增龙裔血脉系统和动态遭遇生成APP",
    cover: "https://pic1.imgdb.cn/item/67ab9693d0e0a243d4fe7594.jpg",
    rating: 9.5,
    playCount: 123456,
    tags: ["TRPG", "角色扮演", "冒险", "数字"],
    minPlayers: 3,
    maxPlayers: 8,
    duration: 240,
    processSteps: [
      { title: "创建角色", content: "选择种族职业，分配属性点" },
      { title: "冒险准备", content: "DM设置剧情线索和遭遇事件" },
      { title: "遭遇阶段", content: "投掷20面骰进行战斗/交涉判定" }
    ],
    roles:[],
    errataList:[]
  },
  {
    id: 14,
    title: "克苏鲁的呼唤：电子之秘",
    description: "支持VR沉浸式模组，新增赛博朋克世界观扩展。包含AI守秘人辅助系统",
    cover: "https://pic1.imgdb.cn/item/67ab9692d0e0a243d4fe7593.jpg",
    rating: 9.0,
    playCount: 34567,
    tags: ["TRPG", "角色扮演", "恐怖", "科技"],
    minPlayers: 2,
    maxPlayers: 6,
    duration: 180,
    processSteps: [],
    roles:[],
    errataList:[]
  },
  {
    id: 15,
    title: "战锤40k：第十版",
    description: "全面更新战斗规则，简化AP计算系统。新增泰伦虫族基因吞噬者单位",
    cover: "https://pic1.imgdb.cn/item/67ab9692d0e0a243d4fe7592.jpg",
    rating: 9.1,
    playCount: 45678,
    tags: ["战棋", "策略", "科幻", "模型"],
    minPlayers: 2,
    maxPlayers: 2,
    duration: 180,
    processSteps: [],
    roles:[],
    errataList: [
      {
        id: 1501,
        question: "新单位移动距离计算方式？",
        answer: "采用新版测距轮系统，基础移动+骰子修正",
        status: "confirmed",
        source: "核心规则v10.1.2"
      }
    ]
  }
]; 