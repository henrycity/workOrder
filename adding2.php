<?php
$myfile = fopen("work.json", "w+");
$data = $_POST['json_update'];
fwrite($myfile, $data);
fclose($myfile);
?>