import { games } from '../../data/games'

Component({
    data: {
        keyword: '',
        games: games,  // 初始显示所有游戏
        history: [] as string[],
        showHistory: true,
        allTags: [] as string[],
        selectedTags: [] as string[],
        showTagsPanel: false
    },

    methods: {
        onLoad() {
            const history = wx.getStorageSync('searchHistory') || []
            this.setData({ history })

            // 收集所有游戏的标签并去重
            const tags = new Set<string>()
            games.forEach(game => {
                game.tags.forEach(tag => tags.add(tag))
            })
            this.setData({
                allTags: Array.from(tags)
            })
        },

        onInput(e: WechatMiniprogram.Input) {
            const keyword = e.detail.value
            this.setData({ keyword })
            if (keyword) {
                this.search(keyword)
            } else {
                this.setData({
                    games: games,  // 当搜索框为空时显示所有游戏
                    showHistory: true
                })
            }
        },

        onSearch() {
            const { keyword } = this.data
            if (!keyword) return

            this.saveHistory(keyword)
            this.search(keyword)
        },

        search(keyword: string) {
            const searchResult = games.filter(game => {
                // 标签筛选
                if (this.data.selectedTags.length > 0) {
                    const hasSelectedTags = this.data.selectedTags.every(tag =>
                        game.tags.includes(tag)
                    )
                    if (!hasSelectedTags) return false
                }

                // 关键词筛选
                if (keyword) {
                    const lowerKeyword = keyword.toLowerCase()
                    return game.title.toLowerCase().includes(lowerKeyword) ||
                        game.description.toLowerCase().includes(lowerKeyword) ||
                        game.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
                }

                return true
            })

            this.setData({
                games: searchResult,
                showHistory: false
            })
        },

        saveHistory(keyword: string) {
            let history = this.data.history
            // 移除重复项
            history = history.filter(item => item !== keyword)
            // 添加到开头
            history.unshift(keyword)
            // 最多保存10条
            history = history.slice(0, 10)

            this.setData({ history })
            wx.setStorageSync('searchHistory', history)
        },

        clearHistory() {
            this.setData({ history: [] })
            wx.removeStorageSync('searchHistory')
        },

        onHistoryTap(e: WechatMiniprogram.TouchEvent) {
            const keyword = e.currentTarget.dataset.keyword
            this.setData({ keyword })
            this.search(keyword)
        },

        onGameSelect(e: WechatMiniprogram.CustomEvent) {
            const gameId = e.detail
            wx.navigateTo({
                url: `/pages/gameDetail/gameDetail?gameId=${gameId}`
            })
        },

        onTagTap(e: WechatMiniprogram.TouchEvent) {
            const tag = e.currentTarget.dataset.tag
            const selectedTags = [...this.data.selectedTags]
            const index = selectedTags.indexOf(tag)

            if (index > -1) {
                selectedTags.splice(index, 1)
            } else {
                selectedTags.push(tag)
            }

            console.log({ selectedTags });

            this.setData({
                selectedTags,
                showHistory: false  // 确保选择标签时不显示历史记录
            })
            this.search(this.data.keyword)
        },

        toggleTagsPanel() {
            this.setData({
                showTagsPanel: !this.data.showTagsPanel
            })
        },

        includes<T>(arr: T[], value: T) {
          return arr.includes(value);
        }
    }
}) 