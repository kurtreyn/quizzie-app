import {
  StyleSheet,
  Text,
  View,
  // Pressable,
  TouchableOpacity,
} from 'react-native';
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
  //   const { final_results } = useSelector((state) => state.Reducer);
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
    // console.log(`index is: ${index}, length is: ${post_q_a.length}`);
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

    // console.log('wrongAnswers was', wrongAnswers);

    if (idx > -1) {
      wrongAnswers.splice(idx, 1);
    }
    shuffle(wrongAnswers);

    // console.log('wrongAnswers is', wrongAnswers);
    for (let i = 0; i < limit; i++) {
      answerOptions.push(wrongAnswers[i]);
    }
    // console.log(answerOptions);
    // wrongAnswers.forEach((answer) => answerOptions.push(answer));
    answerOptions.push(correct_answer);
    // console.log(answerOptions);

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
    // console.log('score init:', score);
    // console.log('answer', answer);
    // console.log('rightAnswer', rightAnswer);
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

  //   console.log('group', group);
  //   console.log('subjectName', subjectName);
  // console.log('post_q_a', post_q_a);
  //   console.log('questions', questions);
  //   console.log('answers', answers);
  //   console.log('options', options);
  // console.log('score', score);
  //   console.log('index:', index);
  //   console.log('results', results);
  //   console.log('final_results', final_results);

  //   const handleShowResults = () => {
  //     console.log('showing results');
  //     ;
  //   };

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
                    answer={option.answerOptions[0]}
                    onPress={() => handleAnswer(option.answerOptions[0])}
                    disable={disabled}
                  />
                )}
                {option.answerOptions[1] && (
                  <AnswerButton
                    answer={option.answerOptions[1]}
                    onPress={() => handleAnswer(option.answerOptions[1])}
                    disable={disabled}
                  />
                )}

                {option.answerOptions[2] && (
                  <AnswerButton
                    answer={option.answerOptions[2]}
                    onPress={() => handleAnswer(option.answerOptions[2])}
                    disable={disabled}
                  />
                )}

                {option.answerOptions[3] && (
                  <AnswerButton
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
    // width: '100%',
    // height: '100%',
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
    // marginLeft: 10,
    // marginRight: 10,
    // height: '70%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // flexWrap: 'wrap',
    // position: 'absolute',
    // bottom: 80,
    marginTop: 100,
    // marginLeft: 10,
    // marginRight: 10,
    // height: '70%',
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
