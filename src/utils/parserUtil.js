// Parses JSON response
function parseJsonResponse(response) {
    return response.json().then(data => Array.isArray(data) ? data : [data]);
}

// Parses XML response
function parseXmlResponse(response) {
    return response.text().then(str => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "application/xml");
        const filmNodes = Array.from(xmlDoc.getElementsByTagName("object"));
        return filmNodes.map(filmNode => ({
        id: filmNode.getElementsByTagName("id")[0].textContent,
        title: filmNode.getElementsByTagName("title")[0].textContent,
        year: filmNode.getElementsByTagName("year")[0].textContent,
        director: filmNode.getElementsByTagName("director")[0].textContent,
        stars: filmNode.getElementsByTagName("stars")[0].textContent,
        review: filmNode.getElementsByTagName("review")[0].textContent,
        }));
    });
}

// Parses plain text response and individual film data
function parsePlainTextResponse(response, separator = "], Film [") {
return response.text().then(text => {
        const filmDescriptions = text.slice(1, -1).split(separator);
        return filmDescriptions.map(description => {
        // Clean up the input string
        const cleanDescription = description.replace(/^Film \[/, '').slice(0, -1);

        // Split data into key-value pairs
        const parts = cleanDescription.split(/,\s*(?=[a-z]+\=)/i);
        const film = {};

        parts.forEach(part => {
            const index = part.indexOf('=');
            const key = part.substring(0, index).trim();
            const value = part.substring(index + 1).trim();
            film[key] = value;
        });

        // Convert numerical values
        if (film.id) film.id = parseInt(film.id);
        if (film.year) film.year = parseInt(film.year);
            return film;
        });
    });
}
  
// Parses the server response based on its content type using a switch statement
function parseResponse(response) {
    const contentType = response.headers.get("Content-Type");
  
    switch (true) {
        case contentType.includes("application/json"):
        return parseJsonResponse(response);

        case contentType.includes("application/xml"):
        case contentType.includes("text/xml"):
        return parseXmlResponse(response);

        case contentType.includes("text/plain"):
        return parsePlainTextResponse(response);

        default:
        throw new Error(`Unsupported content type: ${contentType}`);
    }
}

export { parseResponse };

  