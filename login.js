$(document).ready(() => {

    if(localStorage.getItem('login')){
        $(location).attr('href','./orders.html');
    }
    
    $('#login-hit').click((e) =>{
        e.preventDefault();
        if(($('#user-name').val() == $('#user-password').val()) && $('#user-name').val()){
            window.alert('Login Successfully');
            localStorage.setItem('login', $('#user-name').val())
            if(localStorage.getItem('login')){
                $(location).attr('href','./orders.html');
            }
        }else if(!($('#user-name').val() == $('#user-password').val())){
            window.alert('Please Enter Valid Credential')
        }
    });


})

