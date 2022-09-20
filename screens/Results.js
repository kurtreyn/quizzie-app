import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { firebase, db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveGroup,
  setFinalResults,
  setFinalScore,
  setQuizReset,
  setGroups,
} from '../redux/actions';
import HorizontalButton from '../components/HorizontalButton';

export default function Results({ navigation }) {
  const dispatch = useDispatch();
  const { final_results, final_score, points_possible } = useSelector(
    (state) => state.Reducer
  );

  const resetQuiz = () => {
    dispatch(setActiveGroup(null));
    dispatch(setFinalResults(null));
    dispatch(setFinalScore(null));
    dispatch(setQuizReset(true));

    navigation.navigate({ name: 'Home' });
  };

  return (
    <View style={styles.resultsContainer}>
      <View style={styles.resultsHeader}>
        <Text style={styles.finalScore}>
          Final Score: {final_score} out of {points_possible}
        </Text>
      </View>
      {!final_results && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No quiz results to show</Text>
        </View>
      )}
      <ScrollView>
        {final_results &&
          final_results.map((result, index) => {
            return (
              <View style={styles.displaySectionOuter} key={index}>
                <View style={styles.displaySectionInner}>
                  <Text style={styles.questionText}>
                    {result.askedQuestion}?
                  </Text>
                  <Text style={styles.answerText}>
                    Correct Answer: {result.correctAnswer}
                  </Text>
                  <Text style={styles.answerText}>
                    Selected Answer: {result.selectedAnswer}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>

      <View style={styles.resetButtonContainer}>
        <TouchableOpacity onPress={resetQuiz}>
          <HorizontalButton label={'Reset Quiz'} bgColor={'#3f2b96'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'red',
  },
  noResultsContainer: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'red',
  },
  resultsHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  displaySectionOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // width: '100%',
    backgroundColor: '#fff',
    marginTop: 100,
    marginLeft: 10,
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'green',
  },
  displaySectionInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'green',
  },
  questionText: {
    color: 'blue',
    fontSize: 20,
  },
  answerText: {
    color: '#000',
    fontSize: 18,
    marginLeft: 5,
  },
  finalScoreContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'blue',
  },
  finalScore: {
    color: '#000',
    fontSize: 25,
    marginTop: 15,
  },
  noResultsText: {
    color: 'red',
    fontSize: 25,
    marginTop: 20,
  },
  resetButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
