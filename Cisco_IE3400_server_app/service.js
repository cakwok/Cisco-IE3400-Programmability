import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import axios from 'axios';  

function Services(app) {

    dotenv.config();

    const {
        switchUrl,
        cvcUrl,
        username,
        password,
        corsOrigin,
        cvToken,
    } = process.env;

    const credential = `${username}:${password}`;

    //Cisco YANG model
    const intConfigUrl =  `${switchUrl}/restconf/data/Cisco-IOS-XE-native:native/interface`;
    const intStatusUrl = `${switchUrl}/restconf/data/Cisco-IOS-XE-interfaces-oper:interfaces`;
    const base64Credentials = Buffer.from(credential).toString('base64');
    const cvUrl = `${cvcUrl}/api/3.0/sensors/f38ffa1b-e5f5-4ab5-bc6c-c70e45ba7cdc`;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //accept self signed certificate

    //Define a route to proxy requests for self signed certificate
    app.get("/cisco/intConfig", async (req, res) => {
    try {
        const response = await axios.get(intConfigUrl, {
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            Accept: 'application/yang-data+json',
        },
        });
        res.json(response.data);
        } catch (error) {
        res.status(error.response.status).json(error.response.data);
        }
    });

    app.use(express.json());                             //use JSON as data representation
    app.use(express.urlencoded({ extended: true }));     //convert "1/1" convention into non-uri path format

    app.patch("/cisco/intConfig", async (req, res) => {
    try {
        const response = await axios.patch(intConfigUrl, req.body, {
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            'Content-Type': 'application/yang-data+json',
        },
        });
        res.json(response.data);
        } catch (error) {
        res.status(error.response.status).json(error.response.data);
        }
    });

    app.delete("/cisco/intConfig/interface/:id/shutdown", async (req, res) => {
    const id = encodeURIComponent(req.params.id);
    const path = intConfigUrl + "/" + id.replace('GigabitEthernet', 'GigabitEthernet=') + "/shutdown"

    try {
        const response = await axios.delete(path,  {
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            'Content-Type': 'application/yang-data+json',
        },
        });
        res.json(response.data);
        } catch (error) {
        res.status(error.response.status).json(error.response.data);
        }
        
    });

    app.get("/cisco/intStatus", async (req, res) => {
    try {
        const response = await axios.get(intStatusUrl, {
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            Accept: 'application/yang-data+json',
        },
        });
        res.json(response.data);
        } catch (error) {
        res.status(error.response.status).json(error.response.data);
        }
    });

    app.get("/cisco/cvSensor", async (req, res) => {
        try {
        const response = await axios.get(cvUrl, {
            headers: {
            'x-token-id' : cvToken,
            },
        });
            res.json(response.data);
        } catch (error) {
            res.status(error.response.status).json(error.response.data);
        }
        });
    }

export default Services;