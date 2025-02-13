// index.ts
// 获取应用实例

import { getGames } from '../../api/api';
import { cates }  from '../../data/cates';

Component({
  data: {
    hot: [ // TODO
      { image: 'https://pic1.imgdb.cn/item/67ae4818d0e0a243d4fefa60.png', url: '/pages/category/categoryDetail?id=25' },
      { image: 'https://pic1.imgdb.cn/item/67ae4f7ed0e0a243d4fefa70.png', url: '/pages/category/categoryDetail?id=21' },
      { image: 'https://pic1.imgdb.cn/item/67ae4ffbd0e0a243d4fefa72.png', url: '/pages/category/categoryDetail?id=6' }
    ],
    categories: [ // TODO (wx upd : abandoned, use [recommendCategories] instead)
      { id: 3, name: "聚会必玩", image: "/assets/cocktail.svg" },
      { id: 16, name: "紧张刺激", image: "/assets/zap.svg" },
      { id: 2, name: "激情嘴炮", image: "/assets/comment.svg"},
      { id: 19, name: "直接开蒸", image: "/assets/coffee-alt.svg"},
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
            title: '桌游助手-首页'
          });
        }, 2000); // 延迟 2 秒返回分享内容
      });
      return {
        title: '桌游助手-首页', // 默认转发标题
        path: '/pages/index/index', // 转发页面路径
        promise // 异步处理内容（如需要动态生成转发标题）
      };
    },
    async getGames() {
      const games = await getGames();
      console.debug({games});
      this.setData({
        games: games as any[]
      });
    },
    onLoad() {
      // 随机抽取4个分类
      this.setRandomCategories()
      this.getGames();
    },
    // 随机抽取分类的方法
    setRandomCategories() {
      const allCates = [...cates]  // 复制数组，避免影响原数据
      const selected = []
      
      // 随机抽取4个分类
      while (selected.length < 4 && allCates.length > 0) {
        const randomIndex = Math.floor(Math.random() * allCates.length)
        selected.push(allCates.splice(randomIndex, 1)[0])
      }

      // 转换为需要的格式
      const recommendCategories = selected.map(cate => ({
        id: cate.id,
        name: cate.name,
        image: cate.image,  // 使用分类自己的图标
        desc: cate.description
      }))

      this.setData({
        recommendCategories: recommendCategories
      })

      console.log(recommendCategories)
    },
    // 修改点击处理方法
    onRecommendTap(e: any) {
      const { id } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/categoryDetail/categoryDetail?id=${id}`
      })
    }
  },
})
