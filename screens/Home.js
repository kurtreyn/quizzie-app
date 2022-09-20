import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setGroups, setActiveGroup, setQuizReset } from '../redux/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../firebase';
import GroupContainer from '../components/GroupContainer';
import Quiz from '../components/Quiz';

export default function Home({ navigation }) {
  const [quizActive, setQuizActive] = useState(false);
  const { groups, active_group, quiz_reset } = useSelector(
    (state) => state.Reducer
  );
  let groupLength;

  if (groups) {
    groupLength = groups.length;
  }
  const dispatch = useDispatch();

  const handleQuizStatus = (theId) => {
    let chosenGroup = groups.filter((group) => {
      if (group.id === theId) {
        return group;
      }
    });
    setQuizActive(!quizActive);
    dispatch(setActiveGroup(chosenGroup));
  };

  const runUnsubscribe = () => {
    dispatch(setQuizReset(false));
    const unsubscribe = db
      .collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        dispatch(
          setGroups(
            snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
          )
        );
      });

    return unsubscribe;
  };

  const deleteGroup = (postId) => {
    console.log('deleting id:', postId);
    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        runUnsubscribe();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    return unsubscribe;
  };

  const handleDeleteQuiz = (postId) => {
    let message = '';
    Alert.alert(
      'This action cannot be undone',
      message + '\n\n What would you like to do?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteGroup(postId),
        },
      ]
    );
  };

  useEffect(() => {
    setQuizActive(false);
    runUnsubscribe();
    dispatch(setQuizReset(false));
  }, [groupLength, quiz_reset]);

  // console.log('current_user', current_user);
  // console.log('GROUPS', groups);
  // console.log('active_group', active_group);
  // console.log('quiz_reset', quiz_reset);

  return (
    <View style={styles.homeContainer}>
      <LinearGradient
        colors={['#2980B9', '#6DD5FA', '#FFFFFF']}
        style={styles.background}
      >
        {!groups && (
          <View style={styles.homeHeaderNoGroups}>
            <Text style={styles.textStyle}>
              Looks like you don't have any quizes available. Press the pen icon
              at the bottom of this screen to go to Create Quiz screen and add a
              quiz.
            </Text>
          </View>
        )}

        <View style={styles.homeHeader}>
          {!quizActive && (
            <Text style={[styles.textStyle, { marginTop: 40 }]}>
              Select the quiz you would like to take
            </Text>
          )}
        </View>

        {!quizActive && (
          <ScrollView>
            <View style={styles.innerContainer}>
              {groups &&
                groups.map((group, index) => {
                  return (
                    <TouchableOpacity
                      id={group.id}
                      onPress={() => handleQuizStatus(group.id)}
                      onLongPress={() => handleDeleteQuiz(group.id)}
                      key={index}
                    >
                      <GroupContainer
                        label={group.subject_name}
                        key={index}
                        id={group.id}
                        group={group}
                        handleQuizStatus={handleQuizStatus}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
        )}

        {quizActive && (
          <View style={styles.innerContainer}>
            {active_group &&
              active_group.map((group, index) => {
                return (
                  <Quiz
                    group={group}
                    key={index}
                    subjectName={group.subject_name}
                    navigation={navigation}
                  />
                );
              })}
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  homeHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  homeHeaderNoGroups: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '5%',
    // marginBottom: '10%',
    // width: '100%',
    // height: '50%',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'red',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
  addMarginTop: {
    marginTop: 100,
  },
});
