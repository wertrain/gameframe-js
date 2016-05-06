/**
 * �ȈՃQ�[���t���[�������
 *
 */
function createGameFrame(canvasId) {
    if (typeof canvasId === 'undefined') {
        return null;
    }
    var Game = {};
    var FPS = 60;
    Game.fps = 0;
    Game.maxFrameSkip = 10;
    Game.skipTicks = 1000 / FPS;
    Game.canvas = document.getElementById(canvasId);
    if (Game.canvas === null) {
        return false;
    }
    Game.context = Game.canvas.getContext('2d');
    
    /**
     * ���t���[���Ăяo�����X�V����
     * ���[�U�[�ɏ㏑�����Ă��炤
     *
     * @param tick
     */
    Game.update = function(tick) {};
    /**
     * ���t���[���Ăяo�����`�揈��
     * ���[�U�[�ɏ㏑�����Ă��炤
     *
     * @param context Canvas�̃R���e�L�X�g
     */
    Game.draw = function(context) {};
    
    Game.resume = function() {
        this.paused = false;
    };
    Game.pause = function() {
        this.paused = true;
    };
    Game._mainloop = function(tick) {
        Game.tick = tick;
        Game.update(tick);
    };
    Game.clearCanvas = function(color) {
        Game.context.fillStyle = color;
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
    }
    
    /**
     * �Q�[���̃��[�v����
     */
    //Game.run = (function() {
    //    var loops = 0;
    //    var nextGameTick = (new Date).getTime();
    //    var startTime = (new Date).getTime();
    //    return function() {
    //        loops = 0;
    //        while (!Game.paused && (new Date).getTime() > nextGameTick && loops < Game.maxFrameSkip) {
    //            Game._mainloop(nextGameTick - startTime);
    //            nextGameTick += Game.skipTicks;
    //            loops++;
    //        }
    //        Game.draw(Game.context);
    //    };
    //})();

    Game.run = (function() {
        var loops = 0;
        var beforeTick = (new Date).getTime();
        var startTime = (new Date).getTime();
        var fpsCount = 0;
        return function() {
            var tick = (new Date).getTime();
            Game._mainloop(tick - startTime);
            Game.draw(Game.context);
            ++fpsCount;
            if (tick > beforeTick + 1000) {
                Game.fps = fpsCount;
                beforeTick = tick;
                fpsCount = 0;
            }
        };
    })();
    
    /**
     * �X�V����������
     */
    var eachFrame = (function() {
        var onEachFrame;
        if (window.requestAnimationFrame) {
           onEachFrame = function(cb) {
              var _cb = function() {
                    cb();
                 requestAnimationFrame(_cb);
              };
              _cb();
           };
        } else if (window.webkitRequestAnimationFrame) {
           onEachFrame = function(cb) {
              var _cb = function() {
                 cb();
                 webkitRequestAnimationFrame(_cb);
              };
              _cb();
           };
        } else if (window.mozRequestAnimationFrame) {
            onEachFrame = function(cb) {
                var _cb = function() {
                    cb();
                    mozRequestAnimationFrame(_cb);
                };
                _cb();
            };
        } else {
            onEachFrame = function(cb) {
                setInterval(cb, Game.skipTicks);
            };
        }
        return onEachFrame;
    })();
    
    Game.start = function() {
        eachFrame(Game.run);
    };
    
    return Game;
}
