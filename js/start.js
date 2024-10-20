const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const result = document.querySelector("#result");
// const < 상수, var < 변수
// querySelector < 문서에서 CSS에 대응되는 것을 찾아옴. id값을 main을 가져오는거.
//document.write('<script src="./data.js"></script>');

function calResult() {
    var result = select.indexOf(Math.max(...select)); //배열의 최대값 반환
    return result;
}

function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.Animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.Animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block"
        }, 450);
        setResult();
    }, 450);
}

function addAnswer(answerText, qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('Button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer); // a아래에 answer버튼 넣기
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; ++i) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.Animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for (let j = 0; j < target.length; ++j) {
                select[target[j]] += 1;
            }

            for (let i = 0; i < children.length; ++i) {
                children[i].style.display = "none";
            }
            goNext(++qIdx);
        }, 450);
    }, false);
}

function goNext(qIdx) {
    if (qIdx >= endPoint) {
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx) + '%';
}

function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.Animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.Animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block"
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    }, 450);

    // setTimeout < Task.Wait느낌.
}
 