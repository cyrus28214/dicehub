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
        }
    }
}) 