/*
================================
    criando cardPerfil
================================
*/

function getCardPerfil(objPerfil, ondeColocar) {

/*
    <aside id="cardPerfil">
        <img id="cardPerfil-img" src="files/perfilFoto.gif">
        <cite id="cardPerfil-autor" aria-label="autor" class="h4">Yulia Startsev</cite>
        <p id="cardPerfil-bio">
            Lorem ipsum primis vestibulum mauris fusce elementum, augue morbi vulputate gravida dapibus
        </p>
        <ul id="cardPerfil-social">
            <li title="github">
                <a><svg> </svg></a>
            </li>
            <li title="Hack the box">
                <a><svg> </svg></a>
            </li>
            <li title="try hack me">
                <a><svg> </svg></a>
            </li>
        </ul>
    </aside>
*/


    //criando <aside> #cardPerfil
    const aside = document.createElement('aside')
    aside.classList.add('cardPerfil')

    //criando <img> #cardPerfil-img
    const img = document.createElement('img')
    img.classList.add('cardPerfil-img')
    img.setAttribute('src', objPerfil.img)

    //crindo o elemento <cite> #cardPerfil-autor
    const cite = document.createElement('cite')
    cite.classList.add('cardPerfil-autor')
    cite.setAttribute('aria-label', 'autor')
        // adicnionando o nome do autor
        const citeTxt = document.createTextNode(objPerfil.autor)
        cite.appendChild(citeTxt);

    //crindo o elemento <p> #cardPerfil-bio
    const p = document.createElement('p')
    p.classList.add('cardPerfil-bio')
        // adicnionando o txt da bio
        const bioTxt = document.createTextNode(objPerfil.bio)
        p.appendChild(bioTxt);


    //crinado a lista <ul> #cardPerfil-social
    const ul = document.createElement('ul')
    ul.classList.add('cardPerfil-social')

    for (let i = 0; i < objPerfil.social.length; i++) {

        const redeSocial = objPerfil.social[i]
        const idRedeSocial = redeSocial.id
        const linkRedeSocial = redeSocial.link

        const redeSocialDate = perfilDataSocial[idRedeSocial]
        const nomeRedeSocial = redeSocialDate.nome
        const iconRedeSocial = redeSocialDate.icon


        //crinado o elemento da lista <li>
        const li = document.createElement('li')
        li.setAttribute('title', nomeRedeSocial)

        //crinado o link para a rede social <a>
        // <a href="http:www.google.com" target="_blank"
        // rel="external nofollow noreferrer noopener">
        const a = document.createElement('a')
        a.setAttribute('href', linkRedeSocial)
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'external nofollow noreferrer noopener')

        // concatenando o SVG dentro do link
        a.innerHTML = iconRedeSocial

        li.appendChild(a)   // concatnando li < a
        ul.appendChild(li)  // concatnando ul < (li < a)
    }

    //const asideCardPerfil = document.getElementById('cardPerfil')

    aside.appendChild(img)    // concatnando aside < img
    aside.appendChild(cite)   // concatnando aside < cite
    aside.appendChild(p)      // concatnando aside < p
    aside.appendChild(ul)     // concatnando aside < (ul < (li < a))

    ondeColocar.appendChild(aside) // colcoando no html

}

/*
================================
    criando tabelaDeConteudo
================================
*/

function getTitulos(tags) {
    const grupoTitulos = document.querySelectorAll(tags)

    let titulos = []

    for (let i = 0; i < grupoTitulos.length; i++) {
        const conteudoDom = grupoTitulos[i];
        let titulo = {}
        titulo.nvl = parseInt(conteudoDom.localName.substr(1, 1), 10)
        titulo.txt = conteudoDom.innerText
        titulo.id = conteudoDom.localName + '-' + (i + 1) + conteudoDom.innerText.replace(/\W/g, '')
        titulo.dom = conteudoDom
        titulos.push(titulo)

        // colocando o ID nos titulos
        conteudoDom.id = titulo.id
    }

    return (titulos)

    /* return:
    [
        {
            nvl = qual é o nivel do H
            txt = qual é o texto do titulo
            id = o ID que referencia a esse titulo
            dom = aponto para o titulo dentro do DOM
        }
    ] */

}

