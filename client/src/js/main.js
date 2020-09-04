function hideAll() {
    $('section').hide();
}

function beforeLogin() {
    $('#auth-page').show();

    $('#form-signin').hide();

    $('#signin-from-signup').on('click', function (event) {
        $('#form-signup').fadeOut();
        $('#form-signup').hide();
        $('#form-signin').fadeIn();
        $('#form-signin').show();
    });

    $('#signup-from-signin').on('click', function (event) {
        $('#form-signin').fadeOut();
        $('#form-signin').hide();
        $('#form-signup').fadeIn();
        $('#form-signup').show();
    });
}

function afterLogin() {
    $('#dashboard').show();
}

function checkAccessToken() {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
        afterLogin();
    } else {
        beforeLogin();
    }
}

function formSignup(event) {
    event.preventDefault();
    const username = $('#form-signup input[name=username]').val();
    const email = $('#form-signup input[name=email]').val();
    const password = $('#form-signup input[name=password]').val();
    $.ajax({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: { username, email, password },
    })
        .done(result => {
            Swal.fire(
                'Success!',
                'Thanks for signing up, check your email',
                'success'
            )
            $('#form-signin').show();
            $('#form-signup').hide();
        })
        .fail(err => {
            Swal.fire(
                {
                    icon: 'error',
                    titleText: 'Validation error',
                    html: err.responseJSON.errors.join('<br/>')
                }
            );
            $('#form-signup').show();
        })
        .always(() => {
            $('#form-signup input[name=username]').val('');
            $('#form-signup input[name=email]').val('');
            $('#form-signup input[name=password]').val('');
        });
}

function formSignin(event) {
    event.preventDefault();
    const email = $('#form-signin input[name=email]').val();
    const password = $('#form-signin input[name=password]').val();
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: { email, password },
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token);
            $('#auth-page').fadeOut();
            $('#auth-page').hide();
            $('#dashboard').fadeIn();
            $('#dashboard').show();
        })
        .fail(err => {
            Swal.fire(
                'Invalid email or password!',
                'please check again',
                'error'
            )
            $('#form-signin').show();
        })
        .always(() => {
            $('#form-signin input[name=email]').val('');
            $('#form-signin input[name=password]').val('');
        });
}

function logout() {
    googleLogout();
    localStorage.clear();
    $('#dashboard').fadeOut();
    $('#dashboard').hide();
    $('#auth-page').fadeIn();
    $('#auth-page').show();
    $('#form-signin').show();
    $('#form-signup').hide();
}

function authHandler() {
    $('#form-signup').submit(formSignup);
    $('#form-signin').submit(formSignin);
    $('#logout').click(logout);
}

function googleLogin() {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '953795490728-7djc4p3fjk0haj34aciccss243qc3vau.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });

        attachSignin(document.getElementsByClassName('btn-google'));
    });

    function attachSignin(element) {
        auth2.attachClickHandler(element[0], {},
            function (googleUser) {
                $('.btn-google .name').text(`Signed in as: ${googleUser.getBasicProfile().getName()}`);
                $.ajax({
                    url: 'http://localhost:3000/googleLogin',
                    method: 'POST',
                    headers: { google_access_token: googleUser.getAuthResponse().id_token },
                })
                    .done(result => {
                        localStorage.setItem('access_token', result.access_token);
                        $('#auth-page').fadeOut();
                        $('#auth-page').hide();
                        $('#dashboard').fadeIn();
                        $('#dashboard').show();
                    })
                    .fail(err => {
                        Swal.fire(
                            'Invalid email or password!',
                            'please check again',
                            'error'
                        )
                        $('#form-signin').show();
                    })
                    .always(() => {
                        $('#form-signin input[name=email]').val('');
                        $('#form-signin input[name=password]').val('');
                    });
            }, function (error) { });
    }
}

function googleLogout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('.btn-google .name').text(`Sign in with google`);
    });
}

$(document).ready(function () {
    hideAll();

    checkAccessToken();

    authHandler();

    googleLogin();
});