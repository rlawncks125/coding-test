// 참고
// https://velog.io/@white0_0/Javascript-%EB%B0%B1%EC%A4%80-1743-%EC%9D%8C%EC%8B%9D%EB%AC%BC-%ED%94%BC%ED%95%98%EA%B8%B0
const fs = require("fs");

// 로컬 node index.js시 경로
// const input = fs.readFileSync("input.txt").toString().trim().split("\n");

// 백준 제출시 경로
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m, k] = input[0].split(" ").map(Number);

// 초기화
const array = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => 0)
);

for (let i = 1; i <= k; i++) {
  const [x, y] = input[i].split(" ").map(Number);

  array[x - 1][y - 1] = 1;
}

const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => false)
);
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
const answer = [];

let result = 1;
// dfs 작성
const dfs = (y, x) => {
  visited[y][x] = true;

  // 여기서 4는 방향 좌,우,상,하
  for (let i = 0; i < 4; i++) {
    let ny = y + dy[i];
    let nx = x + dx[i];

    if (
      // 범위를 벗어나는지
      ny >= 0 &&
      ny < n &&
      nx >= 0 &&
      nx < m &&
      // 탐지할 조건
      array[ny][nx] === 1 &&
      // 이미 탐색한 노드인지
      !visited[ny][nx]
    ) {
      // 조건에 맞는 노드시 count +1 하고
      result += 1;
      // 주변 노드 탐색
      dfs(ny, nx);
    }
  }
};

// 탐색
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (array[i][j] === 1) {
      dfs(i, j);
      answer.push(result);
      result = 1;
    }
  }
}

console.log(Math.max(...answer));
