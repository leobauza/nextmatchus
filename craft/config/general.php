<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

  '*' => array(
    'omitScriptNameInUrls' => true,
  ),

  'nextmatch.loc' => array(
    'devMode' => true,
    'siteUrl' => 'http://nextmatch.loc/',
    'environmentVariables' => array(
      'basePath' => '/var/www/vhosts/nextmatch.us/www/base/web/',
      'baseUrl'  => 'http://nextmatch.loc/',
    )
  ),

);
