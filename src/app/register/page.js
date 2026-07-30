"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/frontend/validations/authSchema";
import { useAuth } from "@/frontend/hooks/useAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff, Loader2, User, Mail, Lock, ArrowRight, Coffee } from "lucide-react";

export default function RegisterPage() {
  const { register: registerAuth, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, authLoading, router]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await registerAuth({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      if (res.success) {
        toast.success("Account created successfully! Please login.");
        router.push("/login");
      }
    } catch (error) {
      if (error.errors) {
        Object.values(error.errors).forEach(err => toast.error(err));
      } else {
        toast.error(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
        <Loader2 className="w-10 h-10 animate-spin text-[#8C5E45]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FAF6F0] font-sans selection:bg-[#8C5E45] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Left Panel - Cozy Cafe Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 shadow-2xl z-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16] via-[#2C1E16]/80 to-[#4A3B32]/40 backdrop-contrast-125"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 text-[#FDFBF7] hover:opacity-90 transition-opacity">
            <div className="p-2 bg-[#8C5E45]/40 backdrop-blur-md rounded-lg border border-[#8C5E45]/30">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="font-serif font-bold text-3xl tracking-wide">The Tasty Zone</span>
          </Link>
        </div>

        <div className="relative z-10 text-[#FDFBF7] max-w-lg mb-8">
          <p className="text-[#D4A373] text-sm uppercase tracking-widest font-semibold mb-3">Join The Club</p>
          <h1 className="font-serif text-5xl font-bold mb-6 leading-[1.15] text-white">Experience the craft.</h1>
          <p className="text-lg text-[#E6D5C3] font-light leading-relaxed mb-10">
            Create an account to order your favorite cafe meals, track your orders, and access exclusive member deals.
          </p>
          
          <div className="flex items-center gap-4 text-[#E6D5C3] bg-[#2C1E16]/40 p-4 rounded-2xl backdrop-blur-sm border border-[#8C5E45]/30">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-[#2C1E16]" src="https://i.pravatar.cc/100?img=1" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#2C1E16]" src="https://i.pravatar.cc/100?img=2" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#2C1E16]" src="https://i.pravatar.cc/100?img=3" alt="User" />
            </div>
            <p className="text-sm font-medium tracking-wide">Join 2,000+ coffee lovers</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-[#FAF6F0] relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#E6D5C3]/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#D4A373]/20 blur-3xl"></div>

        <div className="mx-auto w-full max-w-md relative z-10">
          {/* Mobile Branding */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 justify-center">
              <div className="p-2 bg-[#8C5E45] text-white rounded-lg shadow-md">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-3xl text-[#2C1E16]">The Tasty Zone</span>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl font-bold text-[#2C1E16] mb-3">Create account</h2>
            <p className="text-[#6B5A52]">
              Join the cafe community today!
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl py-8 px-8 shadow-2xl shadow-[#2C1E16]/5 rounded-3xl border border-[#E6D5C3]/50">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-semibold text-[#4A3B32] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#A39287]" />
                  </div>
                  <input
                    id="fullname"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    className={`appearance-none block w-full pl-12 pr-4 py-3 border ${errors.fullname ? 'border-red-300 focus:ring-red-500' : 'border-[#E6D5C3] focus:ring-[#8C5E45] focus:border-[#8C5E45]'} rounded-xl bg-[#FAF6F0]/50 focus:bg-white text-[#2C1E16] placeholder-[#A39287] focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm`}
                    {...register("fullname")}
                  />
                </div>
                {errors.fullname && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5"><span className="text-xl leading-none">•</span> {errors.fullname.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#4A3B32] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#A39287]" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`appearance-none block w-full pl-12 pr-4 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-[#E6D5C3] focus:ring-[#8C5E45] focus:border-[#8C5E45]'} rounded-xl bg-[#FAF6F0]/50 focus:bg-white text-[#2C1E16] placeholder-[#A39287] focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm`}
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5"><span className="text-xl leading-none">•</span> {errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#4A3B32] mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#A39287]" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={`appearance-none block w-full pl-12 pr-12 py-3 border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-[#E6D5C3] focus:ring-[#8C5E45] focus:border-[#8C5E45]'} rounded-xl bg-[#FAF6F0]/50 focus:bg-white text-[#2C1E16] placeholder-[#A39287] focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm`}
                    {...register("password")}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A39287] hover:text-[#4A3B32] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5"><span className="text-xl leading-none">•</span> {errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#4A3B32] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#A39287]" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={`appearance-none block w-full pl-12 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-[#E6D5C3] focus:ring-[#8C5E45] focus:border-[#8C5E45]'} rounded-xl bg-[#FAF6F0]/50 focus:bg-white text-[#2C1E16] placeholder-[#A39287] focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm`}
                    {...register("confirmPassword")}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A39287] hover:text-[#4A3B32] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5"><span className="text-xl leading-none">•</span> {errors.confirmPassword.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-[#8C5E45]/20 text-sm font-bold text-white bg-[#8C5E45] hover:bg-[#734A35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C5E45] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#E6D5C3]/50 text-center">
                <p className="text-sm text-[#6B5A52]">
                  Already have an account?{" "}
                  <Link href="/login" className="font-bold text-[#8C5E45] hover:text-[#5E3F2E] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#5E3F2E] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                    Sign in instead
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
