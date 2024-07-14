// https://www.acmicpc.net/problem/1260

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M, V], ...edges] = input.map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (const [u, v] of edges) {
  graph[u].push(v);
  graph[v].push(u);
}

graph.forEach((adjList) => adjList.sort((a, b) => a - b));

function dfs(graph, start) {
  const visited = Array(graph.length).fill(false);
  const result = [];

  function dfsHelper(v) {
    visited[v] = true;
    result.push(v);
    for (const neighbor of graph[v]) {
      if (!visited[neighbor]) {
        dfsHelper(neighbor);
      }
    }
  }

  dfsHelper(start);
  return result;
}

function bfs(graph, start) {
  const visited = Array(graph.length).fill(false);
  const queue = [start];
  const result = [];

  visited[start] = true;

  while (queue.length) {
    const v = queue.shift();
    result.push(v);

    for (const neighbor of graph[v]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }

  return result;
}

const dfsResult = dfs(graph, V);
const bfsResult = bfs(graph, V);

console.log(dfsResult.join(" "));
console.log(bfsResult.join(" "));
