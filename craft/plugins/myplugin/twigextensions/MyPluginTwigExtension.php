<?php

namespace Craft;

class MyPluginTwigExtension extends \Twig_Extension
{
  protected $env;

  public function getName()
  {
    return Craft::t('My Plugin');
  }

  public function getFilters()
  {
    return array(
      'myplugin'  => new \Twig_Filter_Method($this, 'myplugin', array('is_safe' => array('html'))),
    );
  }

  public function getFunctions()
  {
    return array(
      'myplugin'  => new \Twig_Function_Method($this, 'myplugin', array('is_safe' => array('html'))),
      'makeNumberScreen'  => new \Twig_Function_Method($this, 'makeNumberScreen', array('is_safe' => array('html'))),
      'makeSecondsScreen'  => new \Twig_Function_Method($this, 'makeSecondsScreen', array('is_safe' => array('html'))),
      'makeDateObject'  => new \Twig_Function_Method($this, 'makeDateObject', array('is_safe' => array('html'))),
    );
  }


  public function myplugin($var)
  {
    $html = "<h1>" . $var . "</h1>";
    $array = array(
      'one' => 'something',
      'two' => 'two somethings',
    );
    return $array;
  }

  public function makeNumberScreen ($num = 0)
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

  public function makeSecondsScreen ($start = 0, $end = 30, $time_diff_seconds = 0)
  {

    $output = '';
    for($seconds = $start; $seconds < $end; $seconds++) {
      if ($time_diff_seconds > $seconds) {
        $output .= "<span class='counter__bulb on' data-second='" . ($seconds + 1) . "'><i class='f'></i><i class='l'></i></span>";
      } else {
        $output .= "<span class='counter__bulb' data-second='" . ($seconds + 1) . "'><i class='f'></i><i class='l'></i></span>";
      }
    }

    return $output;

  }

  public function makeDateObject ($raw_date)
  {

    date_default_timezone_set ('America/New_York');
    $raw_time = strtotime($raw_date);

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
    $countdown_status = FALSE; // the countdown is OFF
    $time_diff = array();
    if ($date1 > $date2) {

      // print "difference " . $interval->d . " days " . $interval->h . " hours " . $interval->i . " minutes " . $interval->s . " seconds<br>";
      $countdown_status = TRUE; // the countdown is ON

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

      $countdown_status = FALSE; // the countdown is OFF
      $time_diff = array(
        "days" => 0,
        "hours" => array(0, 0),
        "mins" => array(0, 0),
        "seconds" => 0, // only way to be 0 is this way meaning game is ON
      );

    }


    $time_data = array(
      'info' => array(
        'raw' => $raw_date,
        'est' => date('g:i A', $raw_time),
        'date' => date('d M Y', $raw_time),
      ),
      'status' => $countdown_status, // FALSE if OFF, TRUE if ON
      'diff' => $time_diff,
    );

    return $time_data;
  }

}
