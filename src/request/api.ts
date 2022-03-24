import {get,post} from './https';

const url:string | undefined = process.env.VUE_APP_BASEURL;

//连接中心服务器
export const signService:any = (p:Object) : Object => get(url + '/wallet_login/',p);
//支持网络以及合约地址
export const ChainList:any = (p:Object) : Object => get(url + '/get_networks/',p);
//盲盒信息
export const BlindList:any = (p:Object) : Object => get(url + '/get_serials/',p);
//盲盒签名
export const SignMint:any = (p:Object) : Object => get(url + '/mint_sig/',p); 
//获取ABI
export const GetABI:any = (p:Object) :Object => get(url + '/get_contract_abi/',p)