import Vue from 'vue';
import Web3 from 'web3';
import { message } from 'ant-design-vue';
import { GetABI } from '@/request/api'

const win: any = window;
const web3js: any = win.web3;
class EthTool {
    public web3j: any;
    public ethereum: any;
    constructor() {
        interface ChainMsg {
            network_id: string,
            chain_id: string,
            network_name: string,
            rpc_url: string,
            explorer: string
        }
        let web3Provider: any;
        if (win.ethereum) {
            web3Provider = win.ethereum;
        } else if (web3js) {
            web3Provider = web3js.currentProvider;
        }
        this.web3j = new Web3(web3Provider);
        this.ethereum = win.ethereum;
    };
    //判断公链
    public networkType(_chain: string) {
        const condition: boolean = (_chain == this.ethereum.chainId);
        if (!condition) {
            message.error('Please switch to the corresponding blockchain network');
            return null;
        };
        return 'next';
    }
    //公链选择
    public async chainTool(_chain: Array<{ network_id: string, chain_id: string, network_name: string, rpc_url: string }>, _index: number) {
        try {
            await this.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${_chain[_index].network_id}` }]
            })

        } catch (switchError) {
            const err : any = switchError;
            if (err.code === 4902) {
                const params = [
                    {
                        chainId: this.web3j.utils.toHex(_chain[_index].chain_id), // A 0x-prefixed hexadecimal string
                        chainName: _chain[_index].network_name,
                        rpcUrls: [_chain[_index].rpc_url],
                    },
                ];
                try {
                    await this.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: params,
                    });
                    console.log(456)
                } catch (addError) {
                    console.log(addError)
                    // handle "add" error
                }
            }
        }
    }
    //Contect Wallet - 连接钱包
    public async contectWallet() {
        if (!win.ethereum) {
            Vue.prototype.$message.error({ message: 'Your browser does not have a wallet installed' });
            return null;
        } else {
            // let test: string;
            try {
                if (this.ethereum.selectedAddress) {
                    // test = win.ethereum.selectedAddress
                    return this.ethereum.selectedAddress;
                } else {
                    const result = await this.ethereum.request({ method: 'eth_requestAccounts' }) // 登录调用
                    // test = result
                    return result;
                }
            } catch (err) {
                return err;
            }
        }
    }
    //签名登陆
    public async encrypt(_address: string) {
        let t: number = Math.floor(Date.now() / 1000);
        let _nonce: string = "acc_" + t.toString() + this.web3j.utils.toChecksumAddress(_address)
        this.web3j.eth.handleRevert = true;
        let signature = await this.web3j.eth.personal.sign(_nonce, _address);
        const body: {} = {
            time: t,
            signature: signature
        }
        return body;
    };
    //购买盲盒
    public async openBlind(_params: { _price: number, _sign: string, _authids: Array<number>, _contract_name: string, _contract_address: string, _token: string }) {
        return new Promise(async (resolve: any, reject: any) => {
            // console.log(_params._contract_name)
            // return
            const ABI = await GetABI({ contract: _params._contract_name });
            // return
            let contract = new this.web3j.eth.Contract(ABI.data.abi, _params._contract_address);
            console.log(contract);
            if (_params._token) {
                const token_abi = await GetABI({ contract: 'GameFi' });
                let gficontract = new this.web3j.eth.Contract(token_abi.data.abi, _params._token);
                let allow = await gficontract.methods.allowance(this.ethereum.selectedAddress, _params._contract_address).call();
                if (allow < Number(_params._price)) {
                    await gficontract.methods.approve(_params._contract_address, "999999999000000000000000000").send({ from: this.ethereum.selectedAddress });
                };
            }
            if (_params._token) {
                contract.methods.buy(this.ethereum.selectedAddress, _params._authids, _params._price.toString(), 0, _params._token, _params._sign).send({ from: this.ethereum.selectedAddress }).then((res: {}) => {
                    console.log(res)
                    resolve(res);
                }).catch((err: any) => {
                    console.log(err);
                    if (err.code == 4001) {
                        message.error('您已取消当前操作')
                    } else {
                        message.error('网络错误')
                    }
                    resolve('null')
                })
            } else {
                contract.methods.ethBuy(this.ethereum.selectedAddress, _params._authids, _params._price.toString(), 0, _params._sign).send({ from: this.ethereum.selectedAddress, value: _params._price }).then((res: {}) => {
                    console.log(res);
                    resolve(res);
                }).catch((err: any) => {
                    console.log(err);
                    if (err.code == 4001) {
                        message.error('您已取消当前操作')
                    } else {
                        message.error('网络错误')
                    }
                    resolve('null')
                })
            };
        })
    }

    //检查钱包是否连接
    public async isConnected() {
        const result: boolean = this.web3j.currentProvider.isConnected();
        return result;
    }
    //获取用户信息
    public async getAccount() {
        const result = this.web3j.eth.getAccounts();
        return result;
    }
    //校验地址
    public checkAddr(_address: string) {
        return this.web3j.utils.toChecksumAddress(_address)
    }
};
export default new EthTool();