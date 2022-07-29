export default {
    "name": "Testing Model",
    "description": "Testing description of the testing model. Huh.",
    "slackChannel": null,
    "slackWebhook": null,
    "masterAddr": "localhost:8000",
    "date": "6-20-2022",
    "mode": "Read",
    "id": 4,
    "RTUs": [
        {
            "name": "Main RTU",
            "location": "Under Sparge",
            "id": "main-rtu",
            "ipv4": "0.0.0.0:3012",
            "devices": [
                {
                    "driver": "Waveshare",
                    "name": "Relay 0",
                    "id": "2",
                    "state": "Off",
                    "addr": 0,
                    "controller_addr": 1,
                    "pv": null,
                    "sv": null
                },
                {
                    "driver": "Waveshare",
                    "name": "Relay 1",
                    "id": "4",
                    "state": "Off",
                    "addr": 1,
                    "controller_addr": 1,
                    "pv": null,
                    "sv": null
                }
            ]
        }
    ]
}