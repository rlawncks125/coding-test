//  https://school.programmers.co.kr/learn/courses/30/lessons/161989

function solution(n, m, section) {
  // console.log(n, m, section);

  // ##  문제 요구사항
  // 페인트 칠해진 n인 벽이있음
  // 볏겨진 페인트를 덧칠하기로함

  // 전체 대신 구역을 나누어 일부부만 칠하기로함
  // 1미터 길이의 구역을 n개로 나누고 1~n 번까지 번호를 붙여 구역을 정함

  // 룰러의 길이는 m
  // 룰러로 벽에 페인트를 한번 ( 룰러를 떄면 한번 칠했다고 정의) 칠하는 규칙
  // - 룰러가 벽에서 벗어나면 안됨 ! n > 색칠
  // - 구역의 일부분만 포함되도록 칠하면 안됨 ( m을 다해야한다는 개념이구나 )

  // n ( 벽 갯수 ) , m ( 룰러 길이 ) , section ( 칠해야할 구역 )
  // 칠하기로 정한 구역들의 번호가 담긴 배열 section
  // 룰러로 페인트칠해야 하는 최소 횟수를 구하시오

  // ## 풀이
  // 그림 보면 이해가 되는데 글은 왜케 복잡하게 설명해놨지??
  let startFill = null;
  let answer = 0;

  section.forEach((v) => {
    // 페인트 시작 부분
    if (!startFill) {
      startFill = v;
      answer++;
    }

    // 현재 칠할부분이 m ( 룰러 길이 ) 보다 크면 새로운 룰러 사용
    if (v - startFill >= m) {
      startFill = v;
      answer++;
    }
  });

  return answer;
}

const result = solution(8, 4, [2, 3, 6]) === 2 ? true : false;
const result2 = solution(5, 4, [1, 3]) === 1 ? true : false;
const result3 = solution(4, 1, [1, 2, 3, 4]) === 4 ? true : false;

console.log(result);
console.log(result2);
console.log(result3);
