// https://school.programmers.co.kr/learn/courses/30/lessons/12924

// 재귀 방식
const 재귀 = (value, sum, end) => {
  if (sum > end) return false;
  if (sum === end) return true;

  const newSum = sum + value;

  return 재귀(value + 1, newSum, end);
};

function solution(n) {
  let answer = 0;
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    if (재귀(i, 0, n)) answer += 1;
  }

  return answer + 1;
}

// 슬라이딩 윈도우 방식
function solution(n){
  let answer= 0;
  let sum =0;
  let left = 0;

  for(let right = 1; right<= n; right++){
    sum += right;

    while(sum > n && left <= right){
      sum -= left;
      left++;
    }      
    
    // 조건 만족했을때 처리
    if( sum === n) {
      answer++;
      
      // 여기서 처리해줘야 빠르네??
      // 위 while문으로 처리 넘기면
      // 느려짐 while문에서 조건한번이 시간 은근 먹는듯
      sum -= left;
      left++;
    }
  }

  return answer;
}


//  수학식 접근
function solution(n) {
  let answer = 0;

  for (let i = 1; i <= n; i++) {
    if (n % i === 0 && i % 2 === 1) answer += 1;
  }

  return answer;
}

console.log(solution(31));

// 홀수의 경우, 약수는 홀수 밖에 안나옴. 15의 약수는 1,3,5, 15. 약수를 이용해서
// 연속된 수의 합이 15가 나오도록 할 수도 있음.
// 15=1+2+3+4+5 (중간값 3) 3x5
// 15=4+5+6 (중간값 5) 5x3
// 15=7+8 (연속된 수) 7+8 - 홀수인 경우 무조건 가능.
// 15=15
// 중간값이 3인 경우, 중간값이 5인 경우, 연속된 수(7, 8), 15(n) 해서 4개인데,
// 이게 공교롭게 홀수의 약수 수와 같음.
// 그리고 짝수의 경우는 홀수의 연장선이라고 보면 됨.
// n=30인 경우, 30의 약수는 1, 2, 3, 5, 6, 10, 15, 30임.
// 30=4 + 5 + 6 + 7 + 8 (중간값 3의 연장) 2x3x5
//  30=9 + 10 + 11 (중간값 5의 연장) 2x5x3
//  30=6+7+8+9 (연속된 두 수의 연장) 2x(7+8)
//  30=30
//  결과적으로 n의 홀수 약수 개수만 구해도 답이랑 같음.
