// https://school.programmers.co.kr/learn/courses/30/lessons/1844

// bfs 풀이
function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const directions = [
    [-1, 0], // 상
    [1, 0], // 하
    [0, -1], // 좌
    [0, 1], // 우
  ];

  const queue = [[0, 0, 1]]; // 시작점 (0, 0)에서 시작, 초기 거리는 1
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  visited[0][0] = true;

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();

    // 상대 팀 진영 도착 시 거리 반환
    if (x === n - 1 && y === m - 1) {
      return dist;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < m &&
        maps[nx][ny] === 1 &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  return -1; // 상대 팀 진영에 도달할 수 없는 경우
}

// dfs 풀이 ( 효율성에서 통과 못함 )
function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const directions = [
    [-1, 0], // 상
    [1, 0], // 하
    [0, -1], // 좌
    [0, 1], // 우
  ];

  let minDistance = Infinity;

  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  visited[0][0] = true;

  const dfs = (x, y, dist) => {
    // 상대 팀 진영 도착 시 최소 거리 갱신
    if (x === n - 1 && y === m - 1) {
      minDistance = Math.min(minDistance, dist);
      return;
    }

    // 현재까지의 거리가 이미 최단 거리보다 크다면 탐색 중단
    if (dist >= minDistance) {
      return;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < m &&
        maps[nx][ny] === 1 &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        dfs(nx, ny, dist + 1);
        visited[nx][ny] = false; // 백트래킹
      }
    }
  };

  dfs(0, 0, 1);

  return minDistance === Infinity ? -1 : minDistance;
}
