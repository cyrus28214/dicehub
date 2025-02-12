const games = require('../../data/games').default  // 使用 .default 获取 games 数据
const cates = require('../../data/cates')
const cateDetails = require('../../data/cateDetails')

Page({
  data: {
    category: null,
    games: []
  },

  onLoad(options) {
    const { id } = options
    
    // 打印导入的数据，用于调试
    console.log('cates:', cates)
    console.log('games:', games)
    console.log('cateDetails:', cateDetails)
    
    // 获取分类信息
    const category = cates.find(cate => cate.id === id)
    
    // 获取该分类下的游戏ID列表
    const cateDetail = cateDetails.find(detail => detail.id === id)
    
    // 获取对应的游戏列表
    const categoryGames = cateDetail ? cateDetail.gameIds.map(gameId => 
      games.find(game => game.id === gameId)
    ) : []

    this.setData({
      category,
      games: categoryGames
    })

    // 打印设置的数据，用于调试
    console.log('category:', category)
    console.log('games:', categoryGames)
  },

  onGameTap(e) {
    const { item } = e.detail
    wx.navigateTo({
      url: `/pages/gameDetail/gameDetail?id=${item.id}`
    })
  }
}) 