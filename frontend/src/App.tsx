import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import About from "./components/AboutPage/About";
import Header from "./components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import { RedirectToSignIn } from "@clerk/clerk-react";
import DocScanner from "./components/DocScanner";
import Culprit from "./components/Culprit";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="y-scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin">
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header>
          <SignedOut>
            <Button variant="elegant" className="bg-gray-300">
              <SignInButton mode="modal" />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Header>
        <ScrollToTop/>
        <Routes>
          <Route path="/sign-in" element={<RedirectToSignIn redirectUrl="/"/>} />
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/doc" element={<DocScanner />} />
          <Route path="/culprit" element={<Culprit />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
    </div>
  );
}

export default App;
