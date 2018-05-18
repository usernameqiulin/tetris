var frame;

function initGame() {   //程序的入口
	frame = new GameFrame(16, 20, 38);//第一个参数单位像素的大小    
	frame.init();//初始化

	document.body.addEventListener("keydown", MoveOrChange);//事件监听键盘触发事件

}

function changespeed() {
	frame.changespeed();
}

function regame() {//刷新界面
	location.reload();
}
function MoveOrChange() {

	switch(event.keyCode) {//键盘事件
		case 38: //变形（上方向键）
			frame.Change();
			break;
		case 37: //左移动
			frame.MoveLeft();
			break;
		case 39: //右移动
			frame.MoveRight();
			break;
		case 40: //向下
			frame.MoveDown();
			break;
	}
}