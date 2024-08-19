// https://www.acmicpc.net/problem/7795

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [T, ...list] = input.map((v) => v.split(" ").map(Number));

function countPairs(A, B, A_Array, B_Array) {
  // A_Array와 B_Array를 정렬
  A_Array.sort((a, b) => a - b);
  B_Array.sort((a, b) => a - b);

  let count = 0;
  let j = 0;

  // A_Array의 각 원소를 탐색
  // 해당 원소 보다 작은 B_Array 원소들을 탐색
  for (let i = 0; i < A; i++) {
    // B 원소 값이 A값 보다 작은 경우 j 증가
    while (j < B && B_Array[j] < A_Array[i]) {
      j++;
    }
    // 현재 j는 B_Array에서 A값 보다 작은 원소의 개수
    count += j;
  }

  return count;
}

for (let i = 0; i < T; i++) {
  const f = i * 3;
  const [A, B] = list[f];
  const A_Array = list[f + 1];
  const B_Array = list[f + 2];

  console.log(countPairs(A, B, A_Array, B_Array));
}
