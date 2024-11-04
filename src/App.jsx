import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./pages/auth/login";
import { AdminLayout } from "./pages/admin/admin-layout";
import { SuperAdminLayout } from "./pages/super-admin/super-admin-layout";
import { AdminCreate } from "./pages/super-admin/admin-create";
import { AdminChange } from "./pages/super-admin/admin-change";
import { AdminDetailPage } from "./pages/super-admin/users-detail-page";
import { Profile } from "./pages/profile/profile";
import { ProfileEditPage } from "./pages/profile/update-profile";
import { ProtectedRoute } from "./pages/auth/protected";
import { NotFoundPage } from "./pages/404/404";
import { Categories } from "./pages/categories/categories";
import { CreateCategory } from "./pages/categories/create-category";
import { CategoryDetailPage } from "./pages/categories/category-detail";
import EditCategory from "./pages/categories/update-category";
import { Authors } from "./pages/authors/authors";
import { CreateAuthors } from "./pages/authors/create-authors";
import EditAuthors from "./pages/authors/update-authors";
import { AuthorsDetailPage } from "./pages/authors/authors-detail";
import { Cities } from "./pages/cities/cities";
import { CreateCities } from "./pages/cities/create-cities";
import { EditCities } from "./pages/cities/update-cities";
import { CitiesDetail } from "./pages/cities/cities-detail";
import { CreateDistrict } from "./pages/districts/create-district";
import { UpdateDistrict } from "./pages/districts/update-district";
import { Languages } from "./pages/languages/languages";
import { EditLanguages } from "./pages/languages/update-languages";
import { CreateLanguages } from "./pages/languages/create-languages";
import { Publishers } from "./pages/publishers/publishers";
import { PublisherDetail } from "./pages/publishers/publishers-detail";
import { Books } from "./pages/books/Books";
import { BookDetail } from "./pages/books/book-detail";
import { AllUsers } from "./pages/super-admin/all-users";

import { Vacancies } from "./pages/vacancies/vacancies";
import { VacanciesDetail } from "./pages/vacancies/vacancies-detail";
import { ChangePassword } from "./pages/profile/edit-password";
import { SendSmsCode } from "./pages/auth/sendSMS";
import { ResetPasswordByEmail } from "./pages/auth/resetByEmail";
import { ResetPasswordByPhone } from "./pages/auth/resetByPhone";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<SendSmsCode />} />
        <Route path="/reset-password-by-email" element={<ResetPasswordByEmail />} />
        <Route path="/reset-password-by-phone" element={<ResetPasswordByPhone />} />

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<ProfileEditPage />} />
            <Route path="update-password" element={<ChangePassword />} />
            <Route path="categories" element={<Categories />} />
            <Route path="create-categories" element={<CreateCategory />} />
            <Route path="categories-update/:id" element={<EditCategory />} />
            <Route
              path="categories-detail/:id"
              element={<CategoryDetailPage />}
            />
            <Route path="authors" element={<Authors />} />
            <Route path="create-authors" element={<CreateAuthors />} />
            <Route path="authors-update/:id" element={<EditAuthors />} />
            <Route path="authors-detail/:id" element={<AuthorsDetailPage />} />
            <Route path="cities" element={<Cities />} />
            <Route path="create-cities" element={<CreateCities />} />
            <Route path="cities-update/:id" element={<EditCities />} />
            <Route path="cities-detail/:id" element={<CitiesDetail />} />
            <Route path="create-district/:id" element={<CreateDistrict />} />
            <Route path="update-district/:id" element={<UpdateDistrict />} />

            <Route path="languages" element={<Languages />} />
            <Route path="create-languages" element={<CreateLanguages />} />
            <Route path="languages-update/:id" element={<EditLanguages />} />

            <Route path="publishers" element={<Publishers />} />
            <Route path="publishers-detail/:id" element={<PublisherDetail />} />

            <Route path="books" element={<Books />} />
            <Route path="books-detail/:id" element={<BookDetail />} />

            <Route path="vacancies" element={<Vacancies />} />
            <Route path="vacancies-detail/:id" element={<VacanciesDetail />} />
          </Route>
        </Route>

        {/* Super-admin routes */}
        <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route path="admin-create" element={<AdminCreate />} />
            <Route path="admin-change" element={<AdminChange />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="detail-page/:id" element={<AdminDetailPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<ProfileEditPage />} />
            <Route path="update-password" element={<ChangePassword />} />

            <Route path="categories" element={<Categories />} />
            <Route path="create-categories" element={<CreateCategory />} />
            <Route path="categories-update/:id" element={<EditCategory />} />
            <Route
              path="categories-detail/:id"
              element={<CategoryDetailPage />}
            />
            <Route path="authors" element={<Authors />} />
            <Route path="create-authors" element={<CreateAuthors />} />
            <Route path="authors-update/:id" element={<EditAuthors />} />
            <Route path="authors-detail/:id" element={<AuthorsDetailPage />} />
            <Route path="cities" element={<Cities />} />
            <Route path="create-cities" element={<CreateCities />} />
            <Route path="cities-update/:id" element={<EditCities />} />
            <Route path="cities-detail/:id" element={<CitiesDetail />} />
            <Route path="create-district/:id" element={<CreateDistrict />} />
            <Route path="update-district/:id" element={<UpdateDistrict />} />

            <Route path="languages" element={<Languages />} />
            <Route path="create-languages" element={<CreateLanguages />} />
            <Route path="languages-update/:id" element={<EditLanguages />} />

            <Route path="publishers" element={<Publishers />} />
            <Route path="publishers-detail/:id" element={<PublisherDetail />} />

            <Route path="books" element={<Books />} />
            <Route path="books-detail/:id" element={<BookDetail />} />

            <Route path="vacancies" element={<Vacancies />} />
            <Route path="vacancies-detail/:id" element={<VacanciesDetail />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
