//to show/hide add-student form
$('#add_student_container').click(() => {
    $('#add_student_form').toggle('slow', () => {
        if ($('#students-list').css('display') == "none")
            $('#students-list').css('display', 'inline');
        else
            $('#students-list').css('display', 'none');
    });
})


//to show or hide add interview form
$('#add_interview_container').click(() => {
    $('#add_interview_form').toggle('slow', () => {
        if ($('#interviews-list').css('display') == "none")
            $('#interviews-list').css('display', 'inline');
        else
            $('#interviews-list').css('display', 'none');
    });
})

//to show or hide add interview form
$('#signup').click(() => {
    $('#login-form').toggle('slow', () => {
        if ($('#signup-form').css('display') == "none")
            $('#signup-form').css('display', 'inline');
        else
            $('#signup-form').css('display', 'none');
    });
})

$('#login').click(() => {
    $('#signup-form').toggle('slow', () => {
        if ($('#login-form').css('display') == "none")
            $('#login-form').css('display', 'inline');
        else
            $('#login-form').css('display', 'none');
    });
})

//to hide all dates before today's date
var today = new Date().toISOString().split('T')[0];
$("#inter_date").attr('min', today);


//to show list of students if user clicks to map student 
$('#showlist').click(() => {
    $('#students-interview-list').toggle('slow');
})

