// https://www.acmicpc.net/problem/16724
// for 문 돌리면서 모든 노드 탐색힐때는 dfs 가더 빠르네
// 최선의 경로같이 모든 노드안돌고 최단 거리찾을때는 bfs가 훨씬 빠르고

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const maps = [];
for (let i = 1; i < input.length; i++) {
  maps.push([...input[i]]);
}

const visited = Array.from({ length: n }, () => Array(m).fill(0));

const direc = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

let answer = 0;

const bfs = (sx, sy, idx) => {
  const queue = [];
  queue.push([sx, sy]);

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    // 방문함
    if (visited[x][y]) {
      // 요부분 처리가 되야 정답이 되는데 좀 알아봐야겠네
      if (visited[x][y] === idx) {
        answer++;
      }
      break; // 만일 형성된 사이클에 방문하더라도 idx가 다르기 때문에 괜찮다
    }

    visited[x][y] = idx;

    const [dx, dy] = direc[maps[x][y]];
    const nx = x + dx;
    const ny = y + dy;

    queue.push([nx, ny]);
  }
};

const dfs = (x, y, idx) => {
  // 방문함
  if (visited[x][y]) {
    // 요부분 처리가 되야 정답이 되는데 좀 알아봐야겠네
    // 해설 보면 사이클 체크 하는 거라함
    // R <-> L 처럼 되는 부분이 safe zone 되는듯?
    if (visited[x][y] === idx) {
      answer++;
    }
    return;
  }

  visited[x][y] = idx;

  const [dx, dy] = direc[maps[x][y]];
  const nx = x + dx;
  const ny = y + dy;

  dfs(nx, ny, idx);
};

let idx = 1;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visited[i][j]) {
      // bfs(i, j, idx);
      dfs(i, j, idx);
      idx++;
    }
  }
}
console.log(answer);

visited.forEach((v) => {
  console.log(...v);
});
