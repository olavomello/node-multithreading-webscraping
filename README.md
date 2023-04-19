# Nodejs Asynchronous Multithreading Web Scraping

<p align="center">
    <a href="#" alt="Style">
        <img src="https://img.shields.io/badge/style-flat--square-green?logo=appveyor&style=flat-square" /></a>
    <a href="https://linktr.ee/olavomello">
        <img src="https://img.shields.io/badge/contact-Contact--me-blue"
            alt="Contact me"></a>
</p>

<div align="center"><img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*PHyL96esrfTneTBHubMdWQ.png" alt="Nodejs Asynchronous Multithreading Web Scraping" title="Nodejs Asynchronous Multithreading Web Scraping"/></div>


## About 

Web scraping is the process of extracting data from websites. In today's world, web scraping has become an essential technique for businesses and organizations to gather valuable data for their research and analysis. Node.js is a powerful platform that enables developers to perform web scraping in an efficient and scalable manner.

## What is Multithreaded Web Scraping?

Multithreaded web scraping is a technique that involves dividing the web scraping task into multiple threads. Each thread performs a specific part of the scraping process, such as downloading web pages, parsing HTML, or saving data to a database. By using multiple threads, the scraping process can be performed in parallel, which can significantly improve the speed and efficiency of the scraping task.

## Why use Multithreaded Web Scraping?

There are several reasons why multithreaded web scraping is beneficial. Firstly, it can significantly reduce the time required to scrape large amounts of data from multiple websites. Secondly, it can improve the performance of the scraping process by utilizing the resources of the machine more efficiently. Lastly, it can help avoid potential roadblocks like getting blocked by a website due to overloading of requests from a single IP address.

## How to implement Multithreaded Web Scraping in Node.js?

To implement multithreaded web scraping in Node.js, we can use a library called "cluster". The cluster library enables the creation of child processes that can run in parallel and communicate with each other through a shared memory space. By creating multiple child processes, we can distribute the scraping task across all available cores of the CPU.

## Running the code


In this code example we use `tabnews.com.br` as a target. The objective is generate the JSON files listing article's title and URL to each page.
Our code will :

<ul>
  <li>Start the master process and fork each cluster based on CPUs available</li>
  <li>Apply the Web Scraping engine to each cluster</li>
  <li>Read the page, generate de screenshot and breakdown content in article list</li>
  <li>Save a .json file with article's title and url</li>
  <li>Finish the process and restart another</> 
</ul>


## Usage
 
Start app

```
    yarn start
```

## Links

<a href="https://www.tabnews.com.br/olavomello/criei-um-app-tray-com-electron-simples-e-bem-util-para-mim-talvez-tambem-seja-para-voce" target="_blank">Tabnews</a><br>
<a href="https://olavomello.medium.com/criei-um-app-tray-com-electron-simples-e-bem-%C3%BAtil-para-mim-talvez-tamb%C3%A9m-seja-para-voc%C3%AA-1fa25db53533" target="_blank">Medium</a>

## Let's stay connected

Hope be usefull and you enjoy it ! 
Connect me at <a href="https://www.linkedin.com/in/olavo-mello/" target="_blank">Linkedin</a> and follow to see what comes next ;)

Cya ! :)