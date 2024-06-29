// https://school.programmers.co.kr/learn/courses/30/lessons/42898

function solution(m, n, puddles) {
  const MOD = 1000000007;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));

  // 물에 잠긴 지역 표시
  puddles.forEach(([x, y]) => {
    dp[y - 1][x - 1] = -1;
  });

  dp[0][0] = 1; // 시작 지점

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (dp[y][x] === -1) {
        dp[y][x] = 0; // 물에 잠긴 지역
        continue;
      }

      if (y > 0) dp[y][x] += dp[y - 1][x] % MOD;
      if (x > 0) dp[y][x] += dp[y][x - 1] % MOD;
      dp[y][x] %= MOD;
    }
  }

  return dp[n - 1][m - 1];
}
