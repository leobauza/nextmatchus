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
      <h4>Hrs</h4>

    </div>

    <div class="counter__minutes">

      <div class="counter__number minutes__tens">
        <?php print makeNumberScreen($time_diff["mins"][0]); ?>
      </div>

      <div class="counter__number minutes__ones">
        <?php print makeNumberScreen($time_diff["mins"][1]); ?>
      </div>
      <h4>Min</h4>
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