// https://www.acmicpc.net/problem/6603

// 로컬 node index.js시 경로
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 백준 제출시 경로
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const d = input.map((v) => v.split(" ").map(Number));

const dfs = (start, depth, path, array) => {
  if (depth === 6) {
    console.log(path.join(" "));
    return;
  }

  for (let i = start; i < array.length; i++) {
    const copyPath = [...path];
    copyPath.push(array[i]);
    dfs(i + 1, depth + 1, copyPath, array);
    copyPath.pop();
  }
};

for (let i = 0; i < d.length - 1; i++) {
  const [k, ...s] = d[i];
  dfs(0, 0, [], s);
  console.log("");
}
