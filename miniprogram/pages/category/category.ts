Component({
    data: {
        type: '',
        title: '',
        games: []
    },


    methods: {
      onLoad(options: any) {
          const type = options.type
          this.setData({ type, title: type })
      },

      onGameSelect(e: WechatMiniprogram.CustomEvent) {
          const gameId = e.detail
          wx.navigateTo({
              url: `/pages/gameDetail/gameDetail?gameId=${gameId}`
          })
      },

      onShareAppMessage() {
        const promise = new Promise(resolve => {
          setTimeout(() => {
            resolve({
              title: '桌游助手-分类'
            });
          }, 2000); // 延迟 2 秒返回分享内容
        });
        return {
          title: '桌游助手-分类', // 默认转发标题
          path: '/pages/category/category', // 转发页面路径
          promise // 异步处理内容（如需要动态生成转发标题）
        };
      },
    }
}) 