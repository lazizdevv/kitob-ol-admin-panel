import { useForm } from "react-hook-form";
import { useLogin } from "./uselogin";
import { useNavigate } from "react-router-dom";
import { saveState } from "../../config/stroge";

export const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { mutate } = useLogin();
  const navigate = useNavigate();

  const submit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log(res);

        // Save tokens and role
        saveState("user", {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          role: res.role,
        });

        // Role-based navigation
        if (res.role === "admin") {
          navigate("/admin");
        } else if (res.role === "superadmin") {
          navigate("/super-admin");
        } else {
          navigate("/"); // Default route
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formState.errors.email
                  ? "border-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
            {formState.errors.email && (
              <p className="text-red-500 text-sm">
                {formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formState.errors.password
                  ? "border-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            {formState.errors.password && (
              <p className="text-red-500 text-sm">
                {formState.errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
