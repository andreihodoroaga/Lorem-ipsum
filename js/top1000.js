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
const text = "ability able about above accept according account across act action activity actually add address administration admit adult affect after again against age agency agent ago agree agreement ahead air all allow almost alone along already also although always American among amount analysis and animal another answer any anyone anything appear apply approach area argue arm around arrive art article artist ask attack attention attorney audience author authority available avoid away baby back bad bag ball bank bar base beat beautiful because become bed before begin behavior behind believe benefit best better between beyond big bill billion bit black blood blue board body book born both box boy break bring brother budget build building business but buy call camera campaign can cancer candidate capital car card care career carry case catch cause cell center central century certain certainly chair challenge chance change character charge check child choice choose church citizen city civil claim class clear clearly close coach cold collection college color come commercial common community company compare computer concern condition conference Congress consider consumer contain continue control cost could country couple course court cover create crime cultural culture cup current customer cut dark data daughter day dead deal death debate decade decide decision deep defense degree Democrat democratic describe design despite detail determine develop development die difference different difficult dinner direction director discover discuss discussion disease doctor dog door down draw dream drive drop drug during each early east easy eat economic economy edge education effect effort eight either election else employee end energy enjoy enough enter entire environment environmental especially establish even evening event ever every everybody everyone everything evidence exactly example executive exist expect experience expert explain eye face fact factor fail fall family far fast father fear federal feel feeling few field fight figure fill film final finally financial find fine finger finish fire firm first fish five floor fly focus follow food foot for force foreign forget form former forward four free friend from front full fund future game garden gas general generation get girl give glass goal good government great green ground group grow growth guess gun guy hair half hand hang happen happy hard have head health hear heart heat heavy help her here herself high him himself his history hit hold home hope hospital hot hotel hour house how however huge human hundred husband idea identify if image imagine impact important improve include including increase indeed indicate individual industry information inside instead institution interest interesting international interview into investment involve issue item its itself job join just keep key kid kill kind kitchen know knowledge land language large last late later laugh law lawyer lay lead leader learn least leave left leg legal less let letter level lie life light like likely line list listen little live local long look lose loss lot love low machine magazine main maintain major majority make man manage management manager many market marriage material matter may maybe me mean measure media medical meet meeting member memory mention message method middle might military million mind minute miss mission model modern moment money month more morning most mother mouth move movement movie much music must my myself name nation national natural nature near nearly necessary need network never new news newspaper next nice night no none nor north not note nothing notice now number occur off offer office officer official often oil ok old once one only onto open operation opportunity option or order organization other others our out outside over own owner page pain painting paper parent part participant particular particularly partner party pass past patient pattern pay peace people per perform performance perhaps period person personal phone physical pick picture piece place plan plant play player PM point police policy political politics poor popular population position positive possible power practice prepare present president pressure pretty prevent price private probably problem process produce product production professional professor program project property protect prove provide public pull purpose push put quality question quickly quite race radio raise range rate rather reach read ready real reality realize really reason receive recent recently recognize record red reduce reflect region relate relationship religious remain remember remove report represent Republican require research resource respond response responsibility rest result return reveal rich right rise risk road rock role room rule run safe same save say scene school science scientist score sea season seat second section security see seek seem sell send senior sense series serious serve service set seven several sexual shake share she shoot short shot should shoulder show side sign significant similar simple simply since sing single sister sit site situation six size skill skin small smile so social society soldier some somebody someone something sometimes son song soon sort sound source south southern space speak special specific speech spend sport spring staff stage stand standard star start state statement station stay step still stock stop store story strategy street strong structure student study stuff style subject success successful such suddenly suffer suggest summer support sure surface system table take talk task tax teach teacher team technology television tell ten tend term test than thank that the their them themselves then theory there these they thing think third this those though thought thousand threat three through throughout throw thus time today together tonight too top total tough toward town trade traditional training travel treat treatment tree trial trip trouble true truth try turn TV two type under understand unit until up upon us use usually value various very victim view violence visit voice vote wait walk wall want war watch water way we weapon wear week weight well west western what whatever when where whether which while white who whole whom whose why wide wife will win wind window wish with within without woman wonder word work worker world worry would write writer wrong yard yeah year yes yet you young your yourself"

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
        allWords.push(word);
    }
}
let clientHeight = 77, nrWords = 0, widthOfLine = 0;

const chooseShorterWord = (wordsArray) => {
    wordsArray.push("she ", "he ", "my ", "his ", "her ", "all ", "and ", "do ", "day ", "how ", "him ");
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
            // console.log(`I just added ${allWords[ind]} and now the width is ${widthOfLine}`);
            ind++;
        } else { // add a shorter one otherwise
            const shortWord = chooseShorterWord(generateShortWords(allWords));
            short_word.innerHTML = shortWord;
            hiddenWordsContainer.appendChild(short_word);
            if(widthOfLine + short_word.offsetWidth <= 730) { //if the short word fits the row
                wordsList.push(shortWord);
                new_word.innerHTML = shortWord;
                addWord(new_word);
                console.log(`I just added    ${shortWord}and now the width is ${widthOfLine}`)
            } else { // if it does not, go to the next line
                widthOfLine = 0;
            }
        }
        hiddenWordsContainer.innerHTML = "";
    } while(textContainer.clientHeight <= clientHeight)

    if(textContainer.clientHeight > clientHeight) { // the do while adds a word onto a new line, which should be removed
        widthOfLine = 0;
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
    const wpm = score + Math.floor((totalWords - score) / 3);
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
