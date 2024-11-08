import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { FaRegPaperPlane } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";

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

function Chat() {
  return (
    <div className="bg-[#20232B] min-h-screen">
      <header className="bg-[#1F1F1F] text-white shadow-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <h1 className="text-xl font-semibold">Chat</h1>
          <button className="px-4 py-2 bg-lime-200 rounded-md text-black hover:bg-lime-300 transition-all duration-200">
            Sign Out
          </button>
        </nav>
      </header>
      <main className="p-4">
        <div className="w-full max-w-lg mx-auto mt-6">
          <div className="flex items-center mb-4 text-white space-x-3">
            <MdAccountCircle size={48} />
            <div>
              <h1 className="text-lg font-medium">UserName</h1>
              <h2 className="text-sm text-gray-400">Data</h2>
            </div>
          </div>
          <div className="bg-[#B785F6] text-white rounded-xl p-5 max-w-[500px] shadow-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </div>
        </div>
      </main>
      <form className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Type something..."
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
