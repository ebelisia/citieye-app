$("form").on("submit", (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem('user'))
    let $user = usuario.userName;
    let $title = $("#title").val();
    let $place = $("#locale").val();
    let $address = $("#address").val();
    let $description = $("#description").val();
    let $category = $("#category").val();

    //Cria o objeto de categoria
    let categoryObject = {
        description: $category
    }

    let postObject = {
        author: $user,
        title: $title,
        profile_picture: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
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

