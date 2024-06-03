// https://www.acmicpc.net/problem/10026

// 로컬 node index.js시 경로
const fs = require("fs");
// const input = fs.readFileSync("./input2.txt").toString().trim().split("\n");

// 백준 제출시 경로
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);

const array = [];

for (let i = 1; i < input.length; i++) {
  array.push([...input[i]]);
}

let visited;

const direc = [
  [0, 0], // 자신을 탐색하는게 없어서 넣음
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const dfs = (x, y, target) => {
  for (const [dx, dy] of direc) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < n &&
      ny < n &&
      !visited[nx][ny] &&
      target.includes(array[nx][ny])
    ) {
      visited[nx][ny] = true;
      dfs(nx, ny, target);
    }
  }
};

const find = (findArray) => {
  let total = 0;

  visited = Array.from({ length: n }, () => Array(n).fill(false));

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      if (visited[i][j]) continue;

      for (let f = 0; f < findArray.length; f++) {
        if (!findArray[f].includes(array[i][j])) continue;

        dfs(i, j, findArray[f]);
        total++;
      }
    }
  }

  return total;
};

const f1 = [["R"], ["G"], ["B"]];
const f2 = [["R", "G"], ["B"]];

console.log(find(f1), find(f2));
