import { ForceMode } from "XrFrame/components/physics/types";
import {getGames, submitComment} from "../../api/api"
const userInfos = require("../../data/userInfos.js");

const app = getApp();
Page({
  data: {
    userAvatar: '',
    username: '',
    rating: 10, // 默认满分
    comment: '',
    game: null as any
  },

  async onLoad(options) {
    const games = await getGames();
    console.log("games: ", games);
    const game = games.find(game => game.id == options.game_id);
    this.setData({game : game});
  },

  onShow() {
    const userOpenId = app.globalData.userOpenId;

    console.log("userOpenId: ", userOpenId);
    if (!userOpenId) {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/profile/profile'
            })
          } else {
            wx.navigateBack();
          }
        }
      });
      return;
    }

    const userInfo = userInfos.find(u => u.openid == userOpenId);

    if (userInfo) {
      this.setData({
        userAvatar: userInfo.avatarUrl || '',
        username: userInfo.nickName || ''
      });

      console.log(this.data.userAvatar);
      console.log(this.data.username);
    }

    if (!this.data.userAvatar || !this.data.username) {
      wx.showModal({
        title: '提示',
        content: '请设置头像和昵称',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/userInfoUpdate/userInfoUpdate' });
          } else {
            wx.navigateBack();
          }
        }
      });
    }
  },

  setRating(e) {
    const newRating = e.currentTarget.dataset.rating;
    this.setData({ rating: newRating });
  },

  onCommentInput(e) {
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

  submitReview() {
    // 提交评价的逻辑
    console.log('提交评价:', this.data.rating, this.data.comment);
    // 这里可以添加提交到服务器的代码

    // submitComment(this.data.game.id, app.globalData.userOpenId, this.data.rating,  this.data.comment, getCurrentDate());
    wx.navigateBack();
    wx.showToast({
      title: '评价成功',
      icon: 'success'
    });
  }
}); 