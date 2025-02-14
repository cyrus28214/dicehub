// import { Game, games } from '../../data/games';

import { getComments, getGame, getProfile } from "../../api/api";

Component({
  data: {
    game: null as any,
    profile: null as any,
    userComment: null as any,
    otherComments: [] as any[]
  },
  methods: {
    async onLoad(options: any) {
      const gameId = parseInt(options.gameId);
      const game = await getGame(gameId);
      if (game) {
        this.setData({ game });
        console.log(game);
      } else {
        wx.showToast({
            title: '游戏不存在',
            icon: 'error'
        });
        wx.navigateBack();
      }

      const profile = (await getProfile()) as any;
      const comments = await getComments(gameId);
      const userComment = comments.find(comment => (comment.user_id === profile.id));
      const otherComments = comments.filter(comment => (comment.user_id !== profile.id));
      this.setData({
        profile,
        userComment,
        otherComments
      })
    },
    navigateToEvaluate() {
      wx.navigateTo({
        url: `/pages/evaluate/evaluate?game_id=${this.data.game.id}` // 跳转到评论页面
      });
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

