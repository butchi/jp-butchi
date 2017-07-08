フラクタル (fractal) について、名のあるフラクタル図形を知っている限り列挙。

[Wikimedia CommonsのFractalのギャラリー](http://commons.wikimedia.org/wiki/Fractal)
でほとんど網羅されてますけど…。


<section class="recursion">

# 再帰的処理によるもの


曲線に対して再帰的処理を施したものは特に再帰曲線と呼ばれる。

<section class="koch-snowflake">

## コッホ雪片（Koch snowflake）

コッホ曲線を3つ繋げた図形。内部の面積は有限だが境界線の長さは無限大。

![コッホ雪片]($$$imgPath$$$koch_snowflake.png)

</section>

<section class="koch-curve">

## コッホ曲線（Koch curve）

![コッホ曲線]($$$imgPath$$$koch.gif)

<section class="quadratic-von-koch-curve-type-1">

### Quadratic von Koch curve (type 1)

[Vicsek fractal](#.vicsek-fractal) の一部。

![Quadratic von Koch curve (type 1)]($$$imgPath$$$quadratic_type1_4.png)

</section>

<section class="quadratic-von-koch-curve-type-2">

### Quadratic von Koch curve (type 2)

ミンコフスキーのソーセージ(Minkowski sausage)とも。

![Quadratic von Koch curve (type 2)]($$$imgPath$$$quadratic_type2_3.png)

</section>

<section class="cesaro-fractal">

### Cesaro fractal

![Cesaro fractal]($$$imgPath$$$cesaro_6.png)

</section>

<section class="koch-extra">

### コッホ曲線の亜種

![コッホ曲線の亜種]($$$imgPath$$$4_6.png)

![コッホ曲線の亜種]($$$imgPath$$$5_6.png)

![コッホ曲線の亜種]($$$imgPath$$$6_6.png)

</section>

</section>

<section class="cantor-set">

## カントール集合（Cantor set）

0～1の実数を3進数で表現したとき、その文字列の中に1を含まない点（ $0.20020222_3$ など）の集合として定義することができる。そのため、このように定義した場合はカントールの3進集合（Cantor ternary set）とも呼ばれる。

cf) 悪魔の階段（Devil's staircase、カントール関数（Cantor function））

![悪魔の階段（カントール関数）]($$$imgPath$$$cantor_function.png)

</section>

<section class="cantor-dust">

## カントールの塵（Cantor dust）

カントール集合の2次元への拡張。

[![シェルピンスキーのギャスケット]($$$imgPath$$$cantor_dust.png)]($$$imgPath$$$cantor_dust_large.png)

</section>

<section class="cantor-square-fractal">

## Cantor Square Fractal
[カントールの塵](#.cantor-dust) の補集合

[![シェルピンスキーのギャスケット]($$$imgPath$$$cantor_square_fractal.png)]($$$imgPath$$$cantor_square_fractal_large.png)

</section>

<section class="sierpinski-gasket">

## シェルピンスキーのギャスケット（Sierpiński gasket）
<small>「シェルピンスキーのガスケット」や「シルピンスキーのギャスケット」、「シェルピンスキーの三角形（Sierpiński triangle）」などとも。</small>

[![シェルピンスキーのギャスケット]($$$imgPath$$$sierpinski_gasket.png)]($$$imgPath$$$sierpinski_gasket.svg)

点（図示では円）を初期集合として表すこともできる。

[![シェルピンスキーのギャスケット]($$$imgPath$$$sierpinski_gasket_with_point.png)]($$$imgPath$$$sierpinski_gasket_with_point.svg)

線分を初期集合として表すこともできる。

[![シェルピンスキーのギャスケット]($$$imgPath$$$sierpinski_gasket_with_line.png)]($$$imgPath$$$sierpinski_gasket_with_line.svg)

三角形を初期集合として表すこともできる。これが一番よく知られている方法である。

[![シェルピンスキーのギャスケット]($$$imgPath$$$sierpinski_gasket_with_triangle.png)]($$$imgPath$$$sierpinski_gasket_with_triangle.svg)

ビットマップに合う簡単な形としてせん断された状態で描かれることもある。下図はセルオートマトンのルール60である。

[![シェルピンスキーのギャスケット]($$$imgPath$$$sierpinski_gasket_rule60.png)]($$$imgPath$$$sierpinski_gasket_rule60_large.png)

下図のセルオートマトンのルール90としても知られている。

[![シェルピンスキーのギャスケット]($$$imgPath$$$sierpinski_gasket_rule90.png)]($$$imgPath$$$sierpinski_gasket_rule90_large.png)

</section>

<section class="sierpinski-carpet">

## シェルピンスキーのカーペット（Sierpiński carpet）

シェルピンスキーのギャスケットの外形が正三角形であるのに対し、こちらは正方形。

[![シェルピンスキーのカーペット]($$$imgPath$$$sierpinski_carpet.png)]($$$imgPath$$$sierpinski_carpet_large.png)

</section>

## Sierpinski Pentagon

[Sierpinski Pentagon](http://ecademy.agnesscott.edu/~lriddle/ifs/pentagon/pentagon.htm)

<section class="menger-sponge">

## メンガーのスポンジ（Menger sponge）

シェルピンスキーのカーペットの3次元拡張。

</section>

<section class="vicsek-fractal">

## Vicsek fractal

「Vicsek snowflake」や「box fractal」、「quadraflake」とも。

X字(saltire)の作り方と+字(cross)の作り方がある。

[![シェルピンスキーのカーペット]($$$imgPath$$$vicsek_saltire.png)]($$$imgPath$$$vicsek_saltire_large.png)
[![シェルピンスキーのカーペット]($$$imgPath$$$vicsek_cross.png)]($$$imgPath$$$vicsek_cross_large.png)

</section>

<section class="n-flake">

## <i>n</i>-flake

$n=3$ でシェルピンスキーのギャスケット、 $n=4$ でVicsek fractalになる。

<section class="pentaflake">

### Pentaflake

</section>

<section class="hexaflake">

### Hexaflake

[![Hexaflake]($$$imgPath$$$hexaflake.png)]($$$imgPath$$$hexaflake.svg)

ビットマップに合う簡単な形としてせん断された状態でも描ける。

[![Hexaflake]($$$imgPath$$$hexaflake_carpet.png)]($$$imgPath$$$hexaflake_carpet_large.png)

</section>

<section class="polyflake">

### Polyflake

</section>

<section class="sierpinski-tetrahedron">

### Sierpinski tetrahedron

</section>

<section class="hexahedron-flake">

### Hexahedron flake

</section>

<section class="octahedron-flake">

### Octahedron flake

</section>

<section class="dodecahedron-flake">

### Dodecahedron flake

</section>

<section class="icosahedron-flake">

### Icosahedron flake

</section>

</section>

<section class="t-square">

## T-square

</section>

## Jerusalem Square

<section class="space-filling-curves">

## 空間充填曲線（Space-filling curves）

平面充填曲線としては以下のような曲線が挙げられる。

<section class="peano-curve">

### ペアノ曲線（Peano curve）

<section class="dimension-2-greek-cross-fractal">

#### 2D Greek cross fractal (?)

![2D Greek cross fractal (?)]($$$imgPath$$$1_3.png)

[2D Greek cross fractal](http://en.wikipedia.org/wiki/File:Greek_cross_fractal_stage_4.svg)

</section>

</section>

<section class="hilbert-curve">

### ヒルベルト曲線（Hilbert curve）

</section>

<section class="sierpinski-curve">

### シェルピンスキー曲線（Sierpiński curve）

</section>

<section class="moore-curve">

### ムーア曲線（Moore curve）

</section>

<section class="gosper-curve">

### ゴスパー曲線（Gosper curve）

</section>

<section class="lebesgue-curve">

### ルベーグ曲線（Lebesgue curve）

Z曲線（z-order curve）とも

</section>

<section class="appendix">

### 補足

極限は平面図形そのものであるため、フラクタルの定義からは外れるが、自己相似性は有するためフラクタル図形として数えられることが多い。

</section>

</section>

<section class="dragon-curve">

## ドラゴン曲線（dragon curve）

![ドラゴン曲線]($$$imgPath$$$dragon.gif)

これも空間充填曲線の一種である。境界線のハウスドルフ次元は非整数である。

Heighway dragon、Harter–Heighway dragon、Jurassic Park dragonとも。

Twindragon曲線（Davis-Knuth dragon）は2つのドラゴン曲線を点対称に繋ぎ合わせた形であり、複素数を $i-1$ 進数で表したときに見つけられる形である。

[![Twindragon曲線]($$$imgPath$$$twindragon.png)]($$$imgPath$$$twindragon_large.png)

派生形としてテルドラゴン曲線（Terdragon Curve）もある。

![テルドラゴン曲線]($$$imgPath$$$terdragon_8.png)

</section>

<section class="levy-c-curve">

## レヴィのC曲線（Lévy C curve）

ドラゴン曲線と似た方法で作られ、Lévy dragonとも呼ばれる。<small>（個人的にはあまり好きじゃないかたち…。）</small>

![レヴィのC曲線]($$$imgPath$$$c_13.png)

</section>

## Fudgeflake

[Fudgeflake](http://ecademy.agnesscott.edu/~lriddle/ifs/heighway/fudgeflake.htm)

<section class="minkowski-curve">

## ミンコフスキー曲線（Minkowski curve）

![ミンコフスキー曲線]($$$imgPath$$$minkowski_6.png)

</section>

<section class="noname-recursive-curve">

## McWorter's Pentigree

[McWorter's Pentigree](http://ecademy.agnesscott.edu/~lriddle/ifs/pentigre/pentigre2.htm)

## 無名の再帰曲線

名前を知っている方がいればご一報ください。

![無名の再帰曲線]($$$imgPath$$$3_6.png)

![無名の再帰曲線]($$$imgPath$$$7_5.png)

</section>

</section>

<section class="complex">

# 複素数

<section class="mandelbrot set">

## マンデルブロ集合（Mandelbrot set）

[![マンデルブロ集合]($$$imgPath$$$mandelbrot.png)]($$$imgPath$$$mandelbrot--large.png)

</section>

<section class="julia-set">

## ジュリア集合（Julia set）

</section>

<section class="burning-ship-fractal">

## Burning Ship fractal

</section>

</section>

<section class="function">

# 自己相似性をもつ関数

<section class="takagi-curve">

## 高木曲線（Takagi curve）

海外ではブラマンジェ曲線（blancmange curve）として知られている。

</section>

<section class="weierstrass-function">

## ワイエルシュトラス関数（Weierstrass function）

</section>

</section>

<section class="nature">

# 自然界におけるフラクタル

<section class="dla">

## 拡散律速凝集（DLA, Diffusion-limited aggregation）

→ [Wikipedia（英語）](http://en.wikipedia.org/wiki/Diffusion-limited_aggregation)

</section>

<section class="broccoflower">

## ロマネスコ（Broccoflower）

[![ロマネスコ]($$$imgPath$$$romanesco.jpg)]($$$imgPath$$$romanesco--large.jpg)

</section>

<section class="broccoli">

## ブロッコリー（Broccoli）

![ブロッコリーの束]($$$imgPath$$$broccoli_all.jpg)

![ブロッコリーのかけら]($$$imgPath$$$broccoli_part.jpg)

</section>

</section>

<section class="reference">

# 参考リンク

- [フラクタル図形のハウスドルフ次元一覧（Wikipedia英語版）](http://en.wikipedia.org/wiki/List_of_fractals_by_Hausdorff_dimension)

</section>
