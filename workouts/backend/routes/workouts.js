const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const { updateMany } = require('../models/workoutModel')


const router = express.Router()

   // GET all workouts
    router.get('/',getWorkouts)
     

    //GET a single workouts
    router.get('/:id',getWorkout)
     
    //POST a new workput
    router.post('/',createWorkout)
       
     //DELETE a new workput
    router.delete('/:id',deleteWorkout)
    
     //UPDATE a new weorkput
    router.patch('/:id',updateWorkout)
     
        module.exports = router