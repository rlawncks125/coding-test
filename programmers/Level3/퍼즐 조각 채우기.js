// https://school.programmers.co.kr/learn/courses/30/lessons/84021

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

function bfs(row, col, target, visited, table) {
  const n = table.length;
  const res = [n + 1, n + 1, -1, -1, 0];
  const queue = [[row, col]];
  visited[row][col] = true;

  while (queue.length > 0) {
    const [currRow, currCol] = queue.shift();
    res[0] = Math.min(res[0], currRow);
    res[1] = Math.min(res[1], currCol);
    res[2] = Math.max(res[2], currRow);
    res[3] = Math.max(res[3], currCol);
    res[4]++;

    for (let i = 0; i < 4; i++) {
      const nx = currRow + dr[i];
      const ny = currCol + dc[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (!visited[nx][ny] && table[nx][ny] === target) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  return res;
}

function isMatch(a, b, table, game_board) {
  const [a_topLeftRow, a_topLeftCol, a_botRightRow, a_botRightCol] = a;
  const [b_topLeftRow, b_topLeftCol, b_botRightRow, b_botRightCol] = b;

  // const a_height = a[2] - a[0];
  // const a_width = a[3] - a[1];
  // const b_height = b[2] - b[0];
  // const b_width = b[3] - b[1];
  const a_height = a_botRightRow - a_topLeftRow;
  const a_width = a_botRightCol - a_topLeftCol;
  const b_height = b_botRightRow - b_topLeftRow;
  const b_width = b_botRightCol - b_topLeftCol;

  // 0, 180
  if (a_height === b_height && a_width === b_width) {
    // 0
    // !( a TL ^ b TL)
    let flag = true;
    for (let i = 0; i <= a_height; i++) {
      for (let j = 0; j <= a_width; j++) {
        if (
          !(
            table[a_topLeftRow + i][a_topLeftCol + j] ^
            game_board[b_topLeftRow + i][b_topLeftCol + j]
          )
        ) {
          flag = false;
        }
      }
    }
    if (flag) return true;

    // 180
    // !( a BR ^ b TL )
    flag = true;
    for (let i = 0; i <= a_height; i++) {
      for (let j = 0; j <= a_width; j++) {
        if (
          !(
            table[a_botRightRow - i][a_botRightCol - j] ^
            game_board[b_topLeftRow + i][b_topLeftCol + j]
          )
        ) {
          flag = false;
        }
      }
    }
    if (flag) return true;
  }

  // 90, 270
  if (a_height === b_width && a_width === b_height) {
    // 90
    // ! ( a BR_R,TL_C ^ b TL_R,TL_C )
    let flag = true;
    for (let i = 0; i <= a_width; i++) {
      for (let j = 0; j <= a_height; j++) {
        if (
          !(
            table[a_botRightRow - j][a_topLeftCol + i] ^
            game_board[b_topLeftRow + i][b_topLeftCol + j]
          )
        ) {
          flag = false;
        }
      }
    }
    if (flag) return true;

    // 270
    // ! ( a TL_R,BR_C ^ b TL_R,TL_C )
    flag = true;
    for (let i = 0; i <= a_width; i++) {
      for (let j = 0; j <= a_height; j++) {
        if (
          !(
            table[a_topLeftRow + j][a_botRightCol - i] ^
            game_board[b_topLeftRow + i][b_topLeftCol + j]
          )
        ) {
          flag = false;
        }
      }
    }
    if (flag) return true;
  }

  return false;
}

function solution(game_board, table) {
  const n = table.length;
  let answer = 0;

  const getFragments = (table, target) => {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const fragments = [];

    // 테이블 조각을 찾기
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!visited[i][j] && table[i][j] === target) {
          fragments.push(bfs(i, j, target, visited, table));
        }
      }
    }

    return fragments;
  };

  const talbeFragments = getFragments(table, 1);
  const board_empty = getFragments(game_board, 0);

  // 퍼즐 조각을 빈 공간에 맞추기
  for (const fragment of talbeFragments) {
    for (let i = 0; i < board_empty.length; i++) {
      // 도형 개수 맞는지 체크
      if (fragment[4] === board_empty[i][4]) {
        // 도형 형태가 맞는지 체크
        if (isMatch(fragment, board_empty[i], table, game_board)) {
          board_empty.splice(i, 1);
          answer += fragment[4];
          break;
        }
      }
    }
  }

  return answer;
}
