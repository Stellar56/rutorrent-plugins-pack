<?php

$user = getUser();
$host = $_SERVER['HTTP_HOST'];

require_once('conf.php');

$optionlink = $onglet === true ? 'window.open' : 'window.location.assign';

$jResult .= "plugin.baseurl = '".$baseurl."';";
$jResult .= "plugin.accessurl = '".$accessurl."';";
$jResult .= "plugin.optionlink = '".$optionlink."';";
$jResult .= "plugin.dirpath = '".$dirpath."';";

$theSettings->registerPlugin("linkcakebox");

