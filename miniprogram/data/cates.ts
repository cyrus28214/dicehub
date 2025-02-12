export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
};

export const cates: Category[] = [
  {
    id: 1,
    name: '推理',
    description: '需要玩家运用逻辑思维，解开谜题的游戏类型',
    image: '/images/categories/detective.png'
  },
  {
    id: 2,
    name: '社交',
    description: '强调玩家之间互动和交流的游戏类型',
    image: '/images/categories/social.png'
  },
  {
    id: 3,
    name: '聚会',
    description: '适合多人一起游玩的休闲游戏类型',
    image: '/images/categories/party.png'
  },
  {
    id: 4,
    name: '剧情',
    description: '以故事情节为主要重点的游戏类型',
    image: '/images/categories/story.png'
  },
  {
    id: 5,
    name: '休闲',
    description: '轻松易上手，适合休闲时间游玩的游戏类型',
    image: '/images/categories/casual.png'
  },
  {
    id: 6,
    name: '策略',
    description: '需要战略思维和战术规划的游戏类型',
    image: '/images/categories/strategy.png'
  },
  {
    id: 7,
    name: '角色扮演',
    description: '玩家需要扮演特定角色进行游戏的类型',
    image: '/images/categories/roleplay.png'
  },
  {
    id: 8,
    name: '恐怖',
    description: '以恐怖氛围和惊悚元素为主的游戏类型',
    image: '/images/categories/horror.png'
  },
  {
    id: 9,
    name: '动作',
    description: '需要快速反应和操作的游戏类型',
    image: '/images/categories/action.png'
  },
  {
    id: 10,
    name: '生存',
    description: '以生存为主题，需要管理资源的游戏类型',
    image: '/images/categories/survival.png'
  },
  {
    id: 11,
    name: '毛线',
    description: '玩法简单，可以用来活跃气氛的游戏',
    image: '/images/categories/yarn.png'
  },
  {
    id: 12,
    name: '德式',
    description: '以德国风格桌游为特色的游戏类型',
    image: '/images/categories/german.png'
  },
  {
    id: 13,
    name: '美式',
    description: '以美国风格桌游为特色的游戏类型',
    image: '/images/categories/american.png'
  },
  {
    id: 14,
    name: '合作',
    description: '玩家需要相互合作完成目标的游戏类型',
    image: '/images/categories/coop.png'
  },
  {
    id: 15,
    name: '竞技',
    description: '玩家之间相互竞争的游戏类型',
    image: '/images/categories/competitive.png'
  },
  {
    id: 16,
    name: '解谜',
    description: '需要解开各种谜题的游戏类型',
    image: '/images/categories/puzzle.png'
  },
  {
    id: 17,
    name: '冒险',
    description: '以探索和冒险为主题的游戏类型',
    image: '/images/categories/adventure.png'
  },
  {
    id: 18,
    name: '卡牌',
    description: '以卡牌为主要游戏机制的类型',
    image: '/images/categories/card.png'
  },
  {
    id: 19,
    name: '回合制',
    description: '以回合制方式进行的游戏类型',
    image: '/images/categories/turnbased.png'
  }
]