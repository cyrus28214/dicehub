const games = require('../../data/games')
const cates = require('../../data/cates')
const cateDetails = require('../../data/cateDetails')

Page({
  data: {
    category: null,
    games: []
  },

  onLoad(options) {
    const { id } = options
    
    // 调试：查看 games 的结构
    console.log('games类型:', typeof games)
    console.log('games内容:', games)
    
    // 获取分类信息
    const category = cates.find(cate => cate.id === id)
    
    // 获取该分类下的游戏ID列表
    const cateDetail = cateDetails.find(detail => detail.id === id)
    
    // 使用 Object.values 将 games 对象转换为数组
    const gamesArray = Object.values(games.games)
    
    // 使用转换后的数组查找游戏
    const categoryGames = cateDetail ? cateDetail.gameIds.map(gameId => 
      gamesArray.find(game => game.id === gameId)
    ).filter(Boolean) : []

    this.setData({
      category: category,
      games: categoryGames
    })

    // 调试日志
    console.log('分类:', category)
    console.log('游戏列表:', categoryGames)
  },

  onGameTap(e) {
    const { item } = e.detail
    wx.navigateTo({
      url: `/pages/gameDetail/gameDetail?id=${item.id}`
    })
  }
})