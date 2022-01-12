var noteNames = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

var majorScaleSteps = [2, 2, 1, 2, 2, 2];
var chordNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°' ];
var keyNames = [];

for(var i = 0; i < noteNames.length; i++) {
    keyNames.push(noteNames[i] + " major");
}

var qualitySuffix = ["", "m", "m", "", "", "m", "dim"];
var majorScales = [];
 
// generate array of all chords in all 7 keys
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

while(true) {
    var randomKey = Math.floor(Math.random() * 12);
    var randomChord = Math.floor(Math.random() * 7);

    var promptString = 
        "What is the " + 
        chordNumerals[randomChord] + 
        " of " + keyNames[randomKey]+ "? : ";
    
    var correctAnswer = majorScales[randomKey][randomChord];
    const userAnswer = prompt(promptString);

    if(userAnswer === correctAnswer) {
        console.log("Correct!".green);
    } else {
        console.log(("Wrong! It's " + correctAnswer).red);
    }
}