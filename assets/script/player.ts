
import { _decorator, Component, Node, RigidBody2D, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

import { AxInput } from './AxInput';
const Input = AxInput.instance;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Fri Oct 22 2021 20:47:30 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = player.ts
 * FileBasenameNoExtension = player
 * URL = db://assets/script/player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Player')
export class Player extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        // [3]
    }

    update(deltaTime: number) {
        // [4]
        let speed = 8;

        let rb = this.getComponent(RigidBody2D);
        let lv = rb!.linearVelocity;

        if (Input.is_action_pressed(KeyCode.ARROW_LEFT)) {
            lv.x = -speed;
            lv.y = 0;
        } else if (Input.is_action_pressed(KeyCode.ARROW_RIGHT)) {
            lv.x = speed;
            lv.y = 0;
        } else {
            lv.x = 0;
            if (Input.is_action_pressed(KeyCode.ARROW_DOWN)) {
                lv.y = -speed;
            } else if (Input.is_action_pressed(KeyCode.ARROW_UP)) {
                lv.y = speed;
            } else {
                lv.y = 0;
            }
        }

        // if (Input.is_action_pressed(KeyCode.KEY_Q)) {
        //     this.node.angle += 1
        // }

        rb!.linearVelocity = lv;
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
