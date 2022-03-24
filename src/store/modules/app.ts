import Vue from 'vue';
import { message } from 'ant-design-vue';
import * as api from '@/request/api';
import router from '@/router/index';
import EthTool from '@/util/web3/index';

function getStorage(key: string, defaults: string) {
    let data = sessionStorage.getItem(key);
    return data !== null ? data : defaults;
};

const app: Object = {
    state: {
        //语言
        language: sessionStorage.getItem('language') || 'zh-CN',
        //用户连接地址
        accountAddress: sessionStorage.getItem('accountAddress') || null,
        //路由动画
        transiname: 'default-trans',
        //用户信息
        account: JSON.parse(getStorage('account', '{}'))
    },
    mutations: {
        //设置语言
        setLanguage: (state: any, language: string): void => {
            state.language = language;
            sessionStorage.setItem('language', language);
        },
        //更新用户连接地址
        upAccountAddress: (state: any, accountAddress: string): void => {
            state.accountAddress = accountAddress;
            sessionStorage.setItem('accountAddress', accountAddress);
        },
        //更新用户信息
        upAccount: (state: any, account: {}) => {//更新用户信息
            state.account = account;
            sessionStorage.setItem('account', JSON.stringify(account))
        },
        //更新路由
        setTransiname: (state: any, transiname: string): void => {
            state.transiname = transiname;
        },
    },
    actions: {
        //连接钱包
        async signWallet() {
            enum Msg {
                code,
            };
            //获取默认支持公链
            const chainDefault = await api.ChainList();
            if (!chainDefault.data) {
                message.error('Network anomalies, please try again later');
                return;
            };
            // 链信息检查
            interface ChainMsg {
                network_id: string,
                chain_id: string,
                network_name: string,
                rpc_url: string,
            }
            //公链切换
            const params: Array<ChainMsg> = [
                {
                    network_id: chainDefault.data.polygontest.network_id,
                    chain_id: chainDefault.data.polygontest.network_id.toString(16),
                    network_name: chainDefault.data.dft_chain,
                    rpc_url: chainDefault.data.polygontest.host,
                }
            ];
            const win: any = window;
            // 判断当前网络ID
            if (win.ethereum.networkVersion != chainDefault.data.polygontest.network_id) {
                await EthTool.chainTool(params, 0);
                return
            }
            //唤起钱包
            const result = await EthTool.contectWallet();
            if (result.code) {
                const code: number = result.code;
                switch (code) {
                    case 0:
                        //当前已存在操作窗口
                        message.error('请完成当前窗口操作');
                        break;
                    case 4001:
                        //用户取消操作
                        message.error('您已取消当前操作');
                        break;
                };
                return;
            };
            //签名验证
            const sign = await EthTool.encrypt(result);
            if (!sign) {
                return;
            };
            let signWallet: any = sign;
            //服务器登录参数验证
            interface signMsg {
                addr: string,
                time: number,
                sig: string
            };
            const signParams = {
                addr: EthTool.checkAddr(result),
                time: signWallet.time,
                sig: signWallet.signature
            };
            //登录中心服务器
            const signResult = await api.signService(signParams as signMsg);
            if (!signResult.data) {
                message.error('Network anomalies, please try again later');
                return null;
            }
            return signResult.data;
        },
        //购买盲盒
        async butBlind(_app: any, _blind: any) {
            interface singMsg {
                serial_id: string;
                num: number;
                session: string;
                option: {};
            }
            const params = {
                serial_id: _blind.id,
                num: _blind.mint_num,
                session: _app.state.account.session,
                option: {
                    sex: "1",
                },
            };
            //判断当前链
            const chain = await api.ChainList();
            for (let key in chain.data) {
                if (_blind.network == key) {
                    Vue.prototype.$set(_blind, 'host', chain.data[key].host);
                    Vue.prototype.$set(_blind, 'network_id', chain.data[key].network_id);
                    Vue.prototype.$set(_blind, 'chain_id', chain.data[key].network_id);
                    Vue.prototype.$set(_blind, 'network_name', key);
                }
            };
            // 链信息检查
            interface ChainMsg {
                network_id: string;
                chain_id: string;
                network_name: string;
                rpc_url: string;
            }
            let chainParams: Array<ChainMsg> = [
                {
                    network_id: _blind.network_id,
                    chain_id: _blind.network_id.toString(16),
                    network_name: _blind.network_name,
                    rpc_url: _blind.host,
                },
            ];
            //公链切换
            const win: any = window;
            // 判断当前网络ID
            if (win.ethereum.networkVersion != _blind.network_id) {
                message.error("您当前的主网不匹配，请在切换后重试");
                await EthTool.chainTool(chainParams, 0);
                return 'null';
            }
            //Mint签名
            const result = await api.SignMint(params as singMsg);
            console.log(result);
            interface openMsg {
                _price: number;
                _sign: string;
                _authids: Array<number>;
                _contract_name: string;
                _contract_address: string;
                _token: string;
            }
            const openParams = {
                _price: result.data.total_price,
                _sign: result.data.sign,
                _authids: result.data.auths,
                _contract_name: result.data.contract_name,
                _contract_address: result.data.contract_addr,
                _token: _blind.token_addr,
            };
            //调用合约
            const buyResult = await EthTool.openBlind(openParams as openMsg);
            console.log(buyResult)
            return buyResult;
        }
    },
    getter: {

    },
};
export default app;