(function() {
  var template = _.template('<li><span class="source"><%= source %></span><span class="title"><%= title %></span><span class="date"><a href="<%= link %>" target="_blank"><%= pubDate %></a></span></li>');

  $.getJSON(
    "http://pipes.yahoo.com/pipes/pipe.run?_id=5470bcf1354e2740dd84206b66778366&_render=json&_callback=?",
    function(data) {
      var $feed = $('<ul>');
      var source;
      data.value.items.forEach(function(elm, i) {
        if(false) {
        } else if(_.contains(elm.link, '//www.last.fm/')) {
          source = 'last.fm';
        } else if(_.contains(elm.link, '//twitter.com/')) {
          source = 'Twitter';
        } else if(_.contains(elm.link, '//jsdo.it/')) {
          source = 'jsdo.it';
        } else if(_.contains(elm.link, '//qiita.com/')) {
          source = 'Qiita';
        } else if(_.contains(elm.link, '//butchi.blog42.fc2.com/')) {
          source = 'ブッチブログ';
        }

        var date = new Date(elm.pubDate);
        var dateTxt = date.getFullYear() + '年' +
          (date.getMonth() + 1) + '月' +
          date.getDate() + '日 ' +
          ('00' + date.getHours()).slice(-2) + ':' +
          ('00' + date.getMinutes()).slice(-2);

        $feed.append(template({
          source: source,
          title: elm.title,
          pubDate: dateTxt,
          link: elm.link
        }));

        $('.butchi-feed').html($feed);

        // console.log(elm.title);
        // title
        // pubDate
        // link
        // description
      });
    }
  );
}());