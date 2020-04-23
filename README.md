## Business Lookup

This project was developed for a technical coding challenge. It displays an input which depending on the value submitted, gets data from the ABR JSON api `https://abr.business.gov.au/json/`. <br/>

The input will call the ACN endpoint if only digits are entered (whitespace allowed), and the digits are not of length 11.<br/>
The input will call the ABN endpoint if 11 digits are entered (whitespace allowed).<br/>
The input will call the Name search endpoint if for all other cases.

## Quick Start

The project utilizes a front end as well as a server (for proxying requests and securing the GUID). Both need to be running for the project to work correctly.

### Installation

In order to run the project the first time, you need to have Node and NPM installed. <br/>
Assuming you have this, you need to install the packages for the projects (Server and Front End).<br/>
Clone or download the Repository locally<br/>
in the projects root, run:<br/>
`npm i && cd server && npm i`<br/>
This will install the packages for both the server and the front end.

### Run

To launch the project you will need two terminals open in the project root<br />
In the first one, run `npm run start`. This will launch the Front end.<br/>
In the second one, run `GUID='{ABR_GUID}' npm run server`. Where {ABR_GUID} is the GUID for access the ABR API. This will launch the Server.

### Testing

The Front End has some test suites to ensure project quality.<br/>
Run `npm run test`

## Reflection

This project was developed for a technical coding challenge, as such it is not production ready. In order to do so a few things would need to be completed:<br/> - Increased test coverage. Test coverage should be 100% for both Front end and the Server<br/> - Split Front end and Server into different repositories. They were combined for ease of access for reviewers, definitely not ideal, especially when working in a team.<br/> - Designs. Styling is bare simply due to time constraints, a designers touch is direly needed.<br/> - Error handling. The ABR API is poor. It returns a callback instead of a JSON object, meaning we need to evaluate the response. This is incredibly poor from a security and reliability perspective.<br/> - Secure the server. Currently over HTTP, this should be HTTPS as well as HTTPS hosting for the Front end.<br/>

The server is utilized for two main reasons, proxying the ABR requests so they do not cause CORS issues. As well as securing the ABR GUID, otherwise this would be accessible in the client and be a security concern. The GUID is accessed by an environment variable which is set at runtime.

## Tech used

React, Typescript, Jest, Enzyme, Node, Express
