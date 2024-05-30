function solution(numbers, target) {
  let count = 0;

  const 탐색 = (값, depth, target, numbers) => {
    if (depth === numbers.length) {
      // 마지막까지왔을떄
      if (값 === target) count += 1;

      return;
    }

    탐색(값 + numbers[depth], depth + 1, target, numbers);
    탐색(값 - numbers[depth], depth + 1, target, numbers);
  };

  탐색(0, 0, target, numbers);

  return count;
}
