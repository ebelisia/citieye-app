$("form").on("submit", (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem('user'))
    let $user = usuario.userName;
    let $title = $("#title").val();
    let $place = $("#locale").val();
    let $address = $("#address").val();
    let $description = $("#description").val();
    let $category = $("#category :selected").data("id");

    //Cria o objeto de categoria
    let categoryObject = {
        id: $category
    }

    let postObject = {
        author: $user,
        title: $title,
        profile_picture: "https://www.shareicon.net/data/512x512/2017/04/19/884537_blue_512x512.png",
        address: $address,
        place: $place,
        category: categoryObject,
        description: $description
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/occurrences",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(postObject),
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
        error: function () {
            Swal.fire({
                icon: "error",
                title: "Erro.",
                text: "Infelizmente não foi possível registrar a sua ocorrência"
            })
        }
    })
})


let categoryList = $("#category");

$.ajax({
    url: "http://localhost:8080/categories",
    method: "GET",
    header: {
        "Content-Type": "application/json"
    },
    success: function (response) {
        response.forEach(item => {
            categoryList.append(`<option value="${item.description}" data-id="${item.id}">${item.description}</option>`)
        })
    }
})

