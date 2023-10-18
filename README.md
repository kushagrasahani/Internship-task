
#INTRODUCTION

This is a project containing a Dynamic drop down that is built using React.Js . It has the JSON data in Jdata.js ,
From Jdata.js the data is imported in Dropdown.js which is component containing  Ui elements satisfying all the requirements specified in the  email . 

#FEATURES DEVELOPED
1. The application contains a seach bar to select the city after selecting a country from the select coutry menu. These cities are automaitcally fetched based on looking up the selected country in Json data, If found then the states are displayed. This makes the cities searchable
2. There is a select option for selecting a state as well , the options in the select menu are also fetched from the json data,
3. On selecting a particular state , All the cities specified in the json data  are displayed ,and by default they are checked 
4. There are 3 different buttons, a->Custom Switch button for enabling dark mode on the application, b-> Submit button which on click displays the selected country, state and cities in the console and also indicates the user that "you have submitted your selection" through an alert, c-> Reset button which helps user to clear all the current selection.
5. Additonally I have also written a code snippet for making api call when the submit button is clicked, but due to some technical issues the free api is not working , I have still used it to demonstrate that i have a working knowledge on how to handle api calls as well.
