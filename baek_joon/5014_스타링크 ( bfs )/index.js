// https://www.acmicpc.net/problem/5014

// 로컬 node index.js시 경로
const fs = require("fs");
// const input = fs.readFileSync("./input3.txt").toString().trim().split("\n");

// 백준 제출시 경로
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, start, target, UP_BTN, DOWN_BTN] = input[0].split(" ").map(Number);

const visited = Array.from({ length: n }, () => false);

// 시작 층 , 횟수
const queue = [[start, 0]];

const bfs = () => {
  while (queue.length > 0) {
    const [current, depth] = queue.shift();

    if (current === target) {
      return depth + "";
    }

    if (
      // 범위 조건
      current > 0 &&
      current <= n &&
      //
      !visited[current]
    ) {
      visited[current] = true;
      queue.push([current + UP_BTN, depth + 1]);
      queue.push([current - DOWN_BTN, depth + 1]);
    }
  }

  return "use the stairs";
};

console.log(bfs());
