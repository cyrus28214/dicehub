Page({
  data: {
    category: null,
    games: []
  },
  onLoad(options) {
    const { id } = options;
    console.log(id);
  },
})