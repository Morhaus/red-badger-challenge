export default function parse(data) {
  const lines = data.split('\n')
    // Ignore empty lines.
    .filter(l => !l.match(/^\s*$/));
  const [width, height] = lines[0].split(' ')
    // The data contains 0-based coordinates.
    .map(i => parseInt(i, 10) + 1);

  const robots = [];
  for (let i = 1; i < lines.length; i += 2) {
    const robotInfo = lines[i].split(' ');
    const robotInstructions = lines[i + 1].split('');
    const [x, y] = robotInfo.slice(0, 2).map(i => parseInt(i, 10));
    const dir = robotInfo[2];
    robots.push({
      pos: [x, y],
      dir,
      ins: robotInstructions,
      // You never know, a robot might just land outside the map.
      lost: x < 0 || x >= width || y < 0 || y >= height,
    });
  }
  return {
    width,
    height,
    robots,
  };
}
