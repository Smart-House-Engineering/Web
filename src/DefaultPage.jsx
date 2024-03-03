import { useState, useEffect } from "react";

export default function DefaultPage() {
    const [sensors, setSensors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:5000/api/modes/defaultMode",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                    cookies: localStorage.getItem("SmartHouseToken"),
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data.devices);
                setSensors(data.devices);
            } else {
                console.error(
                    `Failed to fetch data. Status: ${response.status}`
                );
            }
        };

        fetchData();
    }, []);

    console.log("sensors", sensors);

    return (
        <div className="default">
            <h1>I am the default page {sensors.fan}</h1>
        </div>
    );
}
