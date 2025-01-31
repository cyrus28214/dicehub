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
      console.debug("onGameTap", game);
      this.triggerEvent('gameselect', { gameId: game.id });
    }
  }
}); 