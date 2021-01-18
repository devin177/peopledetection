<h1>
HackDavis Project: People Detection
</h1>


<h1>Inspiration:</h1>

Our inspiration was due to the biggest problem we face right now: trying to slow the spread of the corona virus. We wanted to develop technology that would moniter populated areas like malls and supermarkets (since they are essentials to survival) to help determine the amount of people present, allowing people to determine which stores are safer to shop at.

<h1>What it Does:</h1>

Our project determines the current amount of people of a given area in order to determine the safest way to shop. First, the user inputs their information into the text boxes (location, maximum capacity, and phone number) which allows the data to be stored under that information in the database. Then, they have the option to activate their webcame surveys whatever room the camera is pointing at. It gathers info on the number of people that have entered the area by tracking people and pairing it with the data that was previously given.

<h1>How we built it:</h1>

We have two front end pages. One is an information dashboard built using React and several libraries like Bootstrap, as well as Material UI. The second front end page is a platform to live identify the people coming in and out of a given location. This was built using a plain html and javascript. The machine learning model used to identify and track peoples' movements was built using tensorflow.js





!!!!! !! !!!!!!!!!!!!!!!!!Our backend is ______ aws? 





<h1>Challenges we ran into:</h1>

CORS, CORS, and CORS
One of the largest challenges was sending a get request from our frontend to our AWS lambda to change our database when we detected movement into and out of a location. We ran into an issue in where our request was aimed to hit the correct lambda, but because we were sending the request from our localhost, there was an issue with CORS.

<h1>Accomplishments we are proud of:</h1>

We were really proud of the fact that we learned about all the different web tools, how to access databases, and connect frontend to backend all in under 36 hours. The fact that we created a working webpage to help with the safety of the people and to just moniter the most busy areas was our most rewarding accomplishment. 

<h1>What we learned:</h1>

- We learned how to create webpages (both frontend and backend and connecting them using HTTP request) using React.js, Node.js, HTML, CSS, and javascript all in under 36 hours. Then we learned to process the user input from the webpage and store it in a database from Amazon Web Services (AWS). In addition, we learned how to utilize tensorflow.js to capture an individual and store information into a database using its AI modeling capabilities. This allowed us to determine foot-traffic in a given area and determine how safe it is. 

- We learned a lot about the built in security systems of the internet protocol, especially Same Origin Policy and CORS. Apparently, outside domains are not allowed to request certain resources from the domain from which that resource was first served. This is to prevent individuals from requesting data to use with malicious intenet. With the SOP, we are able to protect API keys, passwords, etc. CORS is a browser mechanism that allows for this cross origin resource sharing. While it offers the ability to request these resources, its trade-off is potential security concerns.

<h1>What's next for testing:</h1>

TALKING POINTS, ELABORATE
- Ensuring cors error doesnt happen again
- improve machine learning model to keep the detection constant when there are multiple people
    - sometimes people walk in front of others, and this is difficult to keep track of



