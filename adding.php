<?php


    $json = file_get_contents('work.json', true);
    $obj = json_decode($json,true);
	
	$last_item    = end($obj);
	$last_item_id = $last_item['id'];
	
    array_push($obj, array('id' => ++$last_item_id,'customer'=>$_GET['customer'],'material'=>$_GET['material'],'work_name'=>$_GET['work_name'],'patch_time'=>$_GET['patch_time'],'quantity'=>$_GET['quantity'],'output_package'=>$_GET['output_package']));
    file_put_contents('work.json', json_encode($obj));

?>