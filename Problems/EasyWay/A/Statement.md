A 林檎とアリ (Apple and Ant)
=
Problem Statement
-
アリは、林檎の甘い蜜が大好物である。今日も、蜜を集めるために林檎の木の下にやってきた。

林檎は熟すと木から垂直に落ち、地面にぶつかると砕ける。林檎が砕けていれば、アリは破片を巣に持ち帰ることができる。
ところが、木の枝が林檎の真下にあると、林檎が枝にぶつかってしまって落ちてこない。

あなたの仕事は、アリが何個分の林檎を巣に持ち帰ることができるかを求めるプログラムを作成することである。

Input
-
入力は、以下の形式で表される。

> n<br>
> bx<sub>1</sub> by<sub>1</sub><br>
> bx<sub>2</sub> by<sub>2</sub><br>
> ...<br>
> bx<sub>n</sub> by<sub>n</sub><br>
> m<br>
> ax<sub>1</sub> ay<sub>1</sub><br>
> ax<sub>2</sub> ay<sub>2</sub><br>
> ...<br>
> ax<sub>m</sub> ay<sub>m</sub><br>

nは枝の本数、bx,byは各枝の座標、nは林檎の数、ax,ayは各林檎の座標を表す。

入力は全て整数である。また、林檎と枝の直径はすべて1単位距離である。

入力は、以下の条件をすべて満たす。
* 0 <= n,m <= 100
* 1 <= bx,ax <= 1000
* 1 <= by,ay <= 2000

Output
-
出力は、アリが持ち帰ることができる林檎の個数を1行で出力せよ。

Sample Input 1
-
    3
    1 1
    2 1
    3 1
    3
    2 2
    4 2
    6 2

Sample Output 1
-
    2

Sample Input 2
-
    10
    1 10
    2 9
    3 8
    4 7
    5 6
    6 5
    7 4
    8 3
    9 2
    10 1
    4
    1 6
    3 6
    7 6
    10 6

Sample Output 2
-
    2