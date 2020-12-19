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
const text = `Lorem ipsum dolor sit amet, adipiscing elit. Aenean commodo ligula eget dolor massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet, venenatis vitae, justo. dictum felis pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus, quis gravida magna mi libero. Fusce vulputate eleifend sapien. purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan consectetuer eget, posuere ut, mauris. Praesent. Phasellus ullamcorper rutrum. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.`

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
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
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
        allWords.push(word);
    }
}
let clientHeight = 77, nrWords = 0, widthOfLine = 0;

const chooseShorterWord = (wordsArray) => {
    wordsArray.push("Vel ","Dui ", "Sit ", "vel ", "dui ", "sit ", "In ", "in ", "nec ", "et ", "nom ", "ut ", "sem ", "ac ", "ed ")
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
        
        if(widthOfLine + next_word.offsetWidth <= 730) { // if the next word in the list fits in the row
            wordsList.push(allWords[ind]);
            new_word.innerHTML = allWords[ind];
            addWord(new_word);
            ind++;
        } else { // add a shorter one otherwise
            const shortWord = chooseShorterWord(generateShortWords(allWords));
            short_word.innerHTML = shortWord;
            hiddenWordsContainer.appendChild(short_word);
            if(widthOfLine + short_word.offsetWidth <= 730) { //if the short word fits the row
                wordsList.push(shortWord);
                new_word.innerHTML = shortWord;
                addWord(new_word);
                // console.log(`I just added ${shortWord}and now the width is ${widthOfLine}`)
            } else { //if it does not, go to the next line
                widthOfLine = 0;
            }
        }
        hiddenWordsContainer.innerHTML = "";
    } while(textContainer.clientHeight <= clientHeight)

    if(textContainer.clientHeight > clientHeight) { // the do while adds a word onto a new line, which should be removed
        removeWord(ind);
    }
    displayedWords[0].classList.add('current-word');
    // console.log(textContainer.clientHeight);
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
