// https://www.acmicpc.net/problem/2805

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...list] = input.map((v) => v.split(" ").map(Number));
const trees = list.flat(2);

// 초기화
let left = 1;
let right = Math.max(...trees);
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let totalHeight = 0;
  for (let tree of trees) {
    if (tree > mid) {
      totalHeight += tree - mid;
    }
  }

  if (totalHeight >= M) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);
