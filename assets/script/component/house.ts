
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = House
 * DateTime = Thu Nov 11 2021 17:28:21 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = house.ts
 * FileBasenameNoExtension = house
 * URL = db://assets/script/component/house.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('House')
export class House extends Component {
    // 1
    @property({ type: Label })
    Label1: Label | null = null;
    // 2
    @property({ type: Label })
    Label2: Label | null = null;
    // 3
    @property({ type: Label })
    Label3: Label | null = null;
    // 4
    @property({ type: Label })
    Label4: Label | null = null;
    // 5
    @property({ type: Label })
    Label5: Label | null = null;
    // 6
    @property({ type: Label })
    Label6: Label | null = null;
    // 7
    @property({ type: Label })
    Label7: Label | null = null;
    // 8
    @property({ type: Label })
    Label8: Label | null = null;

    start() {
        // [3]
    }

    UpdateText(t: string[]) {
        for (let index = 0; index < t.length; index++) {
            switch (index) {
                case 0:
                    this.Label1.string = t[0];
                    break;
                case 1:
                    this.Label1.string = t[1];
                    break;
                case 2:
                    this.Label1.string = t[2];
                    break;
                case 3:
                    this.Label1.string = t[3];
                    break;
                case 4:
                    this.Label1.string = t[4];
                    break;
                case 5:
                    this.Label1.string = t[5];
                    break;
                case 6:
                    this.Label1.string = t[6];
                    break;
                case 7:
                    this.Label1.string = t[7];
                    break;
            }
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
