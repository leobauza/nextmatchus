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
date_default_timezone_set ('America/New_York');

$today = date('Y-m-d H:i:s');
$date = date('Y-m-d H:i:s e', strtotime('2015-06-18 23:10:13'));

// print "<pre>";
// print $today;
// print "</pre>";

$date2 = new DateTime($today);
$date1 = new DateTime($date);
$interval = $date1->diff($date2, false);

if ($date1 > $date2) {
  // print "difference " . $interval->d . " days " . $interval->h . " hours " . $interval->i . " minutes " . $interval->s . " seconds<br>";
  // you want to use this...
}

if ($interval->h < 10) {
  $hoursTil =  array(0, $interval->h);
} else {
  $hoursTil =  str_split($interval->h);
}

if ($interval->i < 10) {
  $minsTil =  array(0, $interval->i);
} else {
  $minsTil =  str_split($interval->i);
}

$time_diff = array(
  "days" => $interval->d,
  "hours" => $hoursTil,
  "mins" => $minsTil,
  "seconds" => $interval->s
);

print_r($time_diff);

// echo "difference " . $interval->days . " days <br>";
// print "difference " . $interval->y . " years, " . $interval->m." months, ".$interval->d." days <br>";


function makeNumberScreen ($num = 0)
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

  $numbers = array();

  $numbers[0] = array(
    "aa", "ab", "ac", "ad",
    "ba", "bd",
    "ca", "cd",
    "da", "dd",
    "ea", "ed",
    "fa", "fd",
    "ga", "gb", "gc", "gd",
  );

  $numbers[1] = array(
    "ad",
    "bd",
    "cd",
    "dd",
    "ed",
    "fd",
    "gd",
  );

  $numbers[2] = array(
    "aa", "ab", "ac", "ad",
    "bd",
    "cd",
    "da", "db", "dc", "dd",
    "ea",
    "fa",
    "ga", "gb", "gc", "gd",
  );

  $numbers[3] = array(
    "aa", "ab", "ac", "ad",
    "bd",
    "cd",
    "da", "db", "dc", "dd",
    "ed",
    "fd",
    "ga", "gb", "gc", "gd",
  );

  $numbers[4] = array(
    "aa", "ad",
    "ba", "bd",
    "ca", "cd",
    "da", "db", "dc", "dd",
    "ed",
    "fd",
    "gd",
  );

  $numbers[5] = array(
    "aa", "ab", "ac", "ad",
    "ba",
    "ca",
    "da", "db", "dc", "dd",
    "ed",
    "fd",
    "ga", "gb", "gc", "gd",
  );

  $numbers[6] = array(
    "aa", "ab", "ac", "ad",
    "ba",
    "ca",
    "da", "db", "dc", "dd",
    "ea", "ed",
    "fa", "fd",
    "ga", "gb", "gc", "gd",
  );

  $numbers[7] = array(
    "aa", "ab", "ac", "ad",
    "bd",
    "cd",
    "dd",
    "ed",
    "fd",
    "gd",
  );

  $numbers[8] = array(
    "aa", "ab", "ac", "ad",
    "ba", "bd",
    "ca", "cd",
    "da", "db", "dc", "dd",
    "ea", "ed",
    "fa", "fd",
    "ga", "gb", "gc", "gd",
  );

  $numbers[9] = array(
    "aa", "ab", "ac", "ad",
    "ba", "bd",
    "ca", "cd",
    "da", "db", "dc", "dd",
    "ed",
    "fd",
    "gd",
  );



  $output = '';
  for($row = 0; $row < 7; $row++) {
    $row_data = $dictionary[$row];
    $output .= "<div class='counter__row'>";

    for($column = 0; $column < 4; $column++) {
      $column_data = $dictionary[$column];
      $excluded = array("bb", "bc", "cb", "cc", "eb", "ec", "fb", "fc");
      if (in_array(($row_data . $column_data), $numbers[$num])) {
        $output .= "<span class='counter__bulb on' data-lat='" . $row_data . "' data-long='" . $column_data . "'><i class='f'></i><i class='s'></i><i class='t'></i><i class='l'></i></span>";
      } elseif (!in_array(($row_data . $column_data), $excluded)) {
        $output .= "<span class='counter__bulb' data-lat='" . $row_data . "' data-long='" . $column_data . "'></span>";
      } else {
        $output .= "<span class='counter__bulb off'></span>";
      }
    }

    $output .= "</div>";
  }

  return $output;

}

?>

  <section class="counter"
    data-days="<?php print $time_diff["days"]; ?>"
    data-hourstens="<?php print $time_diff["hours"][0]; ?>"
    data-hoursones="<?php print $time_diff["hours"][1]; ?>"
    data-minstens="<?php print $time_diff["mins"][0]; ?>"
    data-minsones="<?php print $time_diff["mins"][1]; ?>"
    data-seconds="<?php print $time_diff["seconds"]; ?>">
    <header class="counter__main">

      <div class="counter__hours">

        <div class="counter__number hours__tens">
          <?php print makeNumberScreen($time_diff["hours"][0]); ?>
        </div>

        <div class="counter__number hours__ones">
          <?php print makeNumberScreen($time_diff["hours"][1]); ?>
        </div>

      </div>

      <div class="counter__minutes">

        <div class="counter__number minutes__tens">
          <?php print makeNumberScreen($time_diff["mins"][0]); ?>
        </div>

        <div class="counter__number minutes__ones">
          <?php print makeNumberScreen($time_diff["mins"][1]); ?>
        </div>

      </div>

    </header>
    <footer class="counter__seconds">
      <div class="seconds__row">
      <?php
      for($seconds = 0; $seconds < 30; $seconds++) {
        if ($time_diff['seconds'] > $seconds) {
          print "<span class='counter__bulb on' data-second='" . ($seconds + 1) . "'><i class='f'></i><i class='l'></i></span>";
        } else {
          print "<span class='counter__bulb' data-second='" . ($seconds + 1) . "'><i class='f'></i><i class='l'></i></span>";
        }
      }
      ?>
      </div>
      <div class="seconds__row">
      <?php
      for($seconds = 30; $seconds < 60; $seconds++) {
        if ($time_diff['seconds'] > $seconds) {
          print "<span class='counter__bulb on' data-second='" . ($seconds + 1) . "'><i class='f'></i><i class='l'></i></span>";
        } else {
          print "<span class='counter__bulb' data-second='" . ($seconds + 1) . "'><i class='f'></i><i class='l'></i></span>";
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