/** 导入了crypto模块，它是Node.js内置的加密模块，提供了各种加密算法和哈希算法 */
import crypto from 'crypto';

/** 用于加密和解密数据 */
const SECRET = 'ANTONIO-REST-API';

/**
 * @description 使用crypto模块的randomBytes()方法生成8个字节的随机数，并使用base64编码将其转换为字符串。这个函数可以用于生成随机的盐值 
 * @returns 
 */
export const random = () => crypto.randomBytes(8).toString('base64');

/**
 * @description 使用crypto模块的createHmac()方法生成基于哈希的消息身份验证代码（HMAC），使用SHA-256哈希算法，并将盐值和密码连接起来作为输入，用/分隔。然后，使用update()方法将SECRET作为密钥来更新HMAC。最后，使用digest()方法将HMAC转换为十六进制字符串。这个函数可以用于对密码进行哈希并进行身份验证。
 * @param salt 盐值 
 * @param password 密码 
 * @returns 
 */
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}