# Skafis

Website for teachers to make tests and assignments - both online and to print.

You can find the website deployed here: [https://www.skafis.lt](https://www.skafis.lt)

Currently v1.1.0 which means website can only generate HTML files with single choice questions for students to be able to check answers immediately AND generate PDF without lithuanian characters.

## Screenshots

![SS1](screenshots/ss1.png)
![SS2](screenshots/ss2.png)
![SS3](screenshots/ss3.png)
![SS4](screenshots/ss4.png)
![SS5](screenshots/ss5.png)
![SS6](screenshots/ss6.png)

## Tech

- Angular
- Angular Material
- AWS Amplify and S3

## How to run locally (dev)

Prerequisites:

- Installed Nodejs
- Installed yarn (`npm install --global yarn`)

Run locally:

- `yarn` - install all npm packages
- `yarn start` - runs on http://localhost:4200 also available from any device in the network.

## HTML generation

Code was copied here [https://www.freeformatter.com/javascript-escape.html](https://www.freeformatter.com/javascript-escape.html) and then pasted to the code as a constant string.

## AWS Process

Using AWS Amplify. Everything is a pretty simple step by step process, but yeah, idk about money. I just know that it should be free for the first 12 months (or sth like that).

For DNS records you need:

1. CAA record to amazontrust.com (or other), flag 0, issue
2. CNAME record to with the first string as a name, second string as an address (It is given by AWS in a form \<first-string\> CNAME \<second-string\>)
3. Delete all other CAA records if there are any.

NO. LET'S TRY aws s3
[https://www.npmjs.com/package/@jefiozie/ngx-aws-deploy](https://www.npmjs.com/package/@jefiozie/ngx-aws-deploy)

NAH. just gonna deploy to firebase...

## Version plan

1. Only one choice test, only text questions/answers > html which requires name and then it generates a file (signed or something with encryption so can't be forged).
2. Multiple choice, insert text, latex questions/answers > html or pdf with answer sheet.
3. Insert pictures, drawn problems, check answers from html generated file.
4. Host generated test with link, sends answers to teacher, check answers also with a link for teachers.
5. Kahoot type quiz demonstration.
