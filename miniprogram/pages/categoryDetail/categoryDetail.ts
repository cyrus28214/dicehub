import { getGames, getTags } from "../../api/api";

Page({
  data: {
    category: null,
    games: [] as any
  },
  async onLoad(options) {
  const idStr = options.id;
    console.log({ idStr });
    if (!idStr) {
      wx.navigateBack();
    }
    const id = parseInt(idStr!);

    const tags = await getTags();
    const tag = tags.filter((tag: any) => tag.id === id)[0];
    const games = (await getGames()).filter(game => game.tags.some((tag: any) => tag.id === id));
    console.log({ tag });
    this.setData({
      category: tag,
      games: games
    })
  },
})