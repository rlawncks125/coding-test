// https://school.programmers.co.kr/learn/courses/30/lessons/12952?language=javascript

function solution(n) {
  let answer = 0;

  const maps = Array.from({ length: n }, () => Array(n).fill(false));

  const direc = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const isSafe = (row, col) => {
    for (let [dr, dc] of direc) {
      let nr = row + dr;
      let nc = col + dc;
      // 퀸은 한칸만 움직일수 있는것이 아니라
      // 모든 방향의 체스판 끝까지 이동할수 있으므로
      // while 문을 돌려서 한 방향의 모든수를 체스판 범위에서 체크
      while (nr >= 0 && nr < n && nc >= 0 && nc < n) {
        if (maps[nr][nc]) return false;
        nr += dr;
        nc += dc;
      }
    }
    return true;
  };

  const dfs = (row) => {
    // row가 체스판의 크기 n과 같아지면 모든 행에 대한 퀸의 배치가 완료
    if (row === n) {
      answer++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        maps[row][col] = true;
        dfs(row + 1);
        maps[row][col] = false;
      }
    }
  };

  dfs(0);

  return answer;
}
