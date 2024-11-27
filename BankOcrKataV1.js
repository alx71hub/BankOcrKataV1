/* our representation for digits */
const digitReps = [
    [' _ ', '| |', '|_|'], // 0
    ['   ', '  |', '  |'], // 1
    [' _ ', ' _|', '|_ '], // 2
    [' _ ', ' _|', ' _|'], // 3
    ['   ', '|_|', '  |'], // 4
    [' _ ', '|_ ', ' _|'], // 5
    [' _ ', '|_ ', '|_|'], // 6
    [' _ ', '  |', '  |'], // 7
    [' _ ', '|_|', '|_|'], // 8
    [' _ ', '|_|', ' _|']  // 9
];

BankOcrKata();

function BankOcrKata() {
    const p = 0.9, q = 0.1;
    const pMatrix = [
        [1,1,1,1,1,1,1,1,1,1], // first digit
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]  // 9-th digit
    ]; 

    const rep = generateRandomRep(); // or readRep("all1.txt");
    printRep(rep);

    // build the probability matrix 
    for (let ixRow = 0; ixRow < 3; ixRow++) { // scan the 3 rows
        for (let ixPos = 0; ixPos < 27; ixPos++) { // scan the 27 characters
            let nDigit = Math.floor(ixPos/3); // n-th digit under OCR
            let ch = rep[ixRow].charAt(ixPos); // OCR character
            for (let digit = 0; digit < 10; digit++) { 
                let expected = digitReps[digit][ixRow].charAt(ixPos%3); // expected character for current digit <digit>
                pMatrix[nDigit][digit] *= (ch == expected ? p : q);
            }
        }
    }

    // use the probability matrix to compute the most probable result(s)
    let result = "";
    for (let ixDigit = 0; ixDigit < 9; ixDigit++) {
        let probs = pMatrix[ixDigit];
        let mpd1 = probs.indexOf(Math.max(...probs)); // most probable digit
        let p1 = probs[mpd1].toFixed(2);
        probs[mpd1] = 0;
        let mpd2 = probs.indexOf(Math.max(...probs)); // second most probable digit 
        let p2 = probs[mpd2].toFixed(2);
        probs[mpd2] = 0;
        let mpd3 = probs.indexOf(Math.max(...probs)); // third most probable digit
        let p3 = probs[mpd3].toFixed(2);
        console.log("Most likely digit at position " + ixDigit + ": " + mpd1 + " (" + p1 + "), " + mpd2 + " (" + p2 + "), " + mpd3 + " (" + p3 + ")");

        result += mpd1;
    }
    console.log("Most likely number: " + result);
}



function printRep(rep) {
    console.log("Below is the representation of the number:");
    rep.forEach(item => console.log(item));
    console.log("\n");
}



function readRepFromFile(fileName) {
    let outRows = []; // @return
    require('fs').readFileSync(fileName, 'utf-8').split(/\r?\n/).forEach(line => {
        outRows.push(line);
    })
    return outRows;
}



/* generate a representation for 9 random digits */
function generateRandomRep() {
    let digits = [];
    for (let ix=0; ix<9; ix++) {
        digits.push(getRandomDigit());
    }
    console.log("Random number being tested: " + digits.join(""));

    let outRows = ["", "", ""]; // @return
    digits.forEach((digit, pos) => {
        let col = pos*3;
        outRows[0] += digitReps[digit][0];
        outRows[1] += digitReps[digit][1];
        outRows[2] += digitReps[digit][2];
    });

    return outRows;
}



/* 0 to 9 random */
function getRandomDigit() {
    return Math.floor(10 * Math.random()); 
}