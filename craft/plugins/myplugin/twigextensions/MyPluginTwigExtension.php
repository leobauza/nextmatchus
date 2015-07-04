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
      'myplugin'  => new \Twig_Filter_Method($this, 'myplugin', array('is_safe' => array('html')))
    );
  }

  public function getFunctions()
  {
    return array(
      'myplugin'  => new \Twig_Function_Method($this, 'myplugin', array('is_safe' => array('html')))
    );
  }


  public function myplugin($var)
  {
    $html = "<h1>" . $var . "</h1>";
    return $html;
  }

}
