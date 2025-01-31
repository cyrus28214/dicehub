export interface Game {
  id: number;
  title: string;
  description: string;
  cover: string;
  rating: number;
  tags: string[];
} 

export const games: Game[] = [
  {
    id: 1,
    title: "阿瓦隆",
    description: "经典社交推理游戏",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 4.5,
    tags: ["推理", "社交", "5-10人"]
  },
  {
    id: 2,
    title: "狼人杀",
    description: "经典狼人杀游戏",
    cover: "https://pic1.imgdb.cn/item/679b7bb9d0e0a243d4f8b0e4.jpg",
    rating: 4.2,
    tags: ["推理", "社交", "6-12人"]
  }
]; 