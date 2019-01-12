// JavaScript Document
/*-------------------------- +
  获取id, class, tagName
 +-------------------------- */
var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
/*-------------------------- +
  事件绑定, 删除
 +-------------------------- */
var EventUtil = {
	addHandler: function (oElement, sEvent, fnHandler) {
		oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function () {oElement["_" + sEvent + fnHandler]()}, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
	},
	removeHandler: function (oElement, sEvent, fnHandler) {
		oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
	},
	addLoadHandler: function (fnHandler) {
		this.addHandler(window, "load", fnHandler)
	}
};
/*-------------------------- +
  设置css样式
  读取css样式
 +-------------------------- */
function css(obj, attr, value)
{
	switch (arguments.length)
	{
		case 2:
			if(typeof arguments[1] == "object")
			{	
				for (var i in attr) i == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + attr[i] + ")", obj.style[i] = attr[i] / 100) : obj.style[i] = attr[i];
			}
			else
			{	
				return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
			}
			break;
		case 3:
			attr == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + value + ")", obj.style[attr] = value / 100) : obj.style[attr] = value;
			break;
	}
};

EventUtil.addLoadHandler(function ()
{
	var oMsgBox = get.byId("msgBox");
	var oUserName = get.byId("userName");
	var oConBox = get.byId("conBox");
	var oSendBtn = get.byId("sendBtn");
	var oMaxNum = get.byClass("maxNum")[0];
	var oCountTxt = get.byClass("countTxt")[0];
	var oList = get.byClass("list")[0];
	var oUl = get.byTagName("ul", oList)[0];
	var aLi = get.byTagName("li", oList);
	var aFtxt = get.byClass("f-text", oMsgBox);
	var aImg = get.byTagName("img", get.byId("face"));
	var bSend = false;
	var timer = null;
	var oTmp = "";
	var i = 0;
	var maxNum = 140;
	
	//禁止表单提交
	EventUtil.addHandler(get.byTagName("form", oMsgBox)[0], "submit", function () {return false});
	
	//为广播按钮绑定发送事件
	EventUtil.addHandler(oSendBtn, "click", fnSend);
	
	
	//发送广播函数
	function fnSend ()
	{
		var reg = /^\s*$/g;
		if(reg.test(oUserName.value))
		{
			alert("请填写您的用户名!");
			oUserName.focus()
		}
		else if(!/^[u4e00-\u9fa5\w]{2,8}$/g.test(oUserName.value))
		{
			alert("姓名由2-8位字母、数字、下划线、汉字组成！");
			oUserName.focus()
		}
		else
		{
			var oLi = document.createElement("li");
			var oDate = new Date();
			oLi.innerHTML = "<div class=\"userPic\"><img src=\"" + get.byClass("current", get.byId("face"))[0].src + "\"></div>\
							 <div class=\"content\">\
							 	<div class=\"userName\"><a href=\"#\">" + oUserName.value + "</a>:</div>\
								<div class=\"msgInfo\">" + oConBox.value.replace(/<[^>]*>|&nbsp;/ig, "") + "</div>\
								<div class=\"times\"><span>" + format(oDate.getMonth() + 1) + "月" + format(oDate.getDate()) + "日 " + format(oDate.getHours()) + ":" + format(oDate.getMinutes()) + "</span><a class=\"del\" href=\"#\">删除</a></div>\
							 </div>";
			//插入元素
			aLi.length ? oUl.insertBefore(oLi, aLi[0]) : oUl.appendChild(oLi);
			
			//重置表单
			get.byTagName("form", oMsgBox)[0].reset();
			for (i = 0; i < aImg.length; i++) aImg[i].className = "";
			aImg[0].className = "current";
			
			//将元素高度保存
			var iHeight = oLi.clientHeight - parseFloat(css(oLi, "paddingTop")) - parseFloat(css(oLi, "paddingBottom"));
			var alpah = count = 0;
			css(oLi, {"opacity" : "0", "height" : "0"});	
			timer = setInterval(function ()
			{
				css(oLi, {"display" : "block", "opacity" : "0", "height" : (count += 8) + "px"});
				if (count > iHeight)
				{
					clearInterval(timer);
					css(oLi, "height", iHeight + "px");
					timer = setInterval(function ()
					{
						css(oLi, "opacity", (alpah += 10));
						alpah > 100 && (clearInterval(timer), css(oLi, "opacity", 100))
					},30)
				}
			},30);
			liHover();
			//调用删除函数
			delLi()
		}
	};

	//li鼠标划过/离开处理函数
	function liHover()
	{
		for (i = 0; i < aLi.length; i++)
		{
			//li鼠标划过样式
			EventUtil.addHandler(aLi[i], "mouseover", function (event)
			{
				this.className = "hover";
				oTmp = get.byClass("times", this)[0];
				var aA = get.byTagName("a", oTmp);
				if (!aA.length)
				{
					var oA = document.createElement("a");					
					oA.innerHTML = "鍒犻櫎";
					oA.className = "del";
					oA.href = "#";
					oTmp.appendChild(oA)
				}
				else
				{
					aA[0].style.display = "block";
				}
			});

			//li鼠标离开样式
			EventUtil.addHandler(aLi[i], "mouseout", function ()
			{
				this.className = "";
				var oA = get.byTagName("a", get.byClass("times", this)[0])[0];
				oA.style.display = "none"	
			})
		}
	}
	liHover();
	
	
	//删除函数
	function delLi()
	{
		var aA = get.byClass("del", oUl);
		
		for (i = 0; i < aA.length; i++)
		{
			aA[i].onclick = function ()
			{
				var oParent = this.parentNode.parentNode.parentNode;
				var alpha = 100;
				var iHeight = oParent.offsetHeight;
				timer = setInterval(function ()
				{
					css(oParent, "opacity", (alpha -= 10));
					if (alpha < 0)
					{
						clearInterval(timer);						
						timer = setInterval(function ()
						{
							iHeight -= 10;
							iHeight < 0 && (iHeight = 0);
							css(oParent, "height", iHeight + "px");
							iHeight == 0 && (clearInterval(timer), oUl.removeChild(oParent))
						},30)
					}	
				},30);			
				this.onclick = null	
			}			
		}
	}
	delLi();
	
	//输入框获取焦点时样式
	for (i = 0; i < aFtxt.length; i++)
	{
		EventUtil.addHandler(aFtxt[i], "focus", function ()	{this.className = "active"});		
		EventUtil.addHandler(aFtxt[i], "blur", function () {this.className = ""})
	}
	
	//格式化时间, 如果为一位数时补0
	function format(str)
	{
		return str.toString().replace(/^(\d)$/,"0$1")
	}
	
	//头像
	for (i = 0; i < aImg.length; i++)
	{
		aImg[i].onmouseover = function ()
		{
			this.className += " hover"
		};
		aImg[i].onmouseout = function ()
		{
			this.className = this.className.replace(/\s?hover/,"")
		};
		aImg[i].onclick = function ()
		{
			for (i = 0; i < aImg.length; i++) aImg[i].className = "";
			this.className = "current"	
		}
	}
});