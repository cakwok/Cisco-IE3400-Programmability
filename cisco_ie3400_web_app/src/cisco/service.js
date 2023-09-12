
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cvcenter from "./cvCenter";
import Ie3400 from "./ie3400";

function Services(app) {
  
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
        <Ie3400 intConfig={intConfig} 
                intsStatus={intsStatus}
                operStatus={operStatus}
                adminStatus={adminStatus}
                changeInt={changeInt}
        />
        <Cvcenter cvSensor={cvSensor}/>
    </div>
  );
}

export default Services;