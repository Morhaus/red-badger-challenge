// Coordinates delta of moving forward in a given direction.
const delta = {
  N: [0, 1],
  S: [0, -1],
  W: [-1, 0],
  E: [1, 0],
};
// Direction obtained by turning 90° counter-clockwise from a given direction.
const left = {
  N: 'W',
  S: 'E',
  W: 'S',
  E: 'N',
};
// Direction obtained by turning 90° clockwise from a given direction.
const right = {
  N: 'E',
  S: 'W',
  W: 'N',
  E: 'S',
};
function move(pos, dir, ins) {
  let newPos = pos;
  let newDir = dir;
  switch (ins) {
    case 'L': {
      newDir = left[dir];
      break;
    }
    case 'R': {
      newDir = right[dir];
      break;
    }
    case 'F': {
      newPos = [pos[0] + delta[dir][0], pos[1] + delta[dir][1]];
      break;
    }
    // New instructions go here.
    // case INS: {
    //   ...
    // }
    default: {
      throw new Error(`Unknown instruction: ${ins}`);
    }
  }
  return { pos: newPos, dir: newDir };
}

export default function execute(width, height, robots) {
  const scents = new Set(); // Set of known forbidden positions.

  return robots.map(robot => {
    const ins = robot.ins;
    let { pos, dir, lost } = robot;

    let i = 0;
    while (!lost && i < ins.length) {
      const instruction = ins[i];
      const { pos: newPos, dir: newDir } = move(pos, dir, instruction);
      const newLost = newPos[0] < 0 || newPos[0] >= width ||
                      newPos[1] < 0 || newPos[1] >= height;
      const posKey = pos.join(' ');
      // The specification says that trying to move off the map from a position
      // wherefrom a robot previously fell will cause the current instruction to
      // be ignored. The direction of the sacrificial robot is not considered.
      // For instance, if a robot falls off from the top-right corner of the map
      // moving east, no robot will ever fall off from it again, even when
      // trying to move north.
      // Another possible interpretation would be that no robot would ever fall
      // off from it ever again from the (pos, dir) pair, but could fall off
      // going in a different direction.
      // I have implemented the former option.
      if (!newLost || !scents.has(posKey)) {
        if (newLost) {
          scents.add(pos.join(' '));
        } else {
          // The last valid position should be saved.
          pos = newPos;
        }
        dir = newDir;
        lost = newLost;
      }
      i++;
    }

    return {
      pos,
      dir,
      lost,
      // The remaining instructions if the robot is lost.
      ins: ins.slice(i),
    };
  });
}
