//  https://school.programmers.co.kr/learn/courses/30/lessons/178870

// 기존 ( 시간 복잡도가 너무 많음 )
const 재귀 = (index, sum, end, array, originArray) => {
  if (index > originArray.length) return [];

  if (sum > end) return [];
  if (sum === end) return array;

  const newSum = sum + originArray[index];
  array = [...array, originArray[index]];

  return 재귀(index + 1, newSum, end, array, originArray);
};

function solution(sequence, k) {
  var answer = [];
  for (let i = 0; i < sequence.length; i++) {
    const findArray = 재귀(i, 0, k, [], sequence);

    if (findArray.length > 0) {
      answer.push({ index: i, length: findArray.length });
    }
  }

  const result = answer.sort((a, b) => a.length - b.length)[0];

  return [result.index, result.index + (result.length - 1)];
}



// GPT 형님 ( 슬라이딩 윈도우 같음 ) ( 3 ~ 4 배 빠름 )
function solution(sequence, k) {
  let answer = [];
  let left = 0;
  let sum = 0;

  for (let right = 0; right < sequence.length; right++) {
    sum += sequence[right];

    while (sum > k && left <= right) {
      sum -= sequence[left];
      left++;
    }

    if (sum === k) {
      // 조건 처리
      answer.push({ index: left, length: right - left + 1 });
    }
  }

  if (answer.length === 0) return [];

  const result = answer.sort((a, b) => a.length - b.length)[0];
  return [result.index, result.index + (result.length - 1)];
}


// ### 2


// 기존 Array에서 int로 변경

function solution(sequence, k) {
  var answer = [];

    const 재귀 = (index, end , sum = 0, length = 0) => {
      if (index > sequence.length) return 0;
      else if (sum > end) return 0;
      else if (sum === end) return length; // RE : if (sum === k) {...}

      const newSum = sum + sequence[index]; // RE: sum += sequence[right];

      return 재귀(index + 1, end ,newSum, length + 1);
    };
    
  for (let i = 0; i < sequence.length; i++) {
    const length = 재귀(i, k);

    if (length > 0) {
      answer.push({ index: i, length }); // RE : 조건 처리
    }
  }

  const result = answer.sort((a, b) => a.length - b.length)[0]; // RE : 조건처리

  return [result.index, result.index + (result.length - 1)];
}

// Array 를 int로 바꾸고 GPT
// 재귀에서 복잡도 이점 가져갈려면 슬라이딩 윈도우 방식으로 변경해야함
function solution(sequence, k) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;
  let result = [-1, -1]; // 초기화 (유효하지 않은 값으로 초기화)
  
  for (let right = 0; right < sequence.length; right++) {
      sum += sequence[right];
      
      while (sum > k && left <= right) {
          sum -= sequence[left];
          left++;
      }
      
      // 조건 처리
      if (sum === k) {
        // length를 비교하여 작은 left 와 right 를 찾음
          if (right - left + 1 < minLength) {
              minLength = right - left + 1;
              result = [left, right];
          }
     
      }
  }
  
  return result;
}
