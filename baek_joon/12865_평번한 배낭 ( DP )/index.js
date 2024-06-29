// https://www.acmicpc.net/problem/12865

// 로컬 node index.js시 경로
const fs = require("fs");
// const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// N은 물품의 수, K는 최대 무게.

const [[N, K], ...items] = input.map((v) => v.split(" ").map(Number));

// DP 배열 초기화
const dp = new Array(K + 1).fill(0);

// 각 물품은 무게 W와 가치 V를 가짐.
// K는 최대무게
items.forEach(([W, V]) => {
  for (let weight = K; weight >= W; weight--) {
    dp[weight] = Math.max(dp[weight], dp[weight - W] + V);
  }
});

console.log(dp[K]);
