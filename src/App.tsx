import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExamSelection from './pages/ExamSelection';
import PracticeTest from './pages/PracticeTest';
import AdminDashboard from './pages/admin/AdminDashboard';
import Achievements from './pages/Achievements';
import TestConnection from './pages/TestConnection';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/test" element={<TestConnection />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exams" element={<ExamSelection />} />
          <Route path="/practice/:examId/:subjectId" element={<PracticeTest />} />
          <Route path="/achievements" element={<Achievements />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App; 