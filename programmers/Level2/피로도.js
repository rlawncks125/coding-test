// https://school.programmers.co.kr/learn/courses/30/lessons/87946

function solution(k, dungeons) {
  let answer = 0;
  const visited = Array(dungeons.length).fill(false);

  function dfs(current, count) {
    answer = Math.max(answer, count);

    for (let i = 0; i < dungeons.length; i++) {
      const [min, use] = dungeons[i];
      if (!visited[i] && current >= min) {
        visited[i] = true;
        dfs(current - use, count + 1);
        visited[i] = false;
      }
    }
  }

  dfs(k, 0);
  return answer;
}
