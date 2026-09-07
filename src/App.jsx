import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import GunList from "./components/GunList";
import HomePage from "./components/HomePage";
import MetaList from "./components/MetaList";
import LoginPage from "./components/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import SplashCursor from "./components/SplashCursor";
import Footer from "./components/Footer";

function App() {
  const [showList, setShowList] = useState(false);
  const [showGuns, setShowGuns] = useState(true);
  const [showMetaList, setShowMetaList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <SplashCursor />
      <div className="flex justify-center items-center h-full">
        <Navbar
          setShowList={setShowList}
          showList={showList}
          setShowMetaList={setShowMetaList}
          showMetaList={showMetaList}
          setShowLogin={setShowLogin}
          showForm={showForm}
          setShowForm={setShowForm}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        {showLogin && (
          <LoginPage
            setIsLoggedIn={setIsLoggedIn}
            setShowList={setShowList}
            setShowLogin={setShowLogin}
          />
        )}
        {!showList && (
          <HomePage
            showList={showList}
            setShowList={setShowList}
            showGuns={showGuns}
            setShowGuns={setShowGuns}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {showForm && <UploadForm />}
        {showList && !showMetaList && (
          <GunList
            setShowList={setShowList}
            showList={showList}
            setShowGuns={setShowGuns}
            showGuns={showGuns}
            selectedCategory={selectedCategory}
            isLoggedIn={isLoggedIn}
          />
        )}
        {showMetaList && (
          <MetaList
            setShowMetaList={setShowMetaList}
            setShowList={setShowList}
            isLoggedIn={isLoggedIn}
          />
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
