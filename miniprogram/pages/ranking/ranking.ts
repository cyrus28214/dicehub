import { games } from '../../data/games';

Component({
  data: {
    rankingList: games.sort((a, b) => b.playCount - a.playCount).map((game, index) => ({
      ...game,
      rating: game.rating.toFixed(1),
      playCount: game.playCount,
      rank: index + 1
    }))
  },

  methods: {
    onGameTap(e: WechatMiniprogram.TouchEvent) {
      const game = e.currentTarget.dataset.game
      wx.navigateTo({
        url: `/pages/gameDetail/gameDetail?gameId=${game.id}`
      })
    }
  }
}); 