// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    var yy = Math.random() * 3 + 1;
    this.x = -50;
    this.y = parseInt(yy) * 83 - 17;
    this.speed = Math.random() * 100 + 50; //产生一个随机的速度

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';

};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {

    // this.speed = 25;
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 410;
}
var count = 0;
Player.prototype.update = function() {

    console.log(this.y);

    for (var i = 0; i < allEnemies.length; i++) {
        if ((Math.abs(this.y - allEnemies[i].y)) < 20) {
            if ((Math.abs(this.x - allEnemies[i].x)) < 60) {
                this.x = 200;
                this.y = 410;
            }
        }
    }

    if (this.y === -5) {
        count++;
        //经过测试，经过3ms后，就可以实现到达河岸，并网页输出胜利指示，确定后，即可回到原位。
        if (count % 3 === 2) {
            alert("U win！！ 点击确定后进入下一盘游戏");
            this.x = 200;
            this.y = 410;
        }
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(movement) {
    switch (movement) {

        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;

    }
    //console.log(this.x, this.y);

    if (this.x < -2) {

        this.x = -2;

    } else if (this.x > 402) {

        this.x = 402;

    } else if (this.y < -5) {

        this.y = -5;

    } else if (this.y > 410) {

        this.y = 410;
    }

};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];

for (var i = 0; i < 6; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy); //把敌人都放到 allEnemies 数组里面
}

var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});