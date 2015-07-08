<?php
namespace Craft;

class MyPluginPlugin extends BasePlugin
{
  function getName()
  {
    return 'My Plugin';
  }

  function getVersion()
  {
    return '1.0';
  }

  function getDeveloper()
  {
    return 'NJI Media';
  }

  function getDeveloperUrl()
  {
    return 'http://njimedia.com';
  }

  public function addTwigExtension()
  {
    Craft::import('plugins.myplugin.twigextensions.MyPluginTwigExtension');
    return new MyPluginTwigExtension();
  }

}