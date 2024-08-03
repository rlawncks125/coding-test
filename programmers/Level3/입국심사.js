// https://school.programmers.co.kr/learn/courses/30/lessons/43238

function solution(n, times) {
  let left = 1; // 최소 시간
  let right = Math.max(...times) * n; // 최대 시간: 가장 오래 걸리는 심사대가 모든 사람을 심사할 때 걸리는 시간
  let answer = right;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 중간 시간

    // 1. 범위가 클시 이방법이 유리
    let total = 0; // 주어진 시간 내에 심사할 수 있는 총 인원

    for (let time of times) {
      total += Math.floor(mid / time); // 각 심사관이 mid 시간 내에 심사할 수 있는 인원 수
    }

    // 2. 범위가 작으면 고차함수가 유리
    // gpt는 고차함수는 반복적인 콜백함수 호출로 오버헤드 발생해서
    // 무조건 for문에 성능에 좋다는데 결과는 다른데??
    // const total = times.reduce((a,time) => a + Math.floor(mid/time),0);

    if (total >= n) {
      answer = mid; // 모든 사람이 심사를 받을 수 있다면, 시간을 줄여서 더 최적화 시도
      right = mid - 1;
    } else {
      left = mid + 1; // 모든 사람이 심사를 받을 수 없다면, 시간을 늘려서 시도
    }
  }

  return answer;
}
