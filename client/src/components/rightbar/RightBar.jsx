import "./rightBar.scss"
import CloseIcon from '@mui/icons-material/CloseRounded';

const RightBar = () => {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions for you</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <span>Hanan</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <CloseIcon/>

                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <span>Adeeb</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <CloseIcon/>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Latest feed</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <p>
                            <span>Raihan</span> Updated profile pic
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <p>
                            <span>Raihan</span> Updated profile pic
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <p>
                            <span>Raihan</span> Updated profile pic
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                
                <div className="item">
                    <span>Friends online</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <div className="online"/>
                            <span>Raihan</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <div className="online"/>
                            <span>Raihan</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <div className="online"/>
                            <span>Raihan</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/DarkRound.png" alt="" />
                            <div className="online"/>
                            <span>Raihan</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar