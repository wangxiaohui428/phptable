function ajax(param){
	if(typeof (param)!=="object"){
		console.error("请输入正确的数据");
		return false;
	}
	var url=param.url;
	if(url==undefined){
		console.error("请输入正确的地址");
		return false;
	}
	var type=param.type||"get";
	var asych=param.asych==undefined?true:param.asych;
	var data=param.data||"";
	var dataType=param.dataType||"text";
	var str="";
	if(typeof (data)=="object"){
		for(var i in data){
			str+=i+"="+data[i]+"&"
		}
		data=str.split(0,-1);
	}
	var xmlobj=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Micrsoft XMLHTTP");
	xmlobj.onreadystatechange=function(){
		if(xmlobj.readyState==4){
			if(xmlobj.status==200){
				var result;
				if(dataType=="xml"){
					result=xmlobj.responseXML;
				}else{
					result=xmlobj.response;
				}
				param.success(result);
			}else if(xmlobj.status==404){
				param.error("页面找不到");
			}else if(xmlobj.status==500){
				parma.error("服务器代码有误");
			}
		}
	}
	if(type=="get"){
		xmlobj.open(type,url+"?"+data,asych);
		if(dataType!="xml"){
			xmlobj.responseType=dataType;
		}
		xmlobj.send();
	}
	if(type=="post"){
		xmlobj.open(type,url,asych);
		xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		if(dataType!="xml"){
			xmlobj.responseType=dataType;
		};
		xmlobj.send(data);
	}
}
