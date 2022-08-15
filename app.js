const express = require("express");
const app = express();
const mongoose = require("./db/mongoose");
const myclass = require("./db/dbmodel/class");
const student = require("./db/dbmodel/student");
const parent = require("./db/dbmodel/parent");

app.use(express.json());

app.listen(3000, () => console.log("Listening on port 3000"));

app.get("/", (req, res) => {
    res.end("Hello world");
});

//-------------------------CLASS-----------------------

const BASE_CLASS_URL = "/myclass";
// Create a class
app.post(`${BASE_CLASS_URL}`, (req, res) => {
    new myclass({ name: req.body.name, section: req.body.section })
        .save()
        .then((myclass) => res.send(myclass))
        .catch((error) => console.log(error));
});

//get one student class
app.get(`${BASE_CLASS_URL}/:myclassId`, (req, res) => {
    myclass
        .findOne({ _id: req.params.myclassId })
        .then((myclass) => res.send(myclass))
        .catch((error) => console.log(error));
});

//Get all classes
app.get(`${BASE_CLASS_URL}`, (req, res) => {
    myclass
        .find({})
        .then((myclass) => res.send(myclass))
        .catch((error) => console.log(error));
});

//update student class
app.patch(`${BASE_CLASS_URL}/:myclassId`, (req, res) => {
    myclass
        .findOneAndUpdate({ _id: req.params.myclassId }, { $set: req.body })
        .then((myclass) => res.send(myclass))
        .catch((error) => console.log(error));
});

//delete class info
app.delete(`${BASE_CLASS_URL}/:myclassId`, (req, res) => {
    const deleteStudents = (myclass) => {
        student
            .deleteMany({ class: req.params.myclassId })
            .then(() => myclass)
            .catch((error) => console.log(error));
    };

    const deletedParents = (myclass) => {
        parent.deleteMany({
            class: req.params.myclassId
        }).then(() => myclass)
            .catch((error) => console.log(error));
    };

    myclass
        .findByIdAndDelete({ _id: req.params.myclassId })
        .then((myclass) => res.send(deleteStudents(myclass)))
        .catch((error) => console.log(error));
});

//------------------------STUDENTS---------------------------
const BASE_STUDENT_URl = `${BASE_CLASS_URL}/:myclassId/students`;

//Create a student in a class
app.post(`${BASE_STUDENT_URl}`, (req, res) => {
    new student({
        name: req.body.name,
        dob: req.body.dob,
        academicYear: req.body.academicYear,
        class: req.params.myclassId,
    })
        .save()
        .then((student) => res.send(student))
        .catch((error) => console.log(error));
});

//get all students from this classId
app.get(`${BASE_STUDENT_URl}`, (req, res) => {
    student
        .find({ class: req.params.myclassId })
        .then((student) => res.send(student))
        .catch((error) => console.log(error));
});

//get one student
app.get(`${BASE_STUDENT_URl}/:studentId`, (req, res) => {
    student
        .findOne({ class: req.params.myclassId, _id: req.params.studentId })
        .then((onestudent) => res.send(onestudent))
        .catch((error) => console.log(error));
});

//update student information

app.patch(`${BASE_STUDENT_URl}/:studentId`, (req, res) => {
    student
        .findOneAndUpdate(
            { class: req.params.myclassId, _id: req.params.studentId },
            { $set: req.body }
        )
        .then((student) => res.send(student))
        .catch((error) => console.log(error));
});

//delete student info
app.delete(`${BASE_STUDENT_URl}/:studentId`, (req, res) => {
    parent
        .deleteMany({ student: req.params.studentId })
        .then(() => parent)
        .catch((error) => console.log(error));

    student
        .findOneAndDelete({
            _id: req.params.studentId,
            class: req.params.myclassId,
        })
        .then((student) => res.send(student))
        .catch((error) => console.log(error));
});

//-------------------------------PARENT-----------------------
const BASE_PARENT_URL = `${BASE_STUDENT_URl}/:studentId/parent`;

//create a parent
app.post(`${BASE_PARENT_URL}`, (req, res) => {
    new parent({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        student: req.params.studentId,
        class: req.params.myclassId
    })
        .save()
        .then((parent) => res.send(parent))
        .catch((error) => console.log(error));
});

//create a student's parent
app.get(`${BASE_PARENT_URL}`, (req, res) => {
    parent
        .findOne({ student: req.params.studentId })
        .then((parent) => res.send(parent))
        .catch((error) => console.log(error));
});

//edit a student's parent details
app.patch(`${BASE_PARENT_URL}`, (req, res) => {
    parent
        .findOneAndUpdate({ student: req.params.studentId }, { $set: req.body })
        .then((parent) => res.send(parent))
        .catch((error) => console.log(error));
});

//delete a student's parent 
app.delete(`${BASE_PARENT_URL}/:parentId`, (req, res) => {
    parent
        .findOneAndDelete({
            _id: req.params.parentId,
            student: req.params.studentId,
            class: req.params.myclassId
        })
        .then((parent) => res.send(parent))
        .catch((error) => console.log(error));
});

//get all parents of a class
app.get(`${BASE_CLASS_URL}/:myclassId/parents`, (req, res) => {
    parent
        .find({ class: req.params.myclassId })
        .then((parent) => res.send(parent))
        .catch((error) => console.log(error));
});