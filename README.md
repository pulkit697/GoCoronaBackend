# GoCoronaBackend
The APIs used to deal with the backend part of the Go Corona App

# Base URL
https://rocky-lake-08141.herokuapp.com/

# end points
GET /feed/allctscans => to get all the ct scans posted till date

GET /feed/getmyctscans/:id => to get all ct scans for the given id

POST /feed/postmyctscan => to post a ct scan (for user)

POST /feed/postmycomment => to comment on any ct scan (for doctor)
