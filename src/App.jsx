import { auth, provider, db } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

import { FaRegPaperPlane } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";

import Cookies from "universal-cookie";
import { useState, useEffect } from "react";

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
    <div className="flex items-center justify-center min-h-screen bg-[#262626]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-sm">
        <h2 className="text-2xl text-[#262626] mb-8 font-semibold">Sign In</h2>
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center w-full py-3 bg-[#34a853] text-white font-semibold rounded-lg hover:bg-[#2e9c4d] transition-all duration-200 space-x-2"
        >
          <FaGoogle className="text-lg" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="px-4 py-2 bg-lime-200 rounded-md text-black hover:bg-lime-300 transition-all duration-200"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}

function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chat"), (snapshot) => {
      const chatMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(chatMessages);
    });
    return () => unsubscribe();
  }, []);

  const addMessage = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(collection(db, "chat"), {
      text: newMessage,
      userName: auth.currentUser.displayName,
    });
    setNewMessage("");
    setMessages([]);
  };

  return (
    <div className="bg-[#20232B] h-screen flex flex-col">
      <header className="bg-[#1F1F1F] text-white shadow-md w-full fixed">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <h1 className="text-xl font-semibold">Chat</h1>
          <SignOut />
        </nav>
      </header>

      <main className="flex-1 overflow-y-scroll  my-[10vh] p-8 mt-16 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="w-full max-w-lg mx-auto">
            <div className="flex items-center mb-2 text-white space-x-3">
              <MdAccountCircle size={48} />
              <h1 className="text-lg font-medium">{message.userName}</h1>
            </div>
            <div className="bg-[#B785F6] text-white rounded-xl p-4 shadow-lg">
              {message.text}
            </div>
          </div>
        ))}
      </main>

      <form
        onSubmit={addMessage}
        className="bg-[#20232B] p-4 w-full max-w-lg mx-auto fixed bottom-0 left-1/2 transform -translate-x-1/2"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Type something..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-[#15171C] w-full h-12 rounded-2xl border-0 py-1.5 px-5 pr-16 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-200"
          />
          <button className="absolute inset-y-1 right-5 flex items-center justify-center w-10 h-10 bg-lime-200 text-[#262626] rounded-2xl hover:bg-[#c9e89d] transition-all duration-200">
            <FaRegPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
