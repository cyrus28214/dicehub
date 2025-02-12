Component({
  properties: {
    cates: {
      type: Array,
      value: []
    }
  },

  methods: {
    onTapItem(e) {
      const item = e.currentTarget.dataset.item
      this.triggerEvent('itemtap', { item })
    }
  }
}) 