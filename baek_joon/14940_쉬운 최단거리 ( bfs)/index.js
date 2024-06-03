// https://www.acmicpc.net/problem/14940

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const array = [];

for (let i = 1; i < input.length; i++) {
  array.push([...input[i].replaceAll(" ", "")]);
}

const visited = Array.from({ length: n }, () => Array(m).fill(-1));
const direc = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const queue = [];

// 목표 지점(2) 찾기 && 갈수 없는땅 0 표시
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (+array[i][j] === 0) {
      visited[i][j] = 0;
    }
    if (+array[i][j] === 2) {
      visited[i][j] = 0;
      queue.push([i, j]);
    }
  }
}

// bfs
while (queue.length > 0) {
  const [x, y] = queue.shift();

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
      visited[nx][ny] === -1 &&
      +array[nx][ny] === 1
    ) {
      visited[nx][ny] = visited[x][y] + 1;
      queue.push([nx, ny]);
    }
  }
}

visited.forEach((v) => {
  console.log(...v);
});
