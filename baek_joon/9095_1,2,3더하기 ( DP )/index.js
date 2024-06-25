// https://www.acmicpc.net/problem/9095

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [k, ...cases] = input.map(Number);

function findWaysToSum(n) {
  // dp 배열 초기화
  let dp = new Array(n + 1).fill(0);
  dp[0] = 1; // 아무것도 사용하지 않는 경우

  // 기본값 설정
  if (n >= 1) dp[1] = 1; // 1을 만드는 경우: 1
  if (n >= 2) dp[2] = dp[1] + 1; // 2를 만드는 경우: 1+1, 2
  if (n >= 3) dp[3] = dp[2] + dp[1] + 1; // 3을 만드는 경우: 1+1+1, 1+2, 2+1, 3

  // dp 점화식을 이용하여 n까지의 값을 계산
  for (let i = 4; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  return dp[n];
}

for (let i = 0; i < k; i++) {
  console.log(findWaysToSum(cases[i]));
}
