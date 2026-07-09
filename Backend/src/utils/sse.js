// Simple SSE registry to hold listeners per orderNumber
const streams = new Map()

function createStream(res) {
    res.writeHead(200, {
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
    })
    res.write('\n')

    const id = Date.now() + Math.random().toString(36).slice(2)

    const onClose = () => {
        res.end()
    }

    return { id, res, onClose }
}

function subscribe(orderNumber, stream) {
    const list = streams.get(orderNumber) || new Map()
    list.set(stream.id, stream)
    streams.set(orderNumber, list)

    const unsubscribe = () => {
        const l = streams.get(orderNumber)
        if (l) {
            l.delete(stream.id)
            if (l.size === 0) streams.delete(orderNumber)
        }
    }

    return unsubscribe
}

function broadcast(orderNumber, event, data) {
    const list = streams.get(orderNumber)
    if (!list) return
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
    for (const stream of list.values()) {
        try {
            stream.res.write(payload)
        } catch (e) {
            // ignore write errors
        }
    }
}

module.exports = { createStream, subscribe, broadcast }
