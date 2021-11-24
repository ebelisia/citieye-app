$("form").on("submit", (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem('user'))
    // let $user = usuario.userName;
    let $title = $("#title").val();
    let $name = $("#name").val();
    let $surname = $("#surname").val();
    let $local = $("#locale").val();
    let $address = $("#address").val();
    let $description = $("#description").val();
    let $category = $("#category :selected").data("id");
    let $city = $("#city :selected").data("id");

    //Cria o objeto de categoria
    let categoryObject = {
        id: $category
    }

    let cityObject = {
        id: $city
    }

    let userObject = {
        name: $name,
        surname: $surname
    }

    let postObject = {
        title: $title,
        user: userObject,
        // profile_picture: "https://www.shareicon.net/data/512x512/2017/04/19/884537_blue_512x512.png",
        address: $address,
        local: $local,
        category: categoryObject,
        description: $description,
        city: cityObject
    }

    $.ajax({
        type: "POST",
        // url: "https://citieye.herokuapp.com/occurrences?userId=1",
        url: "http://localhost:5000/occurrences",
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
let cityList = $("#city");

$.ajax({
    // url: "https://citieye.herokuapp.com/categories",
    url: "http://localhost:5000/categories",
    method: "GET",
    header: {
        "Content-Type": "application/json"
    },
    success: function (response) {
        response.forEach(item => {
            categoryList.append(`<option value="${item.name}" data-id="${item.id}">${item.name}</option>`)
        })
    }
})

$.ajax({
    // url: "https://citieye.herokuapp.com/cities",
    url: "http://localhost:5000/cities",
    method: "GET",
    header: {
        "Content-Type": "application/json"
    },
    success: function (response) {
        response.forEach(item => {
            cityList.append(`<option value="${item.name}" data-id="${item.id}">${item.name}</option>`)
        })
    }
})

