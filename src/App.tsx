import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { MainLayout } from './components/Layout/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { MembersPage } from './pages/members/MembersPage';
import { MemberFormPage } from './pages/members/MemberFormPage';
import { GroupsPage } from './pages/groups/GroupsPage';
import { GroupFormPage } from './pages/groups/GroupFormPage';
import { GroupMembersPage } from './pages/groups/GroupMembersPage';
import { ServicesPage } from './pages/services/ServicesPage';
import { ServiceFormPage } from './pages/services/ServiceFormPage';
import { CategoriesPage } from './pages/services/CategoriesPage';
import { CategoryFormPage } from './pages/services/CategoryFormPage';
import { PaymentsPage } from './pages/payments/PaymentsPage';
import { PaymentFormPage } from './pages/payments/PaymentFormPage';
import './i18n/config';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/members" replace />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="members/new" element={<MemberFormPage />} />
            <Route path="members/:id/edit" element={<MemberFormPage />} />
            
            <Route path="groups" element={<GroupsPage />} />
            <Route path="groups/new" element={<GroupFormPage />} />
            <Route path="groups/:id/edit" element={<GroupFormPage />} />
            <Route path="groups/:id/members" element={<GroupMembersPage />} />
            
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/new" element={<ServiceFormPage />} />
            <Route path="services/:id/edit" element={<ServiceFormPage />} />
            <Route path="services/categories" element={<CategoriesPage />} />
            <Route path="services/categories/new" element={<CategoryFormPage />} />
            <Route path="services/categories/:id/edit" element={<CategoryFormPage />} />
            
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="payments/new" element={<PaymentFormPage />} />
            <Route path="payments/:id/edit" element={<PaymentFormPage />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;