import React, { useEffect } from 'react';
import { firebase } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/actions';
import { SignedInStack, SignedOutStack } from './screens/Navigation';

const AuthNavigation = () => {
  const { current_user } = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();

  const userHandler = (user) =>
    user ? dispatch(setCurrentUser(user)) : setCurrentUser(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => userHandler(user));
  }, []);

  // console.log('current_user', current_user);

  return (
    <>
      {current_user ? (
        <SignedInStack currentUser={current_user} />
      ) : (
        <SignedOutStack />
      )}
    </>
  );
};

export default AuthNavigation;
