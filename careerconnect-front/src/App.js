import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Chat from './components/Chat';
import Group from './components/GroupChat';
import SidebarLayout from './components/layout/SidebarLayout'
import MyChat from './components/mychat/MyChat.jsx'
import Community from './components/community/Community';
// import ChatRoom from './components/ChatRoom';
import './App.css';
import MyPage from './components/mypage/MyPage.jsx';

const App = () => {
  return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<SidebarLayout><Chat /></SidebarLayout>} />
            <Route path="/groupchat" element={<SidebarLayout><Group /></SidebarLayout>} />
            <Route path="/mychat" element={<SidebarLayout><MyChat /></SidebarLayout>} />
            <Route path="/mypage" element={<SidebarLayout><MyPage/></SidebarLayout>} />
            <Route path="/mypage" element={<SidebarLayout><Group/></SidebarLayout>} />
            <Route path="/community" element={<SidebarLayout><Community/></SidebarLayout>} />
            <Route path="/community/:jobCategory" element={<SidebarLayout><Community /></SidebarLayout>} />

            {/* <Route path="/chat/:roomId" element={<ChatRoom />} /> */}

          </Routes>
  );
};

export default App;

// import React from 'react';
// import Register from './test';

// function App() {
//     return (
//         <div>
//             <h1>Login Page</h1>
//             < Register/>
//         </div>
//     );
// }

// export default App;
