// ! 	gets a HTML string, returns the number of words.
// TODO findElementByName("<div><h3 class="class__name">hello world!</h3></div>", 'h3');
// ?  	<h3 class="class__name">hello world!</h3>
export const wordCount = (text) => {
    const str = text.toLowerCase().replace(/[.,/#!@\\$%^&*;:{}=\-_`~()]/g, "");
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
        // ! checks the a and i letters
        if ((str[i] === 'a') || (str[i] === 'i')) {
            if (str[i + 1] === ' ') {
                counter++;
                continue;
            }
        }
        // ! checks the rest of the letters
        if ((str[i] === ' ') && (str[i + 1] !== ' ')) {
            if (str[i + 1]) {
                counter++;
            }
        }
    }
    return counter;
}

// ! 	gets a string and the desired length.
// TODO changeStringLength("i am michael scharff", 12);
// ?  	i am michael
export const changeStringLength = (str, desiredLength) => {
    while (str.length > desiredLength) {
        str = str.substring(0, str.length - 1);
    }
};

// ! 	gets a HTML string, the element you want to exclude and true if its a react component. returns only the element.
// TODO findElementByName("<div><h3 class="class__name">hello world!</h3></div>", 'h3');
// ?  	<h3 class="class__name">hello world!</h3>
export const findElementByName = (str, elementToFind, isReactComponent = false) => {
    let newStr = '';
    const startIndex = str.indexOf(`<${elementToFind}`);
    const secondIndex = str.indexOf(`</${elementToFind}>`, (startIndex + 1));
    let endIndex = 0;
    newStr = str[startIndex];
    if (isReactComponent) {
        endIndex = str.indexOf(`/>`, (startIndex + 1)) + 2;
    } else {
        endIndex = secondIndex + elementToFind.length + 3;
    }
    const range = endIndex - startIndex;
    for (let i = 1; i < range; i++) {
        newStr += str[startIndex + i];
    }
    return newStr;
}

export const sortArrayByFrequency = (articles) => {
    const keywordCounts = {};
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const keyword = article.keyword;
        if (keyword in keywordCounts) {
            keywordCounts[keyword]++;
        } else {
            keywordCounts[keyword] = 1;
        }
    }

    const sortedKeywords = Object.keys(keywordCounts).sort((a, b) => {
        return keywordCounts[b] - keywordCounts[a];
    });

    return sortedKeywords;
}

export const formatKeywordsString = (keywordsArray) => {
    const MAX_DISPLAY_COUNT = 3;
    let displayCount = 0;
    let otherCount = 0;
    let outputString = '';

    for (let i = 0; i < keywordsArray.length; i++) {
        if (displayCount < MAX_DISPLAY_COUNT) {
            outputString += `${keywordsArray[i]}, `;
            displayCount++;
        } else {
            otherCount++;
        }
    }

    outputString = outputString.slice(0, -2);

    if (otherCount > 0) {
        if (displayCount > 0) {
            outputString += ',';
        }
        outputString += ` and ${otherCount} other${otherCount > 1 ? 's' : ''}`;
    }

    return outputString;
}
