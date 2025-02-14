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
      if (rating === 0) {
        stars = Array(5).fill('../../images/rating_star/unrated.png');
      } else {
        const x = rating / 2; // 计算 x
        stars = Array(x).fill('../../images/rating_star/1.png')
          .concat(Array(5 - x).fill('../../images/rating_star/0.png'));
      }
      console.log(stars);
      this.setData({ stars });
    }
  }
}); 