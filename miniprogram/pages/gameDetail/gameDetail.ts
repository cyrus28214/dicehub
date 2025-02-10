import { Game, games } from '../../data/games';

Component({
  data: {
    game: null as Game | null
  },
  methods: {
    onLoad(options: any) {
        const gameId = parseInt(options.gameId);
        const game = games.find(g => g.id === gameId);
        
        if (game) {
        this.setData({ game });
        } else {
        wx.showToast({
            title: '游戏不存在',
            icon: 'error'
        });
        wx.navigateBack();
        }
    },
    onShareTap() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
  }
}); 