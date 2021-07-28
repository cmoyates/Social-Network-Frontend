import React from 'react'
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

const Home = (props) => {

    const responseGoogleSuccess = (response) => {
        props.setProfile({
            user_name: response.profileObj.name,
            user_img: response.profileObj.imageUrl
        });
        props.setIsAuth(true);
        console.log(response);
    }
    const responseGoogleFailure = (response) => {
        console.log(response);
    }

    if (props.isAuth) {
        return <Redirect to="/posts"/>;
    }
    else {
        return (
            <div>
                <h1>Welcome to the Social Network!</h1>
                <p>
                    <GoogleLogin
                        clientId="399415598384-sgkom02f57l549gtnn877013fg004ke5.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogleSuccess}
                        onFailure={responseGoogleFailure}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                    />
                </p>
            </div>
        );
    }    
}

export default Home
