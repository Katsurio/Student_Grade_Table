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
var inputIds;
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked() {
    $('.btn-success').click(function() {
        console.log('addClicked works');
        var name = inputIds.name.val();
        var course = inputIds.course.val();
        var grade = inputIds.grade.val();
        addStudent(name, course, grade);
        studentObj = {};
        clearAddStudentForm();
        updateData();
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
    inputIds.name.val('');
    inputIds.course.val('');
    inputIds.grade.val('');
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    console.log('calculateAverage function called');
    var gradesTotal = 0;
    for(var i = 0; i < student_array.length; i++) {
        gradesTotal += parseInt(student_array[i].grade);
    }
    var averageGrade = Math.round(gradesTotal / student_array.length);
    var number = $('.avgGrade').text(averageGrade);
    return number;
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    updateStudentList();
    calculateAverage();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    console.log("updateStudentList function called");
    $('.student-list.table > tbody').empty();
    for(var i = 0; i < student_array.length; i++) {
        addStudentToDom(student_array[i],i);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj,number) {
    $('tbody').append('<tr>');
    $('tbody tr:last').append($('<td>' + studentObj.name + '</td>'));
    $('tbody tr:last').append($('<td>' + studentObj.course + '</td>'));
    $('tbody tr:last').append($('<td>' + studentObj.grade + '</td>'));
    $('tbody tr:last').append($('<button>').addClass('btn btn-danger button-index'+number).text('Delete'));
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    student_array = [];
    clearAddStudentForm();
    $('tbody').empty();
    $('.avgGrade').text(0);

}
/**
 * removeStudent - delete button click handler that removes the deleted student's object from the DOM and from the student_array
 */
function removeStudent() {
    $('tbody').on('click', '.btn-danger', function(){
        var indexPosition = $(this).closest('tr').index();
        $(this).closest('tr').remove();
        student_array.splice(indexPosition,1);
    })
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    addClicked();
    cancelClicked();
    removeStudent();
    inputIds = {
        name: $("#studentName"),
        course: $("#course"),
        grade: $("#studentGrade")
    };
});