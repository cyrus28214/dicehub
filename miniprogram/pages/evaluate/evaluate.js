import { ForceMode } from "XrFrame/components/physics/types";
import {submitComment} from "../../api/api"

const app = getApp();

Page({
  data: {
    userAvatar: '',
    username: '',
    rating: 10, // 默认满分
    comment: ''
  },

  onLoad() {
    const userInfo = app.globalData.userInfo;
    if (!userInfo) {
      wx.redirectTo({ url: '/pages/profile/profile' });
      return;
    }

    this.setData({
      userAvatar: userInfo.avatarUrl || '',
      username: userInfo.nickName || ''
    });

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

  increaseRating() {
    if (this.data.rating < 10) {
      this.setData({ rating: this.data.rating + 2 });
    }
  },

  decreaseRating() {
    if (this.data.rating > 2) {
      this.setData({ rating: this.data.rating - 2 });
    }
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

    submitComment(this.data.game.id, app.globalData.userOpenId, this.data.rating,  this.data.comment, getCurrentDate());
  }
}); 