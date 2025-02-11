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
    },
    onShareAppMessage() {
      const game = this.data.game;

      // 确保 game 数据存在
      if (game) {
        return {
          title: `桌游助手 - ${game.title}`, // 动态生成标题
          path: '/pages/gameDetails/gameDetails?gameId=' + game.id, // 转发页面路径
        };
      } else {
        // 如果 game 不存在，提供一个默认的标题
        return {
          title: '桌游助手 - 游戏详情',
          path: '/pages/gameDetails/gameDetails', // 转发页面路径
        };
      }
    },
  }
}); 