function solution(tickets) {
  tickets.sort(); // 티켓을 사전 순으로 정렬합니다.

  const graph = {};
  for (const [source, dest] of tickets) {
    if (!graph[source]) graph[source] = [];
    graph[source].push(dest);
  }

  // 초기화: [현재 공항, 경로, 남은 티켓]
  const queue = [["ICN", ["ICN"], graph]];

  while (queue.length > 0) {
    const [current, path, maps] = queue.shift();

    // 모든 티켓을 사용할 시
    if (path.length === tickets.length + 1) return path;

    // 현재 공항에서 갈 수 있는 모든 목적지 탐색
    if (maps[current]) {
      // ## for 문 방식
      // for (let i = 0; i < maps[current].length; i++) {
      //   const nextDest = maps[current][i];

      //   // 오브젝트 깊은 복사
      //   const newMaps = JSON.parse(JSON.stringify(maps));
      //   newMaps[current].splice(i, 1);

      //   queue.push([nextDest, [...path, nextDest], newMaps]);
      // }

      // ## for of 방식
      // for (const next of maps[current]) {
      //   // 오브젝트 깊은 복사
      //   const copyMaps = JSON.parse(JSON.stringify(maps));
      //   const findIndex = copyMaps[current].findIndex((v) => v === next);
      //   copyMaps[current].splice(findIndex, 1);

      //   queue.push([next, [...path, next], copyMaps]);
      // }

      // ## forEach방식
      maps[current].forEach((next, index) => {
        // 오브젝트 깊은 복사
        const copyMaps = JSON.parse(JSON.stringify(maps));
        copyMaps[current].splice(index, 1);

        queue.push([next, [...path, next], copyMaps]);
      });
    }
  }

  return [];
}
