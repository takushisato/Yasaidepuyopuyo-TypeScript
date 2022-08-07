class Stage {
    static zenkeshiImage: HTMLElement;
    static stageElement: HTMLElement;
    static scoreElement: HTMLElement;
    static board: number[][];
    static yasaiCount: number;

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
    //TypeScript追加
    static setYasai(x: number, y: number, yasai: number) {
        throw new Error("Method not implemented.");
    }
}