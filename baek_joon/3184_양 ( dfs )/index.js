// https://www.acmicpc.net/problem/3184

// 로컬 node index.js시 경로
const fs = require("fs");
// const input = fs.readFileSync("./input3.txt").toString().trim().split("\n");

// 백준 제출시 경로
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const array = [];

for (let i = 1; i < input.length; i++) {
  array.push([...input[i]]);
}

const direc = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const visted = Array.from({ length: n }, () => Array(m).fill(false));

let wolf = 0;
let sheep = 0;
let totalWolf = 0;
let totalSheep = 0;

const dfs = (x, y) => {
  for (const [dx, dy] of direc) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      // 좌표
      nx >= 0 &&
      ny >= 0 &&
      nx < n &&
      ny < m &&
      //
      !visted[nx][ny] &&
      // 벽 인지 확인
      array[nx][ny] !== "#"
    ) {
      visted[nx][ny] = true;
      if (array[nx][ny] === "v") {
        wolf += 1;
      } else if (array[nx][ny] === "o") {
        sheep += 1;
      }
      dfs(nx, ny);
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visted[i][j]) {
      wolf = 0;
      sheep = 0;
      visted[i][j] = true;
      dfs(i, j);
      if (sheep > wolf) {
        totalSheep += sheep;
      } else {
        totalWolf += wolf;
      }
    }
  }
}

console.log(totalSheep, totalWolf);
