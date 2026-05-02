package edu.unk.findmybook.service;


// for parsing and comparing LC call numbers,

public class LcCallNumberUtils {

    // parse a LC call number to pieces
    public static LcCallNumber parse(String callNumber) {
        if (callNumber == null || callNumber.isBlank()) {
            return null;
        }

        String[] parts = callNumber.trim().split("\\s+"); // split by whitespace first

        //parts of LC call numnber, thier default values
        String classLetters = ""; //
        Double classNumber = 0.0;

        String cutter1Letters = "";
        String cutter1RawNumber = "";

        String cutter2Letters = "";
        String cutter2RawNumber = "";

        Integer year = 0;

        // the first part: class letters and class number
        if (parts.length > 0) {
            String first = parts[0];

            classLetters = extractLeadingLetters(first);
            classNumber = extractTrailingDouble(first);
        }

     
        int index = 1;
        //
        if (parts.length > index) {
            String token = parts[index]; // the second part, could be cutter1 or year

            if (!isYear(token)) { // if it's not year, then it must be cutter1
                String cleaned = token.replace(".", ""); // 
                cutter1Letters = extractLetters(cleaned); //
                cutter1RawNumber = extractDigits(cleaned);
                index++; // move to the next part for further processing
            }
        }
        // the third part, could be cutter2 or year, same logic as above
    if (parts.length > index) {
        String token = parts[index];

        if (isYear(token)) {
            year = Integer.parseInt(token);
        } else {
            String cleaned = token.replace(".", "");
            cutter2Letters = extractLetters(cleaned);
            cutter2RawNumber = extractDigits(cleaned);
            index++;
            // if there's a fourth part and it's year, parse it
            if (parts.length > index && isYear(parts[index])) {
                year = Integer.parseInt(parts[index]);
            }
        }
    }

    return new LcCallNumber(
            classLetters,
            classNumber,
            cutter1Letters,
            cutter1RawNumber,
            cutter2Letters,
            cutter2RawNumber,
            year
        );
    }    

    // compare two LC call numbers, return -1 if left < right, 0 if equal, 1 if left > right
    public static int compare(String leftCallNumber, String rightCallNumber) {
        LcCallNumber left = parse(leftCallNumber);
        LcCallNumber right = parse(rightCallNumber);

        if (left == null && right == null) return 0;
        if (left == null) return -1;
        if (right == null) return 1;

        int result;

        // compare class letters, class number, cutter1 letters, cutter1 numbers, cutter2 letters, cutter2 numbers, year in order
        result = compareStrings(left.getClassLetters(), right.getClassLetters());
        if (result != 0) return result;
        //
        result = compareDoubles(left.getClassNumber(), right.getClassNumber());
        if (result != 0) return result;

        result = compareStrings(left.getCutter1Letters(), right.getCutter1Letters());
        if (result != 0) return result;

        result = compareCutterNumbers(left.getCutter1RawNumber(), right.getCutter1RawNumber());
        if (result != 0) return result;

        result = compareStrings(left.getCutter2Letters(), right.getCutter2Letters());
        if (result != 0) return result;

        result = compareCutterNumbers(left.getCutter2RawNumber(), right.getCutter2RawNumber());
        if (result != 0) return result;

        return compareIntegers(left.getYear(), right.getYear());
    }



    //
    public static boolean isWithinRange(String target, String start, String end) {
        return compare(target, start) >= 0 && compare(target, end) <= 0;

    }



    private static boolean isYear(String value) {
        return value != null && value.matches("\\d{4}");

    }

    private static String extractLetters(String input) {
        if (input == null) return "";
        return input.replaceAll("[^A-Za-z]", "").toUpperCase();
    }

    private static String extractDigits(String input) {
        if (input == null) return "";
        return input.replaceAll("[^0-9]", "");

    }

    private static Double extractDouble(String input) {

        if (input == null) return 0.0;
        String cleaned = input.replaceAll("[^0-9.]", ""); // remove non-numeric characters except dot
        if (cleaned.isEmpty()) return 0.0;
        return Double.parseDouble(cleaned);
         
    }

    private static int compareStrings(String a, String b) {

        String left = a == null ? "" : a;
        String right = b == null ? "" : b;
        return left.compareTo(right);
    }

    private static int compareDoubles(Double a, Double b) {


        Double left = a == null ? 0.0 : a;
        Double right = b == null ? 0.0 : b;
        return left.compareTo(right);

    }

    private static int compareIntegers(Integer a, Integer b) {
        Integer left = a == null ? 0 : a;
        Integer right = b == null ? 0 : b;
        return left.compareTo(right);
    }

    private static String extractLeadingLetters(String input) {
        if (input == null) return "";
            int i = 0;
            while (i < input.length() && Character.isLetter(input.charAt(i))) {
                i++;
            }
            return input.substring(0, i).toUpperCase();
        }

    // extract trailing numeric part as double, for example:
    // "76.73" -> 76.73
    private static Double extractTrailingDouble(String input) {
        if (input == null) return 0.0;

        int i = 0;
        while (i < input.length() && Character.isLetter(input.charAt(i))) {
            i++;
        }

    String numericPart = input.substring(i).replaceAll("[^0-9.]", "");
        if (numericPart.isEmpty()) return 0.0;

            return Double.parseDouble(numericPart);
    }


    

    /**
     * Compare cutter numeric part like decimal digits:
     * 5  -> 0.5
     * 56 -> 0.56
     * 6  -> 0.6
     *
     * So:
     * C5 < C56 < C6
     */
    private static int compareCutterNumbers(String leftRaw, String rightRaw) {
        String left = (leftRaw == null || leftRaw.isBlank()) ? "0" : leftRaw;
        String right = (rightRaw == null || rightRaw.isBlank()) ? "0" : rightRaw;

        int maxLength = Math.max(left.length(), right.length());

        String leftPadded = padRight(left, maxLength);
        String rightPadded = padRight(right, maxLength);

        return leftPadded.compareTo(rightPadded);
    }

    private static String padRight(String value, int targetLength) {
        StringBuilder builder = new StringBuilder(value);
        while (builder.length() < targetLength) {
            builder.append('0');
        }
        return builder.toString();
    }
}