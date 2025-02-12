import cates from '../../data/cates';

Page({
  data: {
    title: "主题浏览",
    cates: []
  },

  onLoad() {
    this.setData({
      cates: cates
    })
    console.log('分类数据：', this.data.cates)  // 用于调试
  },

  onCategoryTap(e) {
    const { item } = e.detail
    wx.navigateTo({
      url: `/pages/categoryDetail/categoryDetail?id=${item.id}`
    })
  }
}) 