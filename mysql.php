<?php
	$db=new mysqli("localhost","root","","class");
	$db->query("set names utf8");
	$result=$db->query("select * from stu");
	echo "<pre>";
	$str="<table><tr><th>姓名</th><th>年龄</th><th>性别</th></tr>";
		while($row=$result->fetch_assoc()){
			$str.="<tr>";
				$str.="<td>".$row["name"]."</td>";
				$str.="<td>".$row["age"]."</td>";
				$str.="<td>".$row["sex"]."</td>";
			$str.="</tr>";		
		}
	$str.="</table>";
	echo $str;			
?>