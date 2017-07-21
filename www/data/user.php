<?php 
    header("Access-Control-Allow-Origin: *");
    $user = json_decode(file_get_contents('php://input'));
    if($user->mail=='me@gmail.com' && $user->pass=='123456')
        print 'success';
    else print 'error';

?>