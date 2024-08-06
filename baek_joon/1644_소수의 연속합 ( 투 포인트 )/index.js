// https://www.acmicpc.net/problem/1644

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input);

function getPrimeNumber(number) {
  let isPrime = new Array(number + 1).fill(true);
  // 0과 1은 소수가 아님
  isPrime[0] = false;
  isPrime[1] = false;
  for (let i = 2; i * i <= number; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= number; j += i) {
        isPrime[j] = false; // i의 배수는 소수가 아님
      }
    }
  }
  let primes = [];
  for (let i = 2; i <= number; i++) {
    if (isPrime[i]) {
      primes.push(i); // 소수만 primes 배열에 추가
    }
  }
  return primes;
}

// N 까지의 소수값 리스트
const primes = getPrimeNumber(N);

// 투 포인트 초기화
let start = 0;
let end = 0;
let sum = 0;
let count = 0;

while (start < primes.length) {
  // sum이 N보다 작으면 end 포인터 증가
  if (sum < N && end < primes.length) {
    sum += primes[end++];
    continue;
  }

  // sum이 N과 같거나 클시
  if (sum == N) {
    count++; // sum이 N과 같으면 카운트 증가
  }

  sum -= primes[start++]; // start 포인트 다음 탐색
}

console.log(count);
