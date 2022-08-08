class Stage {
    static zenkeshiImage: HTMLElement;
    static stageElement: HTMLElement;
    static scoreElement: HTMLElement;
    static board: number[][];
    static yasaiCount: number;
    static fallingYasaiList: [];

    static initialize() {
        //htmlからステージの元となる要素を取得し大きさを設定する
        const stageElement = <HTMLInputElement>document.getElementById("stage");
        stageElement.style.width = Config.yasaiImgWidth * Config.stageCols + 'px';
        stageElement.style.height = Config.yasaiImgHeigth * Config.stageRows + 'px';
        stageElement.style.backgroundColor = Config.stageBackgroundColor;
        this.stageElement = stageElement;

        const zenkeshiImage = <HTMLInputElement>document.getElementById("zenkeshi");
        zenkeshiImage.width = Config.yasaiImgWidth * 6;
        zenkeshiImage.style.position = 'absolute';
        zenkeshiImage.style.display = 'none';
        this.zenkeshiImage = zenkeshiImage;
        stageElement.appendChild(zenkeshiImage);

        const scoreElement = <HTMLInputElement>document.getElementById("score");
        scoreElement.style.backgroundColor = Config.scoreBackgroundColor;
        scoreElement.style.top = Config.yasaiImgHeigth * Config.stageRows + 'px';
        scoreElement.style.width = Config.yasaiImgWidth * Config.stageCols + 'px';
        scoreElement.style.height = Config.fontHeigth + 'px';
        this.scoreElement = scoreElement;

        //メモリを準備する
        this.board = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        let yasaiCount = 0;
        for(let y = 0; y < Config.stageRows; y++){
            const line = this.board[y] || (this.board[y] = []);
            for(let x = 0; x < Config.stageCols; x++) {
                const yasai = line[x];
                if(yasai >= 1 && yasai <= 5) {
                    // line[x] = {yasai: yasai, element: this.setYasai(x, y, yasai)};
                    this.setYasai(x, y, yasai);
                    yasaiCount++;
                } else {
                    line[x] = 0;// nullにしないとダメかも
                }
            }
        }
        this.yasaiCount = yasaiCount;
    }

    //画面とメモリ両方にyasaiをセットする
    static setYasai(x: number, y: number, yasai: number) {
        //画像を作成し配置する
        const yasaiImage = YasaiImage.getYasai(yasai);
        yasaiImage.style.left = x * Config.yasaiImgWidth + 'px';
        yasaiImage.style.top = y * Config.yasaiImgHeigth + 'px';
        this.stageElement.appendChild(yasaiImage);
        //メモリにセットする
        this.board[y][x] = {
            yasai: yasai,
            element: yasaiImage
        }
    }

    //自由落下をチェックする
    static cheackFall() {
        this.fallingYasaiList.length = 0;
        let isFalling = false;
        //下の行から上の行を見ていく
        for(let y = Config.stageRows - 2; y >= 0; y--) {
            const line = this.board[y];
            for(let x = 0; x < line.length; x++) {
                if(!this.board[x][y]) {
                    //このマスに野菜がなければ次
                    continue;
                }
                if(!this.board[y + 1][x]) {
                    //この野菜は落ちるので取り除く
                    let cell = this.board[y][x];
                    this.board[y][x] = 0;
                    let dst = y;
                    while(dst + 1 < Config.stageRows && this.board[dst + 1][x] == null) {
                        dst++;
                    }
                    //最終目的地に置く
                    this.board[dst][x] = cell;
                    //落ちるリストに入れる
                    this.fallingYasaiList.push({
                        element: cell.element,
                        position: y * Config.yasaiImgHeigth,
                        destination: dst * Config.yasaiImgHeigth,
                        falling: true,
                    });
                    //落ちるものがあった事を記憶しておく
                    isFalling = true;
                }
            }
        }
        return isFalling;
    }
    //自由落下させる
    static fall() {
        let isFalling = false;
        for(const fallingYasai of this.fallingYasaiList) {
            if(!fallingYasai.falling) {
                //自由落下が終わっている
                continue;
            }
            let position = fallingYasai.position;
            position += Config.freeFallingSpeed;
            if(position >= fallingYasai.destination) {
                //自由落下終わり
                position = fallingYasai.destination;
                fallingYasai.falling = false;
            } else {
                //まだ落下している野菜がある事を記憶する
                isFalling = true;
            }
            //新しい位置を保存する
            fallingYasai.position = position;
            //野菜を動かず
            fallingYasai.element.style.top = position + 'px';
        }
        return isFalling;
    }
}