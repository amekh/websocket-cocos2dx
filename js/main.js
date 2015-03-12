enchant();

var ws = new WebSocket('ws://153.121.54.212:8082/');

ws.onerror = function(e){
  console.log('error.');
}

ws.onopen = function() {
  console.log('open.');
};

ws.onmessage = function(event) {
  // 受信したメッセージを復元
  console.log(event.data);
  var data = JSON.parse(event.data);
 
  // pushされたメッセージを解釈し、要素を生成する
  switch(data.type) {
    case 'up'    : moveUp();    break;
    case 'down'  : moveDown();  break;
    case 'left'  : moveLeft();  break;
    case 'right' : moveRight(); break;
  }
};

window.onload = function(){
    
    var game = new Core(320, 320);

    game.fps = 15;

    game.preload("chara1.png");

    game.onload = function(){
 
        bear = new Sprite(32, 32);

        bear.image = game.assets["chara1.png"];

        bear.x = 0;
        bear.y = 0;
        bear.frame = 5;

        game.rootScene.addChild(bear);

        window.moveRight = function() {
            bear.x += 1;
            bear.frame = bear.age % 2 + 6;
            bear.scaleX = (bear.scaleX > 0) ? bear.scaleX : bear.scaleX * -1;
        };

        window.moveLeft = function() {
            bear.x -= 1;
            bear.frame = bear.age % 2 + 6;
            bear.scaleX = (bear.scaleX < 0) ? bear.scaleX : bear.scaleX * -1;
        };

        window.moveUp = function() {
            bear.y -= 1;
            bear.frame = bear.age % 2 + 6;
        };

        window.moveDown = function() {
            bear.y += 1;
            bear.frame = bear.age % 2 + 6;
        };

        // bear.addEventListener("enterframe", function(){
        //     this.x += 1;
        //     this.frame = this.age % 2 + 6;
        // });

        bear.addEventListener("touchstart", function(){
            game.rootScene.removeChild(bear);
        });
    };

    game.start();
};
