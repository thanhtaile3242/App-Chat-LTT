import React, { useState, useEffect } from "react";
import { registerRoute } from "../utils/APIRoutes.js";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const toastOption = {
        autoClose: 2500,
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password } = values;
        if (handleValidation()) {
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.message, toastOption);
            } else {
                navigate("/login");
            }
        }
    };

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error(
                "Password and Confirm Password should be match",
                toastOption
            );
            return false;
        } else if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters",
                toastOption
            );
            return false;
        } else if (password.length < 6) {
            toast.error(
                "Password should be greater than 6 characters",
                toastOption
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required", toastOption);
            return false;
        }
        return true;
    };

    const hanldeChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <div className="brand">
                        <div className="title">
                            {" "}
                            <img src={Logo} alt="" />
                            <h1>Happy</h1>
                        </div>

                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(event) => {
                                hanldeChange(event);
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(event) => {
                                hanldeChange(event);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(event) => {
                                hanldeChange(event);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(event) => {
                                hanldeChange(event);
                            }}
                        />
                        <button type="submit">Create User</button>
                        <span>
                            Already have an account ?
                            <Link to="/Login">Login</Link>
                        </span>
                    </div>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        .title{
            display: flex;
            align-items: center;
            align-items: center;
            gap: 1rem;
            img {
                height: 5rem;
            }
            h1 {
                color: white;
                font-weight: 600;
                text-transform: uppercase;
            }
        }
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
    form {
        display: flex;

        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition 0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff
            }
        }
        span{
            color:white;
            text-transform: uppercase;
            a{
                margin-left: 5px;
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold
            }
        }
    }
`;

export default Register;
