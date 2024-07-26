import {FormControl, FormGroup, FormHelperText, FormLabel, Icon, Input, InputLabel} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LoginPage() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        emailErr: "",
        passwordErr: "",
    });

    const _emailRegex = /^[a-zA-Z][a-zA-Z0-9_#]+@[a-zA-Z]+\.com$/;
    const ChangeUserData = (e) => {
        if (e.target.name === "email") {
            setErrors({
                ...errors,
                emailErr: e.target.value.length === 0 ? "Email address is required" : !_emailRegex.test(e.target.value) ? "Enter valid email (xxx@xxxx.com)" : ''
            });

        } else {
            setErrors({
                ...errors,
                passwordErr: e.target.value.length === 0 ? "Password is required" : e.target.value.length < 8 ? "password length not less\n" +
                    "than 8 characters" : ""
            });
        }
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });

    }

    const submitForm = (e) => {
        e.preventDefault();
        if (userInfo.email.length === 0) {
            console.log("Email address is required");
            setErrors({
                ...errors,
                emailErr: "Email address is required"
            });
        }
        if (userInfo.password.length === 0) {
            setErrors({
                ...errors,
                passwordErr: "Password is required"
            });
        }
    }

    return (
        <>
            <div style={{
                width: "50%",
                margin: "auto"
            }}>
                <br/>
                <br/>
                <Typography
                    sx={{
                        fontSize: 30,
                        fontWeight: 600,
                        textAlign: "center"
                    }}>
                    Login
                </Typography>
                <br/>
                <br/>
                <FormGroup>
                    <FormControl>
                        <InputLabel htmlFor="login-email">Email address</InputLabel>
                        <Input name={"email"} value={userInfo.email} onChange={ChangeUserData} id="login-email"/>
                        <FormHelperText id="login-email-text"
                                        sx={{
                                            color: "red"
                                        }}>
                            {errors.emailErr}
                        </FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="login-password">Password</InputLabel>
                        <Input type={"password"} name={"password"} value={userInfo.password} onChange={ChangeUserData}
                               id="login-password"/>
                        <FormHelperText id="login-password-text"
                                        sx={{
                                            color: "red"
                                        }}>
                            {errors.passwordErr}
                        </FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <Button variant="contained" type={"submit"} onClick={submitForm}
                            disabled={errors.emailErr || errors.passwordErr}
                            sx={{
                                height: "6vh",
                            }}>
                        Login
                    </Button>
                    <Box sx={{height: "36.5vh"}}></Box>


                </FormGroup>
            </div>

        </>
    );
}


export default LoginPage;