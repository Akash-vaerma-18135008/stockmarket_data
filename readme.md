**User interface is not fully made(but graph is made), kindly use postman for testing. <br>
**To make api fully functional uncomment the commented part in all route files inside route directory. <br>

endpoints for data => ashokley, cipla, eichermot, reliance, tatasteel, nifty, sensex <br>

*GET-REQUEST (to get the data of company) => <br>

Ashok Leyland -> https://stock-data-api-v1.herokuapp.com/api/v1/ashokley <br>
Cipla -> https://stock-data-api-v1.herokuapp.com/api/v1/cipla <br>
Eichermot -> https://stock-data-api-v1.herokuapp.com/api/v1/eichermot <br>
Reliance -> https://stock-data-api-v1.herokuapp.com/api/v1/reliance <br>
Tatasteel -> https://stock-data-api-v1.herokuapp.com/api/v1/tatasteel <br>

to get MAIN data =>

Nifty -> https://stock-data-api-v1.herokuapp.com/api/v1/nifty <br>
Sensex -> https://stock-data-api-v1.herokuapp.com/api/v1/sensex <br>

*make POST-REQUEST to above endpoints with body containing a json object to create new data <br>
object should be like this -> {
                            "Date": "2015-08-14",
                            "Open": 735,
                            "High": 741.75,
                            "Low": 730.25,
                            "Close": 739.599976,
                            "AdjClose": 724.79303,
                            "Volume": 3238561,
                        }<br>

*DELETE-REQUEST <br>

https://stock-data-api-v1.herokuapp.com/api/v1/endpoint/object_id <br>

*PATCH-REQUEST- (make patch request to below endpoint with body containing data to be updated and object _id in params) <br>

https://stock-data-api-v1.herokuapp.com/api/v1/endpoint <br>


**ONCE YOU UNCOMMENT THE COMMENTED LINE IN ALL ROUTES FILE, You'll be able to do authentication and authorization processes <br>

*LOGIN (make a post request with email and password in the body as a json) <br>
    https://stock-data-api-v1.herokuapp.com/users/login <br>

*SIGNUP (make a post request with a body object in json containing name, email, password, passwordConfirm fields) <br>
    https://stock-data-api-v1.herokuapp.com/users/signup <br>
    json object must be like this - {
                                        "name": "Nancy",
                                        "email": "Nancy@gmail.com",
                                        "password": "1234abcd",
                                        "passwordConfirm": "1234abcd"
                                    }<br>

*LOGOUT (make a post request for logging out)<br>
    https://stock-data-api-v1.herokuapp.com/users/logout <br>

*FORGOTPASSWORD (make a post request with email field in body) <br>
    https://stock-data-api-v1.herokuapp.com/users/forgotpassword <br>

*UPDATEPASSWORD (make post request with a json body containing currentPassword, password, passwordConfirm fields) <br>
    https://stock-data-api-v1.herokuapp.com/users/updatemypassword <br>