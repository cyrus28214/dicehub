import { getGames, getProfile, getToken, login } from "./api/api";

// app.ts
App<IAppOption>({
  globalData: {
    games: null
  },
  async onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    console.log("login result:", await getToken());
    // console.log(await getProfile());
    const games = await getGames();
    console.log("games: ", games);
    // app.globalData.games = await getGames();
    // console.log(app.globalData.games);
  },
})
