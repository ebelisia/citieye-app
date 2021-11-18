if(localStorage.getItem('user').length){
    $(".new-occurance").removeClass("is-hidden")
    $(".sign-up").addClass("is-hidden");
    $(".login-btn a").text("Sair")
    $(".login-btn").removeClass("login-btn")
    $("ul").children().last().addClass("logout-btn")
}

$(".logout-btn a").on("click", () => {
    localStorage.removeItem('user')
    $(this).attr("href", "/index.html")
})