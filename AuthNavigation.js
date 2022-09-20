import React, { useState, useEffect } from 'react';
import { firebase } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/actions';
import { SignedInStack, SignedOutStack } from './screens/Navigation';

const AuthNavigation = () => {
  const { current_user } = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  const [localUser, setLocalUser] = useState(null);

  const userHandler = (user) =>
    user ? setLocalUser(user) : setLocalUser(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => userHandler(user));
  }, []);

  // console.log('current_user', current_user);

  return (
    <>
      {localUser ? (
        <SignedInStack currentUser={localUser} />
      ) : (
        <SignedOutStack />
      )}
    </>
  );
};

export default AuthNavigation;
