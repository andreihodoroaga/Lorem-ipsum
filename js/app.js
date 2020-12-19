// Variables
const scoreDisplay = document.querySelector('.score');
let score = 0;

const inputText = document.querySelector('.text-input');
const textContainerDiv = document.querySelector('.text-container');
const textContainer = document.querySelector('.text');
const hiddenWordsContainer = document.querySelector('.hidden-words-container');
let currentWordIndex = 0;
let totalWords = 0;
let wordsList = [];
let allWords = [];
let displayedWords = [];
const text = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. In auctor lobortis lacus. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Vestibulum ullamcorper mauris at ligula. Fusce fermentum. Nullam cursus lacinia erat. Praesent blandit laoreet nibh. Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat. Etiam feugiat lorem non metus. Vestibulum dapibus nunc ac augue. Curabitur vestibulum aliquam leo. Praesent egestas neque eu enim. In hac habitasse platea dictumst. Fusce a quam. Etiam ut purus mattis mauris sodales aliquam. Curabitur nisi. Quisque malesuada placerat nisl. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Morbi mollis tellus ac sapien. Phasellus volutpat, metus eget egestas mollis, lacus blandit dui, id egestas quam mauris ut lacus. Fusce vel dui. Sed in libero ut nibh placerat accumsan. Proin faucibus arcu quis ante. In consectetuer turpis ut velit. Nulla sit amet est. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Suspendisse feugiat. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Suspendisse non nisl sit amet velit hendrerit rutrum. Ut leo. Ut a nisl id ante tempus hendrerit. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Suspendisse eu ligula. Nulla facilisi. Donec id justo. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Curabitur suscipit suscipit tellus. Praesent vestibulum dapibus nibh. Etiam iaculis nunc ac metus. Ut id nisl quis enim dignissim sagittis. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Proin magna. Duis vel nibh at velit scelerisque suscipit. Curabitur turpis. Vestibulum suscipit nulla quis orci. Fusce ac felis sit amet ligula pharetra condimentum. Maecenas egestas arcu quis ligula mattis placerat`;
let containerHeight = 77, nrWords = 0, widthOfLine = 0;

let totalKeyStrokes = 0;
let wrongKeyStrokes = 0;

const timer = document.querySelector('.timer');
const startingTime = 1;
let time = startingTime * 60;
let timerStarted = false;

// Generate text
const shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        if(currentIndex !== 0 && array[randomIndex] !== array[currentIndex - 1]) {
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }

    return array;
}

const textIsBigEnough = (wordList) => {
    let numOfChars = 0;
    wordList.forEach(word => {
        numOfChars += word.length;
    })
    return numOfChars;
}

const generateShortWords = (wordsArray) => {
    const words = []
    for(word of wordsArray)
        if(word.length <= 4) 
            words.push(word) 
    return words;
}

// Generate the words from the sentence, removing unnecessary characters
const generateWordsList = () => {
    const words = text.split(" ")
    for (let word of words) {
        word = word.replace(',', '');
        word = word.replace('.', '');
        word = word.replace(';', '');
        word += " ";
        if(word.length >= 3) {
            allWords.push(word);
        }
    }
}

const chooseShorterWord = (wordsArray) => {
    wordsArray.push("Vel ","Dui ", "Sit ", "vel ", "dui ", "sit ", "nec ", "et ", "nom ", "ut ", "sem ");
    let shortWords = generateShortWords(wordsArray);
    return shortWords[Math.floor(Math.random() * (shortWords.length - 1))];
}

const removeWord = (ind) => {
    wordsList.pop(allWords[ind]);
    textContainer.removeChild(textContainer.lastChild);
    displayedWords.pop(displayedWords.lastChild);
}

const addWord = (word) => {
    textContainer.appendChild(word);
    displayedWords.push(word);
    widthOfLine += word.offsetWidth;
    nrWords++;
}

const generateTextThatFits = () => {
    wordsList = [];
    allWords = [];
    displayedWords = [];
    textContainer.innerHTML = "";
    let ind = 0;
    generateWordsList();
    shuffle(allWords);
    do {
        const new_word = document.createElement('span');
        const next_word = document.createElement('span');
        const short_word = document.createElement('span');
        next_word.innerHTML = allWords[ind];
        hiddenWordsContainer.appendChild(next_word);
        // console.log(allWords[ind],widthOfLine, next_word.offsetWidth);
        if(widthOfLine + next_word.offsetWidth <= 725) { // if the next word in the list fits in the row
            wordsList.push(allWords[ind]);
            new_word.innerHTML = allWords[ind];
            addWord(new_word);
            // console.log(`I just added ${allWords[ind]} and now the width is ${widthOfLine}`);
            ind++;
        } else { // add a shorter one otherwise
            const shortWord = chooseShorterWord(generateShortWords(allWords));
            short_word.innerHTML = shortWord;
            hiddenWordsContainer.appendChild(short_word);
            if(widthOfLine + short_word.offsetWidth <= 725) { //if the short word fits the row
                wordsList.push(shortWord);
                new_word.innerHTML = shortWord;
                addWord(new_word);
                // console.log(`I just added ${shortWord} and now the width is ${widthOfLine}`);
            } else { //if it does not, go to the next line
                widthOfLine = 0;
            }
        }
        hiddenWordsContainer.innerHTML = "";
    } while(textContainer.offsetHeight <= containerHeight)

    if(textContainer.offsetHeight > containerHeight) { // the do while adds a word onto a new line, which should be removed
        removeWord(ind);
        widthOfLine = 0;
    }
    displayedWords[0].classList.add('current-word');
    // console.log(textContainer.containerHeight);
}
generateTextThatFits();

const resetBtn = document.querySelector('.resetBtn')
resetBtn.addEventListener('click', () => {
    location.reload();
})

// Timer
const startTimer = () => {
    const countdown = setInterval(() => {
        time--;
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timer.innerHTML = `${minutes}:${seconds}`;
        if (time <= 0) {
            time = 0;
            window.clearInterval(countdown);
            displayStats();
        }
    }, 1000);
}

const displayStats = () => {
    document.querySelector('.score-display').style.display = "none";
    document.querySelector('.stats-container').style.display = "block";
    const wpm = (totalWords - score < 10 && score != 0) ?  score + Math.floor((totalWords - score) / 3) : score;
    document.querySelector('.stats-container').innerHTML = `  
        <div class="speed">${totalWords - score < 10 && score != 0 ? wpm : score} WPM</div>
        <div class="wpm">(words per minute)</div>
        <div class="correct-words">Correct words: <span>${score}</span></div>
        <div class="wrong-words">Wrong words: <span>${totalWords - score}</span></div>
        <div class="accuracy">Accuracy: ${totalWords < 5 * score ? Math.ceil((totalKeyStrokes - wrongKeyStrokes) / totalKeyStrokes * 100) : 0}%</div>
    `
    if(wpm < 10)
        inputText.placeholder = "That is pretty slow.";
    else if(wpm >= 10 && wpm < 20)
        inputText.placeholder = "You can do better!";
    else if(wpm >= 20 && wpm < 30)
        inputText.placeholder = "Practice makes perfect.";
    else if(wpm >= 30 && wpm < 40)
        inputText.placeholder = "Good!";
    else if(wpm >= 40 && wpm < 50)
        inputText.placeholder = "Great!";
    else if(wpm >= 50 && wpm < 70 && wpm != 69)
        inputText.placeholder = "You're quick!";
    else if(wpm === 69)
        inputText.placeholder = "Nice.";
    else if(wpm >= 70 && wpm < 80)
        inputText.placeholder = "Woah! That was fast.";
    else if(wpm >= 80 && wpm < 100)
        inputText.placeholder = "Lightning fast!";
    else if(wpm >= 100 && wpm < 120)
        inputText.placeholder = "That was insane!";
    else 
        inputText.placeholder = "Are you even human?"; 

    textContainerDiv.style.display = "none";
}

// Main logic
inputText.addEventListener('input', e => control(e))

const control = (e) => {

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    let currentWord = wordsList[currentWordIndex];
    let typed_word = e.target.value;

    if (typed_word.toString().includes(" ") && currentWord != typed_word) { // add functionality for space bar
        e.target.value = "";
        displayedWords[currentWordIndex].classList.add('wrong');
        displayedWords[currentWordIndex].classList.remove('current-word');
        currentWordIndex++;
        if (currentWordIndex % (nrWords - 1))
            displayedWords[currentWordIndex].classList.add('current-word');
        totalWords++;
    } else {

        if (!firstContainsSecond(currentWord, typed_word)) {
            if(okBackspace === 0) // add wrong keystrokes only if the backspace hasn't been pressed more than once
                wrongKeyStrokes++;
            displayedWords[currentWordIndex].classList.add('wrong');
        } else {
            displayedWords[currentWordIndex].classList.remove('wrong');
        }

        if (currentWord === typed_word) {
            displayedWords[currentWordIndex].classList.add('right');
            displayedWords[currentWordIndex].classList.remove('current-word');
            score++;
            currentWordIndex++;
            totalWords++;
            if (currentWordIndex % (nrWords - 1)) // check for last word (it should not be added the class)
                displayedWords[currentWordIndex].classList.add('current-word');
            e.target.value = "";
            widthOfLine = 0; // reset the width of the line of words
        }
    }
    scoreDisplay.innerHTML = score;

    // check for end of word list
    if (currentWordIndex === (nrWords - 1)) {
        textContainer.innerHTML = "";
        wordsList = []
        displayedWords = [];
        currentWordIndex = 0;
        nrWords = 0;
        generateTextThatFits();
    }
    // console.log(totalWords, score)
    // console.log(typed_word, currentWord)
    // console.log(totalKeyStrokes, wrongKeyStrokes)
    // console.log(currentWordIndex, nrWords)
}

// Check for every key press
inputText.addEventListener('keydown', (e) => {
    if((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122))
        totalKeyStrokes++;
})

// Check if backspace has been pressed (used to no longer add wrong keystrokes)
let okBackspace = 0;
inputText.addEventListener('keyup', (e) => {
    if(e.keyCode === 8)
        okBackspace = 1;
    else 
        okBackspace = 0;
})

// Miscellaneous functions

const firstContainsSecond = (first, second) => {
    if (first.length < second.length)
        return 0;
    else {
        for (let i = 0; i < second.length; i++)
            if (first[i] !== second[i])
                return 0;
    }
    return 1;
}
