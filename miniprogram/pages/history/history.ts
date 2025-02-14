const userComments = require('../../data/userComments.js'); // 引入用户评论数据
import { getGames } from '../../api/api';
const app = getApp();

Page({
  data: {
    games: [] as any[], 
    mygames: [] as any[], // 存储用户评价过的游戏详细信息
  },

  async onShow() {
    await this.getGames(); // 等待 getGames 完成
    this.loadUserComments();
  },

  async getGames() {
    const games = await getGames();
    console.debug({ games });
    this.setData({
      games: games as any[]
    });
  },

  loadUserComments() {
    const userOpenId = app.globalData.userOpenId; // 获取当前用户的 openid
    const gameIds = new Set(); // 使用 Set 来存储唯一的 gameid

    // 查找与当前用户 openid 一致的评论
    userComments.forEach(comment => {
      if (comment.openid === userOpenId) {
        gameIds.add(comment.gameid); // 记录 gameid
      }
    });
    console.log(gameIds);
    console.log(this.data.games);

    // 使用 forEach 构建与用户评论相关的游戏详细信息数组
    let mygames = [] as any[]
    this.data.games.forEach(game => {
      if (gameIds.has(String(game.id))) {
        mygames.push(game);
        console.log("found: ", game);
      } else {
        console.log("not: ", game);
      }
    });
    console.log(mygames);

    // 将游戏详细信息设置到数据中
    this.setData({
      mygames: mygames
    });
  }
}); 