## 发布后地址
[点击游玩](https://game-playground.vercel.app/)


## mine sweep (**已完成**)
to do list
- [x] 完成扫雷基础功能
- [x]  `./src/mine-sweep/gen.ts` 增加根据不同`level`生成`gird`.
- [x] 增加倒计时 
- [x] 显示地雷个数

- 借鉴anthonyfu的vue扫雷，[链接](https://www.bilibili.com/video/BV1ia411b7jY/?spm_id_from=333.999.0.0)

## game of life (**已完成**)

- rule of conway's game life. [wiki](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [official website](https://conwaylife.com/)
- [leetcode289](https://leetcode.com/problems/game-of-life/description/)

## sudoku (**待优化**)

## snake (**正在制作**)
- [x] 随机生成食物
- [x] 身体碰撞检测
- [x] 蛇身移动 & 有限状态机 整理文档

## tetris
- [x] 存储已经落地的方块的坐标 `./tetris/store.ts`
- [x] 碰撞边界检测 `./tetris/algo.ts`
- [x] 方块的旋转 
- [x] 满一行消除逻辑