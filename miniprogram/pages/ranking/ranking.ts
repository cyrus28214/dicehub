import { games } from '../../data/games';

Component({
  data: {
    rankingList: games.sort((a, b) => b.playCount - a.playCount).map((game, index) => ({
      ...game,
      rating: game.rating.toFixed(1),
      playCount: game.playCount,
      rank: index + 1
    }))
  }
}); 