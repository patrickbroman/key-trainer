var noteNames = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

var majorScaleSteps = [2, 2, 1, 2, 2, 2];
var chordNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°' ];
var scaleDegrees = [
    'unison', 
    'minor 2nd', 
    'major 2nd', 
    'minor 3rd', 
    'major 3rd', 
    '4th',
    'tritone',
    '5th',
    'minor 6th',
    'major 6th',
    'minor 7th',
    'major 7th'
];
var keyNames = [];

for(var i = 0; i < noteNames.length; i++) {
    keyNames.push(noteNames[i] + " major");
}

var qualitySuffix = ["", "m", "m", "", "", "m", "dim"];
var majorScales = [];
 
// generate array of all chords and notes in all 12 keys
for(var i = 0; i < 12; i++) {
    var chords = [];
    var noteIdx = 0;
    
    for(var j = 0; j < 7; j++) {
        var chordName = noteNames[(i + noteIdx) % 12] + qualitySuffix[j];
        noteIdx += majorScaleSteps[j];
        chords.push(chordName);
    }
    majorScales.push(chords);
}

const prompt = require('prompt-sync')({sigint: true});
var colors = require('colors');

var mode = "chords";

if(process.argv.length > 2) {
    mode = process.argv[2];
} 

console.log(mode.magenta);

var numQuestions = 0;
var numCorrectAnswers = 0;

if(mode === "chords") {
    runChords();
} else if(mode == "scales") {
    runScales();
} else if(mode == "relatives") {
    runRelativeKeys();
}

function runScales() {
    while(true) {
        var randomKey = Math.floor(Math.random() * 12);
        var randomNote = Math.floor(Math.random() * 12);

        var promptString = 
            "What is the " + 
            scaleDegrees[randomNote] + 
            " of " + keyNames[randomKey]+ "? : ";

        var correctAnswer = noteNames[(randomKey + randomNote) % 12];
        const userAnswer = prompt(promptString.brightYellow);

        if(userAnswer === "exit") {
            console.log(("\nYou got " + numCorrectAnswers + " / " + numQuestions + "!").rainbow);
            process.exit();
        } else if(userAnswer === correctAnswer) {
            console.log("Correct!".brightGreen);
            numCorrectAnswers++;
        } else {
            console.log(("Wrong! It's " + correctAnswer).brightRed);
        }
        numQuestions++;
    }
}

function runChords() {
    while(true) {
        var randomKey = Math.floor(Math.random() * 12);
        var randomChord = Math.floor(Math.random() * 7);

        var promptString = 
            "What is the " + 
            chordNumerals[randomChord] + 
            " of " + keyNames[randomKey]+ "? : ";
        
        var correctAnswer = majorScales[randomKey][randomChord];
        const userAnswer = prompt(promptString.brightYellow);

        if(userAnswer === "exit") {
            console.log("\nYou got " + numCorrectAnswers + " / " + numQuestions + "!");
            process.exit();
        } else if(userAnswer === correctAnswer) {
            console.log("Correct!".brightGreen);
            numCorrectAnswers++;
        } else {
            console.log(("Wrong! It's " + correctAnswer).brightRed);
        }
        numQuestions++;
    }
}

function runRelativeKeys() {
    while(true) {
        var randomKey = Math.floor(Math.random() * 12);

        var promptString = 
            "What is the relative minor of " + keyNames[randomKey]+ "? : ";
        
        var correctAnswer = noteNames[(randomKey + 9) % 12];
        const userAnswer = prompt(promptString.brightYellow);

        if(userAnswer === "exit") {
            console.log("\nYou got " + numCorrectAnswers + " / " + numQuestions + "!");
            process.exit();
        } else if(userAnswer === correctAnswer || userAnswer === (correctAnswer + "m")) {
            console.log("Correct!".brightGreen);
            numCorrectAnswers++;
        } else {
            console.log(("Wrong! It's " + correctAnswer).brightRed);
        }
        numQuestions++;
    }

}