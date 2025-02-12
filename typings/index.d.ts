/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: Record<string, any>
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}