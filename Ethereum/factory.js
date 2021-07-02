import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x8cD00b89697e6be26DE6E9D3C045Ad580a472fD9'
);

export default instance;