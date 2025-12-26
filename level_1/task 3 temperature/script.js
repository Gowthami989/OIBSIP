function convert() {
    const value = parseFloat(document.getElementById("tempValue").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;

    if (isNaN(value)) {
        document.getElementById("output").innerText = "Please enter a number";
        return;
    }

    let celsius;

    if (from === "c") celsius = value;
    else if (from === "f") celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;

    let result;
    if (to === "c") result = celsius;
    else if (to === "f") result = (celsius * 9 / 5) + 32;
    else result = celsius + 273.15;

    document.getElementById("output").innerText =
        `Converted Value: ${result.toFixed(2)}`;
}
