
function Cvcenter({ cvSensor}) {
    return (    
        <div>
            <h5 style={{marginBottom:"30px"}}>Cyber Vision Center - Sensor Explorer</h5>
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

export default Cvcenter;