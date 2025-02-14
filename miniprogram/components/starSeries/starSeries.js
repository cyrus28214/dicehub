Component({
  properties: {
    userRating: {
      type: Number,
      value: -1,
      observer: function(newVal) {
        console.log("!!1");
        this.updateStars(newVal);
      }
    }
  },

  data: {
    stars: []
  },

  lifetimes: {
    attached() {
      this.updateStars(this.data.userRating);
    }
  },

  methods: {
    updateStars(rating) {
      console.log("!!2");
      let stars = [];
      console.log(stars);
      const x = rating / 2; // 计算 x
      stars = Array(x).fill('/assets/star-fill.svg')
        .concat(Array(5 - x).fill('/assets/star.svg'));
      this.setData({ stars });
    }
  }
}); 