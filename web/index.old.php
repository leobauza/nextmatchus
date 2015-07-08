<?php require_once('./includes/header.php'); ?>

<?php
date_default_timezone_set ('America/New_York');


/**
 * Master Array
 */
// $raw_date = '2015-07-04 16:00:00';
$raw_date = '2015-07-05 19:00:00';
// $raw_date = '2015-06-30 17:37:00';
$raw_time = strtotime($raw_date);
$data = array(
  'opponent' => array(
    'country_name' => 'Japan', // Japan or England
    'country_code' => 'jpn', // jpn or eng
  ),
  'date_time' => array(
    'raw' => $raw_date,
    'est' => date('g:i A', $raw_time),
    'date' => date('d M Y', $raw_time),
  ),
  'location' => array(
    'stadium' => 'BC Place Stadium', // or Commonwealth Stadium
    'city' => 'Vancouver', // or Edmonton
    'country_code' => 'can',
    'country_name' => 'Canada',
  ),
);


/**
 * Get the moment the client loads the site
 * Get the moment of the next match
 * Make both into DateTime objects
 * Compare the two
 */
$today = date('Y-m-d H:i:s');
$date = date('Y-m-d H:i:s e', $raw_time);
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
$match_status = FALSE; // match is in the future and we are counting down
$time_diff = array();
if ($date1 > $date2) {

  // print "difference " . $interval->d . " days " . $interval->h . " hours " . $interval->i . " minutes " . $interval->s . " seconds<br>";
  // you want to use this...
  $match_status = TRUE;

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

  $time_diff = array(
    "days" => $interval->d,
    "hours" => $hoursTil,
    "mins" => $minsTil,
    "seconds" => ($interval->s === 0)? 60 : $interval->s,
  );


} else {

  $match_status = FALSE;
  $time_diff = array(
    "days" => 0,
    "hours" => array(0, 0),
    "mins" => array(0, 0),
    "seconds" => 0, // only way to be 0 is this way meaning game is ON
  );

}


/**
 * The array containing the time difference the counter will use
 * @var array
 */

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
  <div href="#" class="match-facts">
    <a href="#"><span><i class="f"><b></b></i><i class="m"><b></b></i><i class="l"><b></b></i></span>Match Facts</a>
    <div class="facts__dropdown">
      <header class="dropdown__header group">
        <div class="flag-usa country">
          <i>FLAG</i>
          <span>Usa</span>
        </div>
        <div class="vs"><span>VS</span></div>
        <div class="flag-<?php print $data['opponent']['country_code']; ?> country oponent">
          <i>FLAG</i>
          <span><?php print $data['opponent']['country_code']; ?></span>
        </div>
      </header>
      <div class="dropdown__body">
        <i class="icon-stopwatch">clock</i>
        <p><?php print $data['date_time']['est']; ?> EST</p>
        <i class="division-line"></i>
        <p><?php print $data['date_time']['date']; ?></p>
      </div>
      <footer class="dropdown__footer">
        <i class="icon-stadium">stadium</i>
        <p><?php print $data['location']['stadium']; ?></p>
        <i class="division-line"></i>
        <p><?php print $data['location']['city']; ?> (<?php print $data['location']['country_code']; ?>)</p>
      </footer>
    </div>
  </div>
</header>


<section class="site__main">

  <header class="main__header">
    <div class="usa-icons">
      <i class="shield"></i>
      <i class="ball"></i>
    </div>
    <?php if ($match_status): ?>
    <h2>The <a href="#" class="do-tweet">#USWNT</a> plays in the World Cup Final In</h2>
    <!-- <h2>The <a href="#" class="do-tweet">#USWNT</a> Match vs <?php print $data['opponent']['country_name']; ?> Begins In</h2> -->
    <?php else: ?>
    <h2>The <a href="#" class="do-tweet">#USWNT</a> Match vs <?php print $data['opponent']['country_name']; ?> is on right now</h2>
    <?php endif; ?>
  </header>

  <section class="ref-wrap">
    <?php if ($match_status): ?>
    <h3 class="counter__days"><?php print $time_diff['days']; ?> <?php ($time_diff['days'] === 1)? print "Day" : print "Days" ?></h3>
    <?php endif; ?>
    <section class="counter-wrap<?php if (!$match_status) print ' flag'; ?>">
      <?php require_once('./includes/counter.php'); ?>
    </section>
    <div class="ref<?php if (!$match_status) print ' rapinoe'; ?>"></div>
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

  <h5>2015 US Soccer Women's World Cup Games Countdown</h5>

  <a class="footer__brand" href="http://njimedia.com" target="_blank">NJI Media</a>

</footer>

<section class="overlay">
  <a href="#" class="overlay__close">&times;</a>
  <div class="inner">
    <h1>About</h1>
    <i class="flag">flag</i>
    <h3 class="subtitle">Support US Soccer</h3>
    <h3 class="motto">With this counter you'll never miss another US Soccer match</h3>
    <p>The kind hearted souls at NJI Media's Shultz Division created this site in an effort to educate the masses and create a general uproar of patriotism</p>
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

<!-- <div class="opl"><a href="http://onepagelove.com/next-match-us" target="_blank">Next Match US</a></div>
<div id="awwwards" class="nominee black left"><a href="http://www.awwwards.com/best-websites/next-match-by-nji-media/" target="_blank">Awwwards</a></div> -->

<?php require_once('./includes/footer.php'); ?>
