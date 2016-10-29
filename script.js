/**
 * Define all global variables here
 */
var studentObj = {};
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
var globalStudentDataArray = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds;
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked() {
    $('.btn-success').click(function () {
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
    $('.btn-default').click(function () {
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
    for (var i = 0; i < student_array.length; i++) {
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
    var globalData = 1; //set globalData var equal to the id of the object at index 0 of globalStudentDataArray
    for (var i = 0; i < student_array.length; globalData++, i++) {
        addStudentToDom(globalStudentDataArray[i], i);
        addStudentToDom(student_array[i], i + globalStudentDataArray.length);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 * @param number
 */
function addStudentToDom(studentObj, number) {                               //function that adds student to DOM with 2 params: studentObj and number
    $('tbody').append('<tr>');                                              //creates and appends rows to table body
    $('tbody tr:last').append($('<td>' + studentObj.name + '</td>'));       //creates and appends name to table data
    $('tbody tr:last').append($('<td>' + studentObj.course + '</td>'));     //creates and appends course to table data
    $('tbody tr:last').append($('<td>' + studentObj.grade + '</td>'));      //creates and appends grade to table data
    $('tbody tr:last').append($('<button>').addClass('btn btn-danger button-index' + number).text('Delete')); //creates and appends grade to table data
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
 * removeStudent - Event handler that removes the deleted student's object from the DOM and from the student_array
 */
function removeStudent() {
    $('tbody').on('click', '.btn-danger', function () {
        var indexPosition = $(this).closest('tr').index();
        $(this).closest('tr').remove();
        student_array.splice(indexPosition, 1);
    })
}


// function addIdentifyingNumber() {
//     var identifyingNumber = 1;
//     for (; identifyingNumber < globalStudentDataArray.length; identifyingNumber++) {
//         globalStudentDataArray.push(response.data[0].attr('id', identifyingNumber));
//     }
// }
/**
 * getOverHereData - Event handler that gets data from the database using an AJAX call and pushes it into the globalStudentDataArray
 */
function getOverHereData() {
    console.log("getOverHereData function called");
    var data_object = {
        api_key: 'LrLCpNcjb5',
        name: 'Jef'
    };
    console.log('made it to ajax call');
    $.ajax({
        data: data_object,
        dataType: 'json',
        method: 'post',
        url: 'https://s-apis.learningfuze.com/sgt/get',
        success: function (response) {
            console.log('success of ajax call', response.data);
            // addIdentifyingNumber();
        }
    })
}

// function addShit() {
//     for(var i=0;i<KevinArray.length; i++) {
//         console.log("called");
//         NewKevinArray.push(KevinArray[i].course);
//         console.log(KevinArray[i][i].data[i].course);
//     }
// }
// console.log(addShit());
//
// KevinArray[0].data[0].course;
//
//
// NewKevinArray[0].data[0].course
    /**
     * applyClickHandlers - function to be called in the listen that applies all click handlers
     */
    function applyClickHandlers() {
        $('#get-over-here').click(getOverHereData);
        addClicked();
        cancelClicked();
        removeStudent();
        inputIds = {
            name: $("#studentName"),
            course: $("#course"),
            grade: $("#studentGrade")
        };
    }

    /**
     * Listen for the document to load and reset the data to the initial state
     */
    $(document).ready(applyClickHandlers());