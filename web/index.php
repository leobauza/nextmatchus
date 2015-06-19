<?php require_once('./includes/header.php'); ?>

<?php
date_default_timezone_set ('America/New_York');

$today = date('Y-m-d H:i:s');
$date = date('Y-m-d H:i:s e', strtotime('2015-06-18 23:59:59'));

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
  "seconds" => ($interval->s === 0)? 60 : $interval->s,
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
        $output .= "<span class='counter__bulb' data-lat='" . $row_data . "' data-long='" . $column_data . "'><i class='f'></i><i class='s'></i><i class='t'></i><i class='l'></i></span>";
      } else {
        $output .= "<span class='counter__bulb off'></span>";
      }
    }

    $output .= "</div>";
  }

  return $output;

}

?>

<section class="counter-wrap">
  <?php require_once('./includes/counter.php'); ?>
</section>


<?php require_once('./includes/footer.php'); ?>
