const btnHome = document.querySelector("#btn-home"),
  btnAnswer = document.querySelector("#btn-answer"),
  btnHint = document.querySelector("#btn-hint"),
  btnNext = document.querySelector("#btn-next");

const hintWrap = document.querySelector(".hintWrap"),
  answerWrap = document.querySelector(".answerWrap");

const inputForm = document.querySelector(".js-inputForm"),
  input = inputForm.querySelector("input");

const scoreView = document.querySelector(".score"),
  totalScoreView = document.querySelector(".totalScore");

const imgWrap = document.querySelector(".imgWrap"),
  img = document.createElement("img");

const clockContainter = document.querySelector(".clock-container"),
  clockText = clockContainter.querySelector("h2");

const SCORE_LS = "SCORE_LS";
const STAGE_LS = "STAGE_LS";
const answer = ["신세경", "봉준호", "기성용"]; // 정답 Array

let stage = 1; //Stage 번호
let startTime = 10; // timer 최초값

let score = 10, //현재 점수
  realScore = 0, //현재 점수를 받아서 save 할 때 사용하는 변수
  initCount = 0, // 최초 힌트 확인 개수
  currentTotalScore = 0; // 현재 최종 점수를 계산해서 save 할 때 사용하는 변수

// timer : 10초를 카운트다운하여 10초 경과시 1점씩 감점. 현재 점수가 0점일 때는 감점 없음

const timer = () => {
  if (startTime > 0) {
    // 10초~1초 구간일 때 카운트 다운
    startTime -= 1;
    clockText.innerText = `00:${startTime < 10 ? `0${startTime}` : startTime}`;
  } else {
    // 0초일 때 감점
    if (score > 1) {
      // stage score가 1점 초과일 때
      alert("10초 경과 : 1점 감점💥");
      score -= 1;
      saveStageScore(score);
      paintScore();
      paintTotalScore();
      startTime = 11; // 타임 리셋
    } else {
      //stage score 가 0점 일 때
      alert("10초 경과 : 0점 입니다. 다음 문제로 이동하세요.");
      saveStageScore(score);
      paintScore();
      paintTotalScore();
      paintHint(initCount);
      startTime = 11; // 타임 리셋
    }
  }
};

const setTime = setInterval(timer, 1000); // timer함수 1초마다 반복

const saveStage = (stage) => {
  localStorage.setItem(STAGE_LS, stage);
};

//saveStageScore :현재 stage 점수를 localStorage에 저장하는 함수
const saveStageScore = (score) => {
  //😥문제발생) 2,3 stage 값이 10에서 마이너스 된 값이 아닌 1stage 획득 점수 기준에서 마이너스 된 값으로 계산됨. > 해결
  localStorage.setItem(stage, score);
};

//saveTotalScore :전체 stage 점수를 localStorage에 저장하는 함수
const saveTotalScore = () => {
  const currentScore = localStorage.getItem(stage);
  currentTotalScore += Number(currentScore);
  localStorage.setItem(SCORE_LS, currentTotalScore);
};
// saveCount : 힌트 확인 개수를 카운트하기 위한 함수
const saveCount = (count) => {
  localStorage.setItem("hint", count);
};

// initImg : 초기 이미지를 보여주는 함수
const initImg = () => {
  let imgNum = stage;
  imgWrap.appendChild(img);
  img.src = `img/${imgNum}.png`;
};

// paintImg : 현재 stage를 받아서 stage에 맞는 이미지를 보여주는 함수
const paintImg = (Stage) => {
  stage += 1;
  let imgNum = stage;
  imgWrap.appendChild(img);
  img.src = `img/${imgNum}.png`;
};

//paintScore : localStorage에 저장한 stage 점수 보여주는 함수
const paintScore = () => {
  let currentScore = localStorage.getItem(stage);
  scoreView.innerText = `점수 : ${currentScore}점`;
};

//paintTotalScore : LoacalStorage에 저장한 Total score을 보여주는 함수
const paintTotalScore = () => {
  let currentTotalScore = localStorage.getItem(SCORE_LS);
  totalScoreView.innerText = `총 점수 : ${currentTotalScore}점`;
};

//paintHint : 힌트 클릭할 때 마다 힌트 확인수를 확인하여 현재 순서에 맞는 힌트를 보여주는 함수
const paintHint = (count) => {
  let getCount = count;

  if (stage === 1) {
    // stage 1 힌트
    const hintArray = [
      "30대 여성입니다.",
      "직업은 배우입니다.",
      "이름 초성은 'ㅅㅅㄱ'입니다.",
    ];
    if (getCount === 1) {
      hintWrap.innerText = hintArray[0];
    } else if (getCount === 2) {
      hintWrap.innerText = hintArray[1];
    } else {
      hintWrap.innerText = hintArray[2];
    }
  } else if (stage === 2) {
    // stage 2 힌트
    const hintArray = [
      "50대 남성입니다.",
      "직업은 영화감독입니다.",
      "이름 초성은 'ㅂㅈㅎ'입니다.",
    ];
    if (getCount === 1) {
      hintWrap.innerText = hintArray[0];
    } else if (getCount === 2) {
      hintWrap.innerText = hintArray[1];
    } else {
      hintWrap.innerText = hintArray[2];
    }
  } else {
    // stage 3 힌트
    const hintArray = [
      "30대 남성",
      "직업은 축구선수입니다.",
      "이름 초성은 'ㄱㅅㅇ'입니다.",
    ];
    if (getCount === 1) {
      hintWrap.innerText = hintArray[0];
    } else if (getCount === 2) {
      hintWrap.innerText = hintArray[1];
    } else {
      hintWrap.innerText = hintArray[2];
    }
  }
};

