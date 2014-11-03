<?php
// index.php from waraken06.php
// 06 JavaScriptによる検索結果のページ書き換え、ワード数上限の対策
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="ja">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="style.css" type="text/css" media="all">
<title>ワラ検 or ワラサーチ or クサーチ</title>
</head>
<body>
<p>「ｗｗ」とか「ｗｗｗｗ」とかの検索結果をグラフ化。</p>

<?php
// from http://www.nijiiroworks.com/blog/214.html

include_once 'simple_html_dom.php';

$max_wlength = 42; // "ｗ"×50まで検索
$limit = $max_wlength+1; // 検索結果が出なくなる文字数（43になる）、最初は検索上限
$w = "";
// link encoding
for($i_counter=1; $i_counter<=$max_wlength; $i_counter++) {
  $w .= "ｗ";
  $searchGoogleUrl = 'http://www.google.co.jp/search?hl=ja&safe=off&oe=utf-8&q=' .urlencode($w);
  $htmlGoogle = file_get_html($searchGoogleUrl);
  //$titleGoogle = $htmlGoogle->find('title'); // タイトル（ｗｗｗ - Google 検索）
  $retGoogle = $htmlGoogle->find('#resultStats');
  //$title_plain = $titleGoogle[0]->plaintext; // タイトルのタグ除去結果
  if($retGoogle[0]=="") {
    $limit = $i_counter; // $limitに検索結果が出なくなった時の文字数を代入
    break; // ループから抜ける
  }
  $ret_plain[$i_counter] = $retGoogle[0]->plaintext;
  $ret_aboutnum[$i_counter] = preg_replace("/（[0-9.]+ 秒）/u","",$ret_plain[$i_counter]); // 検索秒数を削除
  $ret_num[$i_counter] = preg_replace("/[^0-9]/u","",$ret_aboutnum[$i_counter]); // "約"、"件"、","を削除して数値だけにする
  //print($i_counter.": ".$ret_num[$i_counter]);
  //print("<br>\n");
}

$min = min($ret_num);
//print("Minimum: ".$min."<br>\n");

$w = "";
print('<table class="w_block"><tr>');
print("\n");
for($i_counter=1; $i_counter<$limit; $i_counter++) {
  $w .= "ｗ";
  print('<td class="w"><a class="w_google" href="http://www.google.co.jp/search?hl=ja&safe=off&oe=utf-8&q='.urlencode($w).'" onmouseover="document.getElementById(\'result\').innerHTML = \''.$w.'の検索結果: '.$ret_aboutnum[$i_counter].'\';" onmouseout="document.getElementById(\'result\').innerHTML = \'<br>\';">');
  for($j_counter=log($min,2); $j_counter<=log($ret_num[$i_counter],2); $j_counter++) {
    print("ｗ<br>");
  }
  print("</a></td>\n");
}
print("</tr></table>\n");

print('<br><div id="result"><br></div>');

?>

<!--Google Analystics--><script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-2779957-3");
pageTracker._trackPageview();
} catch(err) {}</script><!--/Google Analystics-->
</body>
</html>
