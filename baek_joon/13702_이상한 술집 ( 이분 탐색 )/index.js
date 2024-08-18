// https://www.acmicpc.net/problem/13702

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const list = input.slice(1).map(Number);

let left = 1;
let right = Math.max(...list);
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let count = 0;

  for (let i = 0; i < N; i++) {
    count += Math.floor(list[i] / mid);
    if (count >= K) break;
  }

  if (count >= K) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);
