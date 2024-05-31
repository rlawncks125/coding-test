// https://school.programmers.co.kr/learn/courses/30/lessons/250137

function solution(bandage, health, attacks) {
  let answer = health;
  const [시전시간, 초당회복량, 추가회복량] = bandage;

  const lastTime = attacks[attacks.length - 1][0];

  const ddd = Array.from({ length: lastTime }, () => +초당회복량);

  attacks.forEach((v) => {
    const [time, attack] = v;
    ddd[time] = -attack;
  });

  let timeCount = 0;
  for (let i = 0; i <= lastTime; i++) {
    let at = ddd[i];

    at === 초당회복량 ? (timeCount += 1) : (timeCount = 0);

    if (timeCount === 시전시간) {
      at += 추가회복량;
      timeCount = 0;
    }

    answer = Math.min(health, answer + at);

    if (answer <= 0) break;
  }

  return answer <= 0 ? -1 : answer;
}
