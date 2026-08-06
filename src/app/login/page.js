"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/frontend/validations/authSchema";
import { useAuth } from "@/frontend/hooks/useAuth";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, Utensils } from "lucide-react";

function LoginForm() {
  const { login: loginAuth, isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const redirect = searchParams.get("redirect");
      if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
        router.replace(redirect);
      } else {
        router.replace(user?.role === "admin" ? "/admin" : "/");
      }
    }
  }, [isAuthenticated, authLoading, router, searchParams, user]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await loginAuth({
        email: data.email,
        password: data.password,
      });
      if (res.success) {
        toast.success("Welcome back!");
      }
    } catch (error) {
      if (error.errors) {
        Object.values(error.errors).forEach(err => toast.error(err));
      } else {
        toast.error(error.message || "Invalid credentials");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <Loader2 className="w-10 h-10 animate-spin text-brand-yellow" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-brand-cream font-sans selection:bg-brand-yellow selection:text-brand-charcoal">
      {/* Left Panel - Fast Food Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 shadow-2xl z-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/80 to-brand-charcoal/40 backdrop-contrast-125"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 text-brand-cream hover:text-brand-yellow transition-colors">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img src="/ChatGPT%20Image%20Aug%203,%202026,%2012_19_52%20PM.png" alt="The Tasty Zone Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-3xl tracking-wide">The Tasty Zone</span>
          </Link>
        </div>

        <div className="relative z-10 text-white max-w-lg mb-8">
          <p className="text-brand-yellow text-sm uppercase tracking-widest font-bold mb-3">Welcome Back</p>
          <h1 className="text-5xl font-extrabold mb-6 leading-[1.15] text-white">Your favorite food awaits.</h1>
          <p className="text-lg text-gray-200 font-medium leading-relaxed mb-10">
            Sign in to reorder your usuals, explore our delicious menu, and enjoy fast takeaway and delivery.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-brand-cream relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-yellow/20 blur-3xl hidden md:block"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-red/10 blur-3xl hidden md:block"></div>

        <div className="mx-auto w-full max-w-md relative z-10">
          {/* Mobile Branding */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 justify-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
                <img src="/ChatGPT%20Image%20Aug%203,%202026,%2012_19_52%20PM.png" alt="The Tasty Zone Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-3xl text-brand-charcoal tracking-tight">The Tasty Zone</span>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-brand-charcoal mb-3">Sign in</h2>
            <p className="text-gray-600 font-medium">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="bg-white py-10 px-8 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100">
            <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-brand-charcoal mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="foodie@tastyzone.com"
                    className={`appearance-none block w-full pl-12 pr-4 py-3.5 border ${errors.email ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow focus:border-brand-yellow'} rounded-xl bg-gray-50 focus:bg-white text-brand-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm font-medium`}
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-brand-red font-medium flex items-center gap-1.5"><span className="text-xl leading-none">•</span> {errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-bold text-brand-charcoal">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`appearance-none block w-full pl-12 pr-12 py-3.5 border ${errors.password ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow focus:border-brand-yellow'} rounded-xl bg-gray-50 focus:bg-white text-brand-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm font-medium`}
                    {...register("password")}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-charcoal transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-brand-red font-medium flex items-center gap-1.5"><span className="text-xl leading-none">•</span> {errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-charcoal/10 text-sm font-bold text-white bg-brand-charcoal hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-charcoal disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm font-medium text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="font-bold text-brand-charcoal hover:text-brand-yellow transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-brand-yellow after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <Loader2 className="w-10 h-10 animate-spin text-brand-yellow" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
