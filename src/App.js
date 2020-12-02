import React from 'react';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import RecommendedVideos from "./components/RecommendedVideos";


function App() {
  return (
    <div className="App">
      <Header />

      <div className="content">
          <SideBar />
          <RecommendedVideos />
      </div>
    </div>
  );
}

export default App;
