<?php require_once('./includes/header.php'); ?>

<?php
date_default_timezone_set ('America/New_York');

/**
 * Get the moment the client loads the site
 * Get the moment of the next match
 * Make both into DateTime objects
 * Compare the two
 */
$today = date('Y-m-d H:i:s');
$date = date('Y-m-d H:i:s e', strtotime('2015-06-22 20:00:00'));
$date2 = new DateTime($today);
$date1 = new DateTime($date);
$interval = $date1->diff($date2, false);

/**
 * Compare the dates to make sure it is in the future
 * @todo
 *   - Actually compare stuff
 *   - This should actually be in a loop with a bunch of dates
 *     to compare before making the DateTime objects? Compare
 *     unix timestamps probably
 */
if ($date1 > $date2) {
  // print "difference " . $interval->d . " days " . $interval->h . " hours " . $interval->i . " minutes " . $interval->s . " seconds<br>";
  // you want to use this...
}


/**
 * Create arrays for hours and minutes
 * The counter requires these numbers separately for efficiency.
 * If the number is under ten then the first number is 0
 */
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

/**
 * The array containing the time difference the counter will use
 * @var array
 */
$time_diff = array(
  "days" => $interval->d,
  "hours" => $hoursTil,
  "mins" => $minsTil,
  "seconds" => ($interval->s === 0)? 60 : $interval->s,
);

// For reference
// print "difference " . $interval->y . " years, " . $interval->m." months, ".$interval->d." days <br>";

/**
 * Outputs the markup for a single number screen
 * @param  integer $num The number the screen should display
 * @return string       Markup for a single number screen
 */
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

<header class="site__header">
  <a id="brand" href="https://www.njimedia.com/team/joshshultz/" target="_blank"><span>Shultz Division</span></a>
  <a href="#" class="match-facts"><span><i class="f"></i><i class="m"></i><i class="l"></i></span>Match Facts</a>
</header>



<section class="site__main">

  <header class="main__header">
    <div class="usa-icons">
      <i class="shield"></i>
      <i class="ball"></i>
    </div>
    <h2>The <a href="#" class="do-tweet">#USWNT</a> Match vs Colombia Begins In</h2>
  </header>

  <section class="ref-wrap">
    <h3 class="counter__days"><?php print $time_diff['days']; ?> <?php ($time_diff['days'] === 1)? print "Day" : print "Days" ?></h3>
    <section class="counter-wrap">
      <?php require_once('./includes/counter.php'); ?>
    </section>
    <div class="ref"></div>
  </section>

  <footer class="main__footer">
    <a class="info-link" href="#">What's This?<i></i></a>
  </footer>

</section>

<footer class="site__footer">
  <div class="footer__social">
    <h6>Let America Know</h6>
    <ul>
      <li><a class="facebook do-share" href="#">Facebook</a></li>
      <li><a class="twitter do-tweet" href="#">Twitter</a></li>
    </ul>
  </div>

  <h5>2015 United States Women's World Cup Games Countdown</h5>

  <a class="footer__brand" href="http://njimedia.com" target="_blank">NJI Media</a>

</footer>

<section class="overlay">
  <a href="#" class="overlay__close">&times;</a>
  <div class="inner">
    <h1>About</h1>
    <i class="flag">flag</i>
    <h3 class="subtitle">Support Your Squad</h3>
    <h3 class="motto">With this counter you'll never miss another match</h3>
    <p>The kind hearted souls at the NJI Media's Shultz Division created this site in an effort to educate the masses and create a general uproar of patriotism</p>
    <ul class="overlay__social">
      <li><a class="btn--main facebook do-share" href="#"><i></i>Share</a></li>
      <li><a class="btn--main twitter do-tweet" href="#"><i></i>Share</a></li>
    </ul>
  </div>
  <footer class="overlay__footer">
    <a href="https://www.njimedia.com/team/joshshultz/" target="_blank" class="shultz-division">Shultz Division</a>
    <a href="http://njimedia.com" target="_blank" class="nji-media">NJI Media</a>
  </footer>
</section>

<?php require_once('./includes/footer.php'); ?>
