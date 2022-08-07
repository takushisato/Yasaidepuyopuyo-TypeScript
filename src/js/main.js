// 設定
var Config = /** @class */ (function () {
    function Config() {
    }
    return Config;
}());
Config.yasaiImgWidth = 40; //画像の幅
Config.yasaiImgHeigth = 40; //画像の高さ
Config.fontHeigth = 33; //カウントのフォントの高さだけど使わないかも
Config.stageCols = 6; //横の個数
Config.stageRows = 12; //縦の個数
// フィールドサイズ追加
Config.yasaiImgHeigth = (window.innerHeight - Config.fontHeigth) / Config.stageRows;
Config.yasaiImgWidth = Config.yasaiImgHeigth;
Config.stageBackgroundColor = '#ffffff'; //ステージの背景色
Config.scoreBackgroundColor = '#24c06b'; //スコアの背景色
Config.freeFallingSpeed = 16; //自由落下のスピード
Config.eraseYasaiCount = 4; //何個以上揃ったら消えるか
Config.eraseAnimationDuration = 30; //何フレームで消すか
Config.yasaiColors = 4; //野菜の種類
Config.playerFallingSpeed = 0.9; //自然落下のスピード
Config.playerDownSpeed = 10; //下を押した時のスピード
Config.playerGroundFrame = 20; //何フレーム接地したら固定するか
Config.playerMoveFrame = 10; //左右移動時のフレーム数
Config.playerRatateFrame = 10; //回転に消費するフレーム数
Config.zernkeshiDuration = 150; //全消し時のアニメ－ションミリセカンド
Config.gameOverFrame = 3000; //ゲームオーバーのサイクルフレーム
