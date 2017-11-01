## Prattle

### A React chat app for prattling, blathering and babbling!

Mostly a project to play with React and build something fun. Currently uses a Firebase backend with Google Auth.

<img src="https://www.dropbox.com/s/vb5z2tpa01zunj2/Screenshot%202017-11-01%2010.56.41.png?raw=1" width="300" border="1">

### Todos and nice-to-haves

I'm not sure how much I'll do as this is a sandbox project and I need to get back to other React training I'm doing to get deeper into things.

- I used [Material Design Lite](https://getmdl.io/) - big mistake for a React app! Main issue was no updated bindings when conditionally rendering components or showing previously hidden elements. I'm planning on changing to [Material-UI](http://www.material-ui.com/) but already see some things I'm not happy with there, such as no Layout options mentioned in their docs, two (pretty lame) themes and no ability to use custom themes (yes, you can modify `muiTheme` but Material Design Lite has a great color picker that can generate a lot of great custom themes just by clicking two colors). That said, having the design elements, like buttons, be components (`<Button></Button>`) is obviously awesome for React.

	Because of the above issue I did some terrible end runs to handle showing/hiding content based on authentication, which of course isn't what we want, we want to conditionally render components based on auth. Hopefully I can fix this with Material-UI.
	
- I'd like to add more auth options just for fun. To do that effectively I think I'd add a router and route the sign in flow to a standalone page, then redirect to the proper app on auth.

- Group messages by date (day) instead of showing a date/time for each one, the way Slack does, a dividing line for the day and then just a simple timestamp per message.

- Add emoticons, just for the learning

- Add the ability for a user to delete a prior message of theirs

- Show number of people in a room, or maybe just online

- Indicate when someone is typing


### More screenshots

<img src="https://www.dropbox.com/s/xgumw7r5f6sau3h/Screenshot%202017-11-01%2010.57.02.png?raw=1" width="300" border="1">


<img src="https://www.dropbox.com/s/sn7cctk74kdg5fk/Screenshot%202017-11-01%2010.57.22.png?raw=1" width="300" border="1">


<img src="https://www.dropbox.com/s/7mcni7y1z7h57gy/Screenshot%202017-11-01%2011.07.05.png?raw=1" width="300" border="1">


<img src="https://www.dropbox.com/s/3meo79iwo36xs8o/Screenshot%202017-11-01%2011.07.21.png?raw=1" width="300" border="1">



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
