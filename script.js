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
    var name = inputIds.name.val();
    var course = inputIds.course.val();
    var grade = inputIds.grade.val();
    if (name === "" ||
        course === "" ||
        grade === "") {
        updateData();
    }
    else {
        addStudent(name, course, grade);
        clearAddStudentForm();
        updateData();
    }
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked() {
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(theName, theCourse, theGrade) {
    studentObj = {
        name: theName,
        course: theCourse,
        grade: theGrade
    };
    var send_data_object = {
        api_key: 'LrLCpNcjb5',
        name: studentObj.name,
        course: studentObj.course,
        grade: studentObj.grade
    };
    $.ajax({
        data: send_data_object,
        dataType: 'json',
        method: 'post',
        url: 'https://s-apis.learningfuze.com/sgt/create',
        success: function (response) {
            studentObj.id = response.new_id;
            student_array.push(studentObj);
            updateData();
        },
        error: function (response) {
            console.log("Error, please try again.");
            reset();
        }
    });
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
    var number;
    var gradesTotal = 0;
    var averageGrade;
    if (student_array.length < 1) {
        number = $('.avgGrade').text("0");
        return number;
    } else {
        for (var i = 0; i < student_array.length; i++) {
            gradesTotal += parseInt(student_array[i].grade);
        }
        averageGrade = Math.round(gradesTotal / student_array.length);
        number = $('.avgGrade').text(averageGrade);
        return number;
    }
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
    $('.student-list.table > tbody').empty();
    var globalDataId = 1;                               //set globalData var equal to the id of the object at index 0 of globalStudentDataArray
    for (var i = 0; i < student_array.length; globalDataId++, i++) {
        addStudentToDom(student_array[i], globalDataId);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 * @param idNumber
 */
function addStudentToDom(studentObj, idNumber) {                               //function that adds student to DOM with 2 params: studentObj and number
    $('tbody').append('<tr>');                                              //creates and appends rows to table body
    $('tbody tr:last').append($('<td>' + studentObj.name + '</td>'));       //creates and appends name to table data
    $('tbody tr:last').append($('<td>' + studentObj.course + '</td>'));     //creates and appends course to table data
    $('tbody tr:last').append($('<td>' + studentObj.grade + '</td>'));      //creates and appends grade to table data
    $('tbody tr:last').append($('<td>'));                                    //creates and appends last table data to append the delete button
    $('tr td:last').append($('<button>').addClass('btn btn-danger button-index' + idNumber).attr('id', 'deleteButton').text('Delete')); //creates and appends delete button to table data
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
//TODO DO I EVEN NEED THIS ANYMORE???
function reset() {
    student_array = [];
    clearAddStudentForm();
    $('tbody').empty();
    $('.avgGrade').text(0);
    getOverHereData();
}
/**
 * removeStudent - Event handler that removes the deleted student's object from the DOM and from the student_array
 */
function removeStudent() {
    var indexPosition = $(this).closest('tr').index();
    $(this).closest('tr').remove();
    var send_data_object = {
        api_key: 'LrLCpNcjb5',
        student_id: student_array[indexPosition].id
    };
    $.ajax({
        data: send_data_object,
        dataType: 'json',
        method: 'post',
        url: 'https://s-apis.learningfuze.com/sgt/delete',
        success: function (response) {
            student_array.splice(indexPosition, 1);
            updateData();
        },
        error: function (response) {
            console.log("Error, please try again.");
            reset();
        }
    });
}
/**
 * getOverHereData - Event handler that gets data from the database using an AJAX call and pushes it into the globalStudentDataArray
 */
function getOverHereData() {
    var data_object = {
        api_key: 'LrLCpNcjb5'
    };
    $.ajax({
        data: data_object,
        dataType: 'json',
        method: 'post',
        url: 'https://s-apis.learningfuze.com/sgt/get',
        success: function (response) {
            student_array = student_array.concat(response.data);
            updateData();
        },
        error: function (response) {
            console.log("Error, please try again.");
            reset();
        }
    });
}
/**
* applyClickHandlers - function to be called in the listen that applies all click handlers
*/
function applyClickHandlers() {
    getOverHereData();
    $('#addButton').click(addClicked);
    $('#cancelButton').click(cancelClicked);
    $('tbody').on('click', '#deleteButton', removeStudent);
    inputIds = {
        name: $("#studentName"),
        course: $("#course"),
        grade: $("#studentGrade")
    };
}
/**
* Listen for the document to load and reset the data to the initial state
*/
$(document).ready(applyClickHandlers);