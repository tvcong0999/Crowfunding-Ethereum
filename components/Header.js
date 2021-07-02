import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
import styles from './RequestRow.module.css';
// import {logo} from '../assets/blockchainLogo.png';

export default () => {
    return (
        <div style={{position: "absolute", top: 0,left: 0, width: "100%", boxShadow: "0px 7px 9px -2px #000000c2"}}>
<div className={styles.containerHeader}>
            <div className={styles.logo}>
                
                <img style={{width: 35}} src={"https://tokens.1inch.exchange/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"} />
               
                    <Link route="/">
                        <div style={{color: "white", fontSize: 17, fontWeight: "bold", marginLeft:5}}>
                            CrowdCoin
                        </div>
                    </Link>   
                    
                </div>    
                <div className={styles.content}>
                    {/**/}
                    <div className={styles.btn}>
                    <Link route="/">
                            <div className="item">
                            Campaings
                            </div>
                        </Link>
                    </div>
                  
                {/* <Menu style={{ marginTop: 0 }}>
                    <Link route="/">
                        <a className="item">
                            CrowdCoin
                        </a>
                    </Link>     

                    <Menu.Menu >

                        <Link route="/">
                            <a className="item">
                            Campaings
                            </a>
                        </Link>
                        <Link route="/campaigns/new">
                            <a className="item">
                            +
                            </a>
                        </Link>
                    </Menu.Menu>
                </Menu> */}
                </div>
            
            
        </div>
        </div>
        
        
    );
};