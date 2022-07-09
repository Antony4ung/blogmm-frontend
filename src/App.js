import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./navigation/ProtectedRoute";
import Page404 from "./pages/404";
import BlogCreate from "./pages/BlogCreate";
import BlogDetail from "./pages/BlogDetail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserProfile from './pages/UserProfile'
export default function App() {


  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/:blogId" element={<BlogDetail/>}/>
        <Route path="/user/:userId" element={<UserProfile/>}/>

        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<BlogCreate />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AppLayout>
  );
}
