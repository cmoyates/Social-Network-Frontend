import React from 'react'
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

const Home = (props) => {

    const responseGoogleSuccess = async (response) => {
        let profileIsNew = false;
        let profile = null;
        // Try to get the profile from the database
        try {
            const res = await fetch('https://fast-coast-04774.herokuapp.com/profiles/email/' + response.profileObj.email);
            const data = await res.json();
            profile = data;
            console.log("Profile Exists!");
        } catch (error) {
            console.log(error);
            // If it fails it's a new profile
            profileIsNew = true;
        }

        // If it's a new profile 
        if (profileIsNew) {
            console.log("Creating new Profile...");
            try {
                // Create the profile on the database using the Google-Login info
                const newProfile = {
                    user_email: response.profileObj.email,
                    user_name: response.profileObj.name,
                    img_url: response.profileObj.imageUrl,
                };
                const res = await fetch("https://fast-coast-04774.herokuapp.com/profiles", {
                    method: "POST",
                    headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify(newProfile)
                });
                profile = await res.json();
                
                // Then update the profile on the database so that the profile "follows itself"
                profile.profiles_following = [profile.profile_id];
                await fetch("https://fast-coast-04774.herokuapp.com/profiles/" + profile.profile_id, {
                    method: "PUT",
                    headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify(profile)
                });
                console.log("Profile Created!");
            } catch (error) {
                console.log(error);
                return;
            }
        }
        // Store the profile and the authorisation in the state
        props.setProfile(profile);
        props.setIsAuth(true);
        console.log("Login Successful");
    }
    // If the Google-Login fails log the response
    const responseGoogleFailure = (response) => {
        console.log("Login Failed");
        console.log(response);
    }

    // If the user is authorised successfully redirect to their feed otherwise show the login page
    return ((props.isAuth) ? <Redirect to="/feed"/> : 
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        >
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

export default Home
