import * as qna from '@tensorflow-models/qna';

export async function tensorflowQna() {
    // Load the model.
    const model = await qna.load();

    const question = 'What is the CEO of Tesla?';

    // Finding the answers
    const answers = await model.findAnswers(
        question,
        'tony is the ceo of tesla'
    );

    console.log('Answers: ');
    console.log(answers);
}

tensorflowQna();
