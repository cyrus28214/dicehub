import { getProfile, updateUserName, uploadAvatar } from "../../api/api";

const defaultAvatar = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: defaultAvatar,
    id: null,
    name: null,
    openid: null,
    nicknameInput: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // async getGames() {
  //   const games = await getGames();
  //   console.debug({games});
  //   this.setData({
  //     games: games as any[]
  //   });
  // },

  async onLoad() {
    await this.getProfile();
  },

  async getProfile() {
    const profile = (await getProfile()) as any;
    console.log({profile});
    this.setData({
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar || defaultAvatar
    });
  },

  async onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail;
    console.log({ avatarUrl });
    const res = await uploadAvatar(avatarUrl);
    await this.getProfile();
  },
  onChange(e: any) {
    console.log(e.detail.value);
    this.setData({
      nicknameInput: e.detail.value
    })
  },
  async onConfirm(e: any) {
    const res = await updateUserName(this.data.nicknameInput);
    console.log(res);
    this.setData({
      nicknameErr: "ok"
    });
    await this.getProfile();
    this.setData({
      nicknameInput: ""
    })
  },

  // handleLogin() {
  //   console.log("handleLogin in");
  //   wx.login({
  //     success: (loginRes) => {
  //       if (loginRes.code) {
  //         console.log("loginRes.code: ", loginRes.code);
  //         wx.request({
  //           url: 'https://api.cyrus28214.top/api/login',
  //           method: 'POST',
  //           data: {
  //             code: loginRes.code
  //           },
  //           success: (tres) => {
  //             console.log('后端返回的数据:', tres.data); // 打印后端返回的数据(token)
  //             if (tres.data.token) {
  //               wx.request({
  //                 url: 'https://api.cyrus28214.top/api/profile',
  //                 method: 'GET',
  //                 header: {
  //                   'Authorization': `Bearer ${tres.data.token}`
  //                 },
  //                 success: (res) => {
  //                   if (res.data.openid) {
  //                     const openid = res.data.openid;
  //                     console.log("got openid = ", openid);
                      
  //                     // 保存 openid 到本地存储
  //                     wx.setStorageSync('openid', openid);
  //                     this.setData({
  //                       openid: openid
  //                     });
  //                     const app = getApp();
  //                     app.globalData.userOpenId = openid;
  //                     // app.globalData.games = await getGames();
  //                     console.log("global openid now = ", app.globalData.userOpenId);
  //                     console.log("allgames : ", app.globalData.games);
                      
  //                     wx.showToast({
  //                       title: '登录成功',
  //                       icon: 'success'
  //                     });
  //                     // const app = getApp();
  //                     // const userOpenId = app.globalData.userOpenId;
  //                     let item = userInfos.find(userInfos => userInfos.openid == openid);
  //                     console.log("item: ", item);
                  
  //                     if (item) {
  //                       this.setData({
  //                         userInfo: item
  //                       });
  //                     } else {
  //                       item = {
  //                         avatarUrl: "../../images/avatar/default.png",
  //                         nickName: "unnamed",
  //                         openid: openid
  //                       };
  //                       this.setData({
  //                         userInfo: item
  //                       });
  //                     }
  //                   } else {
  //                     console.error('获取 openid 失败', res);
  //                     wx.showToast({
  //                       title: '获取 openid 失败',
  //                       icon: 'none'
  //                     });
  //                   }
  //                 },
  //                 fail: (err) => {
  //                   console.error('获取 openid 失败', err);
  //                   wx.showToast({
  //                     title: '获取 openid 失败',
  //                     icon: 'none'
  //                   });
  //                 }
  //               })
  //             } else {
  //               console.error('获取 token 失败', res);
  //               wx.showToast({
  //                 title: '获取 token 失败',
  //                 icon: 'none'
  //               });
  //             }
  //           },
  //           fail: (err) => {
  //             console.error('请求后端失败', err);
  //             wx.showToast({
  //               title: '请求后端失败',
  //               icon: 'none'
  //             });
  //           }
  //         });
  //       } else {
  //         console.error('登录失败', loginRes);
  //         wx.showToast({
  //           title: '登录失败',
  //           icon: 'none'
  //         });
  //       }
  //     },
  //     fail: (err) => {
  //       console.error('微信登录失败', err);
  //       wx.showToast({
  //         title: '微信登录失败',
  //         icon: 'none'
  //       });
  //     }
  //   });

  // },

  // handleLogout() {
  //   // 清除本地存储的用户信息和 openid
  //   wx.removeStorageSync('userInfo');
  //   wx.removeStorageSync('openid');
  //   this.setData({
  //     userInfo: null,
  //     openid: null
  //   });

  //   wx.showToast({
  //     title: '已退出登录',
  //     icon: 'success'
  //   });
  // },

  // navigateToHistory() {
  //   if (!this.data.userInfo || !this.data.openid) {
  //     wx.showToast({
  //       title: '请先登录',
  //       icon: 'none'
  //     });
  //     return;
  //   }
    
  //   wx.navigateTo({
  //     url: '/pages/history/history'
  //   });
  // },
  
  // navigateToUserInfoUpdate() {
  //   if (!this.data.userInfo || !this.data.openid) {
  //     wx.showToast({
  //       title: '请先登录',
  //       icon: 'none'
  //     });
  //     return;
  //   }
    
  //   wx.navigateTo({
  //     url: '/pages/userInfoUpdate/userInfoUpdate'
  //   });
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})