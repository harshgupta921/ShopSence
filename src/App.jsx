import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetail"));
const CartPage = lazy(() => import("./pages/CartPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const ContactPage = lazy(()=> import("./Pages/ContactPage"));
const ProfilePage = lazy(()=> import ("./Pages/ProfilePage"));
const CheckoutPage = lazy(()=> import ("./Pages/CheckoutPage"));
const ShopComponent = lazy(()=> import ("./components/Shop"));
// ✅ ProtectedRoute component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();


  const noHeaderRoutes = ["/login", "/register"];
  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {hideHeader ? (
          
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        ) : (
          <MainLayout>
            <Routes>
              {/* 🟢 Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/contact" element= {<ContactPage/>}/>
              <Route path="/profile" element= {<ProfilePage/>}/>
              <Route path="/checkout" element= {<CheckoutPage/>}/>
              <Route path="/shop" element= {<ShopComponent/>}/>
              
              

              {/* 🔒 Protected Route (Cart) */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />

              {/* ❌ 404 Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        )}
      </Suspense>

      {/* ✅ Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
