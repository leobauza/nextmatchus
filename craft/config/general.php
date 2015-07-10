<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in
 * craft/app/etc/config/defaults/general.php
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

  'nextmatch.leobauza.com' => array(
    'siteUrl' => 'http://nextmatch.leobauza.com/',
    'environmentVariables' => array(
      'basePath' => '/home/leobauza/subdomain/nextmatch/web/',
      'baseUrl'  => 'http://nextmatch.leobauza.com/',
    )
  ),

  'nextmatch.us' => array(
    'siteUrl' => 'http://nextmatch.us/',
    'environmentVariables' => array(
      'basePath' => '/mnt/stor11-wc2-dfw1/529549/965314/www.nextmatch.us/web/content/',
      'baseUrl'  => 'http://nextmatch.us/',
    )
  ),

);
