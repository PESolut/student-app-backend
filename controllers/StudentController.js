const express = require('express');
const data = require("../Data/StudentData.json")
const controller = express.Router();

const { students } = data

// GET ALL students
controller.get('/', (request, response) => {
    try {
        response.json(students)
    } catch (error){
        response.status(500).json ({ error : error.message })
    }
})

controller.get('/:student_id', (request, response) => {
    try {
      const { student_id } = request.params;

      console.log(request.query.start,request.query.end)
  
      // Check if the query parameters exist
      if (request.query.start && request.query.end) {
        const start = parseInt(request.query.start);
        const end = parseInt(request.query.end);

        console.log(start,end)
  
        // Check if start and end are valid numbers
        if (isNaN(start) || isNaN(end)) {
          throw { message: 'Start and end must be valid numbers!', status: 'error' };
        }
  
        // Filter students within the specified range
        const studentsInRange = students.filter(student => {
          const studentId = parseInt(student.id);
          return studentId >= start && studentId <= end;
        });
  
        // Return the filtered students
        response.json(studentsInRange);
      } else {
        // If no query parameters are provided, find the student by ID
        if (!/[0-9]/g.test(student_id)) {
          throw { message: 'The ID in the parameter (url) must be a number!', status: 'error' };
        }
  
        const student = students.find(student => student.id === student_id);
  
        if (!student) {
          throw { message: 'The ID that was input was not found for any students!', status: 'error' };
        }
  
        response.json(student);
      }
    } catch (error) {
      response.status(500).send(error);
    }
  });
  

// Todo
// GET ONE student by ID
// if id is not a number send ar esponse with status 500 telling the user the id must be a number
// if it is a number but there is no student with that id, tell the suer and set the status to 500


// HOMEWORK : so if u typed ?start&end you can use those parameters and get 5 at a time or whatever input range of numbers
// get all students 5 at a time

module.exports = controller