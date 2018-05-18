function Graph(frame) {
	this.divs = [];
	//外部容器div的数组
	this.parentFrame = frame;
	//图形横纵偏移
	this.x = 0;
	this.y = 0;
	//记录图形的坐标数组
	this.zb = [];
	//记录消除的行数
	this.line = 0;

	//初始化小图形的方法
	this.init = function(rand, color) {
		//计算图形其实坐标的单位
		var startleft = (this.parentFrame.row - 4) / 2;
		this.x = startleft;
		//分解图形的坐标
		var smallarr = this.parentFrame.arr[rand].split(",");
		this.zb = smallarr;
		//循环设置小div的 left和top
		for(var i = 0; i < 8; i += 2) {
			//创建小div
			var smalldiv = document.createElement("div");
			//设置样式
			smalldiv.className = "smallDiv";
			//设置颜色
			//随机数
		function rand(min,max){
			return Math.round(Math.random()*(max-min)+min)
		}
			 //01234 56789abcdef
			 //在字符串中随机6个字符;
	 function getColor(){
	 	var str ="0123456789abcdef";
	 	var color = "#";
	 	var arr=[];
	 	for(var i = 0;i<6;i++){
	 		color +=str.charAt(rand(0,15));
	 	}
	 	return color;
	 }
			smalldiv.style.backgroundColor = getColor();
			//定义高宽
			smalldiv.style.width = (this.parentFrame.unit - 2) + "px";
			smalldiv.style.height = (this.parentFrame.unit - 2) + "px";
			//设置小div的top
			smalldiv.style.top = ((smallarr[i] - 0) * this.parentFrame.unit) + "px";
			//设置小div的left
			smalldiv.style.left = (((smallarr[i + 1] - 0) + startleft) * this.parentFrame.unit) + "px";
			//保存小div的引用
			this.divs.push(smalldiv);
			//加入到外部容器
			document.getElementById("MainFrame").appendChild(smalldiv);
		}
	}
	//左移动
	this.moveleft = function() {
		if(canMove(this.zb, this.x, this.y, this.parentFrame, 2)) //可以移动
		{
			this.x -= 1;
			for(var i = 0; i < this.divs.length; i++) //循环小div，把每个div的left减去一个单位的像素
			{
				var left = parseInt(this.divs[i].style.left);
				this.divs[i].style.left = (left - this.parentFrame.unit) + "px";
			}
		}

	}
	//右移动
	this.moveright = function() {
		var temp = canMove(this.zb, this.x, this.y, this.parentFrame, 1);
		//		alert(temp);
		console.log(temp);
		if(canMove(this.zb, this.x, this.y, this.parentFrame, 1)) {
			this.x += 1;
			for(var i = 0; i < this.divs.length; i++) {
				var left = parseInt(this.divs[i].style.left);
				this.divs[i].style.left = (left + this.parentFrame.unit) + "px";
			}
		}
	}

	//变形
	this.change = function() {
		//变形的公式
		//小div的2个相对坐标点改变    x = y ;  y= 3-x; 比如  （0，1） 变化之后 就是   x=1，y=3-0 -> (1,3)
		//循环4个小div
		if(!canMove(this.zb, this.x, this.y, this.parentFrame, 4)) {
			if(this.x < 0) {
				this.x += 1;
			} else {
				this.x -= 1;
			}
		}
		for(var i = 0; i < this.divs.length; i++) {
			//根据公式改变每个div的相对偏移量，2个一改
			var temp = this.zb[i * 2]
			this.zb[i * 2] = this.zb[i * 2 + 1];
			this.zb[i * 2 + 1] = 3 - temp;
			//根据改变后的偏移量计算图形的当前left和top
			this.divs[i].style.top = ((this.y + parseInt(this.zb[i * 2])) * this.parentFrame.unit) + "px";
			this.divs[i].style.left = ((this.x + parseInt(this.zb[i * 2 + 1])) * this.parentFrame.unit) + "px";
		}

	}

	this.movedown = function() {

		var $this = this == "window" ? this.frame.samlldiv : this;

		if(canMove($this.zb, $this.x, $this.y, $this.parentFrame, 3)) {
			$this.y += 1;
			for(var i = 0; i < $this.divs.length; i++) {
				var top = parseInt($this.divs[i].style.top);
				$this.divs[i].style.top = (top + $this.parentFrame.unit) + "px";
			}
			return false;
		} else {function rand(min,max){
			return Math.round(Math.random()*(max-min)+min)
		}
			 //01234 56789abcdef
			 //在字符串中随机6个字符;
	 function getColor(){
	 	var str ="0123456789abcdef";
	 	var color = "#";
	 	for(var i = 0;i<6;i++){
	 		color +=str.charAt(rand(0,15));
	 	}
	 	return color;
	 }
			clearInterval($this.parentFrame.intervalid);
			//			var temp = $this.parentFrame.Content.getElementsByTagName("div");
			for(var i = 0; i < $this.divs.length; i++) {
				//div变灰
				//$this.divs[i].className ="smallDivblack";
				var $y = $this.y + parseInt($this.zb[i * 2]);
				var $x = $this.x + parseInt($this.zb[i * 2 + 1]);
				//				debugger;
				$this.parentFrame.datas[$y * $this.parentFrame.row + $x] = 1;
				$this.divs[i].dataset.row = $y; //记录div所在的行
				$this.divs[i].dataset.col = $x; //记录div所在的列
				$this.divs[i].className = "smallDivblack";
				$this.divs[i].style.backgroundColor = "#0d2d48ed";
				//$this.parentFrame.datas[]
			}
			//消行并计分
			for(var i = 0; i < $this.parentFrame.col; i++) { //i为行
				//判断是否满足消行条件
				for(var j = 0; j < $this.parentFrame.row; j++) { //j为列
					if($this.parentFrame.datas[i * $this.parentFrame.row + j] != 1) {
						break;
					}
				}
				//消行，将该行上面的所有div下移一行
				if(j == $this.parentFrame.row) {
					var x; //记录div在哪一列
					var y; //记录div在哪一行
					var getsmalldiv = document.getElementById("TFrime").getElementsByClassName("smallDivblack"); //得到小div
					for(var a = 0; a < getsmalldiv.length; a++) {
						y = parseInt(getsmalldiv[a].dataset.row);
						x = parseInt(getsmalldiv[a].dataset.col);
						if(y == i) { //消除该行
							debugger;
							$this.parentFrame.datas[y * $this.parentFrame.row + x] = 0;
							getsmalldiv[a].remove();
							a--;
						}
					}

					for(var a = i - 1; a > 0; a--) {
						for(var b = 0; b < getsmalldiv.length; b++) {
							y = parseInt(getsmalldiv[b].dataset.row);
							x = parseInt(getsmalldiv[b].dataset.col);
							if(y == a) { //将上面的div下移一行
								//								debugger;
								var divtop = parseInt(getsmalldiv[b].style.top);
								getsmalldiv[b].style.top = (divtop + $this.parentFrame.unit) + "px";
								getsmalldiv[b].dataset.row++;
								$this.parentFrame.datas[y * $this.parentFrame.row + x] = 0;
								$this.parentFrame.datas[(y + 1) * $this.parentFrame.row + x] = 1;
							}
						}

					}
					$this.line++;
				}
			}

			return true;
		}
	}
	//预判能否移动或变化，action:1.右移，2.左移，3.下移，4.变化
	//zb是4个小图形的相对偏移，x是图形左偏移，y是top偏移,f是外部frame
	function canMove(zb, x, y, f, action) {
		//datas[parseInt(zb[i + 1]) + x + 1)+(this.y-1)*row] !=0
		switch(action) {
			case 1:
				//				debugger;
				for(var i = 0; i < zb.length; i += 2) {
					if(parseInt(zb[i + 1]) + x + 1 >= f.row) {
						return false;
					} else if(f.datas[(parseInt(zb[i + 1]) + x + 1) + (y + parseInt(zb[i])) * f.row] != 0) {
						return false;
					}
				}
				break;
			case 2:
				for(var i = 0; i < zb.length; i += 2) {
					if(parseInt(zb[i + 1]) + x - 1 < 0) {
						return false;
					} else if(f.datas[(parseInt(zb[i + 1]) + x - 1) + (y + parseInt(zb[i])) * f.row] != 0) {
						return false;
					}
				}
				break;
			case 3:
				for(var i = 0; i < zb.length; i += 2) {
					if(parseInt(zb[i]) + y + 1 >= f.col ||
						f.datas[(parseInt(zb[i + 1]) + x) + (parseInt(zb[i]) + y + 1) * f.row] != 0) {
						return false;
					}
				}
				break;
			case 4:
				for(var i = 0; i < zb.length; i += 2) {
					var temp = 3 - zb[i];
					if(temp + x < 0 || temp + x >= f.row) {
						return false;
					}
				}
				break;
		}
		return true;
	}

	this.rescore = function() {
		var gamescore = document.getElementById("score");
		gamescore.innerHTML = parseInt(gamescore.innerHTML) + this.parentFrame.score[this.line];
	}

}