// checkHint : hint 사용시 2점 감점, 힌트는 3개까지 사용 가능, 현재 점수가 2점 이하일 경우 힌트 사용 불가

const checkHint = () => {
  initCount += 1;
  saveCount(initCount); //hint 사용 횟수를 저장함

  if (score > 2) {
    if (initCount < 4) {
      score -= 2;
      saveStageScore(score);
      paintScore();
      paintTotalScore();
      paintHint(initCount);
      alert("힌트 사용 : 2점 감점💥");
    } else {
      saveCount(3);
      alert("힌트 사용 :힌트 3개 사용 완료!!❌❌");
    }
  } else {
    alert("힌트 사용 : 현재 점수로는 힌트 사용이 불가합니다.");
  }
};

// showAnswer : 유저가 정답 보기 버튼 클릭시 정답을 보여주는 함수, 현재 점수는 0점으로 변환
const showAnswer = () => {
  answerWrap.innerText = `정답 : ${answer[stage - 1]}`;
  score = 0;
  realScore = score;
  saveStageScore(realScore);
  saveTotalScore();
  paintScore();
  paintTotalScore();
  alert("정답 보기 : 0점입니다. 다음 문제로 이동하세요.");
};

// goNext : 다음 문제 버튼 클릭시 호출 되는 함수
const goNext = () => {
  score = 0;
  reset();
};

// goFin : stage 3이 끝나면 총 점을 alert 창으로 보여준 뒤 thank you page로 이동
const goFin = () => {
  let currentStage = localStorage.getItem(STAGE_LS);

  if (currentStage === "4") {
    //currentStage는 string
    location.href = "thankyou.html";
    let test = localStorage.getItem(SCORE_LS);
    alert(`총 ${test}점 획득하셨습니다!🥳🥳`);
  }
};

// reset : 모든 값을 리셋하는 함수 (goNext, checkAnswer 함수에서 사용)
const reset = () => {
  realScore = score;
  saveStageScore(realScore);
  saveTotalScore();
  saveStage(stage + 1);
  paintTotalScore();
  paintImg(stage);
  paintScore();
  initCount = 0; // initcount 리셋
  count = 0; //count수 리셋
  saveCount(0); //리셋된 count 수 저장
  score = 10; //stage 점수 리셋
  hintWrap.innerText = "🟢힌트🟢"; //힌트 영역 리셋
  answerWrap.innerText = ""; //정답 영역 리셋
  startTime = 11; // 10초를 리셋
  goFin();
};

// checkAnswer : 정답을 체크하는 함수. 오답일 경우 마이너스 1점, 0점일 경우 정답 공개
const checkAnswer = (event) => {
  event.preventDefault(); //정답 submit 후에 입력된 값 유지
  const inputValue = input.value; // 입력된 값

  if (inputValue === answer[stage - 1]) {
    // 정답 판단
    alert(`정답 확인 : 정답입니다!! ${score}점 획득!!😊`);
    reset();
  } else {
    if (score > 0) {
      //정답이 아니고, stage 점수가 1점 초과 일 경우
      score -= 1;
      realScore = score;
      saveStageScore(realScore);
      paintScore();
      paintTotalScore();
      alert("정답 확인 : 틀렸습니다!!");
    } else {
      //정답이 아니고, stage 점수가 1점 초과 일 경우
      alert("정답 확인 : 0점 입니다💥💥 다음 문제로 이동하세요.");
      realScore = score;
      saveStageScore(realScore);
      paintScore();
      paintTotalScore();
    }
  }
};

// init: 최초 실행 함수

const init = () => {
  inputForm.addEventListener("submit", checkAnswer); // answer submit
  btnHint.addEventListener("click", checkHint); // hint btn
  btnAnswer.addEventListener("click", showAnswer); // answer btn
  btnNext.addEventListener("click", goNext); // next btn

  initImg(); // 초기 이미지 세팅(1번 이미지)
  saveCount(0); // 힌트 사용 횟수를 0으로 세팅

  localStorage.setItem(SCORE_LS, 0); //Total Score 초기점수
  localStorage.setItem(1, 10); // stage 1 초기 점수
  localStorage.setItem(2, 10); // stage 2 초기 점수
  localStorage.setItem(3, 10); // stage 3 초기 점수

  paintTotalScore();
};
init();
