//Requisitando os dados das postagens pela API
const invoincingAPI = () => {
    $.ajax({
        //Mudar para localhost:3000/posts caso for utilizar o json-server
        url: "https://citieye.herokuapp.com/occurrences/all",
        // url: "http://localhost:5000/occurrences/all",
        method: "GET",
        header: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            setTimeout(() => {
                $(".loading").remove();
                mountElements(response);
            }, 1500);

            if (!response.length) {
                return;
            }

            $(".no-posts").remove();
        },
        error: () => {
            $(".loading").remove();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Estamos com instabilidades, tente depois.'
            })
        }
    });
}

let cityList = $("#city");

const invoincingAPICity = () => {
    $.ajax({
        url: "https://citieye.herokuapp.com/cities",
        // url: "http://localhost:5000/cities",
        method: "GET",
        header: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            console.log(response)
            response.forEach(item => {
                cityList.append(`<option value="${item.name}" data-id="${item.id}">${item.name}</option>`)
            })
        }
    })
}

$(".findCity").on("click", function (e) {
    e.preventDefault();
    findByCity();
});

const findByCity = () => {

    let $city = $("#city :selected").data("id");

    console.log($city)

    $.ajax({
        url: "https://citieye.herokuapp.com//occurrences/city/" + $city,
        // url: "http://localhost:5000/occurrences/city/" + $city,
        method: "GET",
        header: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            setTimeout(() => {
                $(".posts").children().remove();
                mountElements(response);
            }, 1000);
            if (!response.length) {
                alert("N??o h?? ocorr??ncias a serem mostradas. Tente mais tarde.");
                return;
            }
            $(".no-posts").remove();
        }
    })
}

invoincingAPICity();
invoincingAPI();

// const mountDeleteButton = (user_local, owner_post) => {
//     if (user_local == owner_post) {
//         return `<button class="delete-post"></button>`
//     } else {
//         return "";
//     }
// }

//Montas os elementos em tela de acordo com os dados fornecidos pela API
const mountElements = (props) => {
    let $postsDiv = $(".posts");
    // var jsonUser = localStorage.getItem('user');
    // var userLocalStorage = "" || JSON.parse(jsonUser);
    props.forEach(item => {

        //Obtendo as informa????es vindas de "item" por meio de desestrutura????o
        const { id, user, title, local, address, description, category, city } = item;
        console.log(item);
        $postsDiv.append(`
            <article class="post" data-id="${id}">
            <button class="support"></button>
            <button class="share"></button>
                <div class="user-information">
                    <img src="https://portal.sistemavbs.com.br/img/user-icon.png" alt="foto de perfil">
                    <div>
                        <span class="name">${user !== "" ? user.name + " " + user.surname : "Usu??rio An??nimo"}</span>
                        <span class="live-in"> Categoria: ${category.name}</span>
                    </div>
                </div>

                <h3 class="occurrance-title">
                    ${title}
                </h3>
                <p class="place">Local: ${local}</p>
                <p class="city">Cidade: ${city.name}</p>
                <p class="place">Endere??o: ${address !== "" ? ` ${address}` : "N??o informado"}</p>
                <span>
                    ${description}
                </span>
            </article>
            `)
    })

    $(".delete-post").on("click", function () {
        let id = $(this).parent().data("id");

        Swal.fire({
            title: 'Voc?? tem certeza?',
            text: "Ao confirmar, esta ocorr??ncia ser?? deletada.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    // url: "http://localhost:5000/occurrences/" + id,
                    url: "https://citieye.herokuapp.com/occurrences/" + id,
                    method: "DELETE",
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: '??timo.',
                            text: 'Ocorr??ncia exclu??da com sucesso!',
                        }).then(() => { invoincingAPI(); })

                    }
                })
            }
        })
    })

    $(".support").on("click", function(){
        alert('APOIO!')
    })

    $(".share").on("click", () => {
        Swal.fire({
            title: "Compartilhe",
            showConfirmButton: false,
            html: "<div class='share-div'><button class='facebook'></button><button class='whatsapp'></button><button class='instagram'></button></div>"
        })
    })
}

