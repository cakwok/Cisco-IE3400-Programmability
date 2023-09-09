import React, { useState, useEffect } from "react";
import axios from "axios";


function Cisco () {

    const proxyServerUrl = process.env.REACT_APP_SERVER_API_URL;
    
    const intConfigUrl = proxyServerUrl + "/cisco/intConfig";
    const intStatusUrl = proxyServerUrl + "/cisco/intStatus";
    const cvUrl = proxyServerUrl + "/cisco/cvSensor";
 
    const [intConfig, setIntConfig] = useState();
    const [intsStatus, setIntsStatus] = useState();
    const [toggleAdminStatus, settoggleAdminStatus] = useState('');
    const [cvSensor, setCvSensor] = useState();

    const getInterfacesCfg = async () => {
        const response = await axios.get(`${intConfigUrl}`);
        setIntConfig(response.data);
      };

    const getInterfacesStatus = async () => {
        const response = await axios.get(`${intStatusUrl}`);
        setIntsStatus(response.data);
      };

    const getCvSensor = async () => {
        const response = await axios.get(`${cvUrl}`);
        setCvSensor(response.data);
      };    

    const changeInt = async (adminStatus, intName) => {

        let index = "";
        let intType = "";
        let intNum = "";

        const firstDigit = intName.match(/\d/); // Find the first occurrence of a digit
        if (firstDigit) {
            index = firstDigit.index;
            intType = intName.substring(0, index);
            intNum = intName.substring(index);
        }

        if (adminStatus === 'if-state-up') {
            const patchBody =  {
                "Cisco-IOS-XE-native:interface": {
                    [intType]: [
                    {
                      "name": intNum,
                      "shutdown": [
                        null
                      ]
                    }
                  ]
                }
              };
            const response = await axios.patch(intConfigUrl, patchBody);
        } else {
            const encodedIntNum = encodeURIComponent(intNum);
            const response = await axios.delete(intConfigUrl + "/interface/" + intType + encodedIntNum + "/shutdown");
        }

        settoggleAdminStatus(adminStatus);
      };

    let adminStatus = "";
    let operStatus = "";

    useEffect(() => {
        getInterfacesCfg();
        getInterfacesStatus();
        getCvSensor();
    }, [toggleAdminStatus]);

    return (
    <div>
        <h4 style={{marginTop:"10px", marginBottom:"30px"}}>Software Defined Cyber Vision Sensor</h4>
        <h5>IE3400-2</h5>
        {/*{JSON.stringify(intConfig , null, 2)} */}
        <div className="table-responsive" style={{marginTop:"10px", marginBottom:"10px"}}>
            <table className="table">
            <tbody>
                    <tr>
                        {intConfig ? (
                            <ul>
                                 <div className="row"  style={{marginBottom:"5px"}}>
                                    <div className="col-3" style={{borderBottom: "1px solid black"}}> 
                                        Interface
                                    </div>   
                                    <div className="col-3" style={{borderBottom: "1px solid black"}}> 
                                        Description
                                    </div>   
                                    <div className="col-2" style={{borderBottom: "1px solid black"}}> 
                                        Oper Status
                                    </div>
                                    <div className="col-2" style={{borderBottom: "1px solid black"}}> 
                                        Admin Status
                                    </div> 
                                </div>
                                {intsStatus["Cisco-IOS-XE-interfaces-oper:interfaces"]["interface"].map((interfaceObj, index) => (
                                    <li key={index}>
                                        <div className="row"  style={{marginBottom:"5px"}}>
                                            <div className="col-3"> 
                                                {interfaceObj.name}
                                            </div>   
                                            <div className="col-3"> 
                                                {interfaceObj.description}
                                            </div>   
                                            <div className="col-2"> 
                                                {operStatus = interfaceObj['oper-status'] === 'if-oper-state-ready' ? 'up' : 'down'}
                                            </div>
                                            <div className="col-2"> 
                                                {adminStatus = interfaceObj['admin-status'] === 'if-state-up' ? 'up' : 'down'}
                                            </div>   
                                            <div className="col-1"> 
                                                <button className={`btn btn-sm ${operStatus === 'up' ? 'btn-danger' : 'btn-success'}`} onClick={() => changeInt(interfaceObj['admin-status'], interfaceObj.name)}>
                                                    {adminStatus === 'up' ? 'Shut' : 'No Shut'}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>loading....</p>
                            )}
                    </tr>
                </tbody>
            </table>
        </div>

        <h5 style={{marginTop:"10px", marginBottom:"30px"}}>Cyber Vision Center - Sensor Explorer</h5>
        <div className="table-responsive" style={{marginTop:"10px", marginBottom:"10px"}}>
            {cvSensor ? (
                <div>
                    <p>Sensor IP: {cvSensor.ip}</p>
                    <p>Enrollment Status: {cvSensor.status.enrollmentStatus}</p>
                    <p>Operational Status: {cvSensor.status.operationalStatus}</p>
                </div>
            ) : (
                <p>loading ... </p>
            )}
        </div>
    </div>
    );
   
}

export default Cisco;