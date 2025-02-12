import { getGames } from "../../api/api";

Component({
  data: {
    // rankingList: games.sort((a, b) => b.playCount - a.playCount).map((game, index) => ({
    //   ...game,
    //   rating: game.rating.toFixed(1),
    //   playCount: game.playCount,
    //   rank: index + 1
    // }))
    rankingList: null as any[] | null
  },

  methods: {
    async onLoad() {
      const games = (await getGames())
        .sort((a, b) => b.likes_count - a.likes_count)
        .map((game, index) => ({
          ...game,
          rank: index + 1
        }));
      this.setData({rankingList: games});
    },
    onGameTap(e: WechatMiniprogram.TouchEvent) {
      const game = e.currentTarget.dataset.game
      wx.navigateTo({
        url: `/pages/gameDetail/gameDetail?gameId=${game.id}`
      })
    },
    onShareAppMessage() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '桌游助手-排行榜'
          });
        }, 2000); // 延迟 2 秒返回分享内容
      });
      return {
        title: '桌游助手-排行榜', // 默认转发标题
        path: '/pages/ranking/ranking', // 转发页面路径
        promise // 异步处理内容（如需要动态生成转发标题）
      };
    },
  }
}); 