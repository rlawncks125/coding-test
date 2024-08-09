// https://www.acmicpc.net/problem/2110

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, C] = input[0].split(" ").map(Number);
const houses = input.slice(1).map(Number);

// 집의 위치를 오름차순으로 정렬
houses.sort((a, b) => a - b);

let left = 1;
// 가장 먼 두 집 사이의 거리
let right = houses[N - 1] - houses[0];
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  // 초기 설정 : 첫번째 집 방문
  let count = 1;
  let lastVisitHouse = houses[0];

  for (let i = 1; i < N; i++) {
    // 현재 집과 마지막에 방문한 집 사이
    // 공유기 거리가 mid값 이상이면 공유기 설치
    if (houses[i] - lastVisitHouse >= mid) {
      lastVisitHouse = houses[i]; // 마지막 방문한 집 갱신
      count++;
    }
    // 필요한 C 이상 설치 했으면 중단
    if (count >= C) break;
  }

  if (count >= C) {
    answer = mid;
    // 최대 거리를 구하는 거니깐
    // 다음 탐색 거리를 크게 시도
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);
