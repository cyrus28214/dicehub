// import { Game, games } from '../../data/games';

import { getGames, getComments } from "../../api/api";

const app = getApp();

Component({
  data: {
    game: null as any,
    hasComment: false,
    userComment: {},
    otherComments: [] as any[],
    userRating: 0
  },
  methods: {
    async onLoad(options: any) {
      const gameId = parseInt(options.gameId);
      const games = await getGames();
      const game = games.find(g => g.id === gameId);
      
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

      this.checkUserComment();
      this.showComments();
    },

    async checkUserComment() {
      const userOpenId = app.globalData.userOpenId;
      const userComments = await getComments(this.data.game.id);
      const comment = userComments.find(comment => (comment.openid === userOpenId && comment.gameid == this.data.game.id));

      console.log("check user comment: ", comment);
  
      if (comment) {
        this.setData({
          hasComment: true,
          userComment: comment,
          userRating: comment.rate // 假设评论对象中有 rate 字段
        });
      } else {
        this.setData({
          hasComment: false
        });
      }
    },

    async showComments() {
      const userOpenId = app.globalData.userOpenId;
      const userComments = await getComments(this.data.game.id);
      const otherComments = userComments.filter(comment => comment.openid !== userOpenId); // 过滤掉自己的评论

      // 假设有一个方法来设置评论数据
      this.setData({
        otherComments: otherComments, // 其他玩家的评论
      });

      // 显示格式化的评论
      console.log("玩家评论: ", this.data.otherComments);
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