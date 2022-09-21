import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setFinalResults,
  setFinalScore,
  setPointsPossible,
} from '../redux/actions';
import AnswerButton from './AnswerButton';
import HorizontalButton from './HorizontalButton';

export default function Quiz({ navigation, subjectName, group }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [rightAnswer, setRightAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const { post_q_a } = group;
  let answers = post_q_a.map((answer) => answer.correct_answer);
  let pointsPossible = answers.length;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const runQuiz = (currentObj) => {
    if (index === post_q_a.length) {
      setDisabled(true);
      return;
    }
    let limit = 3;
    let { correct_answer } = currentObj;
    let { question } = currentObj;
    let wrongAnswers = [...answers];
    let answerOptions = [];
    let idx = wrongAnswers.indexOf(correct_answer);

    if (idx > -1) {
      wrongAnswers.splice(idx, 1);
    }
    shuffle(wrongAnswers);

    for (let i = 0; i < limit; i++) {
      answerOptions.push(wrongAnswers[i]);
    }
    answerOptions.push(correct_answer);

    let qSet = {
      question: question,
      correctAnswer: correct_answer,
      answerOptions: shuffle(answerOptions),
    };
    setCurrentQuestion(question);
    setRightAnswer(correct_answer);
    setOptions([qSet]);
    setIndex(index + 1);
  };

  const handleAnswer = (answer) => {
    if (answer === rightAnswer) {
      setScore(score + 1);
    }

    if (results.length === 0) {
      setResults([
        {
          askedQuestion: currentQuestion,
          selectedAnswer: answer,
          correctAnswer: rightAnswer,
        },
      ]);
    } else {
      setResults((prevState) => {
        return [
          ...prevState,
          {
            askedQuestion: currentQuestion,
            selectedAnswer: answer,
            correctAnswer: rightAnswer,
          },
        ];
      });
    }
    runQuiz(post_q_a[index]);
  };

  const handleEndQuiz = () => {
    setDisabled(true);
  };

  useEffect(() => {
    if (!disabled) {
      runQuiz(post_q_a[index]);
    }
    if (disabled) {
      dispatch(setFinalResults(results));
      dispatch(setFinalScore(score));
      dispatch(setPointsPossible(pointsPossible));
    }
  }, [disabled]);

  return (
    <View style={styles.quizContainer}>
      <View styles={styles.header}>
        <Text style={styles.headerText}>{subjectName}</Text>
      </View>

      <View style={styles.questionSection}>
        {!disabled &&
          options.map((option) => {
            return <Text style={styles.questionText}>{option.question}?</Text>;
          })}
      </View>

      <View style={styles.answerSection}>
        <View style={styles.buttonContainer}>
          {options.map((option, index) => {
            return (
              <View>
                {option.answerOptions[0] && (
                  <AnswerButton
                    key={'01'}
                    answer={option.answerOptions[0]}
                    onPress={() => handleAnswer(option.answerOptions[0])}
                    disable={disabled}
                  />
                )}
                {option.answerOptions[1] && (
                  <AnswerButton
                    key={'02'}
                    answer={option.answerOptions[1]}
                    onPress={() => handleAnswer(option.answerOptions[1])}
                    disable={disabled}
                  />
                )}

                {option.answerOptions[2] && (
                  <AnswerButton
                    key={'03'}
                    answer={option.answerOptions[2]}
                    onPress={() => handleAnswer(option.answerOptions[2])}
                    disable={disabled}
                  />
                )}

                {option.answerOptions[3] && (
                  <AnswerButton
                    key={'04'}
                    answer={option.answerOptions[3]}
                    onPress={() => handleAnswer(option.answerOptions[3])}
                    disable={disabled}
                  />
                )}
              </View>
            );
          })}

          <View style={styles.addTopMargin}>
            {!disabled && (
              <TouchableOpacity onPress={handleEndQuiz}>
                <HorizontalButton label={'End Quiz'} bgColor={'#FF416C'} />
              </TouchableOpacity>
            )}
            {disabled && (
              <TouchableOpacity
                navigation={navigation}
                onPress={() => navigation.navigate({ name: 'Results' })}
              >
                <HorizontalButton label={'View Results'} bgColor={'#3f2b96'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 100,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    marginLeft: 10,
  },
  questionSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  questionText: {
    color: '#000',
    fontSize: 30,
  },
  answerSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '70%',
    backgroundColor: '#a8c0ff',
    position: 'relative',
  },
  answersContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
  },
  answerText: {
    color: '#000',
    fontSize: '5rem',
    marginLeft: 10,
  },
  addTopMargin: {
    marginTop: 20,
  },
});
