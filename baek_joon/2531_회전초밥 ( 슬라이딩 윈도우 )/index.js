// https://www.acmicpc.net/problem/2531

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, d, k, c], ...list] = input.map((v) => v.split(" ").map(Number));
// N : 벨트에 놓인 접시의 수
// d : 초밥 가짓수
// k : 연속해서 먹는 접시의수
// c : 쿠폰 번호

function maxSushiTypes(N, d, k, c, list) {
  // 쿠폰 초밥을 포함하여 최대 종류 수를 계산
  let sushiList = new Array(d + 1).fill(0);
  let currentVariety = 0;

  const addSushi = (number) => {
    // 처음 추가되는 종류 일시 variety 증가
    if (sushiList[number] === 0) {
      currentVariety++;
    }
    sushiList[number]++;
  };

  const removeSushi = (number) => {
    // 제거되는 초밥의 종류가 더이상 없을시
    // variety 차감;
    sushiList[number]--;
    if (sushiList[number] === 0) {
      currentVariety--;
    }
  };

  const getVariety = () => {
    // 현재 초밥 종류 계산
    // 레일위에 쿠폰적용 초밥이 없을시 최대 종류 + 1
    return sushiList[c] === 0 ? currentVariety + 1 : currentVariety;
  };

  // 초기 레일에 올라갈 초밥
  for (let i = 0; i < k; i++) {
    const sushi = list[i];
    addSushi(sushi);
  }

  let maxVariety = getVariety();

  // 슬라이딩 윈도우 탐색
  for (let i = 1; i < N; i++) {
    // 슬라이딩 윈도우에서 제거할 초밥
    const firstSushi = list[i - 1];
    removeSushi(firstSushi);

    // 슬라이딩 윈도우에 추가할 초밥
    const newSushi = list[(i + k - 1) % N];
    addSushi(newSushi);

    // 쿠폰 초밥을 포함한 최대 종류 수 갱신
    maxVariety = Math.max(maxVariety, getVariety());
  }

  return maxVariety;
}

console.log(maxSushiTypes(N, d, k, c, list));
