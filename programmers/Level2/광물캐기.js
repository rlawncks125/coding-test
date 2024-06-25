// https://school.programmers.co.kr/learn/courses/30/lessons/172927#

function solution(picks, minerals) {
  let min = Infinity;

  const pickStamina = {
    dia: [1, 1, 1],
    iron: [5, 1, 1],
    stone: [25, 5, 1],
  };

  const getStamina = (pick, mineral) => {
    const [diamond, iron, stone] = pickStamina[pick];
    const calc = {
      diamond,
      iron,
      stone,
    };
    return calc[mineral];
  };

  const dfs = (current, stamina, picks, minerals) => {
    // 광석 채굴
    for (let i = 0; i < 5; i++) {
      if (minerals.length === 0) {
        min = Math.min(stamina, min);
        return;
      }
      const mineral = minerals.shift();
      stamina += getStamina(current, mineral);
    }

    // every :  picks 배열 순회하면서 모든 요소가 조건에 충족하는지
    // 곡갱이 를 다사용했는제 or 광석을 다 채굴 했는지
    if (picks.every((v) => v === 0) || minerals.length === 0) {
      min = Math.min(stamina, min);
      return;
    }

    ["dia", "iron", "stone"].forEach((pick, index) => {
      // 곡갱이가 남아있는지 확인
      if (picks[index] > 0) {
        const copyPicks = [...picks];
        copyPicks[index]--;
        dfs(pick, stamina, copyPicks, [...minerals]);
        copyPicks[index]++;
      }
    });

    // const [dia, iron, stone] = picks;
    // if (dia > 0) {
    //   picks[0]--;
    //   dfs("dia", stamina, [...picks], [...minerals]);
    //   picks[0]++;
    // }
    // if (iron > 0) {
    //   picks[1]--;
    //   dfs("iron", stamina, [...picks], [...minerals]);
    //   picks[1]++;
    // }
    // if (stone > 0) {
    //   picks[2]--;
    //   dfs("stone", stamina, [...picks], [...minerals]);
    //   picks[2]++;
    // }
  };

  ["dia", "iron", "stone"].forEach((pick, index) => {
    if (picks[index] > 0) {
      const copyPicks = [...picks];
      copyPicks[index]--;
      dfs(pick, 0, copyPicks, [...minerals]);
    }
  });

  // const [dia, iron, stone] = picks;
  // dia > 0 && dfs("dia", 0, [...[dia - 1, iron, stone]], [...minerals]);
  // iron > 0 && dfs("iron", 0, [...[dia, iron - 1, stone]], [...minerals]);
  // stone > 0 && dfs("stone", 0, [...[dia, iron, stone - 1]], [...minerals]);

  return min;
}
