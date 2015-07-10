<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in
 * craft/app/etc/config/defaults/db.php
 */

return array(

  '*' => array(
    // The prefix to use when naming tables.
    // This can be no more than 5 characters.
    'tablePrefix' => 'craft',
  ),

  'nextmatch.loc' => array(
    // The database server name or IP address. Usually this is
    // 'localhost' or '127.0.0.1'.
    'server' => '127.0.0.1',
    // The database username to connect with.
    'user' => 'root',
    // The database password to connect with.
    'password' => 'root',
    // The name of the database to select.
    'database' => 'nextmatchus_craft',
  ),

  'nextmatch.leobauza.com' => array(
    // The database server name or IP address. Usually this is
    // 'localhost' or '127.0.0.1'.
    'server' => '127.0.0.1',
    // The database username to connect with.
    'user' => 'leobauza_nmus',
    // The database password to connect with.
    'password' => '7Z{c>ykmNwZvyqBChe2G',
    // The name of the database to select.
    'database' => 'leobauza_nextmatchus_craft',
  ),

  'nextmatch.us' => array(
    // The database server name or IP address. Usually this is
    // 'localhost' or '127.0.0.1'.
    'server' => 'mysql51-007.wc2.dfw1.stabletransit.com',
    // The database username to connect with.
    'user' => '965314_nmus_dbu',
    // The database password to connect with.
    'password' => 'gjLa3e&K]X7sZdkWkzqi',
    // The name of the database to select.
    'database' => '965314_nextmatchus_craft',
  ),

);
