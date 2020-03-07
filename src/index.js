module.exports = function toReadable(number) {
    const hundreds = ["hundred", "thousand"];
    const tens = [
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety"
    ];
    const ones = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine"
    ];
    const elevens = [
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen"
    ];
    if (!number) {
        return "zero";
    }
    // создаем массив из числа
    const numberArr = n => n.toString().split("");
    //слова для единиц, десятков, сотен
    let _onesWord = "";
    let _tensWord = "";
    let _hundredsWord = "";

    // ищем единицы
    const onesWord = (n1, n2) => ones[parseInt(numberArr(n1)[n2], 10)];
    // ищем десятки
    const tensWord = (n1, n2) => tens[parseInt(numberArr(n1)[n2], 10) - 2];

    switch (true) {
        case number < 10:
            return ones[number].trim();

        case number >= 10 && number < 20:
            return elevens[number - 10].trim();

        case number >= 20 && number < 100:
            _onesWord = onesWord(number, 1);
            _tensWord = tensWord(number, 0);
            return `${_tensWord} ${_onesWord}`.trim();

        case number >= 100 && number < 1000:
            // 900
            if (numberArr(number)[2] === "0" && numberArr(number)[1] === "0") {
                return `${onesWord(number, 0)} ${hundreds[0]}`.trim();
            }
            // a = 927;
            // нет 0 единиц и нет 0 десятков
            let numbersTens = parseInt(
                numberArr(number)[1] + numberArr(number)[2]
            );
            console.log("numbersTens - ", numbersTens);

            if (numbersTens >= 20 && numbersTens < 100) {
                _onesWord = onesWord(number, 2);
                _tensWord = tensWord(number, 1);
                _hundredsWord = onesWord(number, 0);
                return `${_hundredsWord} ${hundreds[0]} ${_tensWord} ${_onesWord}`.trim();
            }

            // десятки 909
            if (numbersTens < 10) {
                return `${onesWord(number, 0)} ${hundreds[0]} ${
                    ones[numbersTens]
                }`.trim();
            }
            // 912
            if (numbersTens >= 10 && numbersTens < 20) {
                return `${onesWord(number, 0)} ${hundreds[0]} ${
                    elevens[numbersTens - 10]
                }`.trim();
            }

        default:
            break;
    }
};
