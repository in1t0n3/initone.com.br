---
layout: post
title: Nmap port-scanner
author: 'Alisson Chataubriand'
date: 2020-07-23 12:00:00 -0300
lide: NMAP. é umma das melhores ferramentas para realizar um mapeamento de rede, que já vem instalado no kali linux e é essencial para um pentester, pois ele tem diversas funções, e é extremamente confiavel e estável  
---

## Network Mapper:

O nmap é basicamente um dos mais famosos port-scanners conhecidos pelos pentester, ele é designado para realizar uma analise de rede um IP, host, DNS mesmo que seja  protocolo em UDP ou TCP. Ele varre um alvo que você especifica, podendo trazer como resultado uma serie de informações de acordo com uma serie de parâmetros que podem aprensentar informações como: portas (abertas, fechadas, filtradas) do sistema, podendo trazer vulnerabilidades CVE's encontradas ali de acordo com um banco de dados da rede nmap, pode ver versões do sistema e outras muitas coisas que não serão abordadas nesse pequeno post.

Para mais informações e parâmetros do nmap recomendamos que você coloque a 'mão na massa' e execute o seu primeiro comando 
**`root@kali:~# man nmap`** ou **`root@kali:~# nmap -h`**.

## Comandos úteis:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Parâmetro</th>
      <th scope="col">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-h</td>
      <td>Help: Habilita o menu para mais informações</td>
    </tr>
    <tr>
      <td>-sS</td>
      <td>Syn Scan:
      realiza scan que não completa o 3-way-handshake, sendo assim um scan mais silencioso </td>
    </tr>
    <tr>
      <td>-p</td>
      <td>Port: Setar uma porta a ser 'scanneada'</td>
    </tr>
    <tr>
      <td>-sV</td>
      <td>Scan Version:</td>
    </tr>    
    <tr>
     <td>-O</td>
     <td>OS detection: 'Scannea'  o sistema operacional que o alvo esta utilizando</td>
    </tr>
    <tr>
     <td>-v</td>
     <td>Verbosity: mostra na tela tudo que o nmap está fazendo</td>
    </tr>
    <tr>
     <td>-A</td>
     <td>Agressive: Habilita o modo agressivo e scannea de forma mais rapida e trazendo mais informações</td>
    </tr>
    
  </tbody>
</table>


## Exemplos:

**`root@kali:~# nmap -sV -O 10.10.77.80`**

**`root@kali:~# nmap -sV -O 10.10.77.80`**
**`root@kali:~# nmap -p80,8080 -v scanme.nmap.org`**

realize esses scans e veja o que vai ser retornado, obviamente vc deve alterar o alvo (IP ou Host) para o alvo que você queira enumerar.




## Observações:

Esse post, é apenas uma pequena pincelada do que esta ferramenta é capaz, haverá mais posts a respeito do nmap, como um inteiro sobre os seus **'Scripts'** porém eles ainda serão preparados e quando postados estarão nessa próxima sessão, recomendo que aqueles interessados no nmap procurem na sessão do manual da ferramenta e testem por conta própria, a melhor forma de aprender é praticar. **'mas onde você pode praticar'** ?
Separei um link bacana de uma sala do TryHackme para os interessados fazerem. https://tryhackme.com/room/rpnmap dem uma olhada no site deles, é bem útil 

## Links dos demais posts do nmap:
Aguardando[...]


