(function () {

    // init the app
    var countdown = new COUNTDOWN.CountDown(),
        len = countdown.inputs.length,
        i;

    for (i = 0; i < len; i += 1) {
        // for each input bind key up listener
        countdown.inputs[i].addEventListener('keyup', countdown.keyUp.bind(countdown), false);
    }

    // submit the selected letter to match against the dictionary
    countdown.submit.addEventListener('click', countdown.getMatched.bind(countdown), false);

    // reset the form
    countdown.resetter.addEventListener('click', countdown.reset.bind(countdown), false);

    // scrolling through the top returned words
    // @TODO
    //for (i = 0; i < 2; i += 1) {
    //    this.swappers.addEventListener('click', this.scrollResults.bind(this), false);
    //}
} ());