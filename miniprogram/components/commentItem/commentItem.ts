// components/commentItem.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    comment: {
      type: Object,
      vale: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: ""
  },

  lifetimes: {
    attached() {
      this.setData({
        date: this.data.comment.updated_at.split(".")[0].replace("T", " ")
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})