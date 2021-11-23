//Requisitando os dados das postagens pela API
const invoincingAPI = () => {
    $.ajax({
        //Mudar para localhost:3000/posts caso for utilizar o json-server
        url: "https://citieye.herokuapp.com/occurrences/all",
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

        //Obtendo as informações vindas de "item" por meio de desestruturação
        const { id, user, title, local, address, description, category, city } = item;
        console.log(item);
        $postsDiv.append(`
            <article class="post" data-id="${id}">
            <button class="support"></button>
            <button class="share"></button>
                <div class="user-information">
                    <img src="https://s.conjur.com.br/img/b/joaquim-barbosa6.png" alt="foto de perfil">
                    <div>
                        <span class="name">${user !== "" ? user.name + " " + user.surname : "Usuário Anônimo"}</span>
                        <span class="live-in"> Categoria: ${category.name}</span>
                    </div>
                </div>

                <h3 class="occurrance-title">
                    ${title}
                </h3>
                <p class="place">Local: ${local}</p>
                <p class="city">Cidade: ${city.name}</p>
                <p class="place">Endereço: ${address !== "" ? ` ${address}` : "Não informado"}</p>
                <span>
                    ${description}
                </span>
            </article>
            `)
    })

    $(".delete-post").on("click", function () {
        let id = $(this).parent().data("id");

        Swal.fire({
            title: 'Você tem certeza?',
            text: "Ao confirmar, esta ocorrência será deletada.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "https://citieye.herokuapp.com/occurrences/" + id,
                    method: "DELETE",
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Ótimo.',
                            text: 'Ocorrência excluída com sucesso!',
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

