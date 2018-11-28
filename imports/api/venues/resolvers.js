export default {
  Venue: {
    score: ({ votes }) => {
      const pointsa = [],
        pointsb = [];
      votes.forEach(vote => {
        pointsa.push(vote.a);
        pointsb.push(vote.b);
      });

      const totala = pointsa.reduce((a, b) => a + b, 0);
      const totalb = pointsb.reduce((a, b) => a + b, 0);

      return {
        a: totala / votes.length,
        b: totalb / votes.length
      };
    }
  }
};
