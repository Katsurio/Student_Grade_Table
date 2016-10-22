/**
 * Define all global variables here
 */
var studentObj = {};
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
// var inputIds = ['#studentName', '#course', '#studentGrade'];
var inputIds = [$('#studentName'), $('#course'), $('#studentGrade')];
var studentInputs;
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked() {
    $('.btn-success').click(function() {
        console.log('addClicked works');
        var name = inputIds[0].val();
        var course = inputIds[1].val();
        var grade = inputIds[2].val();
        addStudent(name, course, grade);
    });
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked() {
    $('.btn-default').click(function() {
        console.log('cancelClicked works');
        clearAddStudentForm();
    });
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(theName, theCourse, theGrade) {
    console.log("addStudent called");
    studentObj = {
        name: theName,
        course: theCourse,
        grade: theGrade
    };
    student_array.push(studentObj);
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {

}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    console.log('calculateAverage function called');
    var gradesTotal = null;
    for(var i = 0; i < student_array.length; i++) {
        gradesTotal += parseInt(student_array[i].grade.val());
    }
    var averageGrade = gradesTotal / student_array.length;
    return $('.avgGrade').text(averageGrade);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {

}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj) {

}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {

}
/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    addClicked();
    cancelClicked();
    studentInputs = {
        name: $("#studentName"),
        course: $("#course"),
        grade: $("#studentGrade")
    };
    calculateAverage();
});