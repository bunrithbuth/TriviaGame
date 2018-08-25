
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId
var clockRunning = false

let TriviaGame = {
    time: 30,
    questions: 5,
    submit: false,
    answers: [
        'orange', //1
        'cambodian', //2
        'chicken feet', //3
        'r35', //4
        'ms'  //5
    ],
    score: 0,
    startTimer: function(){
        if (!clockRunning) {
            console.log('starting timer')
            intervalId = setInterval(TriviaGame.count, 1000)
            clockRunning = true
        }
    },
    count: function () {
        console.log('count')
        TriviaGame.time--
        var converted = TriviaGame.timeConverter(TriviaGame.time)
        $('#display').text(converted)
        if(TriviaGame.time === 0 || TriviaGame.submit === true){
            TriviaGame.stop()
        }
    },
    stop: function () {
        console.log('stopping timer')
        clearInterval(intervalId)
        clockRunning = false

        let data
        for(i = 0; i < TriviaGame.questions; i++){
            data = $(`.Q${i+1} [type="radio"]:checked`).attr("data")
            if(TriviaGame.answers[i] === data){
                TriviaGame.score++
            }
        }
        console.log('score: ' + TriviaGame.score)
        $('.scoreText').prepend(`
            <h2 class="red">You Scored: ${TriviaGame.score}/5 <h2>
        `)
        $('.btn').addClass('disabled')
    },
    timeConverter: function (t) {
        var minutes = Math.floor(t / 60)
        var seconds = t - (minutes * 60)
    
        if (seconds < 10) {
          seconds = '0' + seconds
        }
    
        if (minutes === 0) {
          minutes = '00'
        } else if (minutes < 10) {
          minutes = '0' + minutes
        }
    
        return minutes + ':' + seconds
    }
}


$(document).ready(function() {

    $(document).on("click", ".btn", function(){
        TriviaGame.submit = true
    })
    TriviaGame.startTimer()
})