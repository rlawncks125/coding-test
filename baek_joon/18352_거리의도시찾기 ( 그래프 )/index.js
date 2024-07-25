// https://www.acmicpc.net/problem/18352

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M, K, X], ...edges] = input.map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (const [A, B] of edges) {
  graph[A].push(B);
}

function findCitiesAtDistanceK(graph, start, K) {
  const distance = Array(graph.length).fill(-1);
  distance[start] = 0;
  const queue = [start];

  // ############################# queue shift() 방법

  // while (queue.length) {
  //   const current = queue.shift();
  // #####################################

  // ######################################### 성능 개선 인덱스로 탐색
  let queueStart = 0;

  while (queueStart < queue.length) {
    const current = queue[queueStart++];
    // ################################################

    for (const neighbor of graph[current]) {
      if (distance[neighbor] === -1) {
        distance[neighbor] = distance[current] + 1;
        queue.push(neighbor);
      }
    }
  }

  const result = [];
  for (let i = 1; i < distance.length; i++) {
    if (distance[i] === K) {
      result.push(i);
    }
  }

  return result.length > 0 ? result : [-1];
}

const result = findCitiesAtDistanceK(graph, X, K);
result.forEach((city) => console.log(city));
