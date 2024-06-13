// https://www.acmicpc.net/problem/1697

// 로컬 node index.js시 경로
const fs = require("fs");
// const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

// 2440ms
const bfs = (n, k) => {
  if (n === k) return 0;

  const visited = Array(100001).fill(false);
  const queue = [[n, 0]];
  visited[n] = true;

  while (queue.length > 0) {
    const [current, count] = queue.shift();

    for (const next of [current + 1, current - 1, current * 2]) {
      if (next === k) {
        return count + 1;
      }
      if (next >= 0 && next <= 100000 && !visited[next]) {
        visited[next] = true;
        queue.push([next, count + 1]);
      }
    }
  }
};

console.log(bfs(N, K));

// 248ms
// shift 메소드는 속도가 느려서 queue 인덱스로 추적 하는 방법으로
// 속도는 빠른대신 메모리를 더 차지함
// const bfs = (n, k) => {
//   if (n === k) return 0;

//   const visited = Array(100001).fill(false);
//   const queue = [[n, 0]];
//   let head = 0;

//   visited[n] = true;

//   while (head < queue.length) {
//     const [current, count] = queue[head++];

//     for (const next of [current + 1, current - 1, current * 2]) {
//       if (next === k) {
//         return count + 1;
//       }
//       if (next >= 0 && next <= 100000 && !visited[next]) {
//         visited[next] = true;
//         queue.push([next, count + 1]);
//       }
//     }
//   }
// };
