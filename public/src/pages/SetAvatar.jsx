import React, { useState, useEffect } from "react";
import { setAvatarRoute } from "../utils/APIRoutes.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
const SetAvatar = () => {
    const navigate = useNavigate();
    const api = "https://api.multiavatar.com/4567389455";
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOption = {
        autoClose: 2500,
    };
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user-info")) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.random() * 10000}`
                );
                const buffer = Buffer.from(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    const setProfliePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOption);
        } else {
            const user = await JSON.parse(
                localStorage.getItem("chat-app-user-info")
            );
            const { data } = await axios.post(`${setAvatarRoute}`, {
                userId: user?._id,
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    "chat-app-user-info",
                    JSON.stringify(user)
                );
                navigate("/chat");
            } else {
                toast.error(
                    "Error setting avatar, please try again!",
                    toastOption
                );
            }
        }
    };
    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={Loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an avatar as your profile picture</h1>
                        <div className="avatars">
                            {avatars.map((avatar, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`avatar ${
                                            selectedAvatar === index
                                                ? "selected"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            src={`data:image/svg+xml;base64,${avatar}`}
                                            alt="avatar"
                                            onClick={() => {
                                                setSelectedAvatar(index);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            className="submit-btn"
                            onClick={() => {
                                setProfliePicture();
                            }}
                        >
                            Set as Profile Picture
                        </button>
                    </div>
                </Container>
            )}

            <ToastContainer />
        </>
    );
};
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        justify-content: center;
        h1 {
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #4e0eff;
        }
    }
`;

export default SetAvatar;
