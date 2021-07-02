import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Style from './RequestRow.module.css'


export default props => {
    return (
        <div className={Style.bgclor} style={{ overflow: "hidden" }}>
            {/* <div style={{}}> */}
            <Container style={{
                marginTop: 80, overflow: "auto",
                height: "calc(100vh - 70px)",
                padding: "0px 10px"
            }} >
                <Head>
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                </Head>
                <Header />
                {props.children}
            </Container>
        </div>

        // </div>

    );
};