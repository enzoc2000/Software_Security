import "./card.css"
function Card({title, img, isUsed, children}:{title: string, img: string, isUsed: boolean, children: React.ReactNode}) {
    return (
        <>
            <div className="stile-card">
                <img style={{width:"50px"}} src={img} alt="NotFound" className="card-image" />
                <div >
                    <h1 style={{ color:"red", fontSize:"20px"}}>{title}</h1>
                    <p>{children}</p>
                    <p>
                    {isUsed && <span>Checked</span>}
                    {!isUsed && <span>NOT Checked</span>}

                    </p>

                </div>
                

            </div>
        </>
    );
}

export default Card;