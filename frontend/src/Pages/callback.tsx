import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import * as jose from "jose";

// Shadcn UI imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAddress {
    zone?: string;
    woreda?: string;
    region?: string;
}

interface UserInfo {
    name?: string;
    email?: string;
    gender?: string;
    phone_number?: string;
    nationality?: string;
    birthdate?: string;
    address?: UserAddress;
    picture?: string;
    [key: string]: any;
}

const decodeUserInfoResponse = async (
    userinfoJwtToken: string
): Promise<UserInfo | null> => {
    try {
        return jose.decodeJwt(userinfoJwtToken) as UserInfo;
    } catch (error) {
        console.error("Error decoding JWT user info:", error);
        return null;
    }
};

const Callback: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchToken = async (code: string) => {
            try {
                const response = await axios.post<{ access_token: string }>(
                    "http://localhost:5000/api/token",
                    { code }
                );

                const { access_token } = response.data;

             await axios.post<{ data: string }>(
                    "http://localhost:5000/api/userinfo/",
                    { access_token },{
                        withCredentials: true
                    }
                );

               navigate("/");
            } catch (error) {
                console.error("Error fetching token or user info:", error);
            }
        };

        const query = new URLSearchParams(location.search);
        const code = query.get("code");

        if (code) {
            fetchToken(code);
        }
    }, [location.search]);

    return (
        <div className="min-h-screen bg-muted/30 text-white flex flex-col items-center justify-center">
            <header className="w-full border-b border-white/10 py-6 mb-8 ">
                <div className="container flex items-center gap-4 mx-auto px-4">
                   
                    <h1 className="text-2xl font-bold  text-black">
                        User Info
                    </h1>
                </div>
            </header>

            <main className="w-full max-w-xl flex-1 flex flex-col items-center justify-center px-4">
                {userInfo ? (
                    <Card className="w-full bg-white text-black shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold">
                                User Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center gap-6">
                                <Avatar className="w-24 h-24 border-4 border-black">
                                    {userInfo.picture ? (
                                        <AvatarImage src={userInfo.picture} alt={userInfo.name} />
                                    ) : (
                                        <AvatarFallback>
                                            {userInfo.name
                                                ? userInfo.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()
                                                : "?"}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <ul className="w-full space-y-3">
                                    <li>
                                        <span className="font-medium">Name:</span>{" "}
                                        {userInfo.name || "N/A"}
                                    </li>
                                    <li>
                                        <span className="font-medium">Email:</span>{" "}
                                        {userInfo.email || "N/A"}
                                    </li>
                                    <li>
                                        <span className="font-medium">Gender:</span>{" "}
                                        {userInfo.gender || "N/A"}
                                    </li>
                                    <li>
                                        <span className="font-medium">Phone:</span>{" "}
                                        {userInfo.phone_number || "N/A"}
                                    </li>
                                    <li>
                                        <span className="font-medium">Nationality:</span>{" "}
                                        {userInfo.nationality || "N/A"}
                                    </li>
                                    <li>
                                        <span className="font-medium">Date of Birth:</span>{" "}
                                        {userInfo.birthdate || "N/A"}
                                    </li>
                                    <li>
                                        <span className="font-medium">Address:</span>{" "}
                                        {userInfo.address
                                            ? [
                                                    userInfo.address.zone,
                                                    userInfo.address.woreda,
                                                    userInfo.address.region,
                                                ]
                                                    .filter(Boolean)
                                                    .join(", ") || "N/A"
                                            : "N/A"}
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="w-full bg-white text-black shadow-lg">
                        <CardContent className="py-12 text-center">
                            <span className="text-lg font-medium">Loading...</span>
                        </CardContent>
                    </Card>
                )}
            </main>


        </div>
    );
};

export default Callback;
