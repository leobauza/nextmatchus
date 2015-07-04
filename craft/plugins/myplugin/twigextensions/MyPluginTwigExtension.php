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

}
