---
layout: post
title: Writeup Bounty Hacker
author: 'Antony Leite'
date: 2020-08-11 12:00:00 -0300
lide: Nesse post temos uma Writeup da sala Bounty Hacker do TryHackMe, que explora o uso dos serviços FTP, SSH, HTTP, onde é necessário o uso das ferramentas Nmap e Hydra juntamento do método de BruteForce, e também nessa sala utilizamos o tar para efetuar o escalamento de privilégios.
---

# Reconhecimento

Como essa sala está classificada como fácil no [tryhackme](https://tryhackme.com/) estarei utilizando um nmap 'simples', pois acho que ele ira trazer todas as informações que precisamos.

O comando que estarei utilizando é **`nmap -sV 10.10.124.175`**

![nmap-sv](https://i.imgur.com/Vzdzp6e.png)

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-sV</td>
      <td>Analisa as portas abertas para determinar informações de serviço/versão</td>
    </tr>
  </tbody>
</table>

# Exploração

Podemos perceber que pela a saído no nmap temos os seguintes serviços:

- FTP
- SSH
- HTTP

Podemos analisar o FTP dessa maquina, existe vários métodos diferentes que você pode acessar um serviço de FTP, nessa situação estarei acessando o FTP da maquina pelo o meu terminal. Para isso acontecer estarei usando o comando **`ftp 10.10.124.175`**

![ftp](https://i.imgur.com/oMxegzT.png)

Logo depois de você obter o acesso ao FTP da maquina, ele ira te pedir um *Name*, basta você colocar como *Name*  **`anonymous`**

![ftp-anonymous](https://i.imgur.com/oIqYwTL.png)

Depois de colocar anonymous como *Name* você obteve sucesso ao efetuar login no serviço FTP da maquina. Agora você está dentro do FTP, basta passar um **`ls`** para você obter a visualização dos arquivos que o FTP contém.

![ftp-anonymous-ls](https://i.imgur.com/qWuREbW.png)

Podemos perceber que temos dois arquivos no FTP, o *locks.txt* e o *task.txt*. Você pode baixar esses arquivos para sua maquina pessoal para que você possa ler tal arquivo, para você baixar o arquivo faça uso do comando **`get`**, sendo assim, para efetuar o download do arquivo *locks.txt* basta usar o seguinte comando **`get locks.txt`**

![ftp-anonymous-get-locks.txt](https://i.imgur.com/9NgiVa0.png)

E para o arquivo *task.txt* é utilizado o comando **`get task.txt`**

![ftp-anonymous-get-task.txt](https://i.imgur.com/vwUVE2Q.png)

Assim, você acabou de efetuar o download de todos os arquivos do FTP. Assim você pode ler esses arquivos para tentar obter mais informações. Agora vamos ler o arquivo *locks.txt*

![ftp-anonymous-cat-locks.txt](https://i.imgur.com/7TcgUDI.png)

O arquivo *locks.txt* parece ser uma wordlist. Agora vamos ler o outro arquivo, o *task.txt*.

![ftp-anonymous-cat-task.txt](https://i.imgur.com/OhgVO1Q.png)

O arquivo *task.txt* parece ser uma carta/mensagem e nela temos o remetente **lin**. Com essas informações podemos utilizar a ferramenta [Hydra](https://initone.com.br/HydraBruteForce/) para fazer um BruteForce no serviço SSH dessa maquina.
Para utilizarmos o Hydra para fazer BruteForce no serviço SSH utilizamos o comando **`hydra -l lin -P locks.txt 10.10.124.175 ssh`** 

![hydra-bruteforce](https://i.imgur.com/Lg4kxgS.png)

Perfeito! Encontramos o usuário e a senha do SSH! Agora é so fazer o login. Para efetuar o login é só utilizar o comando **`ssh lin@10.10.124.175`**

![ssh-login](https://i.imgur.com/yExFBaZ.png)

Agora ele está pedindo a *password* do serviço SSH, que é a mesma *password* que o Hydra encontrou utilizando o método de BruteForce no serviço SSH.

![ssh-login-password-correct](https://i.imgur.com/Z74kPkK.png)

Parabéns! Agora você dentro do serviço SSH dessa maquina!

# Escalando privilégios

Agora, você passando o comando **`ls`** para ver o que tem no diretório atual, você já encontra o *user.txt*!

![user.txt](https://i.imgur.com/Dv2AIvT.png)

Show! Agora você pode rodar o comando **`sudo -l`** para listar os privilégios do usuário. Você precisa listar os privilégios do usuário para saber qual serviço você pode explorar parar virar root do sistema, pois o objetivo é esse! Você virar root, e pegar a *flag* que está em */root/root.txt*

![sudo-l](https://i.imgur.com/EGM6TEp.png)

O resultado desse comando mostra o */bin/tar*, você pode pesqusiar por *tar* no [GTFOBins](https://gtfobins.github.io/).
Você pesquisando sobre [tar](https://gtfobins.github.io/gtfobins/tar/) no GTFOBins você vai acabar caindo na pagina dele, e é exatamente isso que queremos, pois presisamos saber qual comando a gente vai usar para elevar os nossos privilégios até o root. Você dando uma olhada na pagina do *tar* você vai achando o topico **SUDO** e nela estará o comando **`sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh`** que é o comando que vamos usar para escalar os privilégios, basta você copiar e colar esse comando no terminal do serviço SSH.

![root](https://i.imgur.com/63jLuG3.png)

Pronto! Você se tornou root! Agora basta ler a *flag* que se encontra em */root/root.txt*, para ler a *flag* root sem sair do seu diretório atual basta user o comando **`cat /root/root.txt`**

![root.txt](https://i.imgur.com/OuDTlnW.png)

Pronto! Parabéns! Você concluiu o objetivo da sala.
