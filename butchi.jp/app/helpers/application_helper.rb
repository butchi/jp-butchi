module ApplicationHelper
  def default_meta_tags
    ttl = Settings.meta.title

    thumbnail = {
      _: Settings.meta.share_image,
      width: 1134,
      height: 727
    }

    {
      charset: 'utf-8',
      title: ttl,
      description: Settings.meta.description,
      keywords: Settings.meta.keywords.join(','),
      'apple-mobile-web-app-capable' => 'no',
      'apple-mobile-web-app-status-bar-style' => 'default',
      'viewport' => 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      og: {
        title: ttl,
        type: 'website',
        url: Settings.meta.url,
        image: thumbnail,
        site_name: ttl,
        description: :description,
        locale: 'ja_JP'
      },
      twitter: {
        card: 'summary_large_image',
        title: ttl,
        description: Settings.meta.description,
        image: thumbnail,
        site: '@butchi_y',
        creator: '@butchi_y'
      }
    }
  end
end
