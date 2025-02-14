import { ErrataItem, Game, games } from '../../data/games';

// import { getGames } from "../../api/api";

Component({
  data: {
    // game: null as any,
    game: null as Game | null,
    scrollTop: 0,
    headerHeight: 320, // 默认高度，单位px
    searchKeyword: '',
    newErrata: '',
    filteredErrata: [] as ErrataItem[],
    errataList: [] as ErrataItem[],
    
  },
  properties: {
    errataList: {
      type: Array,
      value: [] as ErrataItem[],
      observer(newVal: any) {
        this.filterErrata()
      }
    }
  },
  methods: {
    async onLoad(options: any) {
        const gameId = parseInt(options.gameId);
        // const games = await getGames();
        const game = games.find(g => g.id === gameId);
        const query = wx.createSelectorQuery()
        query.select('.fixed-header').boundingClientRect()
        query.exec(res => {
          if (res[0]) {
            this.setData({
              headerHeight: Math.ceil(res[0].height)
            })
          }
        })
        if (game) {
          this.setData({ 
            game,
            errataList: game.errataList || []
          });
        } else {
        wx.showToast({
            title: '游戏不存在',
            icon: 'error'
        });
        wx.navigateBack();
        }
    },
    onShareTap() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    },
    onShareAppMessage() {
      const game = this.data.game;

      // 确保 game 数据存在
      if (game) {
        return {
          title: `桌游助手 - ${game.title}`, // 动态生成标题
          path: '/pages/gameDetails/gameDetails?gameId=' + game.id, // 转发页面路径
        };
      } else {
        // 如果 game 不存在，提供一个默认的标题
        return {
          title: '桌游助手 - 游戏详情',
          path: '/pages/gameDetails/gameDetails', // 转发页面路径
        };
      }
    },
    scrollToSection(e: any) {
      const section = e.currentTarget.dataset.section;
      const query = wx.createSelectorQuery();
      
      query.select(`#${section}`).boundingClientRect()
      query.selectViewport().scrollOffset()
      
      query.exec((res) => {
        const offset = res[0].top + this.data.scrollTop - 80 // 80是导航栏高度
        this.setData({
          scrollTop: offset
        })
      })
    },
    // 跳转到流程部分
    jumpToProcess(e: WechatMiniprogram.CustomEvent) {
      this.handleSectionJump('process');
    },

    // 跳转到身份部分
    jumpToRoles(e: WechatMiniprogram.CustomEvent) {
      this.handleSectionJump('roles');
    },

    // 跳转到易漏规则
    jumpToErrata(e: WechatMiniprogram.CustomEvent) {
      this.handleSectionJump('errata');
    },

    // 通用滚动处理方法
    handleSectionJump(sectionId: 'process' | 'roles' | 'errata') {
      const query = wx.createSelectorQuery()
      
      // 获取目标元素位置
      query.select(`#${sectionId}`).boundingClientRect()
      // 获取当前滚动位置
      query.select(`#process`).boundingClientRect()
      
      query.exec((res: any[]) => {
        if (res[0] && res[1]) {
          const target = res[0] as WechatMiniprogram.BoundingClientRectCallbackResult
          const scrollOffset = res[1] as WechatMiniprogram.BoundingClientRectCallbackResult
          
          // 计算需要滚动的距离 = 目标元素顶部位置 + 当前已滚动距离 - 固定头部高度
          const offset = target.top - scrollOffset.top - this.data.headerHeight + 330 // 330是process的初始top
          console.debug("target: ", target.top)
          console.debug("scroll: ", scrollOffset.top)
          console.debug("thisdata: ", this.data.headerHeight)
          this.setData({
            scrollTop: Math.max(0, offset - 20) // 添加20rpx的间距
          }, () => {
            // 滚动完成回调
            console.log(`已滚动到 ${sectionId} 位置`)
          })
        }
      })
    },

    onSearchInput(e: WechatMiniprogram.Input) {
      this.setData({
        searchKeyword: e.detail.value
      }, this.filterErrata)
    },
    // 易漏规则处的搜索功能
    filterErrata() {
      const keyword = this.data.searchKeyword.toLowerCase();
    
      // 如果 searchKeyword 为空，直接显示所有规则
      console.debug("rule: ", this.data.errataList);
      if (!keyword) {
        this.setData({
          filteredErrata: this.data.errataList
        });
        return;
      }
    
      // 否则，过滤规则
      this.setData({
        filteredErrata: this.data.errataList.filter(item => 
          item.question.toLowerCase().includes(keyword) ||
          item.answer.toLowerCase().includes(keyword)
        )
      });
    },    

    
  }
}); 