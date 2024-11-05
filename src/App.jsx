import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
  const [user] = useAuthState(auth);
  return <section>{user ? <Chat /> : <SignIn />}</section>;
}

function SignIn() {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    cookies.set("auth-token", result.user.refreshToken);
  };

  return (
    <>
      <button onClick={signInWithGoogle}>Google</button>
    </>
  );
}

function Chat() {
  return (
    <>
      <h1>Chat</h1>
    </>
  );
}

export default App;
