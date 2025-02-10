Component({
  properties: {
    games: {
      type: Array,
      value: []
    }
  },

  methods: {
    onGameTap(e: WechatMiniprogram.CustomEvent) {
      const game = e.currentTarget.dataset.game;
      wx.navigateTo({
        url: `/pages/gameDetail/gameDetail?gameId=${game.id}`
      });
    }
  }
}); 