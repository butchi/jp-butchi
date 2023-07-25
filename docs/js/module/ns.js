/*
 * グローバル直下に変数を置かないよう、ネームスペースを切る。
 * ネームスペース以下の変数にアクセスしたいときは各クラスでこれをimportする
 */

globalThis.Btc = globalThis.Btc || {}
const ns = globalThis.Btc
export default ns
