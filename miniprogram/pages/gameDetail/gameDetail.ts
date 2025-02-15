import { ErrataItem  } from '../../data/games';
import { getGame, getProfile, getComments } from "../../api/api";

Component({
  data: {
    gameId: null as any,
    game: null as any,
    scrollTop: 0,
    headerHeight: 320, // 默认高度，单位px
    searchKeyword: '',
    newErrata: '',
    extraInfo: null as any,
    filteredErrata: [] as ErrataItem[],
    userComment: null,
    otherComments: null as any
  },

  methods: {
    onLoad(options: any) {
      if (!options.gameId) {
        this.noGame();
      }
      const gameId = parseInt(options.gameId);
      this.setData({
        gameId
      })
    },
    async onShow() {
        const game = (await getGame(this.data.gameId)) as any;
        if (!game) {
          this.noGame();
        }
        const profile = (await getProfile()) as any;
        const comments = await getComments(this.data.gameId);
        console.log({comments});
        const userComment = comments.find(comment => comment.user.id === profile.id);
        const otherComments = comments.filter(comment => comment.user.id !== profile.id);
        console.log({game});
        const extraInfo = game.extra_info && JSON.parse(game.extra_info);
        const query = wx.createSelectorQuery();
        query.select('.fixed-header').boundingClientRect()
        query.exec(res => {
          if (res[0]) {
            this.setData({
              headerHeight: Math.ceil(res[0].height)
            })
          }
        })
        this.setData({ 
          game,
          userComment,
          otherComments,
          filteredErrata: extraInfo?.errataList || [],
          extraInfo
        });
    },
    noGame() {
      wx.showToast({
        title: '游戏不存在',
        icon: 'error'
      });
      wx.navigateBack();
    },
    navigateToEvaluate() {
      wx.navigateTo({
        url: `/pages/evaluate/evaluate?game_id=${this.data.game.id}` // 跳转到评论页面
      });
    },
    onShareTap() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    },
    onShareAppMessage() {
      const game = this.data.game;
      return {
        title: `DiceHub - ${game.name}`, // 动态生成标题
        path: '/pages/gameDetails/gameDetails?gameId=' + game.id // 转发页面路径
      };
    },
    // 跳转到流程部分
    jumpToProcess() {
      this.handleSectionJump('process');
    },
    // 跳转到身份部分
    jumpToRoles() {
      this.handleSectionJump('roles');
    },
    // 跳转到易漏规则
    jumpToErrata() {
      this.handleSectionJump('errata');
    },
    jumpToComment() {
      this.handleSectionJump('comment');
    },
    // 通用滚动处理方法
    handleSectionJump(sectionId: 'process' | 'roles' | 'errata' | 'comment') {
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
      console.debug("rule: ", this.data.extraInfo.errataList);
      if (!keyword) {
        this.setData({
          filteredErrata: this.data.extraInfo.errataList
        });
        return;
      }
      // 否则，过滤规则
      this.setData({
        filteredErrata: this.data.extraInfo.errataList.filter((item: any) => 
          item.question.toLowerCase().includes(keyword) ||
          item.answer.toLowerCase().includes(keyword)
        )
      });
    }, 
  }
}); 