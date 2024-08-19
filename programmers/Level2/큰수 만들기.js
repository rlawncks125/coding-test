function solution(number, k) {
  let stack = [];

  for (let i = 0; i < number.length; i++) {
    let current = number[i];

    // k가 0보다 크고
    // stack의 마지막 값이 현재 숫자보다 작으면
    // 마지막 값 제거
    while (k > 0 && stack[stack.length - 1] < current) {
      stack.pop();
      k--;
    }

    // 현재 숫자를 stack에 추가
    stack.push(current);
  }

  // 마지막 문제가 통과가 안돼서 추가
  // 만약 아직 k가 남아있다면, 남은 k만큼 뒤에서 제거
  stack = stack.slice(0, stack.length - k);

  // stack을 문자열로 변환하여 반환
  return stack.join("");
}
