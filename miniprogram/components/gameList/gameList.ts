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
      this.triggerEvent('gameselect', { gameId: game.id });
    }
  }
}); 