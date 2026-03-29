console.log(window.typesData);

function testType() {
    let type = new Type("Dark");
    console.log(type.toString());
}

document.getElementById("testButton").addEventListener("click", testType);