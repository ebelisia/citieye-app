

$("form").on("submit", (e) => {
    e.preventDefault();
    let $title = $("#title").val();
    let $place = $("#locale").val();
    let $address = $("#address").val();
    let $description = $("#description").val();


    const postObject = {
        author: "",
        title: $title,
        profile_picture: "",
        address: $address,
        place: $place,
        description: $description
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/posts",
        data: postObject,
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Ótimo.',
                text: 'Ocorrência cadastrada com sucesso!',
            })
            $("#title").val('');
            $("#locale").val('');
            $("#address").val('');
            $("#description").val('');
        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Erro.",
                text: "Infelizmente não foi possível registrar a sua ocorrência"
            })
        }
    })
})