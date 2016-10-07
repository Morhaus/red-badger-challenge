import fs from 'fs';

import parse from './parse';
import print from './print';
import execute from './execute';

const input = fs.readFileSync('/dev/stdin').toString('utf8');
const { width, height, robots } = parse(input);
const finalRobots = execute(width, height, robots);
print(finalRobots);
