export interface Game {
  id: number;
  title: string;
  description: string;
  cover: string;
  playCount: number;
  rating: number;
  tags: string[];
}

export const games: Game[] = [
  {
    id: 1,
    title: "阿瓦隆",
    description: "正义与邪恶阵营对抗的社交推理游戏，通过投票完成任务决定胜负。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 9.2,
    playCount: 23421,
    tags: ["推理", "社交", "聚会"]
  },
  {
    id: 2,
    title: "狼人杀",
    description: "狼人隐藏身份猎杀村民，村民通过推理找出狼人的社交游戏。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.8,
    playCount: 45231,
    tags: ["推理", "社交", "聚会"]
  },
  {
    id: 3,
    title: "UNO",
    description: "经典的卡牌配对游戏，通过出牌干扰对手，最先出完手牌获胜。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.5,
    playCount: 34152,
    tags: ["毛线", "家庭", "聚会", "卡牌"]
  },
  {
    id: 4,
    title: "卡坦岛",
    description: "在岛屿上收集资源、建设城市的策略游戏，需要合理规划和交易。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 9.3,
    playCount: 34567,
    tags: ["德式", "策略", "资源管理"]
  },
  {
    id: 5,
    title: "达芬奇密码",
    description: "通过推理和逻辑找出对手密码排列的益智游戏。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.6,
    playCount: 12543,
    tags: ["益智", "家庭", "解密"]
  },
  {
    id: 6,
    title: "卡卡颂",
    description: "通过放置地形卡牌建造中世纪城堡和道路的策略游戏。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 9.0,
    playCount: 28976,
    tags: ["德式", "策略", "抽象"]
  },
  {
    id: 7,
    title: "谁是牛头人",
    description: "一款充满欢乐的吹牛与识破游戏，玩家需要在虚实之间找到平衡。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.7,
    playCount: 19234,
    tags: ["毛线", "聚会", "社交"]
  },
  {
    id: 8,
    title: "山屋惊魂",
    description: "在恐怖氛围中寻找线索，揭示真相的剧情推理游戏。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 9.1,
    playCount: 15678,
    tags: ["美式", "剧情", "推理", "恐怖"]
  },
  {
    id: 9,
    title: "德国心脏病",
    description: "快节奏的图案匹配游戏，考验反应速度和观察力。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.4,
    playCount: 23456,
    tags: ["毛线", "家庭", "反应", "儿童"]
  },
  {
    id: 10,
    title: "三国杀",
    description: "以三国为背景的卡牌对战游戏，玩家扮演不同的三国角色进行对抗。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.9,
    playCount: 56789,
    tags: ["美式", "卡牌", "策略"]
  },
  {
    id: 11,
    title: "怒海求生",
    description: "在沉船场景中合作逃生，随机事件带来紧张刺激的体验。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 9.2,
    playCount: 12345,
    tags: ["美式", "合作", "剧情"]
  },
  {
    id: 12,
    title: "大富翁",
    description: "经典的房地产交易与投资游戏，体验商业竞争的乐趣。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.5,
    playCount: 34152,
    tags: ["家庭", "策略", "经济"]
  },
  {
    id: 13,
    title: "龙与地下城",
    description: "在奇幻世界中冒险的角色扮演桌游，体验史诗般的故事。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 9.3,
    playCount: 89012,
    tags: ["TRPG", "角色扮演", "冒险"]
  },
  {
    id: 14,
    title: "克苏鲁的呼唤",
    description: "在神秘的克苏鲁世界中探索，揭露隐藏的真相。",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 8.7,
    playCount: 12345,
    tags: ["TRPG", "角色扮演", "冒险"]
  },
]; 