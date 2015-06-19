<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="a website description">
  <meta name="author" content="the author">

  <!-- styles -->
  <link rel="stylesheet" href="/assets/css/styles.css" type="text/css" media="screen" charset="utf-8">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

  <!-- fav and touch icons -->
  <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
</head>
<body>

<?php
function makeNumberScreen ()
{

  $dictionary = array(
    0 => "a",
    1 => "b",
    2 => "c",
    3 => "d",
    4 => "e",
    5 => "f",
    6 => "g",
  );

  $output = '';
  for($row = 0; $row < 7; $row++) {
    $row_data = $dictionary[$row];
    $output .= "<div class='counter__row'>";

    for($column = 0; $column < 4; $column++) {
      $column_data = $dictionary[$column];
      $excluded = array("bb", "bc", "cb", "cc", "eb", "ec", "fb", "fc");
      if (!in_array(($row_data . $column_data), $excluded)) {
        $output .= "<span class='counter__bulb' data-lat='" . $row_data . "' data-long='" . $column_data . "'></span>";
      } else {
        $output .= "<span class='counter__bulb off'></span>";
      }
    }

    $output .= "</div>";
  }

  return $output;

}

$time_diff = array(
  "days" => 1,
  "hours" => 0,
  "mins" => 1,
  "seconds" => 10
);

?>

  <section class="counter">
    <header class="counter__main">

      <div class="counter__hours">

        <div class="counter__number hours__tens">
          <?php print makeNumberScreen(); ?>
        </div>

        <div class="counter__number hours__ones">
          <?php print makeNumberScreen(); ?>
        </div>

      </div>

      <div class="counter__minutes">

        <div class="counter__number minutes__tens">
          <?php print makeNumberScreen(); ?>
        </div>

        <div class="counter__number minutes__ones">
          <?php print makeNumberScreen(); ?>
        </div>

      </div>

    </header>
    <footer class="counter__seconds">
      <div class="seconds__row">
      <?php
      for($seconds = 0; $seconds < 30; $seconds++) {
        if ($time_diff['seconds'] > $seconds) {
          print "<span class='counter__bulb on' data-second='" . ($seconds + 1) . "'></span>";
        } else {
          print "<span class='counter__bulb' data-second='" . ($seconds + 1) . "'></span>";
        }
      }
      ?>
      </div>
      <div class="seconds__row">
      <?php
      for($seconds = 30; $seconds < 60; $seconds++) {
        if ($time_diff['seconds'] > $seconds) {
          print "<span class='counter__bulb on' data-second='" . ($seconds + 1) . "'></span>";
        } else {
          print "<span class='counter__bulb' data-second='" . ($seconds + 1) . "'></span>";
        }
      }
      ?>
      </div>
    </footer>
  </section>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="/assets/js/main.js" type="text/javascript"></script>

</body>
</html>

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