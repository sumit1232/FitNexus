import React from "react";
import { Link } from "react-router-dom";
import {
  Dumbbell,
  Users,
  CreditCard,
  Activity,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="w-full border-b bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Dumbbell className="text-white w-6 h-6" />
            </div>

            <h1 className="text-2xl font-bold tracking-wide">
              Fit<span className="text-indigo-600">Nexus</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-lg"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white to-purple-100"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              Modern Gym Management System
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Transform Your Gym Into a
              <span className="text-indigo-600"> Smart Fitness Hub</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Manage memberships, trainers, attendance, workout plans,
              subscriptions, and payments with one powerful dashboard.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-xl"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/login"
                className="px-7 py-4 rounded-2xl border border-gray-300 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 font-semibold"
              >
                Explore Dashboard
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <h2 className="text-3xl font-bold text-indigo-600">500+</h2>
                <p className="text-gray-500">Gym Members</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-indigo-600">50+</h2>
                <p className="text-gray-500">Professional Trainers</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-indigo-600">24/7</h2>
                <p className="text-gray-500">Smart Access</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[40px] p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
                alt="Gym"
                className="rounded-3xl w-full h-[500px] object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-6 bg-white p-5 rounded-3xl shadow-2xl border w-64">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-2xl">
                  <Activity className="text-green-600" />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Daily Check-ins</h3>
                  <p className="text-gray-500">120+ Active Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features For Your Gym
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage members, trainers, subscriptions,
            attendance, and fitness activities efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="bg-indigo-100 w-fit p-4 rounded-2xl mb-5">
              <Users className="text-indigo-600 w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Member Management
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Easily manage gym members, profiles, subscriptions, and workout
              history.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="bg-purple-100 w-fit p-4 rounded-2xl mb-5">
              <CreditCard className="text-purple-600 w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Payment Tracking
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Track memberships, pending payments, invoices, and subscription
              renewals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="bg-pink-100 w-fit p-4 rounded-2xl mb-5">
              <CalendarCheck className="text-pink-600 w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Attendance System
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Smart attendance system with QR code check-ins and live member
              tracking.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="bg-green-100 w-fit p-4 rounded-2xl mb-5">
              <Dumbbell className="text-green-600 w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Workout Plans
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Create personalized workout and diet plans for members and
              trainers.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="bg-orange-100 w-fit p-4 rounded-2xl mb-5">
              <ShieldCheck className="text-orange-600 w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Secure Authentication
            </h3>

            <p className="text-gray-600 leading-relaxed">
              JWT authentication with OTP verification and secure access
              control.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="bg-blue-100 w-fit p-4 rounded-2xl mb-5">
              <Activity className="text-blue-600 w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Analytics Dashboard
            </h3>

            <p className="text-gray-600 leading-relaxed">
              View revenue reports, active memberships, trainer performance,
              and gym growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready To Build Your Smart Gym?
          </h2>

          <p className="text-indigo-100 text-lg mb-8">
            Start managing your fitness business professionally with FitNexus.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Create Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">
            Fit<span className="text-indigo-500">Nexus</span>
          </h2>

          <p>© 2026 FitNexus Gym Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;