// 1. Import all the modules we need
const http = require("http");
const fs = require("fs"); // for reading/writing
const querystring = require("querystring"); // a built in module to parse form data

const PORT = 3000;

// 2. create the http server
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);

  // ----ROUTER START-----
  // ROUTE:1 the homepage (GET /)
  // this route READS the file and displays it
  if ((req.url === "/") & (req.method === "GET")) {
    //read the guestbook.txt file
    fs.readFile("guestbook.txt", "utf8", (err, data) => {
      if (err) {
        //handle errors
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
        return;
      }
      // If successful, send the HTML page
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <html>
          <body>
            <h1>My Guestbook</h1>
            <h2>Messages:</h2>
            <pre>${data || "No messages yet."}</pre>
            <hr>
            <h3>Add a new message:</h3>
            <form action="/add" method="POST">
              <input type="text" name="message" placeholder="Your message">
              <button type="submit">Add Message</button>
            </form>
          </body>
        </html>
      `);
    });
  }
  //ROUTE 2: The "Add Message" Handler (POST /add)
  // this route WRITES to the file
  else if ((req.url === "/add") & (req.method === "POST")) {
    let body = "";

    //get the data "chunks" from the request
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    //when all chunks are received
    req.on("end", () => {});
  }
});
