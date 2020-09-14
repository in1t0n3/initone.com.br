---
layout: post
título: Pickle Rick pt-BR
autor: 'Alisson Chataubriand'
data: 2020-09-15 18:00:00 -0300
lide: Esse post, trás uma write-up/guia da máquina piclke rick do TryHackMe, voltado para a logica de como fiz o CTF.
---

# Pickle Rick

## Objetivo:
O Objetivo dessa write-up é ser um guia para completar a sala, de forma que não dê muitos spoilers e não passar a resposta, mas sim a forma que eu Alisson "Al1ss0n" Chataubriand completei essa sala.

### Guia:
Para o reconhecimento usei algumas ferramentas bem simples como: O nmap, nikto, e o gobuster e o dirb também, para obtermos informações sobre o alvo.

![nmap](https://i.imgur.com/6tQMwBq.png)

Após rodar o nmap, por padrão eu gosto de olhar os exploits dos serviços, para verificar possíveis vetores de invasão.
![exploits](https://i.imgur.com/Q6hrwQR.png)

voltando ao reconhecimento vamos olhar o que há no IP do desafio e por, você pode perceber que há apenas uma mensagem do Rick para o Morty (aconselho a guardar nomes que aparecem, para caso seja necessário um brute-force e não tenhamos usuários), no site não há nada de muito útil, vamos olhar o código fonte da pagina, olhar o código fonte sempre é bom, ajuda a entender o que se passa e melhora suas skills de programação.

![source](https://i.imgur.com/ghwTsPm.jpg)

Com isso temos um usuário, vamos prosseguir procurando por diretórios, para isso eu utilizei do gobuster com o seguinte comando: **gobuster dir -w /usr/share/wordlist/dirbuster/directory-list-2.3-medium.txt -u <site> -x php,html,txt,css,js**.
O resultado nós trás alguns diretórios bem interessantes como um que contem todos os arquivos e links do site, o robots.txt, e o mais importe, ele trás um site de login. explore eles, juntando as informações obtidas do código fonte, e do que contém na robots.txt, você terá as credenciais de usuário para logar no site.

Ao logar no site podemos perceber que entramos direto na parte de comandos, e as outras áreas não são exploráveis, logo vamos verificar alguns comandos como sudo, verificar o sudo permite você não precisar ficar horas tentando escalar privilégios que o seu usuário já possui.

![sudo](https://i.imgur.com/5uB1Mmy.png)

com o comando sudo livre, nós não precisamos se preocupar com nada, apenas é usar ele ao nosso favor. Agora é só ir atrás das flags.

![flag1](https://i.imgur.com/3mxwOU3.png)

A primeira flag se localiza no diretório que nos estamos, porem ao tentar usar o comando **cat** vemos que esse comando está desabilitado, com isso precisamos de um comando para substituir ele no caso temos o **less** leia um pouco sobre ele [aqui](https://www.webhostface.com/kb/knowledgebase/linux-less-command/); tendo isso em mente agora é só ir atrás das outras flags.

![flag2](https://i.imgur.com/JgRS7pQ.png)

Explorando os diretórios podemos encontrar a flag 2 no diretório do rick, (nós não conseguimos mudar de diretório padrão, mesmo tentando executar o comando **sudo cd <diretório>**, nunca sairemos de /var/wwww/html)

![flag3](https://i.imgur.com/CFgjFcZ.png)

Para a ultima flag temos um pequeno problema, a primeira vista o diretório /root está vazio, mesmo executando **ls -lha**, então temos que usar novamente o comando **sudo** ao nosso favor, e com isso pegar a 3 e a ultima flag
