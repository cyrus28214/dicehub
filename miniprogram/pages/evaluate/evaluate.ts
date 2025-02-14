import {getGame, getGames, getProfile, submitComment} from "../../api/api";

Page({
  data: {
    userAvatar: '',
    username: '',
    rating: 10, // 默认满分
    comment: '',
    game: null as any
  },

  async onLoad(options) {
    const gameId = parseInt(options.game_id!);
    const game = await getGame(gameId);
    console.log("game: ", game);
    const profile = (await getProfile()) as any;

    this.setData({
      game : game,
      userAvatar: profile.avatar,
      username: profile.name
    });
  
  },

  setRating(e: any) {
    const newRating = e.currentTarget.dataset.rating;
    this.setData({ rating: newRating });
  },

  onCommentInput(e: any) {
    this.setData({ comment: e.detail.value });
  },

  getCurrentDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    const formattedTime = year + month + day + hours + minutes + seconds;

    return formattedTime;
  },

  async submitReview() {
    console.log('提交评价:', this.data.rating, this.data.comment);
    await submitComment(this.data.game.id, this.data.comment, this.data.rating);
    wx.navigateBack();
    wx.showToast({
      title: '评价成功',
      icon: 'success'
    });
  }
}); 