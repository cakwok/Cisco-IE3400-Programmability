
function Ie3400({ intConfig, intsStatus, operStatus, adminStatus, changeInt}) {
    return ( 
        <div>
            <h4 style={{marginTop:"10px", marginBottom:"30px"}}>IE 3400 and Cyber Vision Center Programmability</h4>
            <h5>IE3400-2</h5>
            <div className="table-responsive" style={{marginTop:"10px"}}>
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
        </div>
        );
    }
    
export default Ie3400;