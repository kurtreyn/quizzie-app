import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setHasGroupName, setGroupName } from '../redux/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { firebase, db } from '../firebase';
import InputContainer from '../components/InputContainer';
import ControlPanel from '../components/ControlPanel';

export default function AddQuizGroup({ navigation }) {
  const dispatch = useDispatch();
  const { has_group_name, group_name } = useSelector((state) => state.Reducer);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [nameOfGroup, setNameOfGroup] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [number, setNumber] = useState(0);
  const [groupSet, setGroupSet] = useState([]);
  // const [previousQuestions, setPreviousQuestions] = useState([]);
  // let questionAnswerArr = [];

  const handleGroupNameStatus = () => {
    dispatch(setHasGroupName(true));
    dispatch(setGroupName(nameOfGroup));
  };

  const handleReset = () => {
    dispatch(setHasGroupName(false));
    dispatch(setGroupName(''));
    setGroupName('');
    setNumber(0);
  };

  const handleAddQandA = () => {
    if (groupSet === null) {
      setGroupSet([
        {
          question: question,
          correct_answer: answer,
          incorrect_answers: [],
        },
      ]);
    } else {
      setGroupSet((prevState) => {
        return [
          ...prevState,
          { question: question, correct_answer: answer, incorrect_answers: [] },
        ];
      });
    }

    setQuestion('');
    setAnswer('');
    setNumber(number + 1);
  };

  const uploadPostToFirebase = (posts) => {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .add({
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        subject_name: group_name,
        post_q_a: posts,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => navigation.navigate({ name: 'Home' }));
    return unsubscribe;
  };

  const handleSubmitGroup = () => {
    uploadPostToFirebase(groupSet);
  };

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  // console.log('currentLoggedInUser', currentLoggedInUser);
  // console.log('previousQuestions', previousQuestions);
  // console.log('GROUPSET', groupSet);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // >
    //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.addQuizGroupContainer}>
      <LinearGradient
        colors={['#2980B9', '#6DD5FA', '#FFFFFF']}
        style={styles.background}
      >
        <View style={styles.innerContainer}>
          <InputContainer
            hasNameOfGroup={has_group_name}
            nameOfGroup={nameOfGroup}
            setNameOfGroup={setNameOfGroup}
            question={question}
            setQuestion={setQuestion}
            answer={answer}
            setAnswer={setAnswer}
          />
          <ControlPanel
            hasNameOfGroup={has_group_name}
            handleGroupNameStatus={handleGroupNameStatus}
            handleReset={handleReset}
            handleAddQandA={handleAddQandA}
            handleSubmitGroup={handleSubmitGroup}
          />
        </View>
      </LinearGradient>
    </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  addQuizGroupContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15%',
    // marginBottom: '10%',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'red',
  },
});
