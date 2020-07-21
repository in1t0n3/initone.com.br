/*
como montar um perfil

para montar o perfil, vc deve seguir o modelo:

    <nick>: {
        autor = '<nome>',
        bio = '<pequeno texto de apresentação>',
        social = [
            ['id da rede social 1', 'link para a rede social 1']
            ['id da rede social 2', 'link para a rede social 2']
            ['id da rede social 3', 'link para a rede social 3']
        ],
        skil = ['no futuro eu vejo isso']
    }


    observação 1: nick
    o nick sempre será iniciado com o 'ni_' e
    corresponderá ao nome, mas todos os caracteres que
    não forem letras minusculas e maiusculas e números,
    como letras acentuadas, espaço e caracteres como o ç,
    serão substituídas pelo travessão '_'.

    p.ex:   nome            nick
            Antony Leite    ni_Antony_Leite
            Júlia           ni_J_lia
            João Miguel     ni_Jo_o_Miguel

    para tirar a duvida, execute a seguinte expressão
    substituindo o <nome> pelo seu nome e executando
    no console de algum navegador

    console.log('<nome>'.replace(/\W/g, '_'))

    *   o nick tem que fazer relação com o nome,
        se não quebra o script

                
observação 2: redes sociais
    para adicionar a rede social você deve vinculá-la com o id
    dessa rede social, esse id é estabelecido no final desse
    documento, logo após o fim da lista dos perfis. Se essa rede
    social ja está adiciona, so basta estabelecer a referência
    correta. Entretanto, se essa rede social não estiver nessa
    coletânea, você deverá adicioná ela, para isso, siga as
    instruções que estarão descritos naquela área.

*/

const perfilDataLista = ['ni_Antony_Leite', 'ni_Alisson_Chataubriand', 'ni_Wenderson_Santos', 'ni_Vin_cius_Magno']

const perfilDataConvidados = []

const perfilDatas = {
    ni_Antony_Leite: {
        autor: 'Antony Leite',
        img: '/perfil/antony_foto.gif',
        bio: '<pequeno editado livrimente texto de apresentação bla bla bla bla bla bla bla bla blb abasdaldamdlasdla>',
        social: [{
                id: 'id_instagram',
                link: 'https://instagram.com/antony_msl'
            }, {
                id: 'id_gitHub',
                link: 'https://github.com/g4l1t0'
            },
            {
                id: 'id_tryhackme',
                link: 'https://tryhackme.com/p/G4L1T0'
            }
        ],
        skil: ['no futuro eu vejo isso']
    },
    ni_Alisson_Chataubriand: {
        autor: 'Alisson Chataubriand',
        img: '/perfil/alisson_foto.png',
        bio: 'Iniciante na área de tecnologia da informação, aficionado em Pentest e em segurança da informação, entusiata de programação e aluno de eletronica',
        social: [{
                id: 'id_instagram',
                link: 'https://instagram.com/chatau.briand'
            }, {
                id: 'id_gitHub',
                link: 'https://github.com/SrAl1ss0n'
            },
            {
                id: 'id_tryhackme',
                link: 'https://tryhackme.com/p/Al1ss0n'
            }
        ],
        skil: ['no futuro eu vejo isso']
    },
    ni_Wenderson_Santos: {
        autor: 'Wenderson Santos',
        img: '/perfil/wenderson_foto.png',
        bio: 'Iniciante em programação e Linux, entusiasta em Eletrônica e amante da cultura CyberPunk e SteamPunk',
        social: [{
                id: 'id_instagram',
                link: 'https://instagram.com/gensaii.k'
            }, {
                id: 'id_gitHub',
                link: 'https://github.com/kgensai'
            },
            {
                id: 'id_tryhackme',
                link: 'https://tryhackme.com/p/kgensai'
            }
        ],
        skil: ['no futuro eu vejo isso']
    },
    ni_Vin_cius_Magno: {
        autor: 'Vinícius Magno',
        img: '/perfil/viniciuos_foto.png',
        bio: '<pequeno editado livrimente texto de apresentação bla bla bla bla bla bla bla bla blb abasdaldamdlasdla>',
        social: [{
                id: 'id_instagram',
                link: 'https://instagram.com/magnovinicius204'
            }, {
                id: 'id_gitHub',
                link: 'https://github.com/'
            },
            {
                id: 'id_tryhackme',
                link: 'https://tryhackme.com/p/Ma6usVinno'
            }
        ],
        skil: ['no futuro eu vejo isso']
    }
}

