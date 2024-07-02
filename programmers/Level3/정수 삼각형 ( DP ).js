// https://school.programmers.co.kr/learn/courses/30/lessons/43105

function solution(triangle) {
  const n = triangle.length;

  // 삼각형 배열을 복사하여 dp 배열 생성
  const dp = Array.from({ length: n }, (_, i) => [...triangle[i]]);

  // 아래층에서 위층으로 이동하며 계산
  for (let row = n - 2; row >= 0; row--) {
    for (let col = 0; col <= row; col++) {
      // 현재 요소에 아래층의 두 요소 중 큰 값을 더함
      const left = dp[row + 1][col];
      const right = dp[row + 1][col + 1];

      dp[row][col] += Math.max(left, right);
    }
  }

  // 최종 결과는 dp 배열의 맨 꼭대기 요소에 저장됨
  return dp[0][0];
}
