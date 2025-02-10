// index.ts
// 获取应用实例
import { games } from '../../data/games';

Component({
  data: {
    hot: [ // TODO
      { image: 'https://picsum.photos/300/200', url: '/pages/gameDetail/gameDetail?gameId=1' },
      { image: 'https://picsum.photos/300/200', url: '/pages/gameDetail/gameDetail?gameId=1' },
      { image: 'https://picsum.photos/300/200', url: '/pages/gameDetail/gameDetail?gameId=1' },
      { image: 'https://picsum.photos/300/200', url: '/pages/gameDetail/gameDetail?gameId=1' },
      { image: 'https://picsum.photos/300/200', url: '/pages/gameDetail/gameDetail?gameId=1' },
    ],
    categories: [ // TODO
      { icon: "/assets/dice.svg", text: "TRPG", color: "#b58cca", url: "/pages/category/category?type=trpg" },
      { icon: "/assets/dice.svg", text: "TRPG", color: "#b58cca", url: "/pages/category/category?type=rpg" },
      { icon: "/assets/dice.svg", text: "TRPG", color: "#b58cca", url: "/pages/category/category?type=card" },
      { icon: "/assets/dice.svg", text: "TRPG", color: "#b58cca", url: "/pages/category/category?type=board" }
    ],
    games: games
  },
  methods: {
    onTapSearch() {
      wx.navigateTo({
        url: '/pages/search/search'
      })
    },
    onTapSwiperItem(e: WechatMiniprogram.TouchEvent) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    onCategoryTap(e: WechatMiniprogram.TouchEvent) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
})
