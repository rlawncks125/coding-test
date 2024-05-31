// https://school.programmers.co.kr/learn/courses/30/lessons/43163

// bfs
function solution(begin, target, words) {
  if (!words.includes(target)) {
    return 0;
  }

  const queue = [[begin, 0]];
  const visited = new Set();
  visited.add(begin);

  while (queue.length > 0) {
    console.log(queue);
    let [currentWord, steps] = queue.shift();

    if (currentWord === target) {
      return steps;
    }

    for (let word of words) {
      if (!visited.has(word) && isOneLetterDifferent(currentWord, word)) {
        visited.add(word);
        queue.push([word, steps + 1]);
      }
    }
  }

  return 0;
}

function isOneLetterDifferent(word1, word2) {
  let difference = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      difference++;
    }
    if (difference > 1) {
      return false;
    }
  }
  return difference === 1;
}

// ####################################################################################

// dfs
function solution(begin, target, words) {
  // target 단어가 포함되지 않았을시
  if (!words.includes(target)) {
    return 0;
  }

  // Set
  // 순서를 보장하지 않는 요소를 저장할떄 사용 ( 단순 값이 있는지 비교할때 )
  // 중복을 허용하지 않음
  // 복잡도 :  배열 = O(n) , Set = O(1)
  // add : 요소 추가 , delete : 요소 삭제 , has : 요소가 존재하는지 여부
  const visited = new Set();
  let minSteps = Infinity;

  const dfs = (currentWord, steps) => {
    if (currentWord === target) {
      minSteps = Math.min(minSteps, steps);
      return;
    }

    for (let word of words) {
      if (!visited.has(word) && isOneLetterDifferent(currentWord, word)) {
        visited.add(word);
        dfs(word, steps + 1);
        visited.delete(word); // 백트래킹
      }
    }
  };

  dfs(begin, 0);

  return minSteps === Infinity ? 0 : minSteps;
}

function isOneLetterDifferent(word1, word2) {
  let difference = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      difference++;
    }
    if (difference > 1) {
      return false;
    }
  }
  return difference === 1;
}
