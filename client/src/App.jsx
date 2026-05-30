import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OTP_verify from './pages/OTP_verify';
import Members from './components/Member/Members';
import Trainers from './components/Trainer/Trainers';
import AddMembers from './components/Member/AddMembers';
import EditMembers from './components/Member/EditMembers';
import ViewMember from './components/Member/ViewMember';
import Profile from './components/Profile';
import AddTrainers from './components/Trainer/AddTrainers';
import ViewTrainers from './components/Trainer/ViewTrainers';
import EditTrainers from './components/Trainer/EditTrainers';
import Plans from './components/Plans/Plans';
import AddPlans from './components/Plans/AddPlans';
import Workouts from './components/Workout/Workouts';
import AddWorkout from './components/Workout/AddWorkout';
import Payment from './components/Payment/Payment';
import AddPayment from './components/Payment/AddPayment';
import Setting from './pages/Setting';
import Attendance from './components/Attendance';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/otp-verify' element={<OTP_verify/>} />
        <Route path='/profile' element={<Profile/>} />
        

        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/members' element={<Members/>} />
        <Route path='/addmembers' element={<AddMembers/>} />
        <Route path="/viewmembers/:id" element={<ViewMember />} />
        <Route path="/editmembers/:id" element={<EditMembers />} />


        

        <Route path='/trainers' element={<Trainers/>} />
        <Route path='/addtrainers' element={<AddTrainers/>} />
        <Route path='/viewtrainers/:id' element={<ViewTrainers/>} />
        <Route path='/edittrainers/:id' element={<EditTrainers/>} />


        <Route path='/plans' element={<Plans/>} />
        <Route path='/addplans' element={<AddPlans/>} />


        <Route path='/workouts' element={<Workouts/>} />
        <Route path='/addworkouts' element={<AddWorkout/>} />

        <Route path='/payments' element={<Payment/>} />
        <Route path='/addpayment' element={<AddPayment/>} />
        <Route path='/settings' element={<Setting/>} />

        <Route path='/attendance' element={<Attendance/>} />








        


        
        

      </Routes>
    </Router>
    </>
  )
}

export default App