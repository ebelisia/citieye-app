//Requisitando os dados das postagens pela API
$.ajax({
    url: "http://localhost:3000/posts",
    method: "GET",
    header: {
        "Content-Type": "application/json"
    },
    success: function (response) {
        setTimeout(() => {
            $(".loading").remove();
            mountElements(response);
        }, 1000);

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

const mountElements = (props) => {
    let $postsDiv = $(".posts");

    props.forEach(item => {

        //Obtendo as informações vindas de "item" por meio de desestruturação
        const { profile_picture, author, user_district, title, place, address, description } = item

        $postsDiv.append(`
            <article class="post">
            <button class="support"></button>
            <button class="share"></button>
                <div class="user-information">
                    <img src=${profile_picture} alt="foto de perfil">
                    <div>
                        <span class="name">${author !== "" ? author : "Usuário Anônimo"}</span>
                        <span class="live-in"> ${user_district !== undefined ? `Morador de ${author}` : "Bairro onde reside não informado"}</span>
                    </div>
                </div>

                <h3 class="occurrance-title">
                    ${title}
                </h3>
                <p class="place">Local: ${place}</p>
                <p class="place">Endereço: ${address !== "" ? ` ${address}` : "Não informado"}</p>
                <span>
                    ${description}
                </span>
            </article>
            `)
    })


    $(".share").on("click", () => {
        Swal.fire({
            title: "Compartilhe",
            showConfirmButton: false,
            html: "<div class='share-div'><button class='facebook'></button><button class='whatsapp'></button><button class='instagram'></button></div>"
        })
    })


}

