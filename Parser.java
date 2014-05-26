import java.util.*;

public class Parser {
	static String str;
	static int pos;
	static Random r;

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		long seed = System.currentTimeMillis();
		r = new Random(seed);
		while (true) {
			str = sc.next();
			if (str.equals("!"))
				break;
			pos = 0;
			expression();
			System.out.println();
		}
		sc.close();
	}

	static void expression() {
		while (pos < str.length()) {
			statement();
		}
	}

	static void statement() {
		char c = str.charAt(pos);
		if (Character.isAlphabetic(c))
			verb();
		if (c == '(')
			loop();
		if (c == '[')
			junction();
	}

	static void verb() {
		System.out.print(str.charAt(pos));
		pos++;
	}

	static void loop() {
		pos++;
		int n = 0;
		while (Character.isDigit(str.charAt(pos))) {
			n *= 10;
			n += str.charAt(pos) - '0';
			pos++;
		}
		if (n != 0)
			for (int i = 0; i < n; i++) {
				int p = pos;
				while (str.charAt(pos) != ')') {
					statement();
				}
				if (i < n - 1)
					pos = p;
			}
		else
			while (str.charAt(pos) != ')')
				pos++;
		pos++;
	}

	static void junction() {
		pos++;
		if (r.nextInt(2) == 0) {
			while (str.charAt(pos) != '|')
				statement();
			pos++;
			while (str.charAt(pos) != ']')
				pos++;
		} else {
			while (str.charAt(pos) != '|')
				pos++;
			pos++;
			while (str.charAt(pos) != ']')
				statement();
		}
		pos++;
	}
}
