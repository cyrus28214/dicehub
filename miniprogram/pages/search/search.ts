import { AnimatorControllerStateModel } from 'XrFrame/kanata/lib/index';
import { getGames, getTags } from '../../api/api'
import { games } from '../../data/games'

Component({
    data: {
        keyword: '',
        games: [] as any,
        history: [] as string[],
        showHistory: true,
        allTags: [] as any,
        selectedCount: 0,
        showTagsPanel: false
    },

    methods: {
        async onLoad() {
          const tags = await getTags();
          this.setData({
            allTags: tags
          });
          this.resetGames();
        },

        async resetGames() {
          const games = await getGames();
          this.setData({
            games
          });
        },

        onInput(e: WechatMiniprogram.Input) {
            const keyword = e.detail.value
            this.setData({ keyword })
            if (keyword) {
                this.search(keyword)
            } else {
                this.setData({
                    showHistory: true
                })
                this.resetGames();
            }
        },

        onSearch() {
            const { keyword } = this.data
            if (!keyword) return

            this.saveHistory(keyword)
            this.search(keyword)
        },

        async search(keyword: string) {
          const games = await getGames();
          const selectedTags = this.data.allTags.filter((tag: any) => tag.selected);
          const selectedTagIds = (selectedTags as any).map((tag : any) => tag.id);
          const searchResult = games.filter((game: any) => {
            const gameTagIds = game.tags.map((tag: any) => tag.id);
            const satisfyTag = selectedTagIds.every((tagId: number) => gameTagIds.includes(tagId));
            if (!satisfyTag) return false;
            if (keyword) {
              const lowerKeyword = keyword.toLowerCase()
              return game.name.toLowerCase().includes(lowerKeyword) ||
                game.description.toLowerCase().includes(lowerKeyword)
            }
            return true;
          });
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

        onTagTap(e: WechatMiniprogram.TouchEvent) {
            const tappedTag = e.currentTarget.dataset.tag;
            const allTags = this.data.allTags
              .map((tag: any) => tag.id == tappedTag.id ? {...tag, selected: !tag.selected} : tag);
            const selectedCount = allTags.filter((tag: any) => tag.selected).length;
            this.setData({
                allTags,
                selectedCount,
                showHistory: false
            })
            this.search(this.data.keyword)
        },

        toggleTagsPanel() {
            this.setData({
                showTagsPanel: !this.data.showTagsPanel
            })
        }
    }
}) 