import React from 'react'
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

const Home = (props) => {

    const responseGoogleSuccess = async (response) => {
        let profileIsNew = false;
        let profile = null;
        try {
            const res = await fetch('https://fast-coast-04774.herokuapp.com/profiles/email/' + response.profileObj.email);
            const data = await res.json();
            profile = data;
            console.log("Data");
            console.log(data)
        } catch (error) {
            console.log(error);
            profileIsNew = true;
        }

        if (profileIsNew) {
            console.log("Porordfg");
            try {
                const newProfile = {
                    user_email: response.profileObj.email,
                    user_name: response.profileObj.name,
                    img_url: response.profileObj.imageUrl,
                };
                
                profile = await fetch("https://fast-coast-04774.herokuapp.com/profiles", {
                method: "POST",
                headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify(profile)
                });
                console.log(newProfile);
            } catch (error) {
                console.log(error);
                return;
            }
        }
        
        props.setProfile(profile);
        console.log("Profile");
        console.log(profile);
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
