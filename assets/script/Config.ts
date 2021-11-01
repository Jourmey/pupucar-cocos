
export type GameState = "Start" | "Gaming";
export const START = "Start";
export const GAMING = "Gaming";


export default {
    // MGOBE 游戏信息
    gameId: "obg-2bhr36pp",
    secretKey: "42bb3be65c996c92eefdbb5c70ae00886e757270",
    url: "2bhr36pp.wxlagame.com",
    // // 玩家 ID，建议使用真实的 openId
    // openId: mockOpenId(),
    // 默认匹配 Code
    matchCode: "match-08iff2he",
    START,
    GAMING,
};



export enum PlayCode {
    NONE = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4,
    STOP = 5,
}

export interface Frame {
    KeyCode: PlayCode;
}