function criarLinha(titulo) {
    //criando o link <a>
    const a = document.createElement('a')
    a.href = '#' + titulo.id
    a.innerHTML = titulo.txt

    // adicioanndo o item <li>
    const li = document.createElement('li')
    li.setAttribute('nvl', titulo.nvl)
    li.id = 'li' + 'titulo.id'

    //concatenando os elementos
    // li > a 
    li.appendChild(a)

    return li
}

function nvlDentro(nvlAtual) {
    const criandoUl = document.createElement('ul')
    criandoUl.setAttribute('nvl', nvlAtual + 1)
    return criandoUl
}

function getTabela(titulos, tabela) {
    let ulBase = document.createElement('ul')
    ulBase.setAttribute('nvl', 2)
    tabela.appendChild(ulBase)
    let nvlAtual = 2

    for (let i = 0; i < titulos.length; i++) {
        const titulo = titulos[i];

        if (titulo.nvl == nvlAtual) {

            // adicioanndo a linha
            const li = criarLinha(titulo)

            //concatenando os elementos
            // ul > (li > a)
            ulBase.appendChild(li)

        } else if (titulo.nvl > nvlAtual) {
            while (titulo.nvl > nvlAtual) {
                // criando um <ul> para entrar um lvl
                const ul = nvlDentro(nvlAtual)

                //concatenando os elementos
                // ul > ul
                ulBase.appendChild(ul)

                // entrando um nvl a dentro
                ulBase = ulBase.lastElementChild
                nvlAtual = parseInt(ulBase.getAttribute('nvl'))
            }

            // adicioanndo a linha desse lvl
            const li = criarLinha(titulo)

            //concatenando os elementos
            // ul > (li > a)
            ulBase.appendChild(li)

        } else if (titulo.nvl < nvlAtual) {

            // voltando os nvl nescessarios
            while (titulo.nvl < nvlAtual) {
                ulBase = ulBase.parentElement
                nvlAtual = parseInt(ulBase.getAttribute('nvl'))
            }

            // adicioanndo a linha desse lvl
            const li = criarLinha(titulo)

            //concatenando os elementos
            // ul > (li > a)
            ulBase.appendChild(li)

        } else {
            console.log('===================================')
            console.log('"titulo.nvl" e "nvlAtual"')
            console.log('ñ estão interagindo corretametne')
            console.log('titulo.nvl: ', titulo.nvl)
            console.log('nvlAtual :', nvlAtual)
            console.log(ulBase)
            console.log('===================================')
        }
    }
}

function getTabelaBox(boxNoDOM) {

    /*
    <details id="tabelaDeConteudo">
        <summary
            id="tabelaDeConteudo-titulo"
            title="O que tem na pagina"
            class="d-block h6 my-2 pb-2 border-bottom">Sumário</summary>
        <nav id="tabelaDeConteudo-lista">
            <!-- criada pelo js -->
        </nav>
    </details>
    */

    const details = document.createElement('details')
    details.id = 'tabelaDeConteudo'
    details.setAttribute('title', 'O que tem na pagina')

    const summary = document.createElement('summary')
    summary.id = 'tabelaDeConteudo-titulo'
    summary.classList.add('d-block', 'h6', 'my-2', 'pb-2', 'border-bottom')
    summary.innerText = 'Sumário'

    const nav = document.createElement('nav')
    nav.id = 'tabelaDeConteudo-lista'

    // concatenando os itens
        // details > summary
        details.appendChild(summary)
        //details > nav
        details.appendChild(nav)
        // colocando no html
        boxNoDOM.appendChild(details)
}


