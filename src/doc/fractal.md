フラクタル (fractal) について、名のあるフラクタル図形を知っている限り列挙。

[Wikimedia CommonsのFractalのギャラリー](http://commons.wikimedia.org/wiki/Fractal)
でほとんど網羅されてますけど…。



# 再帰的処理によるもの


曲線に対して再帰的処理を施したものは特に再帰曲線と呼ばれる。


## コッホ雪片（Koch snowflake）

コッホ曲線を3つ繋げた図形。内部の面積は有限だが境界線の長さは無限大。

![コッホ雪片](${imgPath}koch_snowflake.png)


## コッホ曲線（Koch curve）

![コッホ曲線](${imgPath}koch.gif)

### Quadratic von Koch curve (type 1)

[Vicsek fractal](#vicsek) の一部。

![Quadratic von Koch curve (type 1)](${imgPath}quadratic_type1_4.png)

### Quadratic von Koch curve (type 2)

ミンコフスキーのソーセージ(Minkowski sausage)とも。

![Quadratic von Koch curve (type 2)](${imgPath}quadratic_type2_3.png)

### Cesaro fractal

![Cesaro fractal](${imgPath}cesaro_6.png)

### コッホ曲線の亜種

![コッホ曲線の亜種](${imgPath}4_6.png)

![コッホ曲線の亜種](${imgPath}5_6.png)

![コッホ曲線の亜種](${imgPath}6_6.png)

## カントール集合（Cantor set）

0～1の実数を3進数で表現したとき、その文字列の中に1を含まない点（ $0.20020222_3$ など）の集合として定義することができる。そのため、このように定義した場合はカントールの3進集合（Cantor ternary set）とも呼ばれる。

cf) 悪魔の階段（Devil's staircase、カントール関数（Cantor function））

![悪魔の階段（カントール関数）](${imgPath}cantor_function.png)


<a id="cantor_dust"></a>
## カントールの塵（Cantor dust）

カントール集合の2次元への拡張。

[![シェルピンスキーのギャスケット](${imgPath}cantor_dust.png)](${imgPath}cantor_dust_large.png)


## Cantor Square Fractal
[カントールの塵](#cantor_dust) の補集合

[![シェルピンスキーのギャスケット](${imgPath}cantor_square_fractal.png)](${imgPath}cantor_square_fractal_large.png)


## シェルピンスキーのギャスケット（Sierpiński gasket）
<small>「シェルピンスキーのガスケット」や「シルピンスキーのギャスケット」、「シェルピンスキーの三角形（Sierpiński triangle）」などとも。</small>

[![シェルピンスキーのギャスケット](${imgPath}sierpinski_gasket.png)](${imgPath}sierpinski_gasket.svg)

点（図示では円）を初期集合として表すこともできる。

[![シェルピンスキーのギャスケット](${imgPath}sierpinski_gasket_with_point.png)](${imgPath}sierpinski_gasket_with_point.svg)

線分を初期集合として表すこともできる。

[![シェルピンスキーのギャスケット](${imgPath}sierpinski_gasket_with_line.png)](${imgPath}sierpinski_gasket_with_line.svg)

三角形を初期集合として表すこともできる。これが一番よく知られている方法である。

[![シェルピンスキーのギャスケット](${imgPath}sierpinski_gasket_with_triangle.png)](${imgPath}sierpinski_gasket_with_triangle.svg)

ビットマップに合う簡単な形としてせん断された状態で描かれることもある。下図はセルオートマトンのルール60である。

[![シェルピンスキーのギャスケット](${imgPath}sierpinski_gasket_rule60.png)](${imgPath}sierpinski_gasket_rule60_large.png)

下図のセルオートマトンのルール90としても知られている。

[![シェルピンスキーのギャスケット](${imgPath}sierpinski_gasket_rule90.png)](${imgPath}sierpinski_gasket_rule90_large.png)


## シェルピンスキーのカーペット（Sierpiński carpet）

シェルピンスキーのギャスケットの外形が正三角形であるのに対し、こちらは正方形。

[![シェルピンスキーのカーペット](${imgPath}sierpinski_carpet.png)](${imgPath}sierpinski_carpet_large.png)


## メンガーのスポンジ（Menger sponge）

シェルピンスキーのカーペットの3次元拡張。


<a id="vicsek"></a>
## Vicsek fractal

「Vicsek snowflake」や「box fractal」、「quadraflake」とも。

X字(saltire)の作り方と+字(cross)の作り方がある。

[![シェルピンスキーのカーペット](${imgPath}vicsek_saltire.png)](${imgPath}vicsek_saltire_large.png)
[![シェルピンスキーのカーペット](${imgPath}vicsek_cross.png)](${imgPath}vicsek_cross_large.png)


## <i>n</i>-flake

$n=3$ でシェルピンスキーのギャスケット、 $n=4$ でVicsek fractalになる。

### Pentaflake

### Hexaflake

[![Hexaflake](${imgPath}hexaflake.png)](${imgPath}hexaflake.svg)

ビットマップに合う簡単な形としてせん断された状態でも描ける。

[![Hexaflake](${imgPath}hexaflake_carpet.png)](${imgPath}hexaflake_carpet_large.png)

### Polyflake

### Sierpinski tetrahedron

### Hexahedron flake

### Octahedron flake

### Dodecahedron flake

### Icosahedron flake


## T-square

### 空間充填曲線（Space-filling curves）

平面充填曲線としては以下のような曲線が挙げられる。

#### ペアノ曲線（Peano curve）

##### 2D Greek cross fractal (?)

![2D Greek cross fractal (?)](${imgPath}1_3.png)

[2D Greek cross fractal](http://en.wikipedia.org/wiki/File:Greek_cross_fractal_stage_4.svg)

#### ヒルベルト曲線（Hilbert curve）

#### シェルピンスキー曲線（Sierpiński curve）

#### ムーア曲線（Moore curve）

#### ゴスパー曲線（Gosper curve）

#### ルベーグ曲線（Lebesgue curve）

Z曲線（z-order curve）とも

### 補足

極限は平面図形そのものであるため、フラクタルの定義からは外れるが、自己相似性は有するためフラクタル図形として数えられることが多い。


## ドラゴン曲線（dragon curve）

![ドラゴン曲線](${imgPath}dragon.gif)

これも空間充填曲線の一種である。境界線のハウスドルフ次元は非整数である。

Heighway dragon、Harter–Heighway dragon、Jurassic Park dragonとも。

Twindragon曲線（Davis-Knuth dragon）は2つのドラゴン曲線を点対称に繋ぎ合わせた形であり、複素数を $i-1$ 進数で表したときに見つけられる形である。

[![Twindragon曲線](${imgPath}twindragon.png)](${imgPath}twindragon_large.png)

派生形としてTerdragon曲線もある。

![Terdragon曲線](${imgPath}terdragon_8.png)


## レヴィのC曲線（Lévy C curve）

ドラゴン曲線と似た方法で作られ、Lévy dragonとも呼ばれる。<small>（個人的にはあまり好きじゃないかたち…。）</small>

![レヴィのC曲線](${imgPath}c_13.png)


## ミンコフスキー曲線（Minkowski curve）

![ミンコフスキー曲線](${imgPath}minkowski_6.png)


## 無名の再帰曲線

名前を知っている方がいればご一報ください。

![無名の再帰曲線](${imgPath}3_6.png)

![無名の再帰曲線](${imgPath}7_5.png)



# 複素数


## マンデルブロ集合（Mandelbrot set）

[![マンデルブロ集合](${imgPath}mandelbrot.png)](${imgPath}mandelbrot--large.png)

## ジュリア集合（Julia set）

## Burning Ship fractal



# 自己相似性をもつ関数


## 高木曲線（Takagi curve）

海外ではブラマンジェ曲線（blancmange curve）として知られている。


## ワイエルシュトラス関数（Weierstrass function）



# 自然界におけるフラクタル


## 拡散律速凝集（DLA, Diffusion-limited aggregation）

→ [Wikipedia（英語）](http://en.wikipedia.org/wiki/Diffusion-limited_aggregation)


## ロマネスコ（Broccoflower）

[![ロマネスコ](${imgPath}romanesco.jpg)](${imgPath}romanesco--large.jpg)


## ブロッコリー（Broccoli）

![ブロッコリーの束](${imgPath}broccoli_all.jpg)

![ブロッコリーのかけら](${imgPath}broccoli_part.jpg)



# 参考リンク

- [フラクタル図形のハウスドルフ次元一覧（Wikipedia英語版）](http://en.wikipedia.org/wiki/List_of_fractals_by_Hausdorff_dimension)
