
import { _decorator, Component, Node, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;
import { PlayCode, Frame } from './Config';

/**
 * Predefined variables
 * Name = Teammate
 * DateTime = Mon Nov 01 2021 16:59:03 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = teammate.ts
 * FileBasenameNoExtension = teammate
 * URL = db://assets/script/teammate.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Teammate')
export class Teammate extends Component {
    @property
    speed: number = 5;
    private r2d: RigidBody2D;

    start() {
        this.r2d = this.getComponent(RigidBody2D);
    }

    test() {
        console.log("Teammate加载成功");
    }


    Move(f: Frame) {
        let lv = this.r2d!.linearVelocity;
        switch (f.KeyCode) {
            case PlayCode.STOP:
                lv.y = 0;
                lv.x = 0;
                break;
            case PlayCode.LEFT:
                lv.x = -this.speed;
                lv.y = 0;
                break;
            case PlayCode.RIGHT:
                lv.x = this.speed;
                lv.y = 0;
                break;
            case PlayCode.DOWN:
                lv.x = 0;
                lv.y = -this.speed;
                break;
            case PlayCode.UP:
                lv.x = 0;
                lv.y = this.speed;
                break;
        }
        this.r2d!.linearVelocity = lv;
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
