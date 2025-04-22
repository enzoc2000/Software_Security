
import CardForm from "./CardForm";
import supplyChainLogo from './assets/logoSupplyChain.png'
function Login(){
    return(
        <>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <div style={{display: 'flex', justifyContent: 'center'}} >
                    <img style={{width:"150px" }} src={supplyChainLogo} alt="logo" />
                </div>
                <CardForm>
                </CardForm>
            </div>
        </>
    )
}

export default Login;