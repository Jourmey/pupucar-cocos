
import { _decorator, Component, Node, Button, EditBox } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from '../GameManager';
/**
 * Predefined variables
 * Name = LoginScreenManager
 * DateTime = Thu Nov 11 2021 11:55:50 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = LoginScreenManager.ts
 * FileBasenameNoExtension = LoginScreenManager
 * URL = db://assets/script/login/LoginScreenManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('LoginScreenManager')
export class LoginScreenManager extends Component {

    // 登录
    @property({ type: Button })
    Button_Init: Button | null = null;

    // 用户名
    @property({ type: EditBox })
    EditBox_PlayId: EditBox | null = null;


    start() {
        this.Button_Init?.node.on(Node.EventType.TOUCH_START, this.Button_Init_Click);
        this.EditBox_PlayId?.node.on("text-changed", this.callback, this);
        // GameManager.Instance().SetPlayerName("jourmey.top");
    }

    callback(editbox: EditBox) {
        GameManager.Instance().SetPlayerName(editbox.string);
    }

    Button_Init_Click() {
        GameManager.Instance().InitMGOBE(event => {
            GameManager.Instance().LoadScene("match");
        });
    }

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
