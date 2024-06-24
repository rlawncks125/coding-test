// https://school.programmers.co.kr/learn/courses/30/lessons/92342

function solution(n, info) {
  let maxDiff = -1;
  // 과녁 점수 [10,9,8,7,6,5,4,3,2,1,0]
  // 최종 결과 배열
  let result = Array(11).fill(0);

  // 라이언과 어피치의 점수 차이를 계산하는 함수
  const getScoreDiff = (ryan, apeach) => {
    let ryanScore = 0;
    let apeachScore = 0;
    for (let i = 0; i < 11; i++) {
      if (ryan[i] > apeach[i]) {
        ryanScore += 10 - i;
      } else if (apeach[i] > 0) {
        apeachScore += 10 - i;
      }
    }
    return ryanScore - apeachScore;
  };

  const dfs = (idx, arrows, ryan) => {
    if (idx === 11 || arrows === 0) {
      // 남은 화살을 모두 과녁 0점에 할당
      ryan[10] = arrows;
      let scoreDiff = getScoreDiff(ryan, info);

      if (scoreDiff > maxDiff) {
        maxDiff = scoreDiff;
        result = [...ryan];
      }

      if (scoreDiff === maxDiff) {
        // 최적의 결과가 여러 개일 경우, 낮은 점수를 많이 맞힌 경우를 선택
        for (let i = 10; i >= 0; i--) {
          if (ryan[i] > result[i]) {
            result = [...ryan];
            break;
          } else if (ryan[i] < result[i]) {
            break;
          }
        }
      }

      return;
    }

    // 현재 가지고 있는 화살수가 어피치가 맞힌 화살수 보다 많은 경우
    // 라이언이 어피치보다 한 발 더 맞히는 경우
    if (arrows > info[idx]) {
      const winArrowCount = info[idx] + 1; // 라이언이 어피치보다 한 발 더 맞히도록 설정

      // 백트래킹 x
      // let ryanCopy = [...ryan];
      // ryanCopy[idx] = winArrowCount;
      // dfs(idx + 1, arrows - winArrowCount, ryanCopy);

      // 백트래킹
      ryan[idx] = winArrowCount;
      dfs(idx + 1, arrows - winArrowCount, ryan);
      ryan[idx] = 0;
    }

    // 라이언이 해당 점수를 포기하는 경우
    dfs(idx + 1, arrows, ryan);
  };

  dfs(0, n, Array(11).fill(0));

  return maxDiff <= 0 ? [-1] : result;
}
