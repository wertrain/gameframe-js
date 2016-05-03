/**
 * �ȈՃQ�[���t���[�������
 *
 */
function createGameFrame(canvasId) {
    if (typeof canvasId === 'undefined') {
        return null;
    }
    var Game = {};
    Game.fps = 60;
    Game.maxFrameSkip = 10;
    Game.skipTicks = 1000 / Game.fps;
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
    
    /**
     * �Q�[���̃��[�v����
     */
    Game.run = (function() {
        var loops = 0;
        var nextGameTick = (new Date).getTime();
        var startTime = (new Date).getTime();
        return function() {
            loops = 0;
            while (!Game.paused && (new Date).getTime() > nextGameTick && loops < Game.maxFrameSkip) {
                Game._mainloop(nextGameTick - startTime);
                nextGameTick += Game.skipTicks;
                loops++;
            }
            Game.draw(Game.context);
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