const perfilDataSocial = {
    id_gitHub: {
        nome: 'GitHub',
        icon: '<svg class="bi bi-github" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
    },
    id_hackthebox: {
        nome: 'Hack The Box',
        icon: '<svg class="bi bi-box" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/></svg>'
    },
    id_tryhackme: {
        nome: 'TryHackMe',
        icon: '<svg class="bi bi-tryhackme" width="1em" height="1em" viewBox="0 0 552 564" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M228 1a152 152 0 00-116 81c-6 10-14 32-14 37 0 3-1 4-9 5-23 5-42 15-58 32-13 14-21 27-26 44a107 107 0 0077 134l10 3h90c85 0 91 0 94-2 10-5 11-19 1-26-3-2-4-2-94-3H92l-8-4a78 78 0 01-53-68 77 77 0 0197-78c8 2 16 6 25 11 8 5 17 3 22-4 3-4 3-11 0-16-5-8-22-16-46-23l1-5c12-42 45-73 87-85 9-2 11-2 30-2 18 0 20 0 29 2 45 12 80 48 90 93 1 6 1 7-1 7l-8 6-8 6c-3 5-3 14 1 19 7 7 14 7 24 0 22-14 51-15 75-4 21 10 35 27 41 50 3 10 6 14 12 16 7 2 15-1 18-9 3-5 2-8-2-21-10-30-32-54-61-66-14-6-21-7-42-8h-19l-1-5-5-15A153 153 0 00228 1z"/><path d="M361 250c-5 2-10 8-11 14-2 7-2 26 0 33 3 10 10 16 20 16 14 0 20-9 21-28 1-18-4-30-12-34-5-2-14-2-19-1zm10 10c5 2 6 6 6 21 1 12 0 14-2 17-1 3-2 4-5 4-4 0-5-1-6-3-2-3-3-5-3-17 0-18 1-21 8-23l2 1zM512 251c-3 2-5 4-7 8-7 13-6 38 2 47 5 7 16 9 25 5 7-3 11-11 12-26s-3-28-11-33c-5-4-15-4-21-1zm15 10c2 2 4 9 4 20-1 14-2 20-6 21s-7 0-9-3c-3-5-3-31 0-36 3-4 7-4 11-2zM310 257l-9 8c-1 1 4 8 5 8l6-4 5-4v47h14v-62h-6c-6 0-6 0-15 7zM464 257c-12 9-12 8-9 12l4 4 6-4 6-5-1 24v24h13v-62h-5c-5 0-6 0-14 7zM463 344c-9 3-14 10-15 26-1 8 0 21 3 27 4 8 14 13 24 10 6-2 11-6 14-13 2-7 2-29 0-36-5-12-15-17-27-14zm9 11c3 2 5 7 6 15 1 15-2 26-8 27-7 0-9-6-9-21 0-12 1-18 4-21h7zM310 352l-10 9 6 7 6-4 5-5v48h14v-63h-6c-5 0-5 0-15 8zM360 352l-10 9 3 4 3 3 6-4 5-5v48h13v-63h-5c-5 0-5 0-15 8zM413 350l-11 8-3 2 4 4 3 4 6-4 5-5v48h13v-63h-5c-5 0-6 1-12 6zM497 428c-7 4-9 11-9 25 1 7 1 10 3 13 5 10 19 11 25 1 2-3 3-5 3-15s0-12-2-16l-5-6c-3-3-11-3-15-2zm11 10c1 2 2 4 2 12 0 9-1 11-2 13-2 4-6 4-8 1-4-6-3-26 1-28 3-2 5-1 7 2zM307 429c-4 0-8 6-9 11-2 8-1 22 2 26 3 6 8 8 13 8 11-1 14-7 14-23 0-11-2-17-6-20-3-2-10-3-14-2zm10 10l1 12c0 13-2 16-7 15-4-1-5-7-5-18 0-6 1-9 2-10 3-3 7-3 9 1zM377 430l-6 5c-2 4-2 6-2 16 0 13 1 17 7 21 3 2 4 2 8 2 11-1 14-7 15-23 0-15-4-22-14-23l-8 1zm11 9l1 12-1 12c-2 3-6 4-9 1l-1-13 1-13c3-3 7-2 9 1zM533 434l-7 6 2 3c2 2 4 2 7-2l3-2v34h10v-45h-4c-4 0-5 1-11 6zM341 435c-7 5-7 6-4 9 1 2 2 2 5-1l4-3v33h10v-44h-4c-4 0-5 1-11 6zM412 435c-7 5-7 6-4 9 1 2 2 2 5-1l4-3v33h10v-44h-4c-4 0-5 1-11 6zM456 482c-5 4-6 9-6 21 1 16 5 21 16 21 10 0 15-7 14-23 0-9-2-16-6-20-3-1-4-2-9-2s-6 1-9 3zm13 6c1 2 2 4 2 14 0 9-1 11-2 13-3 3-5 3-8 0l-1-14 1-13 4-2 4 2zM494 485l-7 6 2 3 2 3 4-4 4-3v34h10v-44l-4-1c-3 0-5 1-11 6zM527 482c-5 4-6 9-6 21 1 16 5 21 16 21 5 0 6 0 9-4 3-3 4-4 5-11 2-12 0-23-6-27-4-4-13-4-18 0zm13 6c1 2 2 4 2 14 0 9-1 11-2 13-3 3-5 3-8 0-1-2-2-4-2-14l2-13 4-2 4 2zM302 493c-7 3-8 22-2 28 5 5 15 3 17-3s1-18-1-22c-3-5-9-6-14-3zm8 5c2 2 2 11 1 16s-4 6-6 3c-2-2-3-13-1-17 1-3 4-4 6-2zM328 496c-5 4-5 4-3 6 1 2 1 2 3 0l3-2 1 12v12h7v-32h-3c-2 0-5 1-8 4zM391 532c-3 1-5 6-6 13 0 7 1 14 4 17l6 2c8 1 12-5 12-17s-6-19-16-15zm8 7c1 1 2 13 1 17-1 3-4 3-6 1-2-1-2-3-2-9l1-9c1-2 4-3 6 0zM417 536c-5 4-5 4-4 6 2 2 2 2 5-1l3-2v25h6v-32h-3c-2 0-4 1-7 4z"/></svg>'
    },
    id_instagram: {
        nome: 'Instagram',
        icon: '<svg role="img" class="bi bi-instagram" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>'
    }
}
