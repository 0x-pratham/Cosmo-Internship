import { Routes, Route } from "react-router-dom"

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { AuthProvider } from "@/context/AuthContext"
import AdminHub from "@/pages/AdminHub" 
import Dashboard from "@/pages/Dashboard" 
import Login from "@/pages/Login"
import VerifyDocument from "@/pages/VerifyDocument"
import CertificateDashboard from "@/pages/CertificateDashboard"
import OnboardingDashboard from "@/pages/OnboardingDashboard"
import Welcome from "@/pages/Welcome" 

// 1. Yaha naya GenXCode Dashboard import karo
import GenXCodeDashboard from "@/pages/GenXCodeDashboard" 

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminHub />
            </ProtectedRoute>
          }
        />

        <Route
          path="/offer-letters"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/onboarding-pass"
          element={
            <ProtectedRoute>
              <OnboardingDashboard />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/certificates" 
          element={
            <ProtectedRoute>
              <CertificateDashboard />
            </ProtectedRoute>
          } 
        />

        {/* 2. Yaha naya GenXCode Route add kiya hai */}
        <Route 
          path="/genxcode-certificates" 
          element={
            <ProtectedRoute>
              <GenXCodeDashboard />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/verify/*"
          element={<VerifyDocument />}
        />

        <Route 
          path="/welcome/:verificationToken" 
          element={<Welcome />} 
        />
      </Routes>
    </AuthProvider>
  )
}