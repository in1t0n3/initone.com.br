---
layout: post
title: Hydra Brute Force
author: 'Antony Leite'
date: 2020-07-22 12:00:00 -0300
lide: Uma pequena introdução a essa excelente ferramenta de Brute Force.
---

## Hydra Brute Force.

Basicamente o Hydra utiliza o método de brute force (tentativa e erro) para descobrir senhas. Ela faz uso de dicionários que contem diversas variedades e combinações de senhas e de logins. Essa ferramenta tem suporte para diversos protocolos, tais como FTP, SMB, SSH, MySQL, formulários web entre outros. Nesse breve introdução, vamos abordar o uso do Hydra nos serviços de FTP, SMB e SSH e formulário web.

Lembrando que você pode rodar o comando **`$ hydra -h`** que você ira ver a opção de ajuda do Hydra.

## Hydra FTP

FTP (*File Transfer Protocol*) é protocolo de transferência de arquivos. Um dos mais antigos em uso hoje em dia.

Para usar o Hydra em alguns serviço FTP basta seguir a sintaxe abaixo:

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> ftp://10.10.10.10`**

Ou

**`hydra -l <usuário> -p <senha> ftp://10.10.10.10`**

|  Opção  | 	 	  Descrição            |
|---------|--------------------------------|
|   -l    | Setar um único usuário         |
|   -L    | Setar um dicionário de usuários|
|   -p    | Setar uma unica senha 	       |
|   -P 	  | Setar um dicionário de senhas  |

## Hydra SMB


SMB (*Server Message Block*) é é um protocolo para compartilhar arquivos, impressoras, portas seriais e abstrações de comunicações, um servidor cliente, protocolo de solicitação-resposta.

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 smb`**

|  Opção  | 	  	   Descrição           |
|---------|--------------------------------|
|   -L    | Setar um dicionário de usuários|
|   -P 	  | Setar um dicionário de senhas  |
| 	smb   | 	       Protocolo 	       |

## Hydra SSH

Secure Shell (*SSH*) é geralmente usado para acessar sistemas operacionais semelhantes ao Unix, mas também pode ser usado no Microsoft Windows. O Windows 10 usa o OpenSSH como seu cliente SSH padrão e servidor SSH.

Para usar o Hydra no serviço de SSH basta seguir a sintaxe abaixo:

**`$ hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 ssh`**

|  Opção  |   		  Descrição            |
|---------|--------------------------------|
|   -L    | Setar um dicionário de usuários|
|   -P 	  | Setar um dicionário de senhas  |
|   ssh   | 		 Protocolo 		       |

## Hydra Formulários Web

Podemos usar o Hydra para Brute Force em formulários web, porém você terá  que saber qual tipo de solicitação que o site esta fazendo, se é o método GET ou POST. Para você saber qual método o site está solicitando você pode fazer uso das ferramentas de desenvolvedor do seu navegador.

Você pode usar o seguinte comando para o método POST:

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`**

|    	 Opção       | 		     Descrição             |
|--------------------|---------------------------------|
|         -L         | Setar um dicionário de usuários |
|   	  -P 	  	 | Setar um dicionário de senhas   |
|   http-post-form   | 		     Protocolo 	           |

E o seguinte comando para o método GET:

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 http-get-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`**

|    	 Opção       | 	  	   	 Descrição             |
|--------------------|---------------------------------|
|         -L         | Setar um dicionário de usuários |
|   	  -P 	  	 | Setar um dicionário de senhas   |
|    http-get-form   | 	   		 Protocolo 	           |

#### Observação!

Saiba que você pode pode mesclar as opções, elas variam de acordo com sua necessidade. Vamos supor que você já tem o usuário do SSH e quer somente descobrir a senha, basta você usar seguinte comando:

**`$ hydra -l <usuário> -P <dicionário de senhas.txt> 10.10.10.10 ssh`**

|  Opção  |   		 Descrição             |
|---------|--------------------------------|
|   -l    | Setar um único usuário         |
|   -P 	  | Setar um dicionário de senhas  |
|   ssh   | 		 Protocolo 			   |
