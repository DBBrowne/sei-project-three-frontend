![placebook landing page](https://user-images.githubusercontent.com/72463218/154778543-01bf0617-114b-447d-a0e1-3579aabc99c0.png)
# PlaceBook
Share memories or dreams of trips with locations and photographs.

Deployed at [placebook.dbb.tools](https://placebook.dbb.tools) via [Netlify](https://netlify.com/), with [Heroku](https://heroku.com) and [MongoDB Atlas](https://cloud.mongodb.com).  

MERN - MongoDB, Express.js, React.js, Node.js - Full stack application.  
BackEnd: [DBBrowne/sei-project-three-backend](https://github.com/DBBrowne/sei-project-three-backend)  
FrontEnd: [DBBrowne/sei-project-three-frontend](https://github.com/DBBrowne/sei-project-three-frontend)

[Alex Chan](https://github.com/Achan81) | [Mike Salter](https://github.com/Msalter91) | [Duncan Browne](https://github.com/dbbrowne)

## Contents
- [PlaceBook](#placebook)
- [Demos](#demos)
- [Usage](#usage)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Overview](#overview)
    - [System Design](#system-design)
    - [Project History](#project-history)
        - [Brief](#brief)
        - [Planning](#planning)
        - [Wireframes](#wireframes)
        - [Project Plan](#project-plan)
        - [Build Execution](#build-execution)
    - [Known Bugs](#known-bugs)
    - [Challenges](#challenges)
    - [Wins](#wins)
    - [Future Features](#future-features)
    - [Key Lessons](#key-lessons)
- [Team Members](#team-members)

## Demos
|View the trips and memories of fellow explorers|Store your memories and a trip that you took|
|---|---|
|![Placebook Trips View](https://user-images.githubusercontent.com/72463218/154768547-94a57a19-4a19-4a2c-a470-1d84ab16cf01.png)|![Placebook Create Trip](https://user-images.githubusercontent.com/72463218/154768395-516eea32-2e39-4f75-acd3-e30e30f18a75.png)|

![](https://user-images.githubusercontent.com/72463218/154778448-c0b87d30-2e7e-4c5c-a43a-cc4f66115283.png)
## Usage
- Explore "Inspire Me" and "See Trips" to see the trip other have taken or are dreaming of.
- Register and log in to create your own trips and memories.
- Use the geolocator, or drag the map, to record where your memory happened, add a photo and a notes, and watch the map of your trip come to life.
### <img src="https://camo.githubusercontent.com/415f76b0bc75bdd0a32dd5ed758db017d764687fb4d905eda183d1d9b0316635/68747470733a2f2f692e696d6775722e636f6d2f7a6255387339342e706e67" height="60">  PlaceBook


## Technologies
|Frontend|Backend|
|---|---|
|React|MongoDB|
|Node|Express|
|[Mapbox](https://www.mapbox.com/)|Mongoose|
|[react-map-gl](https://visgl.github.io/react-map-gl/)|JWT|
|<img src="https://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" alt="SASS" height="20"> SASS|bCrypt|
|<img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="bootstrap logo" width="20">  Bootstrap||

## Getting Started
These instructions will run a copy of the project on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

#### Running Locally
Clone both [PlaceBook Backend](https://github.com/DBBrowne/sei-project-three-backend) and [Placebook Frontend](https://github.com/DBBrowne/sei-project-three-frontend) repos.

1. Backend
    - Ensure mongoDB is up and running.
    - From the root folder of your local backend repo:
        - If you wish to set your own local admin password, jwt secret or MongoDB connection URI: 
            - Duplicate the `env.example`, rename it `.env` file and set a local `ADMIN_PASS`, `JWT_SECRET`, 
        - If you wish to change form the default port number (`4000`), set this in the `.env` file as above.
        - Install dependencies with:
            ```console
            $ npm install
            ```
        - Seed the database with:
            ```console
            $ npm run seed
            ```
            Success is indicated by:
            ```console
            database connected
            database emptied
            creating admin user
            Admin Pass: ifthisisthepasswordyouneedtosettheEnvVar
            Admin user ID: 620fe6cf8f9141f8ebbf039b
            Countries created: 45
            Memories created: 4
            Trips created: 3
            ```
        - Run the server with:
            ```console
            $ npm run dev
            ```
            Success is indicated by:
            ```
            🌍 database has connected
            Up and running on port 4000
            ```
    #### Running Tests
    - Ensure the server is responding as expected by importing the [Insomnia collection](https://github.com/DBBrowne/sei-project-three-backend/blob/66066344a2bb337999513a08e7580756a975caad/Insomnia/Insomnia-placebook.json) (`<backendRepo>Insomnia/Insomnia-placebook.json`) into [Insomnia](https://insomnia.rest/).
        > Insomnia is an OpenAPI test client.  The collection JSON may work with other clients, but this is untested.  

        A collection of positive and negative tests exist in Insomnia-placebook.json.  To confirm basic operation, execute the following API calls from the Insomnia collection.  All should receive a `2xx` HTML response code:
        1. `Trips/index` - Get an index of all stored trips.
        1. `Users/register` - Register your test user.
        1. `Users/login` - Populate the Insomnia environment with a valid token.
        1. `Trips/Create Trip` - Create a test trip.
        1. `Trips/Edit` - edit the test trip.

2. Frontend  
    From the root folder of your local frontend repo:
    - Duplicate `.env.example` to `.env`.  Fill the `REACT_APP_MAPS_API_KEY` with your [MapBox api key](https://docs.mapbox.com/help/getting-started/access-tokens/).
    - Ensure FE proxy is targeting the correct port. This defaults to match the BE on `4000`, but can be set:  
        https://github.com/DBBrowne/sei-project-three-frontend/blob/f3ca5d10cc8c95d61db9479b557b083e94da3dbb/src/setupProxy.js#L3-L9
    - Run with
        ```console
        $ npm run dev
        ```
        Success is indicated by: 
        ```
        Compiled successfully!

        You can now view project-3-frontend in the browser.
        ...
        ```
    - Your default browser will open at `localhost:3000`, and display the Placebook app landing page.
    > Feb 2022: macOS appears to be having some issues resolving localhost to the ipv4 address (`127.0.0.1`).  Look for hints of ipv6 resolution (`::1`) if you are unable to connect the various app parts.  Resolve by fixing your hosts file, or replacing references to `localhost` in this project with `127.0.0.1`.
#### Deployment
1. Backend
    - Set up a live mongoDB database (eg with [Mongo Atlas](https://www.mongodb.com/atlas/database))
    - Set env vars on your host of choice (eg [Heroku](https://www.heroku.com/)):
      ```console
      $ heroku config:edit -a <HEROKU_APP_NAME>
      ```

      ```
      ADMIN_PASS='<aStrongPassword>'
      JWT_SECRET='<aStrongJWTSecret>'

      DB_URI = '<LiveMongoDbConnectionString>'
      ```
    - Run the seed script on your live server, eg:
    ```console
      $ heroku run npm run seed
    ```

1. Frontend
    -  Set up your image hosting/processing tool, eg Cloudinary.  Either use the default profile names of `PB-profile-image` and `PB-memory-image` or set your own in the env variables.
        - `PB-profile-image` transformations:
            ```
            Incoming Transformation: c_crop,g_face:auto,h_300,q_auto:best,w_300,x_0,y_0
            Folder: placebook-profile-images
            ```
        - `PB-memory-image` transformations:
            ```
            Incoming Transformation: c_scale,h_500,r_5,w_500
            Folder: placebook-memory-images
            ```
    - Set env vars on your host of choice:
        ```
        REACT_APP_MAPS_API_KEY='<YOUR_MAPBOX_API_KEY>'

        REACT_APP_PROD_URL='<DEPLOYED_PLACEBOOK_BACKEND_URL>'

        REACT_APP_CLOUDINARY_URL='<YOUR_CLOUDINARY_URL>'
        REACT_APP_CLOUDINARY_UPLOAD_PRESET_PROFILE='PB-profile-image'
        REACT_APP_CLOUDINARY_UPLOAD_PRESET_MEMORY='PB-memory-image'
        ```
    - Select map style from the [Mapbox Styles](https://docs.mapbox.com/api/maps/styles/) options.  Set with the env var:
        ```
        REACT_APP_MAPS_DEFAULT_STYLE = 'light-v10'
        ```
****

## Overview
## System Design
- Build reusable components where possible - the memory card and map components are used ins several places throughout the app, with a few switches for showing editing options.
- API follows the REST formula. 
    - /trips/?tripId
    - /memories/?memoryId
    - /countries/?countryId


## Project History

### Brief
 - Build a MERN full-stack application - by making your own backend and your own front-end
 - Be a complete product - which most likely means multiple relationships and CRUD functionality for at least a couple of models
 - Implement thoughtful user stories/wireframes - that are significant enough to help you know which features are core MVP and which you can cut
- Have a visually impressive design - to kick your portfolio up a notch and have something to wow future clients & employers
- Be deployed online so it's publicly accessible ​

#### Timeframe - 1 week

### Planning
 - Ideastorm in Miro, settle on a travel app
 - Lay out some initial ideas:

 |![GA_project3 - Initial idea](https://user-images.githubusercontent.com/72463218/154778871-b4190baa-6deb-4ae3-b8ca-e7fb0237d5e8.jpg)|![GA_project3 - Expanded Trip Idea](https://user-images.githubusercontent.com/72463218/154778951-9e8ac000-46b2-4f34-a4fa-c908221322e3.jpg)|
 |---|---|

Design a data structure to support:

![GA_project3 - PlaceBook data structure](https://user-images.githubusercontent.com/72463218/154779104-a0bc902d-a0d2-4f44-ad50-5f4afccfe47a.jpg)

Realising that we had an interesting but potentially challenging application to bui,d we spend the first 1-1.5 days planning and trying some experiments, before laying out a plan in a simple kanban board, and each team member choosing the most appealing top-priority tasks.

### Wireframes
![GA_project3 - Placebook wireframe](https://user-images.githubusercontent.com/72463218/154779210-17f85c2d-6aa4-444a-9aea-a023df99d63a.jpg)
### Implementation Notes
- Initially Google maps looked like a good choice for the mapping requirements, as we found simple implementation notes for polylines via their API.
- Mongoose relationships to tie models together.
- Virtuals to protect sensitive data and 

### Build Execution
- Whilst Mike set up the backend and Alex built the register/login flows and design, I began work implementing a Google Maps based components.
- After struggling with potential API limits, I moved ot MapBox and the react-map-gl package, and development accelerated considerably.
    - Map Proof of concept component:  
    https://github.com/DBBrowne/sei-project-three-frontend/blob/b22c847bbb90085034cf0c7e790e95efda8ef4fd/src/components/common/maps/RenderMap.js#L24-L46
- I then moved on to creating a seed script and improving our API test suite for better coverage and test "environment" automation within Insomnia

- Whilst Mike and Alex continued to build out profile and country information functionality, I improved error handling and [authentication management](![image](https://user-images.githubusercontent.com/72463218/154780635-8b74a7d8-c677-408c-acf4-0d225a7cb4a5.png)) in the backend, attaching user details to secure routes, and checking them against resource owners before permitting mutation.  Better role management, either via a simple custom check of a user's approved actions, or via oAuth, would be helpful!
    https://github.com/DBBrowne/sei-project-three-backend/blob/42959eeb8bfd61597ae07cf6d23fccafe8dca7bc/controllers/authHelpers.js#L1-L10

- We needed the map to choose a sensible zoom for picking locations and displaying trips.  Unfortunately this seemed to require taking control of some internal viewport functionality in order to retain pan functionality.  A [better solution](https://github.com/DBBrowne/sei-project-three-frontend/blob/295e71c266c13d00a14cbbb4c0a48b8f7c540d05/src/components/common/maps/LocationPicker.js#L44-L46) was later identified.
  
  https://github.com/DBBrowne/sei-project-three-frontend/blob/3cdff7f394e5519cfc79d2e67db26f09d448a169/src/components/common/maps/RenderMap.js#L45-L68
- Once we had a working map component, I moved on to building the trip create/edit form with a reusable memory edit components.  After many iterations, I arrived at a layout with the "tripEdit" component, with error handling, on the left half of the screen, and then an array of attached memories, with the final member being a link to re-render the memory create component.
  These Memory cards could then be reused throughout the app.
![image](https://user-images.githubusercontent.com/72463218/154780635-8b74a7d8-c677-408c-acf4-0d225a7cb4a5.png)

- With a set of working create/edit components, I was able to combine the map component with the array of all trips and the reusable memory cards to [create a map based multi-trip index page](https://github.com/DBBrowne/sei-project-three-frontend/commit/347fa33bc750c4a49abc8c62b8b865782f1a090e).
    - I initially made a poor selection of the point at which to generate the random polyline colours, although this did generate  rather psychedelic effect of re-colouring each polyline multiple times per second as the map was moved around or re-rendered in any way.
    https://github.com/DBBrowne/sei-project-three-frontend/blob/50fd153f430bae7777b30d00a372ca64d71c6d9a/src/components/common/maps/RenderMap.js#L139-L161

![Placebook Trips View](https://user-images.githubusercontent.com/72463218/154768547-94a57a19-4a19-4a2c-a470-1d84ab16cf01.png)
- With most features now working, we had a last minute rush to bugfix.  I enjoyed adjusting various icon SVGs to use their [parent element's text colour](https://github.com/DBBrowne/sei-project-three-frontend/blob/4784e2ef3f10675fc7217552ced42c9abdec7ca9/src/components/Assets/IconBin.js).

## Known Bugs
- Viewing a trip containing a memory that is missing a visit date causes the react app to crash.
- react-maps-gl appears to contain a number of CORS issues and deprecated WebGL behaviors, which are beyond the scope of this project to address.
- the react-maps-gl css sheet is not loading correctly at mount.  Fortunately this does not seem to cause noticeable problems as the sheet is loaded in sufficient time to render the map, however this should be addressed.

## Challenges
- Maps.
    - I initially attempted to use the Google maps API directly.  Although I did get a basic map working, building polylines and custom markers looked like a considerable amount of work.  So I moved to mapbox, and react-map-gl, which provided a nice, react compatible wrapper.
    - Taking control of the map viewport to fit the markers more closely required a considerable amount of logic and troubleshooting.
- Bootstrap 
    - A css framework with ups and downs.
    - Styling via classes in the jsx/html is convenient, but can create some conflicts and battles between custom styles and those applied by the framework.
## Wins
- Maps
    - Tough, but fun problem solving, and a useful tool for the future.
- React
    - Good lessons in storing things like randomly generated colours at the correct point in the component flow to avoid re-generating on every render.
- Sleek, responsive web app designed and built in one week (plus some fixes).
- Successful Teamwork, with a wide diversity of technical interests.

## Future Features
- Swagger / OpenAPI docs page.
- Storing a trip's map as its summary image.  
    -html2canvas could provide this functionality by passing the map wrapper ref, and sending the resulting base64 blob to Cloudinary for processing and storage. Potentially along the lines of:
    ```js
    htmlToCanvas(mapContainerRef, {settings}).then(canvas => canvas.toBlob{blob=>{...}))
    ```
    or
    ```js
    var data = canvas.toDataUrl('image/jpeg', {0 < quality < 1})
    ```
- ReactContexts may reduce the amount of data that needs to be drilled through components.
- Hovering a marker on a  map should highlight its parent memory or trip.
    Potentially along the lines of:
    ```js
    function PageComponent(){
      [hoveredId, setHoveredId]=React.useState(null)
      return (
        <MapComponent serHoveredId/>
        <CardComponent hoveredId/>
      )
    }

    function MapComponent (setHoveredId) {
      return(
        <MarkerComponent
        onMouseOver={function(e) {setHoveredId(e.dataSet.Id)}}
        />
      )
    }

    function CardComponent(hoveredId){
      const hovered = this.Id === hoveredId
      return(
        <Card
          className={hovered ? classWhenHovered : ''} 
        />
      )
    }
    ```
- Social interactions - likes and messaging.

## Key Lessons
- Code reviews.  Lots more code reviews to catch edge cases and bugs in each other's code before the team moves on.
- CSS/HTML planning - more detailed planning to allow for more reuse of the DOM tree could reduce repetition and make styling easier.
- Be wary of taking control of a module's internal behaviour.  If not implemented nicely, this map mean that you have to correctly duplicate a lot of the internal functionality!


## Team Members
- [Alex Chan](https://github.com/Achan81)
- [Mike Salter](https://github.com/Msalter91)
- [Duncan Browne](https://github.com/dbbrowne)