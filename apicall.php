<?php

// date_default_timezone_set ('America/New_York');
//
// $curl = curl_init();
//
// curl_setopt_array($curl, array(
//   CURLOPT_RETURNTRANSFER => 1,
//   CURLOPT_URL => 'http://worldcup.sfg.io/matches/country?fifa_code=USA',
// ));
//
// $result = curl_exec($curl);
// curl_close($curl);
//
// $games = json_decode($result);
//
// $today = date('Y-m-d H:i:s e');
//
// print "<pre>";
// print $today;
// print "</pre>";
//
// $date2 = new DateTime($today);
//
//
//
// print "<pre>";
// foreach ($games as $key => $game) {
//   $time = strtotime($game->datetime);
//   $date = date('Y-m-d H:i:s e', $time);
//
//   $date1 = new DateTime($date);
//
//   $interval = $date1->diff($date2, false);
//   // echo "difference " . $interval->days . " days <br>";
//   // print "difference " . $interval->y . " years, " . $interval->m." months, ".$interval->d." days <br>";
//   if ($date1 > $date2) {
//     print $date . "<br>";
//     print "difference " . $interval->d . " days " . $interval->h . " hours " . $interval->i . " minutes " . $interval->s . " seconds<br>";
//   }
//
//
//   // $date = date('Y-m-d h:i:sA e', $time);
//   // $newdate = DateTime::createFromFormat('Y-m-d h:i:sA e', $date);
//   // print_r($newdate);
// }
// print "</pre>";
//
// print "<pre>";
// print_r($games);
// print "</pre>";

?>