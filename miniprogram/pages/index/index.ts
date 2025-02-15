// index.ts
// 获取应用实例

import { getGames } from '../../api/api';

const categoryUrl = '/pages/categoryDetail/categoryDetail?id=';

Component({
  data: {
    hot: [ // TODO
      { image: 'https://pic1.imgdb.cn/item/67ae4818d0e0a243d4fefa60.png', url: categoryUrl + '7' },
      { image: 'https://pic1.imgdb.cn/item/67ae4f7ed0e0a243d4fefa70.png', url: categoryUrl + '29' },
      { image: 'https://pic1.imgdb.cn/item/67ae4ffbd0e0a243d4fefa72.png', url: categoryUrl + '8' }
    ],
    categories: [ // TODO (wx upd : abandoned, use [recommendCategories] instead)
      { name: "聚会必玩", image: "/assets/cocktail.svg", url: categoryUrl + '3' },
      { name: "紧张刺激", image: "/assets/zap.svg", url: categoryUrl + '22' },
      { name: "激情嘴炮", image: "/assets/comment.svg", url: categoryUrl + '2' },
      { name: "直接开蒸", image: "/assets/coffee-alt.svg", url: categoryUrl + '26' },
    ],
    games: [] as any[],
    recommendCategories: [] as any[]
  },
  methods: {
    onTapSearch() {
      wx.navigateTo({
        url: '/pages/search/search'
      })
    },
    onTapSwiperItem(e: WechatMiniprogram.TouchEvent) {
      console.log(e.currentTarget.dataset.url);
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    onCategoryTap(e: WechatMiniprogram.TouchEvent) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    onShareAppMessage() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: 'DiceHub-首页'
          });
        }, 2000); // 延迟 2 秒返回分享内容
      });
      return {
        title: 'DiceHub-首页', // 默认转发标题
        path: '/pages/index/index', // 转发页面路径
        promise // 异步处理内容（如需要动态生成转发标题）
      };
    },
    async getGames() {
      const games = await getGames();
      console.debug({ games });
      this.setData({
        games: games as any[]
      });
    },
    onLoad() {
      this.getGames();
    }
  },
})
