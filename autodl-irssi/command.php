<?php
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is IRC Auto Downloader.
 *
 * The Initial Developer of the Original Code is
 * David Nilsson.
 * Portions created by the Initial Developer are Copyright (C) 2010, 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * ***** END LICENSE BLOCK ***** */

// Send /autodl commands

require_once 'getConf.php';

$command = Array("command" => "command");
if (isset($_GET['type']))
	$command['type'] = $_GET['type'];
if (isset($_GET['arg1']))
	$command['arg1'] = $_GET['arg1'];
if (isset($_GET['arg2']))
	$command['arg2'] = $_GET['arg2'];
if (isset($_GET['arg3']))
	$command['arg3'] = $_GET['arg3'];
$response = sendAutodlCommand($command);

$res = Array('error' => $response->error);
$jsonData = json_encode($res);

$etag = '"' . md5($jsonData) . '"';
$mtime = 1286000000;	// A "valid" Last-Modified time so Chrome tries to GET this file from the server again
checkSameFile($etag, $mtime);

header('Content-Type: application/json; charset=UTF-8');
echo $jsonData;

?>
