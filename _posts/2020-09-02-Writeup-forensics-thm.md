---
layout: post
title: Writeup Forensics - TryHackMe
author: 'Guilherme Lourenço'
date: 2020-09-02 01:10:00 -0300
lide: Nesse post vou mostrar o writeup da sala Forensics do TryHackMe. Para a realização dos challenges é necessário ter um conhecimento prévio de forense digital, pois vamos analisar e coletar informações do dump de memória fornecido.
---

## Primeiros passos - Task 1 

![Apresentacao](https://i.imgur.com/vtmzMwU.png)

Para concluir a primeira pergunta, basta baixar o dump de memória clicando em Download na página do desafio [tryhackme](https://tryhackme.com/room/forensics). 

Com o download do dump feito é necessário ter instalado o Volatility Framework em sua máquina, para instalar digite **`apt-get install volatility -y`** em seu terminal

## Analisando o dump

O primeiro passo para analisar o dump baixado é digitar no terminal o seguinte comando, **`volatility -f victim.raw imageinfo`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>imageinfo</td>
      <td>Faz uma análise do KDBG e descobre qual o perfil de sistema operacional do dump</td>
    </tr>
  </tbody>
</table>

![Resp1](https://i.imgur.com/KPQmGLe.png)

Com esse resultado já temos a resposta da segunda pergunta. 

Precisamos agora achar o PID do processo SearchIndexer, para isso acrescentei o parâmetro ***--profile=*** passando o sitema operacional identificado no passo anterior(colocar o sistema junto com sua arquitetura) seguido do ***pslist*** para listar os processos, ficando dessa forma **`volatility -f victim.raw --profile=encontrado-anteriormente pslist`** e tivemos o seguinte resultado: 

![Resp2](https://i.imgur.com/5E1zsh6.png)

Agora vamos ver também qual foi a última pasta acessada pelo usuário, para isso utilizei o comando **`volatility -f victim.raw --profile=encontrado-anteriormente shellbags`** onde o parâmetro ***shellbags*** representa o conjunto de chaves de registro do Windows responsável por armazenar detalhes sobre uma pasta visualizada.  Para achar a resposta da pergunta em meio a tantas informações, verifiquei as datas e vi qual foi a última data mais recente mostrada no log 

![Resp3](https://i.imgur.com/unWBhHM.png)

## Identificando processos maliciosos - Task 2

Nossa primeira missão nessa task é identificar no dump qual é a porta mais suspeita, para isso utilizei o comando **`volatility -f victim.raw  --profile=encontrado-anteriormente netscan`**, onde o parâmetro ***netscan*** como o proprio nome diz faz o scan da rede e mostra as portas abertas e os serviços que estão a utilizando. Fiz uma análise e achei a porta suspeita apontada nessa pergunta. 

![Resp4](https://i.imgur.com/7RXVwIF.png)

Para responder a próxima e última pergunta dessa task, precisamos verificar se existe algum processo com códigos maliciosos injetados ou escondidos. Utilizei o comando **`volatility -f victim.raw --profile=encontrado-anteriormente malfind`**, onde o parâmetro ***malfind*** tem essa função.

![Resp5](https://i.imgur.com/nZ8eaKs.png)

Na imagem eu mostro somente um processo com o código malicioso, mas são três. 


## Vasculhando o dump mais a fundo - Task 3 

Para responder o restante das pergutnas precisamos extrair o dmp dos processos para ver o que acontece por tras de cada um deles, utilizei o comando **`volatility -f victim.raw -p processo1,processo2,processo3 --profile=encontrado-anteriormente memdump -D .`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-p</td>
      <td>Processo que você quer extrair</td>
    </tr>
    <tr>
      <td>-D</td>
      <td>Diretório que os processos vão ser armazenados</td>
    </tr>
  </tbody>
</table>

![Resp6](https://i.imgur.com/pdaWIEJ.png)

Com tudo extraido nas pastas, vamos as perguntas. Basicamente precisamos encontrar esses sites dentro dos arquivos que extraimos, para isso utilizarei o comando ***strings*** seguido do grep para filtrar de acordo com o que foi solicitado, ficando da seguinte forma **`strings numero.dmp | grep 'www.\go....\.ru'(Buscar o que começa com www., no meio tem o go e mais 4 caracteres, no final o .ru )`**, fiz isso em cada arquivo dmp e fui encontrando as respostas de acordo com os sites e ips informados nos enunciados. 

![Resp7](https://i.imgur.com/aR5AEol.png)

Chegando na ultima pergunta utilizei o parâmetro ***envars*** do volatility cuja funcionalidade é mostrar as variaveis de ambientes de determinado processo, usei no parâmetro ***-p*** um dos processos maliciosos que encontrei anteriormente ficando da seguinte forma **`volatility -f victim.raw --profile=encontrado-anteriormente -p processo envars`**

![Resp8](https://i.imgur.com/tPJEJoy.png)

Com todos esses passos feitos você conseguirá finalizar a sala.

