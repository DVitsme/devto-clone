import { useContext, useState, useEffect, useCallback } from 'react';
import { UserAddIcon } from '@heroicons/react/outline';
import debounce from 'lodash.debounce';

import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import UserContext from '../context/userContext';

export default function Enter() {
  const { user, username } = useContext(UserContext);

  return (
    <main className="container mx-auto">
      {user ? (
        !username ? (
          <UsernameForm user={user} />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton username={username} />
      )}
    </main>
  );
}

function SignInButton(params) {
  try {
    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider);
    };
    return (
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 flex items-center px-4 rounded"
      >
        <UserAddIcon className="h-10 w-auto mr-2" /> Sign In With Google
      </button>
    );
  } catch (err) {
    console.error('google auth error', err);
  }
}

const SignOutButton = () => {
  try {
    const signOut = async () => {
      await auth.signOut();
    };
    return (
      <button
        onClick={(signOut, console.log('I was clicked'))}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 flex items-center px-4 rounded"
      >
        <UserAddIcon className="h-10 w-auto mr-2" /> Sign Out
      </button>
    );
  } catch (err) {
    console.log('Error Signing Out:', err);
  }
};

function UsernameForm({ user, username }) {
  try {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);

    const onChange = (e) => {
      const val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      if (val.length < 3) {
        setFormValue(val);
        setLoading(false);
        setIsValid(false);
      }
      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };

    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );

    const onSubmit = async (e) => {
      try {
        e.preventDefault();

        // create a ref for compare
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        // Combine refs for single comparison - first value is the name second is the value
        const batch = firestore.batch();
        batch.set(userDoc, {
          username: formValue,
          photoURL: user.photoURL,
          displayName: user.displayName
        });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();
      } catch (err) {
        console.error('On Submit Error', err);
      }
    };
    return (
      !username && (
        <section>
          <h3>Choose a Username</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formValue}
              onChange={onChange}
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
            />
            <UsernameMessage
              username={username}
              isValid={isValid}
              loading={loading}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 flex items-center px-4 rounded"
              type="submit"
            >
              Save Username
            </button>
            <div>
              <h3>Debug State</h3>
              <p>Username: {formValue}</p>
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </form>
        </section>
      )
    );
  } catch (err) {
    console.error(err);
  }

  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Loading...</p>;
    } else if (isValid) {
      return <p className="text-green-400	">{username} is available</p>;
    } else if (username && !isValid) {
      return <p className="text-red-400	">That username is taken</p>;
    } else {
      return <p></p>;
    }
  }
}
