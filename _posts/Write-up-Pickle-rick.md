---
>layout: post
>title: Pickle Rick pt-BR
>author: 'Alisson Chataubriand'
>data: 2020-09-24 08:00:00 -0300
>lide: Este Write-up é um guia em pt-BR da sala Piclke Rick do TryHackMe é voltado para a lógica do desafio e de como eu especificamente fiz ela.
---

## Pickle Rick:

### Objetivo:
O Objetivo dessa write-up é ser um guia para completar a sala, de forma que não dê muitos spoilers e não passar a resposta, mas sim a forma que eu Alisson "Al1ss0n" Chataubriand completei essa sala.

#### Guia:
Para o reconhecimento usei algumas ferramentas bem simples como: O nmap, nikto, e o gobuster e o dirb também, para obtermos informações sobre o alvo, vamos olhar o que há no IP da máquina, o que tem rodando com o **nmap**.

![nmap](https://i.imgur.com/6tQMwBq.png)

Após rodar o nmap, por padrão eu gosto de olhar os exploits dos serviços, para verificar possíveis vetores de invasão.

![exploits](https://i.imgur.com/Q6hrwQR.png)

Você pode perceber que o serviço HTTP do desafio, na primeira vista há apenas uma mensagem do "Rick" para o "Morty" (aconselho a guardar nomes que aparecem, para caso seja necessário realizar um brute-force e não tenhamos credenciais  de usuários), no site não há nada de muito útil, além dessas informações.

Após explorar um pouco o site , podemos olhar o código fonte da pagina, olhar o código fonte sempre é bom, ajuda a entender o que se passa e melhorar suas "skills" de programação.

![source](https://i.imgur.com/ghwTsPm.jpg)

Nesse caso temos um usuário no código fonte da página, vamos prosseguir procurando por diretórios, para isso eu utilizei do gobuster com o seguinte comando: **`gobuster dir -w /usr/share/wordlist/dirbuster/directory-list-2.3-medium.txt -u <site> -x php,html,txt,css,js`**.
O resultado nos traz alguns diretórios bem interessantes como um que contém todos os arquivos e links do site, o robots.txt, e o mais importe, ele trás um site de login. explore eles, juntando as informações obtidas do código fonte, e do que contém no robots.txt, você terá as credenciais de usuário para logar no site.

Ao logar no site podemos perceber que entramos direto na parte de comandos, e as outras áreas não são exploráveis, logo vamos verificar alguns comandos como sudo, verificar o sudo permite você não precisar ficar horas tentando escalar privilégios que o seu usuário já possui.

![sudo](https://i.imgur.com/5uB1Mmy.png)

com o comando sudo livre, nós não precisamos se preocupar com escalonamento de privilégios, apenas é usar ele ao nosso favor. Agora é só ir atrás das flags.

![flag1](https://i.imgur.com/3mxwOU3.png)

A primeira flag se localiza no diretório que nós estamos, porém ao tentar usar o comando **`cat`** vemos que esse comando está desabilitado, com isso precisamos de um comando para substituir ele no caso temos o **`less`** leia um pouco sobre ele [aqui](https://www.webhostface.com/kb/knowledgebase/linux-less-command/); tendo isso em mente agora é só ir atrás das outras 2 flags.

![flag2](https://i.imgur.com/JgRS7pQ.png)

Explorando os diretórios podemos encontrar a flag 2 no diretório do rick, (nós não conseguimos mudar de diretório, mesmo tentando executar o comando **`sudo cd <diretório>`**,então nunca sairemos de /var/wwww/html, logo toda vez que for executar um comando você terá que especificar bem o caminhos dos arquivos).

![flag3](https://i.imgur.com/CFgjFcZ.png)

Para a última flag temos um pequeno problema, a primeira vista o diretório /root está vazio, mesmo executando **`ls -lha`**, então temos que usar novamente o comando **`sudo`** ao nosso favor,nesse caso é apenas utilizar o **`sudo ls /root -lha`**,e com isso pegar a 3 e última flag.
