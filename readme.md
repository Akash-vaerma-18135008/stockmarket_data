**User interface is not fully made(but graph is made), kindly use postman for testing.
**To make api fully functional uncomment the commented part in all route files inside route directory.

<endpoints for data> => ashokley, cipla, eichermot, reliance, tatasteel, nifty, sensex

*GET-REQUEST (to get the data of company) =>

Ashok Leyland -> https://stock-data-api-v1.herokuapp.com/api/v1/ashokley
Cipla -> https://stock-data-api-v1.herokuapp.com/api/v1/cipla
Eichermot -> https://stock-data-api-v1.herokuapp.com/api/v1/eichermot
Reliance -> https://stock-data-api-v1.herokuapp.com/api/v1/reliance
Tatasteel -> https://stock-data-api-v1.herokuapp.com/api/v1/tatasteel

to get MAIN data =>

Nifty -> https://stock-data-api-v1.herokuapp.com/api/v1/nifty
Sensex -> https://stock-data-api-v1.herokuapp.com/api/v1/sensex

*make POST-REQUEST to above endpoints with body containing a json object to create new data
object should be like this -> {
                            "Date": "2015-08-14",
                            "Open": 735,
                            "High": 741.75,
                            "Low": 730.25,
                            "Close": 739.599976,
                            "AdjClose": 724.79303,
                            "Volume": 3238561,
                        }

*DELETE-REQUEST

https://stock-data-api-v1.herokuapp.com/api/v1/<endpoint>/<object_id>

*PATCH-REQUEST- (make patch request to below endpoint with body containing data to be updated and object _id in params)

https://stock-data-api-v1.herokuapp.com/api/v1/<endpoint>


**ONCE YOU UNCOMMENT THE COMMENTED LINE IN ALL ROUTES FILE, You'll be able to do authentication and authorization processes

*LOGIN (make a post request with email and password in the body as a json)
    https://stock-data-api-v1.herokuapp.com/users/login

*SIGNUP (make a post request with a body object in json containing name, email, password, passwordConfirm fields)
    https://stock-data-api-v1.herokuapp.com/users/signup
    json object must be like this - {
                                        "name": "Nancy",
                                        "email": "Nancy@gmail.com",
                                        "password": "1234abcd",
                                        "passwordConfirm": "1234abcd"
                                    }

*LOGOUT (make a post request for logging out)
    https://stock-data-api-v1.herokuapp.com/users/logout

*FORGOTPASSWORD (make a post request with email field in body)
    https://stock-data-api-v1.herokuapp.com/users/forgotpassword

*UPDATEPASSWORD (make post request with a json body containing currentPassword, password, passwordConfirm fields)
    https://stock-data-api-v1.herokuapp.com/users/updatemypassword