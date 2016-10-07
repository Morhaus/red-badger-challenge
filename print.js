export default function print(robots) {
  robots.forEach(robot => {
    console.log(`${robot.pos[0]} ${robot.pos[1]} ${robot.dir}${robot.lost ? ' LOST' : ''}`);
  });
}
