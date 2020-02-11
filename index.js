const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const WordPOS = require('wordpos'), wordpos = new WordPOS();

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout)

function ask(questionText) {
    return new Promise((resolve, reject) => {
      rl.question(questionText, resolve);
    });
  }

async function buildPOS() {
    let newObj = await askQuestion()
    async function askQuestion() {
        let difficulty = await prompt([
                /* Pass your questions in here */
                {
                    type: 'list',
                    name: 'difficulty',
                    message: 'Please select a difficulty.\n',
                    choices: [
                        'Easy',
                        'Medium',
                        'Hard'
                    ],
                    default: 'Easy'
                }

            ])
            .then(answers => {
                // Use user feedback for... whatever!!
                if (answers['difficulty'] === 'Easy') {
                    console.log('You selected Easy! Enjoy a relaxing adventure!');
                    return '1';
                } else if (answers['difficulty'] === 'Medium') {
                    console.log('You selected Medium! Enjoy your adventure!');
                    return '2';
                } else {
                    console.log('You selected Hard!!! You must enjoy pain!');
                    return '3';
                }
            });

        console.log(difficulty);    
        let object = await prompt([
                /* Pass your questions in here */
                {
                    type: 'input',
                    name: 'userInput',
                    message: 'What would you like to do?\n',
                }

            ])
            .then(answers => {
                let posObj = buildArray();
                async function buildArray() {
                    let wordObj = {};
                    // Use user feedback for... whatever!!
                    //let characterCountArray = [];
                    //let wordArray = [];
                    //answers.userInput.split(' ').forEach((word) => characterCountArray.push(word.length));
                    //answers.userInput.split(' ').forEach((word) => wordArray.push(word))
                    //if (characterCountArray.includes(1) && !wordArray.includes('a')) {
                    //    console.log(wordArray);
                    //} else {
                    let verbAr = await wordpos.getVerbs(answers.userInput, function (result) {
                        return result;
                    });
                    wordObj.verbs = verbAr;

                    let nounAr = await wordpos.getNouns(answers.userInput, function (result) {
                        wordObj.nouns = result;
                    });
                    wordObj.nouns = nounAr;
                    return wordObj;
                }
                return posObj;

                //}   
            });

        return object;
    }

    console.log(newObj);

    let askString = await ask('\nWhat would you like to do with this object?');
    console.log(askString);
}
buildPOS();