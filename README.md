## Introduction
This is a project done with the objective of providing a vulnerable web application using modern frameworks. Unlike DVWA or similar applications, I intend to show how initially secure frameworks can become full of vulnerabilities if the code is not revised and produced without following the industry's best practices for secure coding.
There are 6 main vulnerabilities:
1. Cross Site Scripting Reflected.
2. Cross Site Request Forgery due to poorly configured cookies on backend.
3. SQL Injection because of connecting directly to the database instead of using Spring JPA.
4. Insecure File Upload, by not checking the extension of the file and allowing up to 500 MB files, the system is vulnerable to malware uploads and DoS.
5. Command Injection, this vulnerability allows the execution of commands and files uploaded in vulnerability nº 4.
6. Spring Actuator exposed, the actuator endpoint is not hidden which allows an attacker to collect a lot of sensitive data on the server running the application.

## Installation guide

The only requisite is having Docker Compose installed.
1. Clone this repository and extract it.
2. Open a terminal on the root folder of the project and execute:
   
    ```docker build backend -t springandreact_vulnerableapp/backend```
    ```docker build frontend -t springandreact_vulnerableapp/frontend```
3. Lastly, execute:
   
     ```docker compose up```
   
After following these steps, the application should be available at http://localhost:3000.

Please if you find some bug or unintended feature please let me know using the repositorys project, thank you.
