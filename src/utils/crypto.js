import crypto from 'crypto'
import jsrsasign from 'jsrsasign'
import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt'
import { Base64 } from 'js-base64';
// 加密算法发展  DES==>3DES===>AES   AES更安全
// 3DES（即Triple DES）是DES向AES过渡的加密算法
// AES：高级加密标准，是下一代的加密算法标准，速度快，安全级别高。
let key = 'hl5Dtvsf1gjq8hCwE+lUFqjl7yYcQNPy'
let message = '我'
// 三重数据加密算法  加密模式ECB 填充Pkcs7   还可以配置上iv(偏移量默认为key前8位)
function desEncrypt(message, key){
  let keyHex = CryptoJS.enc.Base64.parse(key);
  let encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return Base64.encode(encrypted.toString());
}
let my = desEncrypt(message, key)
console.log(my,'my')
let by = desDecrypt(my,key)
console.log(by,'by')
// 3DES 解密  
function desDecrypt(message, key){
  const ciphertext = Base64.decode(message);
  const keyHex = CryptoJS.enc.Base64.parse(key);
  const decrypted = CryptoJS.TripleDES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/rzb20kypDANTLSMU30PeoWwP
ZVltVZC3tm6Nh5jlqmldB4hez02ojg+qOfSxvi1SNvlij3rNSKhMnJOofvBlj8/H
nSNX25EBlhC0/8vSkiHuePxGG04oCXvsWTNMJ2W9U54rno0IM2KDrFP5UZDxR8ft
jGOK3tJnuJO2TUQhawIDAQAB
-----END PUBLIC KEY-----`
let prikey = `-----BEGIN PRIVATE KEY-----
MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAikF+SPQHd2UYrG8/
5DFHR+qgTBx4IXequjaI8Tb2JBy/C29MW17HaLjQK90bTk8u+7hhWH4Bh4c5RZaa
sYAg5QIDAQABAkBPr/wn9G+xQ5X7HYxH7JdXPkbyV55uO9ktx20bC0DIAuJ+lZjV
BwE3i+wOVrYO7vIxWsVw/whFmMUfcBViwfQBAiEA7yCCElBZCNowZbEEwvGrZYNe
vVQsY1aHTM0Usz+EaYECIQCUAuPZ4ngWNWtRS1GLhKioriQAPeve7CZ+jrpycFkB
ZQIgJLarAcDQSqmlMJfDEWMlW4qV6x+XSREp6MK74OFppQECIEMZJE4MOsBmqyYJ
bQhAtWzytONfLuS6TaEl9yQWBmN5AiBpLW2iRrSYD/9RNojX5hsvVVuQLz6vdUhE
UlTr1u4j6w==
-----END PRIVATE KEY-----`
// 这个是第一层对称加密 秘钥
export const nonce = '0CoJUm6Qyw8W8jud'
// 生成一个随机的对称加密秘钥
export function createSecretKey(size) {
  const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let key = ''
  for (let i = 0; i < size; i++) {
    let pos = Math.random() * keys.length
    pos = Math.floor(pos)
    key = key + keys.charAt(pos)
  }
  return key
}
// 利用对称加密公钥进行加密 AES加密
export function aesEncrypt(text, secKey) {
  const _text = text
  const lv = new Buffer.from('0102030405060708', 'binary')
  const _secKey = new Buffer.from(secKey, 'binary')
  console.log(_secKey,'_secKey_secKey')
  const cipher = crypto.createCipheriv('AES-128-CBC', _secKey, lv)
  let encrypted = cipher.update(_text, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return encrypted
}
// rsa非对称加密签名验证  私钥签名===》公钥验签
// 签名 常用于判断 参数是否一致    这个不可逆  
// 通过对参数进行对称加密  取出参数 生成签名与前端穿过来的签名作对比   来判断是否有篡改
export function rsaEncrypt(message) {
    let signPublicKey = prikey
    const md5 = CryptoJS.MD5(message).toString().toUpperCase();
    let sig = new jsrsasign.Signature({"alg": "MD5withRSA", "prov": "cryptojs/jsrsa"});
    sig.init(signPublicKey);
    sig.updateString(md5);
    return jsrsasign.hex2b64(sig.sign());
}

// rsa加密  使用公钥加密 发到后端进行私钥解密
export function rsaKeyEncrypt(msg) {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(publicKey)
  const encrypted = jsencrypt.encrypt(msg) //加密的格式 默认为pkcs1  后端也需要对应即可
  console.log(encrypted, 'encrypted')
  return encrypted;
}

  //let pb = '12e45a789c1234d6' //正常情况下后端返回一个publickKey 供我们生成public秘钥
  // console.log(jsrsasign.hex2b64(pb),'jsrsasign.hex2b64(pb)')
  // console.log(jsrsasign.b64tohex(jsrsasign.hex2b64(pb)),'srsasign.b64tohex2(pb)')
  // 此方式用于密码加密
  // let a = `-----BEGIN PUBLIC KEY-----${jsrsasign.hex2b64(pb)}-----END PUBLIC KEY-----`
