# gameframe-js

�ȈՃQ�[���t���[�����[�N

### �g�����T���v��

```javascript
window.onload = function() {
    var gameframe = createGameFrame('game-canvas');
    gameframe.update = function(tick) {
        
    };
    gameframe.draw = function(context) {
        this.clearCanvas('#0000FF');
        context.fillStyle = '#FFFFFF';
        context.fillText('FPS: ' + gameframe.fps, 10, 15);
    };
    //gameframe.start();
}
```
