

const setUserInformation = () => {
    $('form').on("submit", (e) => {
        e.preventDefault();

        let userInformation = {
            email: $('#email').val(),
            userName: $("#email").val().split("@")[0]
        }

        if ($('#email').val() && $("#password").val() !== "") {
            localStorage.setItem('user', JSON.stringify(userInformation))
            window.location.href = "/index.html";
        }
    })
}

if(localStorage.getItem('user')){
    $(".new-occurance").removeClass("is-hidden")
}

setUserInformation();
