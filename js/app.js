// reload 1 time
(function () {
    if (window.localStorage) {
        if (!localStorage.getItem('firstLoad')) {
            localStorage['firstLoad'] = true;
            window.location.reload();
        } else localStorage.removeItem('firstLoad');
    }
})();

// preloader
$(document).ready(function () {
    setTimeout(function () {
        $('body').addClass('loaded');
        $('h1').css('color', '#222222')
    }, 200);
});

// disable EDITABLE at the beginning
$(window).load(function () {
    $('#table-hover .editable').editable('disable');
    $('#datetimepicker1').datetimepicker(); // enable datepicker
    $("#sortable").sortable(); // enable sorting
    $("#sortable").sortable("disable"); // disable sorting
});

//  change class search
$(document).ready(function () {
    $("table-hover button").addClass('btn-lg btn-info');
    $('.search').addClass('form-group-lg');
    $("#deleteButton").hide(); // hide delete button
});

// switcher click
var state = false;


// delete row
$(function () {
    $('#deleteConfirm').click(function () {
        var ids = $.map($('#table-hover').bootstrapTable('getSelections'), function (row) {
            return row.id;
        });
        $('#table-hover').bootstrapTable('remove', {
            field: 'id',
            values: ids
        });
    });
});

//sending form

$(function () {
    $('form').bind('submit', function () {
        $.ajax({
            type: 'get',
            url: 'adding.php',
            data: $('form').serialize(),
            success: function () {
                $("#addingForm").modal('hide');
            }
        });
        return false;
    });
});

// For validating form

var n = nod();

// We disable the submit button if there are errors.
n.configure({
    submit: '#send',
    disableSubmit: true
});

n.add([{
    selector: '#customer',
    validate: 'presence',
    errorMessage: 'It is empty.'
}, {
    selector: '#material',
    validate: 'presence',
    errorMessage: 'It is empty.'
}, {
    selector: '#work_name',
    validate: 'presence',
    errorMessage: 'It is empty.'
}, {
    selector: '#patch_time',
    validate: 'presence'
}, {
    selector: '#quantity',
    validate: 'presence',
    errorMessage: 'It is empty.'
}, {
    selector: '#output_package',
    validate: 'presence',
    errorMessage: 'It is empty.'
}]);


$(function () {
    $('#switcher').click(function () {
        var json_update = {
            json_update: JSON.stringify($('#table-hover').bootstrapTable('getData'))
        };
        $.ajax({
            type: "POST",
            url: "adding2.php",
            data: json_update,
            dataType: "json",
            success: function (data) {
                alert("success");
            }
        });
    });
});
var sta = false;
switcher.onclick = function () {
    sta = !sta;
    $("#deleteButton").toggle();
    $(this).toggleClass("editing"); // change color button
    $('#table-hover .editable').editable('toggleDisabled'); // toggle enable/disable EDITABLE
    state = !state; // toggle enable/disable SORTABLE
    if (state == true) {
        $("#sortable").sortable("enable");
    } else {
        $("#sortable").sortable("disable");
    }
};


$(document).on('click', 'button[name="toggle"]', function () {
    if (sta) {
        $('#table-hover .editable').editable('enable');
    } else {

        $('#table-hover .editable').editable('disable');
    }
});