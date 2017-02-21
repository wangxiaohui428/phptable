/*
parma object 传入的数据
type str[get|post] 传入的方式
dataType str[json|xml|text|document] 传入的数据类型
success fn[callback] 成功输出
error fn[callback] 失败输出
data parma.data 数据
*/
function ajax(parma){
	//对对象进行判断  如果是 ajax("123");则返回
	if(typeof (parma)!=="object"){
		console.error("请传入正确的数据");
		return false;
	}
	//判断是否有url;
	var url=parma.url;
	if(url==undefined){
		console.error("请输入正确的地址");
		return false;
	}
	//判断方式
	var asynch=parma.asynch==undefined?true:parma.asynch;
	var data=parma.data||"";
	var dataType=parma.dataType||"text";
	var str="";
	if(typeof (data)=="object"){
		for(var i in data){
			str+=i+"="+data[i]+"&";
		}
		data=str.slice(0,-1);
	}
	var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	xmlobj.onreadystatechange=function(){
		if(xmlobj.readyState==4){
			if(xmlobj.status==200){
					var result;
					if(dataType=="xml"){
						result=xmlobj.responseXML;
					}else{
						result=xmlobj.response;
					}
					parma.success(result);
			}else if(xmlobj.status==404){
				parma.error("页面找不到");
			}else if(xmlobj.status==500){
				parma.error("服务器代码有误");
			}
		}
	}
	var type=parma.type||"get";
	if(type=="get"){
		xmlobj.open(type,url+"?"+data,asynch);
		if(dataType!="xml"){
			xmlobj.responseType=dataType;
		}
		xmlobj.send(data);
	}else if(type=="post"){
		xmlobj.open(type,url,asynch);
		if(dataType!="xml"){
			xmlobj.responseType=dataType;
		};
		xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlobj.send(data);
	}
}
