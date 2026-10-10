this is an attempt to rebuild my chat client/server with a react DOM interface

## run it

    npm install
    PORT=8081 npm start              # http://localhost:8081
    BASE_PATH=/chat PORT=8081 npm start   # http://localhost:8081/chat/

`BASE_PATH` moves the whole chat (the page, its files and the live connection)
under a path; that is how www.travish.com/chat/ serves it.

## as a container

    docker build -t react-chat .
    docker run --rm -p 8081:8081 react-chat            # http://localhost:8081
    docker run --rm -p 8081:8081 -e BASE_PATH=/chat react-chat

## limits

Nothing is moderated and nothing is saved (a restart empties the chat). To keep
one visitor from spoiling it: names up to 24 characters, messages up to 500,
at most 5 messages (joins count) per connection in any 5 seconds, anything over
4 KB refused, and only the newest 50 messages kept in memory (20 shown).
